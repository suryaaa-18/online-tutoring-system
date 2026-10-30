// Draws the detailed UML class diagram into <svg id="uml"> (coordinates are poster pixels).
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.getElementById("uml");
  const LINE = "#3a2a6e";
  const el = (n, a, p = svg, t) => {
    const e = document.createElementNS(NS, n);
    for (const k in a) e.setAttribute(k, a[k]);
    if (t !== undefined) e.textContent = t;
    p.appendChild(e);
    return e;
  };
  const text = (x, y, s, o = {}) =>
    el("text", Object.assign({ x, y, "dominant-baseline": "middle", "text-anchor": o.a || "start",
      "font-family": o.f || "Inter", "font-size": o.s || 14.5, "font-weight": o.w || 400, fill: o.c || "#222" }), svg, s);

  function box(x, y, w, h, hh, stroke, fill, o = {}) {
    el("rect", { x, y, width: w, height: h, rx: 3, fill: "#fff", stroke, "stroke-width": 2, "stroke-dasharray": o.dash || "" });
    el("path", { d: `M${x},${y + hh} V${y + 3} a3,3 0 0 1 3,-3 H${x + w - 3} a3,3 0 0 1 3,3 V${y + hh} Z`, fill });
    el("line", { x1: x, x2: x + w, y1: y + hh, y2: y + hh, stroke, "stroke-width": o.dash ? 1.5 : 1 });
    el("rect", { x, y, width: w, height: h, rx: 3, fill: "none", stroke, "stroke-width": 2, "stroke-dasharray": o.dash || "" });
  }
  function cls(x, y, name, attrs, methods, stroke, fill) {
    box(x, y, 300, 162, 37, stroke, fill);
    text(x + 150, y + 19, name, { a: "middle", w: 700, s: 17, c: "#222" });
    attrs.forEach((s, i) => text(x + 10, y + 53 + i * 19.5, s));
    el("line", { x1: x, x2: x + 300, y1: y + 107, y2: y + 107, stroke, "stroke-width": 1 });
    methods.forEach((s, i) => text(x + 10, y + 123 + i * 20, s));
  }
  function iface(x, y, name, methods) {
    box(x, y, 300, 102, 49, "#d32f2f", "#fde0e0", { dash: "6 4" });
    text(x + 150, y + 15, "«interface»", { a: "middle", s: 12.5, c: "#333" });
    text(x + 150, y + 35, name, { a: "middle", w: 700, s: 16.5, c: "#222" });
    methods.forEach((s, i) => text(x + 10, y + 67 + i * 19, s, { s: 14 }));
  }
  function small(x, y, w, name, method, stroke, fill, enumBody) {
    el("rect", { x, y, width: w, height: 71, rx: 3, fill: "#fff", stroke, "stroke-width": 2 });
    el("rect", { x, y, width: w, height: 35, rx: 3, fill, stroke, "stroke-width": 2 });
    text(x + w / 2, y + 18, name, { a: "middle", w: 700, s: 15.5, c: "#222" });
    text(enumBody ? x + w / 2 : x + 10, y + 52, method, { a: enumBody ? "middle" : "start", s: 14 });
  }
  const arrow = (x, y, dir) => {
    const p = { r: [[-11, -6], [0, 0], [-11, 6]], d: [[-6, -11], [0, 0], [6, -11]] }[dir];
    el("polygon", { points: p.map(q => `${x + q[0]},${y + q[1]}`).join(" "), fill: LINE });
  };
  const diamond = (x, y) => el("polygon", { points: `${x},${y} ${x - 7},${y + 10} ${x},${y + 20} ${x + 7},${y + 10}`, fill: LINE });
  const hollow = (x, y, up) => {
    const d = up ? [[0, 0], [-9, 19], [9, 19]] : [[0, 0], [-9, -19], [9, -19]];
    el("polygon", { points: d.map(q => `${x + q[0]},${y + q[1]}`).join(" "), fill: "#fff", stroke: LINE, "stroke-width": 2 });
  };
  const ln = (x1, y1, x2, y2, dash) => el("line", { x1, y1, x2, y2, stroke: LINE, "stroke-width": 2.5, "stroke-dasharray": dash || "" });
  const lab = (x, y, s) => text(x, y, s, { a: "middle", s: 13, c: "#555" });
  const mult = (x, y, s) => text(x, y, s, { a: "middle", s: 13.5, w: 700, c: "#222" });

  // ---- classes ----
  cls(817, 270, "Tutor", ["− tutorId: String", "− name: String", "− subject: String"],
    ["+ createCourse(): Course", "+ conductSession(): void"], "#1f5bb5", "#dce6f8");
  cls(1189, 270, "Course", ["− courseId: String", "− title: String", "− modules: List<Module>"],
    ["+ addModule(m: Module): void", "+ getModules(): List<Module>"], "#6a2db8", "#ede0f7");
  cls(817, 492, "Student", ["− studentId: String", "− name: String", "− email: String"],
    ["+ enroll(c: Course): void", "+ bookSession(s: TutoringSession): void"], "#2e7d45", "#dcf0e0");
  cls(1189, 492, "Module", ["− moduleNo: int", "− title: String", "− lessons: List<Lesson>"],
    ["+ addLesson(l: Lesson): void", "+ getDuration(): int"], "#6a2db8", "#ede0f7");
  cls(817, 713, "TutoringSession", ["− sessionId: String", "− startTime: DateTime", "− status: SessionStatus"],
    ["+ bookSlot(): boolean", "+ cancelSlot(): void"], "#e07b1a", "#fde6d3");
  cls(1189, 713, "Lesson", ["− lessonId: String", "− topic: String", "− durationMin: int"],
    ["+ markComplete(): void", "+ getMaterial(): String"], "#6a2db8", "#ede0f7");
  iface(817, 934, "Schedulable", ["+ bookSlot(): boolean", "+ cancelSlot(): void"]);
  iface(1189, 934, "Payable", ["+ pay(amount: double): boolean", "+ refund(): void"]);
  small(817, 1096, 300, "«enum» SessionStatus", "SCHEDULED · LIVE · COMPLETED", "#3b4a78", "#e8ecf4", true);
  small(1189, 1096, 145, "CardPayment", "+ pay(): boolean", "#1f5bb5", "#dce6f8");
  small(1346, 1096, 145, "UPIPayment", "+ pay(): boolean", "#1f5bb5", "#dce6f8");

  // ---- relationships ----
  ln(1117, 324, 1178, 324); arrow(1189, 324, "r");                       // Tutor teaches Course
  lab(1153, 304, "teaches"); mult(1123, 341, "1"); mult(1166, 341, "1..*");
  ln(1117, 570, 1153, 570); ln(1153, 570, 1153, 378); ln(1153, 378, 1178, 378); arrow(1189, 378, "r"); // Student enrolls
  mult(1130, 555, "1..*"); mult(1167, 395, "1..*"); lab(1148, 594, "enrolls");
  ln(967, 653, 967, 702); arrow(967, 713, "d");                          // Student books Session
  mult(978, 666, "1"); mult(986, 697, "0..*"); lab(930, 684, "books");
  ln(1339, 452, 1339, 492); diamond(1339, 432);                          // Course owns Module
  mult(1351, 445, "1"); mult(1358, 477, "1..*"); lab(1305, 463, "owns");
  ln(1339, 673, 1339, 713); diamond(1339, 653);                          // Module owns Lesson
  mult(1351, 666, "1"); mult(1358, 697, "1..*"); lab(1305, 684, "owns");
  ln(1117, 792, 1178, 792); arrow(1189, 792, "r");                       // Session covers Lesson
  lab(1153, 773, "covers"); mult(1129, 810, "1..*"); mult(1176, 810, "1");
  ln(967, 875, 967, 915, "5 4"); hollow(967, 934, false);                // Session implements Schedulable
  lab(1023, 904, "«implements»");
  [1262, 1418].forEach(x => { ln(x, 1055, x, 1096, "5 4"); hollow(x, 1036, true); });  // Card/UPI implement Payable
  lab(1335, 1067, "«implements»");

  // ---- legend ----
  el("rect", { x: 795, y: 1197, width: 716, height: 146, rx: 10, fill: "#fff", stroke: "#c9ced8", "stroke-width": 1.5 });
  text(1153, 1219, "UML NOTATION LEGEND", { a: "middle", f: "Oswald", w: 500, s: 21, c: "#111" });
  ln(815, 1249, 855, 1249); el("polygon", { points: "815,1249 823,1244 831,1249 823,1254", fill: LINE });
  el("line", { x1: 985, y1: 1248, x2: 1017, y2: 1248, stroke: LINE, "stroke-width": 2, "stroke-dasharray": "5 4" });
  el("polygon", { points: "1015,1242 1026,1248 1015,1254", fill: "#fff", stroke: LINE, "stroke-width": 2 });
  ln(1159, 1249, 1190, 1249); arrow(1202, 1249, "r");
  const item = (x, h, d) => { text(x, 1247, h, { w: 700, s: 14.5, c: "#111" }); d.forEach((s, i) => text(x, 1265 + i * 17.5, s, { s: 13.5, c: "#333" })); };
  item(860, "Composition", ["Part lives and", "dies with its", "whole."]);
  item(1034, "Realization", ["Class implements", "an interface."]);
  item(1209, "Association", ["Independent", "objects linked."]);
  [["1", "One"], ["0..*", "Zero or more"], ["1..*", "One or more"], ["« »", "Stereotype"]].forEach((r, i) => {
    text(1333, 1249 + i * 19, r[0], { w: 700, s: 13.5, c: "#111" });
    text(1370, 1249 + i * 19, r[1], { s: 13.5, c: "#333" });
  });
})();
