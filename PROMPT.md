# Treeline Supply Copy-Paste Build Prompt

Create a premium ski equipment landing page called **"Treeline Supply"** with 4
sections, using a dark alpine technical gear theme. The page uses local JPG frame
sequences for scroll-driven motion, square product images, bold condensed
typography, a subtle dotted background texture, and a black/ice/lime color
system. Recreate it exactly as described below.

## Asset Setup

Before building, download the template repository from GitHub and copy its
`public/assets` folder into the new project.

Repository:

```text
https://github.com/woojinstartup/ski-landingpage
```

Download ZIP:

```text
https://github.com/woojinstartup/ski-landingpage/archive/refs/heads/main.zip
```

Required final asset structure:

```text
public/assets/hero-ski-descent/ezgif-frame-001.jpg
...
public/assets/hero-ski-descent/ezgif-frame-203.jpg

public/assets/gear-jump-sequence/ezgif-frame-001.jpg
...
public/assets/gear-jump-sequence/ezgif-frame-232.jpg

public/assets/product-cards/kore-99-carbon-freeride-skis.png
public/assets/product-cards/stormline-anorak-shell-jacket.png
public/assets/product-cards/polar-vlt-22-ski-goggles.png
```

Use the downloaded files as local runtime assets. Do **not** hotlink GitHub raw
URLs, CloudFront URLs, or any external CDN URLs inside the app. Runtime image
paths must be local paths under `/assets/...`.

## Framework

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- lucide-react icons

Required icons:

- ArrowDown
- ArrowRight
- Mail

No additional UI framework is needed.

## Fonts

Load Google Fonts in `index.html`:

```text
https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap
```

Font usage:

- Anton: all large headings, logo, navigation, product names
- IBM Plex Mono: body copy, labels, small technical metadata
- Instrument Serif: optional italic accent text only if needed

## Color System

Use CSS variables or Tailwind theme tokens:

```css
--color-ice-950: #06111f;
--color-ice-900: #0a1628;
--color-ice-800: #122238;
--color-ice-200: #dbe8f4;
--color-powder: #f5fbff;
--color-signal: #98f5ff;
--color-sunset: #f56f46;
--color-gear: #d7ff63;
```

Overall palette:

- Background: deep graphite/navy
- Main text: ice white / powder white
- Accent: subtle lime yellow-green
- Secondary accent: pale cyan

## Background Texture

The page should have a subtle dotted technical texture in empty dark background
areas. Do not use a full-screen fixed overlay that covers product images. Apply
the dot texture as a background layer:

```css
background:
  radial-gradient(circle, rgba(245, 251, 255, 0.08) 1px, transparent 1.4px),
  radial-gradient(circle at top, rgba(124, 170, 255, 0.12), transparent 30%),
  linear-gradient(180deg, #07111f 0%, #091426 22%, #08101b 100%);
background-size: 14px 14px, 100% 100%, 100% 100%;
```

Also apply the same subtle dot layer to non-image sections such as the lookbook
and CTA sections.

## Shared Layout Rules

- Body margin: 0
- Min width: 320px
- Text color: `var(--color-powder)`
- Use `scroll-behavior: smooth`
- Images should be `display: block; max-width: 100%`
- Main max content width: `min(1380px, 100%)`
- Use responsive horizontal padding: `clamp(1rem, 3vw, 2.25rem)` or similar
- Use uppercase text for headings, navigation, labels, and buttons
- Use restrained border radius: 8px to 12px for cards, not overly round

## Header

Fixed header at top of page:

- Position: fixed, top 0, left 0, width 100%, z-index 40
- Padding: about `0.85rem 1rem` mobile, `1rem 1.8rem` desktop
- Background: top-to-transparent dark gradient
- Left logo: `Treeline Supply`
  - Anton
  - Uppercase
  - font-size `clamp(0.92rem, 1.5vw, 1.25rem)`
  - letter-spacing `0.08em`
- Center nav hidden on mobile and visible on desktop
  - Links: Gear, Lookbook, Fit Kit
  - pill-shaped translucent dark nav
- Right pill: `Winter 26 Drop`
  - Small uppercase mono/Anton style
  - Lime tinted border and background

## Section 1: Hero Ski Descent

Full-screen scroll-driven hero.

Section:

- `height: 520vh`
- Contains a sticky child with `position: sticky; top: 0; height: 100vh`
- The sticky child clips overflow and has background `#050d16`

