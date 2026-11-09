# Nalukandathil Gold & Diamonds - Website

Next.js 14 (App Router). Fashion-house editorial design: warm white, rich black, deep emerald and gold accents (Bodoni Moda + Inter); square,
image-led layouts; light serif headlines with spaced capitals. Motion: Framer Motion (masked headline reveals, image wipes, parallax, count-ups, animated filtering, magnetic buttons) + Lenis smooth scroll. Respects reduced-motion.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Edit content

All text, contact details, collections, products and photos live in `lib/site.js`.

## Photos

Campaign photos are in `public/images/`. Hero images are listed in `looks`; collection and product tiles are crops of
those photos (`image`, `focus` = point kept in view, `zoom`). To use real product shots, drop files in
`public/products/` and point a product's `image` at them (remove `focus`/`zoom`).

## Logo

Header, hero-adjacent footer use `public/logo.jpg` (current file is only 150px; a high-resolution version will look sharper).

## Building while developing

Run production builds with `DIST=.next-build npm run build` so they do not clash with `npm run dev`.
