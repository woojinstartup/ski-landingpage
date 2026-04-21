# Copy-Paste Build Prompt

Create a premium ski equipment landing page called "Treeline Supply" using React,
TypeScript, Vite, Tailwind CSS, and lucide-react icons. Use the local assets
included in the project. Do not hotlink external runtime images.

## Asset Structure

Use these local project paths:

- `public/assets/hero-ski-descent/ezgif-frame-001.jpg` through `ezgif-frame-203.jpg`
- `public/assets/gear-jump-sequence/ezgif-frame-001.jpg` through `ezgif-frame-232.jpg`
- `public/assets/product-cards/kore-99-carbon-freeride-skis.png`
- `public/assets/product-cards/stormline-anorak-shell-jacket.png`
- `public/assets/product-cards/polar-vlt-22-ski-goggles.png`

Generate frame URLs dynamically using:

```ts
String(index + 1).padStart(3, '0')
```

## Visual Direction

- Premium alpine ski equipment brand
- Dark graphite/navy background with subtle dotted texture
- Ice white typography with subtle lime accent color
- Bold condensed uppercase headings using Anton
- Monospace body text
- Clean technical outdoor gear aesthetic

## Page Structure

1. Full-screen sticky hero section
   - Scroll-scrub the 203-frame `hero-ski-descent` sequence.
   - Full-bleed image, object-cover.
   - Minimal fixed header: logo, nav, winter drop pill.
   - Hero text: "Cold speed, clean lines".

2. Sticky gear sequence section
   - Scroll-scrub the 232-frame `gear-jump-sequence` sequence.
   - Product cards slide in from the side as the user scrolls.
   - Cards: Polar VLT 22 goggles, GripLock Pro gloves, Kore 99 Carbon skis,
     Ridge Plant 16 poles.

3. Product lookbook section
   - Heading:
     "Product mood,"
     "shot in real snow"
   - Three image cards using the product PNGs.
   - Keep labels thin so the product images remain visible.

4. CTA section
   - Heading:
     "Build a kit for"
     "your next storm day."
     "Start with the line."
   - Include replay and contact buttons.

## Technical Notes

- Use sticky sections for scroll-driven sequences.
- Use `window.scrollY`, section `offsetTop`, and section height to map scroll
  progress to frame index.
- Preload sequence images with `new Image()`.
- Use local paths under `/assets/...`.
- Do not add unrelated template logos or Vite starter assets.
