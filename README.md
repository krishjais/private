# New Durga Wire Netting Work: Production Website

Production website for New Durga Wire Netting Work, Pithampur, Madhya Pradesh. Precision manufacturer of railway signal relay assemblies, relay child parts, and coach fan guards.

## Getting Started

### 1. Prerequisites

- Node.js 20.x or 22.x
- npm 10.x or newer

### 2. Install Dependencies

```bash
npm install
```

### 3. Local Development Server

```bash
npm run dev
```

Open `http://localhost:4321` in your browser.

## How to Edit Site Content

All business data, addresses, contact numbers, verified machine specifications, and flags are centralized in:

```text
src/config/site.ts
```

### Feature Flags

- `siteConfig.flags.SHOW_ANNUAL_SALES`: Controls whether the verified annual sales line ("Average annual sales of approximately Rs 7 to 8 crore") displays on the `/about` page (default: `true`).
- `siteConfig.flags.SHOW_REFERENCES_LINE`: Controls whether the line "References available on request" displays on the `/clients` page (default: `false`).

## How to Swap Real Photos

1. Raw photos can be placed into the `source-images/` folder.
2. When ready for production, convert images to WebP format matching the filenames in `public/images/`:
   - `hero-factory-cnc.webp`
   - `product-relay-single.webp`
   - `product-relay-tray.webp`
   - `relay-child-parts-flatlay.webp`
   - `fanguard-mild-steel.webp`
   - `fanguard-stainless.webp`
   - `coach-mild-steel.webp`
   - `coach-stainless.webp`
   - `machine-cnc.webp`
   - `machine-press.webp`
   - `machine-vmc.webp`
   - `machine-dro.webp`
   - `machine-traub.webp`
   - `process-raw-material.webp`
   - `process-electroplating.webp`
   - `process-powder-coating.webp`
   - `process-vacuum-furnace.webp`
   - `process-assembly-testing.webp`
   - `process-packing.webp`
   - `quality-caliper.webp`
   - `quality-coil-test.webp`
   - `jobwork-drawing.webp`
   - `about-shopfloor.webp`
3. Update `src/data/images.ts` to set `replaceWithRealPhoto: false` for each image that has been updated with a real photograph.

## Adding Customer Testimonials

Customer reviews and endorsements are managed in `src/data/testimonials.json`.

- The file ships empty (`[]`). When empty, no testimonial block or gap renders.
- Each entry requires `name`, `role`, `company`, `quote`, `date`, and `permission: true`.
- Entries with `permission: false` are filtered out and will not render.

## Building the Site

### Preview Build (Allows Placeholders)

To test the build while placeholders are still pending confirmation:

```bash
npm run build:preview
```

### Production Build (Strict Launch Guard)

The production build script executes an automated validation pass via `scripts/check-launch.mjs`:

```bash
npm run build
```

This build will intentionally fail with an exit code 1 if any unconfirmed `"TO CONFIRM:"` strings, placeholder licence numbers, or placeholder domains remain in the source code or build output.

## Deploying

Refer to `DEPLOY.md` for complete Cloudflare Pages setup instructions.
Refer to `LAUNCH.md` for the pre-launch verification checklist.
