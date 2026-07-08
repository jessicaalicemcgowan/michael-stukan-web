# CLAUDE.md — Michael Stukan Website (Next.js)

This is the master instruction file for building the Michael Stukan website frontend. Read this entire file before writing any code. Follow every rule precisely and consistently.

---

## Project Overview

**Brand:** Michael Stukan  
**Type:** Headless Next.js frontend — no CMS or Shopify connected yet  
**Goal:** Build pixel-perfect pages from Figma designs with all animations and interactions  
**Stack:** Next.js (App Router), plain CSS Modules, vanilla JavaScript  
**Phase:** Phase 1 — Frontend only. All content is hardcoded placeholder data.  
**Figma:** https://www.figma.com/design/YbKtiHUj1EYMD1wCmYQzfr/Michael-Stukan-Website--Working-?node-id=90-2234

---

## Rules

- No Tailwind. No CSS frameworks. Use CSS Modules only.
- No TypeScript. Plain JavaScript (.js/.jsx files).
- No unnecessary dependencies. Keep it lean.
- Never hardcode colours or spacing — always use CSS custom properties from globals.css.
- All images: use Next.js Image component with fill or explicit dimensions.
- Mobile first. Base styles for mobile, override at tablet and desktop breakpoints.
- Animations must be subtle, slow and elegant — never jarring.
- Use useEffect + IntersectionObserver for scroll-triggered animations.
- Never use inline styles except for dynamic JS values (e.g. cursor position).

---

## Brand

### Colours
Defined in app/globals.css as CSS custom properties:

```css
:root {
  --color-bg:         #EDEBE6;
  --color-maroon:     #4A232D;
  --color-blue:       #147CC2;
  --color-pink:       #E695D5;
  --color-text:       #1A1A1A;
  --color-text-muted: #6B6B6B;
  --color-border:     #D4D2CD;
  --color-white:      #FFFFFF;
}
```

### Typography
Single font family: Garda Nova 3 Trial (loaded via @font-face). Fall back to Georgia, serif.

```css
:root {
  --font: 'Garda Nova 3 Trial', Georgia, serif;
  --text-nav:      12px;
  --text-caption:  12px;
  --text-body:     14px;
  --text-body-lg:  16px;
  --text-heading:  28px;
  --text-display:  clamp(48px, 6vw, 96px);
}
```

### Spacing (8px grid)
```css
:root {
  --space-1:  8px;   --space-2:  16px;  --space-3:  24px;
  --space-4:  32px;  --space-5:  40px;  --space-6:  48px;
  --space-8:  64px;  --space-10: 80px;  --space-12: 96px;
  --space-16: 128px; --space-20: 160px;
}
```

### Layout
```css
:root { --gutter: 20px; }
@media (min-width: 768px)  { :root { --gutter: 40px; } }
@media (min-width: 1024px) { :root { --gutter: 139px; } }
```

### Breakpoints
- tablet:  768px
- desktop: 1024px
- wide:    1440px

---

## Animations

```css
:root {
  --ease-out:   cubic-bezier(0, 0, 0.2, 1);
  --dur-fast:   200ms;
  --dur-base:   400ms;
  --dur-slow:   700ms;
  --dur-slower: 1000ms;
}
```

- Fade up on scroll: opacity 0 + translateY(16px) to opacity 1 + translateY(0), 700ms, IntersectionObserver threshold 0.1
- Image hover: scale 1.0 to 1.03 over 600ms inside overflow:hidden container
- Link hover: opacity 1 to 0.5 over 200ms
- Cart slide: translateX(100%) to translateX(0) over 400ms
- Filter dim: non-matching products to opacity 0.2 over 300ms
- Archive hover: opacity 0 + scale(0.97) to opacity 1 + scale(1) over 300ms
- Cursor images: lerp factor 0.1 toward mouse position, slight rotation on movement

---

## File Structure

