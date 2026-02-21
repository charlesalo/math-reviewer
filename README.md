# Math Reviewer

A web app that auto-generates printable math practice tests for elementary students. Built with React + Vite, optimized for A4 paper printing.

## Live Demo

[https://charlesalo.github.io/math-reviewer/](https://charlesalo.github.io/math-reviewer/)

## Features

- **Subtraction with Borrowing** — 2-digit and 3-digit problems requiring regrouping
- **Addition** — simple (no carry) and with carrying
- **Multiplication** — single-digit factors (2–10)
- **Division** — whole-number quotients
- **Word Problems** — 12 balanced categories including:
  - Basic and multi-step arithmetic stories
  - Money problems (Philippine Peso ₱)
  - Time & measurement conversions (including half-minute variants)
  - Sequences, place value, fractions
  - Missing number / equation problems
  - Geometry word problems (perimeter, area)
- **Geometry** — rectangle, square, and triangle problems with SVG diagrams
- **Answer Key** — auto-generated with unit-aware answers (₱, cm, m, AM/PM, fractions)
- **Print-ready** — continuous layout, A4 optimized, answer key on a new page

## Usage

1. Configure the number of questions per section
2. Click **Generate Test**
3. Print the page (Ctrl+P / Cmd+P) — use A4 paper size, margins set to default

## Development

```bash
npm install
npm run dev
```

Runs the app locally at `http://localhost:5173`.

## Deploy to GitHub Pages

```bash
npm run deploy
```

This builds the app and pushes to the `gh-pages` branch automatically.

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 6](https://vitejs.dev/)
- [gh-pages](https://github.com/tschaub/gh-pages)