Frame sequence:

- Use `public/assets/hero-ski-descent`
- Frame count: 203
- File pattern: `ezgif-frame-001.jpg` through `ezgif-frame-203.jpg`
- Generate URLs dynamically:

```ts
const FRAME_COUNT = 203

const frames = Array.from({ length: FRAME_COUNT }, (_, index) => {
  const frame = String(index + 1).padStart(3, '0')
  return `/assets/hero-ski-descent/ezgif-frame-${frame}.jpg`
})
```

Scroll mapping:

- Use a `sectionRef`
- Calculate:
  - `start = section.offsetTop`
  - `range = section.offsetHeight - window.innerHeight`
  - `progress = clamp((window.scrollY - start) / range, 0, 1)`
  - `frameIndex = Math.round(progress * (FRAME_COUNT - 1))`
- Update state on scroll and resize
- Preload all frames with `new Image()`

Hero image:

- Absolute inset 0
- Width/height 100%
- `object-fit: cover`
- Slight scale: `transform: scale(1.015)`
- Filter: slight contrast/saturation tuning

Hero overlays:

- Use dark vignette gradients to preserve text readability
- Use a subtle frost/screen highlight layer
- Do not use heavy dot texture over the image

Hero text:

```text
Performance ski equipment

Cold speed,
clean lines

Freeride skis, shell layers, goggles, and boots for powder laps and fast resort days.
```

Heading:

- Anton
- Uppercase
- `font-size: clamp(3rem, 7.8vw, 6.6rem)`
- `line-height: 1.06`
- Max width around `12ch`

Bottom-right scroll prompt:

- ArrowDown icon
- Text: `Scroll`
- Small uppercase mono label

Right side progress rail:

- Thin vertical rail near right edge
- Filled with transform scaleY based on hero scroll progress
- Gradient from cyan to warm orange

## Section 2: Gear Jump Scroll Section

Second scroll-driven sticky sequence with product cards sliding in.

Section:

- `height: 480vh`
- Dark alpine background
- Sticky child: `position: sticky; top: 0; height: 100vh`
- Full-bleed background sequence

Frame sequence:

- Use `public/assets/gear-jump-sequence`
- Frame count: 232
- File pattern: `ezgif-frame-001.jpg` through `ezgif-frame-232.jpg`

Generate URLs:

```ts
const GEAR_FRAME_COUNT = 232

const gearFrames = Array.from({ length: GEAR_FRAME_COUNT }, (_, index) => {
  const frame = String(index + 1).padStart(3, '0')
  return `/assets/gear-jump-sequence/ezgif-frame-${frame}.jpg`
})
```

Use the same scroll mapping method as Section 1, but with a separate ref,
progress state, and frame index.

Background image:

- Absolute inset 0
- `object-fit: cover`
- `transform: scale(1.02)`
- `filter: saturate(0.92) contrast(1.08)`

Dark shade overlay:

- Add horizontal and vertical gradients so text stays readable
- Keep the skier/action visible

Left copy:

```text
Scroll the kit

Gear that
leaves the lip

The jump sequence becomes the product demo: each scroll step brings one piece of the kit into focus before takeoff.
```

Gear product cards:

Four cards. They sit near the right/bottom side and slide in as the scroll
progress changes.

Data:

```ts
[
  {
    name: 'Polar VLT 22',
    type: 'Goggles',
    detail: 'High-contrast lens for tree shade, flat light, and sudden open bowls.',
    stat: '22% VLT',
  },
  {
    name: 'GripLock Pro',
    type: 'Gloves',
    detail: 'Pre-curved insulation, leather palm, and low-profile wrist closure.',
    stat: 'PrimaLoft 100g',
  },
  {
    name: 'Kore 99 Carbon',
    type: 'Skis',
    detail: 'Directional freeride shape with a stable tail for fast landings.',
    stat: '99 mm waist',
  },
  {
    name: 'Ridge Plant 16',
    type: 'Poles',
    detail: 'Light alloy shaft, powder basket, and extended grip for traverses.',
    stat: '7075 aluminum',
  },
]
```

Active card:

- `activeGearIndex = Math.min(items.length - 1, Math.floor(progress * items.length))`
- Active card opacity 1 and translate 0
- Inactive cards opacity 0 and translated to the right
- Transition: 360ms-520ms ease/cubic-bezier