```
michael-stukan-web/
├── CLAUDE.md
├── app/
│   ├── globals.css
│   ├── layout.jsx
│   ├── page.jsx                  (Homepage)
│   ├── about/page.jsx
│   ├── collection/page.jsx
│   ├── campaign/page.jsx
│   └── shop/page.jsx
├── components/
│   ├── Nav.jsx + Nav.module.css
│   ├── Footer.jsx + Footer.module.css
│   ├── CartDrawer.jsx + CartDrawer.module.css
│   ├── ProductCard.jsx + ProductCard.module.css
│   ├── LookbookStrip.jsx + LookbookStrip.module.css
│   ├── CollectionArchive.jsx + CollectionArchive.module.css
│   └── FadeUp.jsx
├── hooks/
│   ├── useCart.js
│   └── useCursorImages.js
├── data/
│   ├── products.js
│   ├── lookbook.js
│   └── archive.js
└── public/images/
```

---

## Navigation

Desktop (56px):
```
MICHAEL STUKAN    ABOUT  COLLECTION  CAMPAIGN         SHOP    (IV) ●
```
- Sticky, z-index 100, background var(--color-bg)
- All caps, var(--text-nav), letter-spacing 0.08em
- SHOP underlined when active
- Cart count in parentheses + filled dot
- Collection hover: dropdown showing "Collection I — SS27"
- Campaign hover: dropdown showing current campaign

Mobile: brand name centred, hamburger right, full-screen overlay on open

---

## Pages

### Homepage
1. Hero — full viewport, editorial image, "MICHAEL STUKAN" display type centred, "SS27" below, "VIEW COLLECTION ›"
2. Lookbook Strip — horizontal scroll, "explore the collection ›" CTA
3. Campaign Module — full-width image, "SS27" top-left, "view the campaign ›" top-right
4. Shop Link — minimal CTA to /shop

### About
1. Large centred intro paragraph
2. Portrait image centred (~458px wide)
3. "ARTIST COLLABORATIONS" label left, body text right
4. Two images: small left, large right
5. Portrait left + bio text right
6. Pink press section with cursor-following images — "WORN BY" list + "PRESS" publication list
7. Stockists table: City | Country | Store | >

### Collection (Collection I SS27)
1. Header: "COLLECTION I  SS27" small, large logotype, "Richard Kilroy" below
2. "ABOUT THE COLLECTION" label left, body text right
3. Lookbook strip — SML/LRG toggle, click image shows product reveal panel
4. "ABOUT THE ARTIST" label left, bio right
5. Multiple editorial image modules (various layouts — fetch from Figma nodes 90:3912 and 90:4097)
6. Campaign module
7. Product thumbnails horizontal scroll
8. "SS27  SHOP THE COLLECTION ›"
9. Collection Archive
10. Footer

### Campaign
Full-bleed photo essay, no padding between images. Credits text. Shop CTA. Footer.
See Figma node 90:4518 for exact image layout sequence.

### Shop
- Top bar: "GRID: SML | LRG" left, "FILTER +" right (FILTER — when open)
- Filter panel: categories (Dresses, Shirts, Trousers, Knits, Accessories, Home) + colours (Dark, Light, Bright, Multicolour, Patterned, (Clear))
- SML grid: 5-col desktop, 3-col tablet, 2-col mobile
- LRG grid: 3-col desktop, 2-col tablet, 1-col mobile
- Product card: image + "+" bottom-left + price bottom-right (or "SOLD OUT")
- Filter: dims non-matching to opacity 0.2, no page reload
- Grid preference: localStorage key 'ms-grid'

---

## Cart Drawer

Slides from right. Width: 40vw desktop / 100vw mobile.
Background: var(--color-blue). Text: white.
- Header: "● CART (IV)" + "close"
- Items: thumbnail + name + price + size/colour + "remove"
- Discount input + "APPLY ›"
- Subtotal / Taxes / TOTAL
- CHECKOUT button
- Note: "Shipping & taxes may be re-calculated at checkout"
State: useState in useCart.js — no backend yet.

---

## Hardcoded Data

