# Princess Memoir Next Prototype

This is a new design inspired by the layout language of the referenced Awwwards page for The Obsidian Assembly. It does not reuse the original logo, imagery, or copy.

## Design Breakdown

1. Overall style
   - Boutique exhibition page, art-book cover, warm editorial luxury.
   - Large typographic gesture carries the first impression.
   - Imagery is atmospheric, not literal, and sits beneath translucent overlays.

2. Hero structure
   - Full-viewport stage with a rounded outer frame.
   - Minimal header: left identity, centered segmented navigation, right menu control.
   - Huge high-contrast serif title, offset second line, small floating labels, thin rule.

3. Section layout
   - Hero acts as a cinematic poster.
   - Analysis cards use a dense grid and restrained glass treatment.
   - Story chapters use a sticky side index and a large image-led feature panel.

4. Color system
   - Ink black, ivory, porcelain, champagne, blush, smoke.
   - Low saturation and warm neutrals, with light/dark contrast doing most of the work.

5. Type hierarchy
   - Display serif for hero and chapter titles.
   - Small uppercase sans for controls and metadata.
   - Serif body copy for intimate, editorial notes.

6. UI rules
   - Rounded stage and panels, but not nested decorative cards.
   - Thin translucent borders.
   - Soft shadows only where depth clarifies hierarchy.
   - Buttons use capsule forms with uppercase microcopy.

7. Motion and interaction
   - Framer Motion for hero image crossfade and chapter transitions.
   - GSAP ScrollTrigger for entrance reveals and card scroll animation.
   - Smooth native scrolling is assumed; a production build can add a dedicated inertia scroller.

8. RWD logic
   - Desktop preserves the stage-like composition.
   - Tablet reduces navigation and keeps large type.
   - Mobile stacks content, keeps the title readable, and lowers decorative density.

## Run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.