Card style:

- Width around `min(24rem, calc(100vw - 2rem))`
- Dark translucent background
- Thin light border
- Backdrop blur
- Subtle box shadow
- Small lime count label
- Anton product name
- Monospace detail/stat

Bottom progress:

- Horizontal progress bar at bottom of sticky section
- Lime fill using `scaleX(progress)`

## Section 3: Field Lookbook Product Cards

Solid/dotted dark background. No video.

Top heading:

```text
Field lookbook

Product mood,
shot in real snow
```

Heading:

- Anton
- Uppercase
- `font-size: clamp(2.2rem, 6vw, 4.8rem)`
- `line-height: 1.06`
- Max width around `22ch`

Grid:

- 3 columns on desktop
- 1 column on mobile
- Gap 1rem
- Max width `min(1380px, 100%)`

Cards:

- Use square product images from `public/assets/product-cards`
- Min height around `30rem`
- Border radius around `0.75rem`
- Thin subtle border
- Image fills card with `object-fit: cover`
- No heavy black overlay
- Bottom caption should be very thin and not cover the product

Product images:

```ts
[
  {
    image: '/assets/product-cards/kore-99-carbon-freeride-skis.png',
    eyebrow: 'All-Mountain Ski',
    title: 'Kore 99 Carbon',
    copy: 'A light, directional ski for powder mornings that still holds an edge on scraped exits.',
  },
  {
    image: '/assets/product-cards/stormline-anorak-shell-jacket.png',
    eyebrow: 'Shell System',
    title: 'Stormline Anorak',
    copy: 'Quiet waterproof fabric, deep vents, and glove-friendly pulls for long resort days.',
  },
  {
    image: '/assets/product-cards/polar-vlt-22-ski-goggles.png',
    eyebrow: 'Goggle Lens',
    title: 'Polar VLT 22',
    copy: 'High-contrast lenses tuned for tree shade, flat light, and sudden open bowls.',
  },
]
```

Caption bar:

- Position absolute bottom 0 left 0 right 0
- Padding around `0.4rem 0.55rem`
- Very translucent dark background, about `rgba(5, 12, 22, 0.42)`
- Backdrop blur around 6px
- Show only eyebrow and title in one thin row
- Hide or omit the long copy on the card so the image remains visible

## Section 4: CTA / Final Section

Dark dotted technical background with a soft glass/dark panel.

Heading:

```text
Ready for the next pass

Build a kit for
your next storm day.
Start with the line.
```

Heading style:

- Anton
- Uppercase
- `font-size: clamp(2.2rem, 6vw, 4.9rem)`
- `line-height: 1.06`
- Max width around `24ch`

CTA buttons:

- Primary: `Replay terrain test` with ArrowRight icon
- Secondary: `Ask for gear fit` with Mail icon
- Primary button background: lime `var(--color-gear)`
- Secondary button: translucent dark with white border
- Rounded pill buttons
- Uppercase small technical text

Footer links:

- Mail
- Lookbook
- Gear

Use small pill links with subtle borders.

## Technical Implementation Details

- Implement a `clamp(value, min, max)` helper.
- Use `useRef` for both scroll sections.
- Use `useState` for:
  - hero frame index
  - hero scroll progress
  - gear frame index
  - gear scroll progress
- Use `useEffectEvent` or stable scroll handlers to avoid stale closure issues.
- Add scroll and resize listeners with cleanup.
- Preload both image sequences.
- Use `startTransition` when updating frame/progress state during scroll.
- Keep runtime paths local:

```text
/assets/hero-ski-descent/...
/assets/gear-jump-sequence/...
/assets/product-cards/...
```

- Do not include Vite starter logos, React logos, placeholder cards, lorem ipsum,
  marketing hero sections, or unrelated decorative blobs.
- Do not use purple gradients, beige themes, or generic SaaS cards.
- Make the first screen the actual ski equipment landing experience, not a
  marketing explanation page.

## Final Verification

After building:

- Run `npm run lint`
- Run `npx tsc -b`
- Start with `npm run dev`
- Verify the page loads from local assets with no external image hotlinks.
- Verify Section 1 scroll-scrubs 203 frames.
- Verify Section 2 scroll-scrubs 232 frames and product cards slide in.
- Verify Section 3 product images are visible and not covered by heavy black blocks.