### data/products.js
```javascript
export const products = [
  { id: 1, name: 'Jacquard Dress',  price: '299£', category: 'dresses',     colour: 'multicolour', soldOut: false, image: '/images/products/jacquard-dress.jpg' },
  { id: 2, name: 'Oxford Shirt',    price: '99£',  category: 'shirts',      colour: 'light',       soldOut: false, image: '/images/products/oxford-shirt.jpg' },
  { id: 3, name: 'Scarlett Scarf',  price: '199£', category: 'accessories', colour: 'bright',      soldOut: false, image: '/images/products/scarlett-scarf.jpg' },
  { id: 4, name: 'Wire Dress',      price: '',     category: 'dresses',     colour: 'light',       soldOut: true,  image: '/images/products/wire-dress.jpg' },
  { id: 5, name: 'Knit Jacket',     price: '199£', category: 'knits',       colour: 'dark',        soldOut: false, image: '/images/products/knit-jacket.jpg' },
  { id: 6, name: 'Striped Shirt',   price: '99£',  category: 'shirts',      colour: 'patterned',   soldOut: false, image: '/images/products/striped-shirt.jpg' },
  { id: 7, name: 'Tan Shirt',       price: '299£', category: 'shirts',      colour: 'light',       soldOut: false, image: '/images/products/tan-shirt.jpg' },
  { id: 8, name: 'Dark Jacket',     price: '199£', category: 'knits',       colour: 'dark',        soldOut: false, image: '/images/products/dark-jacket.jpg' },
  { id: 9, name: 'Trousers',        price: '99£',  category: 'trousers',    colour: 'dark',        soldOut: false, image: '/images/products/trousers.jpg' },
  { id: 10, name: 'Beige Knit',     price: '299£', category: 'knits',       colour: 'light',       soldOut: false, image: '/images/products/beige-knit.jpg' },
];
```

### data/archive.js
```javascript
export const collections = [
  { id: 1, name: 'Collection I',   season: 'SS27', artist: 'Richard Kilroy',     url: '/collection', previewImage: '/images/archive/ss27.jpg' },
  { id: 2, name: 'Collection II',  season: 'FW27', artist: 'Jessica Rose Bird',  url: '#',           previewImage: '/images/archive/fw27.jpg' },
  { id: 3, name: 'Collection III', season: 'SS28', artist: 'John Booth',         url: '#',           previewImage: '/images/archive/ss28.jpg' },
  { id: 4, name: 'Collection IV',  season: 'FW28', artist: 'Colm Mac Athlaoich',url: '#',           previewImage: '/images/archive/fw28.jpg' },
  { id: 5, name: 'Collection V',   season: 'SS29', artist: 'Faye Wei Wei',       url: '#',           previewImage: '/images/archive/ss29.jpg' },
];
```

---

## Figma Node References

| Page | Node ID |
|------|---------|
| Homepage | 90:2811 |
| About | 90:2916 |
| Shop SML | 90:3062 |
| Shop LRG | 90:3776 |
| Shop filter | 90:3193 |
| Product Page | 90:3481 |
| Product + Cart | 90:3596 |
| Collection horizontal | 90:3912 |
| Collection vertical | 90:4097 |
| Collection product slider | 90:4299 |
| Campaign | 90:4518 |
| Nav | 90:4569 |

Always fetch the relevant Figma node before building a page or component.

---

## Build Order

1. app/globals.css — custom properties, reset, typography
2. components/Nav.jsx — navigation
3. components/Footer.jsx
4. app/layout.jsx — root layout
5. app/page.jsx — Homepage
6. app/shop/page.jsx — Shop with filter + grid toggle
7. app/collection/page.jsx — Collection editorial
8. components/LookbookStrip.jsx — SML/LRG + product reveal
9. app/campaign/page.jsx — Campaign
10. app/about/page.jsx — About + cursor images
11. components/CollectionArchive.jsx — archive hover
12. components/CartDrawer.jsx — slide-out cart
13. Add FadeUp scroll animations to all pages

---

## Do Not

- Do not use Tailwind
- Do not use TypeScript
- Do not hardcode hex values — use CSS custom properties
- Do not use inline styles except for dynamic cursor/JS values
- Do not use lorem ipsum — use realistic brand-appropriate placeholder text
- Do not connect Sanity or Shopify yet — Phase 2
- Do not use <a> for internal links — use Next.js <Link>
