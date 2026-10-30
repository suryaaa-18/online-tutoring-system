# Online Tutoring System — A2 Poster (CE6014 · Object Oriented Software Design)

Source code of the poster **"Online Tutoring System — Using UML · Composition & Interfaces"**.
The poster is built with plain HTML + CSS, and the UML class diagram is drawn with JavaScript (SVG).

**Author:** Suryaprakash Yadav · Enrollment No. 202303103510411 · Division 7D

## Files

| File | Purpose |
|---|---|
| `poster.html` | Poster layout and all text content (A2 landscape, 594 × 420 mm) |
| `poster.css` | Colours, fonts, spacing, panel styles |
| `uml.js` | Draws the detailed UML class diagram (classes, interfaces, composition, realization, legend) |
| `gen-qr.js` | Generates `assets/qr.svg` (QR code of this repository's link) |
| `render.js` | Exports `poster.pdf` (A2) and `poster.png` using Playwright |
| `assets/fonts/` | Oswald, Barlow and Inter (local copies, so it renders offline) |
| `poster.pdf`, `poster.png` | Final exported poster (with the QR code in the top corner) |

## OOD concepts shown

- **Composition:** `Course ◆— Module ◆— Lesson` (child cannot exist without its parent, cascade deletion)
- **Interfaces:** `Schedulable` (implemented by `TutoringSession`) and `Payable` (implemented by `CardPayment`, `UPIPayment`)
- **Associations:** `Tutor → Course`, `Student → Course`, `Student → TutoringSession`, `TutoringSession → Lesson`

## Run it

```bash
npm install
node gen-qr.js        # optional: regenerate the QR code
node render.js        # writes poster.pdf and poster.png
```

Or simply open `poster.html` in Chrome and print to PDF (paper size A2, no margins, background graphics on).
