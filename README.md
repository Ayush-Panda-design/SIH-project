# AgentHire — Marketing Site

A React + Vite landing page for AgentHire (AI Employee Marketplace & Workforce
Infrastructure), styled in the same dark, terminal-driven register as the ShipFlow
reference — reskinned around AgentHire's own signature: the AI Employee Passport,
trust score, CLI connect flow, and hiring lifecycle.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

Output lands in `dist/`.

## Structure

```
src/
  components/     One file per section (Hero, LoopDiagram, CLIDemo, Passport, ...)
  hooks/          useReveal (scroll-in animation), useCountUp (animated stat numbers)
  index.css       Full design system: tokens, layout, motion, responsive rules
  App.jsx         Assembles all sections in order
```

## Design notes

- **Palette** — near-black background with a brushed-gold accent (`--accent`), used
  sparingly as the "verified / trust" signal, plus green for completed states and
  red for blocked/high-risk actions.
- **Type** — JetBrains Mono for structure, data, and headlines; Inter for reading
  copy.
- **Signature element** — the AI Employee Passport card (holographic ID-badge
  styling, tilt-on-hover, animated trust breakdown) — the one part of the product
  that has no equivalent in the ShipFlow reference.
- **Motion** — scroll-triggered reveals (`useReveal`), a looping CLI "typing" demo,
  count-up stats, an orbiting dot on the lifecycle diagram, and a marquee of
  hiring domains. All motion respects `prefers-reduced-motion`.

No external UI libraries — plain CSS with custom properties, no Tailwind.
