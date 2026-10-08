# ORBIT FORM — Final Design Spec v1.0

**Project:** Premium single-vendor MERN electronics e-commerce portfolio  
**Design classification:** ARCHITECTURAL  
**Written-spec status:** PROPOSED — awaiting user review/approval  
**Implementation status:** NOT STARTED  
**Brand name status:** Working identity approved for design use; legal/trademark clearance is NOT VERIFIED.

---

## 1. Design Goal

Build a visually memorable electronics store that feels like a real commercial brand, while remaining easy to browse, shop, maintain, and explain in a freelance portfolio.

The design must balance:

- premium electronics retail;
- editorial storytelling;
- cinematic product presentation;
- fast, familiar e-commerce UX;
- strong mobile usability;
- distinct portfolio identity without copying a real brand.

Core direction:

> **Dark Editorial Commerce + Orbital Technical Graphics + Orange Commerce Actions + Lime Discovery Signals + White Tech-Lab Breaks + Cinematic Product Stories**

---

## 2. Brand Direction

### Name
**ORBIT FORM**

### Personality
- premium
- modern
- intelligent
- design-forward
- adventurous
- trustworthy
- creative without becoming chaotic

### Positioning
Premium electronics for creators, professionals, explorers, gamers, and everyday tech buyers.

### Tone
Short, confident, useful copy.

Examples:
- Explore a Brighter Tomorrow
- Built for What’s Next
- Sound Without Limits
- Capture a Wider Perspective
- Stay in Orbit

Avoid:
- excessive gaming slang;
- fake luxury language;
- generic “future is here” copy everywhere;
- unverified claims or fake customer statistics.

---

## 3. Visual System

### Base Colors

| Token | Role | Proposed Value |
|---|---|---|
| `--bg-primary` | Main dark background | `#050708` |
| `--bg-elevated` | Cards / nav / panels | `#0D1215` |
| `--surface-dark` | Secondary dark sections | `#12181C` |
| `--surface-light` | Orbit Form Lab / editorial break | `#F4F3EF` |
| `--text-primary-dark` | Text on light surfaces | `#0B0D0F` |
| `--text-primary-light` | Text on dark surfaces | `#F5F6F6` |
| `--text-muted` | Secondary information | `#9DA5AA` |
| `--border-dark` | Dark-surface borders | `#263036` |

### Signature Colors

**Commerce Orange — `#F56618`**
Use for:
- primary CTA;
- Add to Cart;
- deals;
- active commerce states;
- limited promotional emphasis.

Do NOT use orange as decoration everywhere.

**Discovery Lime — `#C8F050`**
Use for:
- product discovery;
- technical specs;
- Lab indicators;
- innovation highlights;
- selective status badges.

Do NOT use lime as the primary purchase CTA.

### Color Rule

> Orange = **ACT**  
> Lime = **DISCOVER**  
> White = **EDITORIAL / CONTEXT**  
> Black = **COMMERCE / IMMERSION**

This rule should remain consistent site-wide.

---

## 4. Typography

### Proposed Pairing
- **Display / campaign:** Sora, 700–800
- **UI / body / commerce:** Inter, 400–700

### Rules
- Headlines: bold, short, editorial.
- Product titles: medium/semi-bold.
- Prices: visually stronger than metadata.
- Description text: never too small or low-contrast.
- Avoid excessive all-caps outside short labels/campaign phrases.

Desktop hero headline should feel oversized and editorial.

Mobile headline should reduce aggressively rather than wrap into 5–7 cramped lines.

---

## 5. Layout Language

### Main Grid
- 12-column desktop grid
- consistent max-width
- strong alignment between commerce and editorial sections
- generous horizontal breathing room

### Section Rhythm

Use three kinds of sections:

1. **Commerce sections**
   - calm
   - predictable
   - grid-based
   - low animation

2. **Campaign sections**
   - expressive
   - image-led
   - selective cinematic motion

3. **Orbit Form Lab sections**
   - bright editorial break
   - technical/orbital graphic language
   - storytelling rather than direct selling

The page must not feel like a continuous gaming banner.

---

## 6. Signature Visual Language

The site should avoid relying on generic:
- rocks everywhere;
- neon borders everywhere;
- gaming-cyberpunk scenery;
- random glassmorphism;
- constant glow.

Instead, build a recognizable Orbit Form visual system from:

- orbital rings;
- circular crops;
- precision lines;
- technical grids;
- numbered story markers;
- product-spec callouts;
- geometric image masks;
- split dark/light compositions;
- isolated orange trajectory lines;
- lime diagnostic/spec indicators.

These motifs should appear repeatedly enough to feel intentional but never obstruct content.

---

## 7. Homepage Structure

### 01 — Header
- ORBIT FORM logo
- Shop
- Deals
- New Arrivals
- Brands
- Support
- prominent search
- account
- wishlist
- cart

Header should prioritize search and shopping over decorative navigation.

### 02 — Hero
Core message:
**EXPLORE A BRIGHTER TOMORROW**

Include:
- short subcopy
- primary CTA: Shop the Latest
- secondary CTA: Watch Story / Watch Video
- premium product composition
- orbital visual motif
- shipping / warranty / returns / support reassurance

Hero motion should feel cinematic but not delay access to shopping.

### 03 — Category Rail
Primary categories:
- Laptops
- Smartphones
- Audio
- Wearables
- Gaming
- Cameras
- Tablets
- Accessories
- Smart Home

Desktop: horizontal category cards.  
Mobile: swipeable rail.

### 04 — Featured Products
Tabs:
- Featured
- Best Sellers
- New Arrivals
- Top Rated

Product cards must expose:
- image
- product name
- compact descriptor
- rating
- price
- optional comparison price
- wishlist
- Add to Cart
- stock/status badge where useful

### 05 — Orbit Form Lab
Bright editorial section.

Purpose:
Explain the brand/product philosophy and visually break the dark commerce rhythm.

Core visual:
- circular/orbital composition
- technical callouts
- editorial story copy
- people/product context

This becomes the main signature pattern.

### 06 — Product Story Modules
Examples:
- Next-Gen Performance — laptops
- Sound Without Limits — audio
- Capture a Wider Perspective — cameras
- Smart Living Made Simple — smart home

These should not all use the same image/background formula.

### 07 — New Arrivals
Compact product rail.

### 08 — Trust / Service Row
- Free Shipping
- Secure Checkout
- Easy Returns
- Official Warranty
- Support

Claims must match actual demo/business configuration.

### 09 — Footer
- brand statement
- shop
- support
- company
- newsletter
- social links
- legal
- region/currency placeholder where relevant

---

## 8. Product Card Rules

Product cards are a **calm zone**.

### Default
- no permanent neon glow;
- dark neutral panel;
- strong product image;
- predictable information hierarchy;
- clear price;
- obvious wishlist and cart controls.

### Hover / Pointer
Allowed:
- subtle lift;
- secondary product image;
- slight image scale;
- quick-action reveal.

Avoid:
- rotating cards;
- large 3D tilts;
- excessive glow;
- animation that shifts surrounding layout.

Mobile must never depend on hover.

---

## 9. Product Detail Page Direction

### Above the fold
- image gallery
- name
- rating/review count
- price
- stock
- options if applicable
- quantity
- Add to Cart
- Wishlist
- delivery/returns reassurance

### Below
- key features
- **one cinematic product-story section**
- specifications
- reviews
- related products

Purchase information always takes priority over visual storytelling.

---

## 10. Shop / Search / Filtering Direction

The shop page should be calmer than the homepage.

Desktop:
- clear search
- category
- price
- availability
- rating/brand where useful
- sort
- product count
- grid/list behavior only if justified

Mobile:
- Filter button
- Sort button
- drawer/sheet for filters
- visible active-filter chips
- easy Clear All

No decorative motion during repetitive filtering.

---

## 11. Cart and Checkout Direction

These are **trust zones**, not campaign zones.

### Cart
- strong item image/name
- quantity control
- price
- remove/save
- subtotal
- checkout CTA

### Checkout
- minimal visual noise
- clear progress
- shipping/customer information
- Cash on Delivery
- clearly labelled Demo Payment
- order summary always easy to inspect
- mobile-friendly form fields
- inline validation

No cinematic animations in checkout.

---

## 12. Account / Orders

Customer account should use a clean commerce interface.

Pages:
- Profile
- My Orders
- Order Details
- Wishlist

Order status should be understandable at a glance.

---

## 13. Admin Design

Admin is primarily **Operate mode**, not marketing mode.

Design:
- dark neutral system;
- minimal orange highlights;
- lime used only for useful status/diagnostic information;
- dense but readable;
- no cinematic backgrounds.

Core surfaces:
- dashboard
- products
- categories
- inventory
- orders
- customers
- reviews
- basic statistics

Admin functionality and scanability outrank brand spectacle.

---

## 14. Motion System

### Principle
Motion should explain, guide, or create a memorable campaign moment.

### High-expression zones
- hero
- Orbit Form Lab
- 2–3 product-story modules

### Low-expression zones
- product grids
- search
- filters
- cart
- checkout
- account
- admin

### Suggested Timing
- micro interaction: `120–220ms`
- panel/menu transition: `180–280ms`
- editorial reveal: `300–500ms`
- cinematic story animation: longer only when scroll-linked and non-blocking

### Allowed Motion
- transform
- opacity
- controlled blur/filter
- masked reveal
- subtle parallax
- orbital rotation
- product layer separation
- spec callout sequencing

### Avoid
- scroll hijacking
- long mandatory transitions
- constant floating elements
- excessive 3D rotation
- layout-shifting animation
- decorative animation on frequent controls

### Accessibility
Every meaningful animation must support `prefers-reduced-motion`.

Reduced-motion mode must preserve all information and functionality.

---

## 15. Responsive Rules

### Desktop
Use the full editorial composition and wide product storytelling.

### Tablet
- simplify multi-layer compositions;
- preserve hero hierarchy;
- reduce simultaneous imagery;
- switch complex grids to 2–3 columns.

### Mobile
- commerce-first;
- one dominant hero visual;
- swipeable category/product rails where helpful;
- sticky Add to Cart on PDP if validated in UX phase;
- large touch targets;
- no interaction dependent on hover;
- campaign animation simplified substantially.

Desktop composition must never simply shrink to mobile.

---

## 16. Accessibility Floor

Required:
- WCAG-friendly contrast
- visible focus states
- semantic controls
- keyboard navigation
- useful image alt text
- labelled icon buttons
- touch targets sized appropriately
- color never the only status signal
- reduced-motion support
- forms with visible labels and inline error messages
- zoom/responsive behavior without horizontal breakage

---

## 17. Imagery / Asset Direction

### Product Photography
- isolated high-quality product images
- consistent image ratios
- neutral product-card backgrounds
- optimized responsive delivery

### Campaign Imagery
Use custom/original/licensed/demo-safe imagery.

Avoid making the portfolio look like an official Apple/Sony/Canon/PlayStation store.

Real brand imagery may be used only when licensing/use is appropriate; otherwise use clearly fictional or safely licensed demo catalog assets.

---

## 18. Trust and Claim Rules

Do not invent business claims such as:
- “1M+ customers”
- “Official seller”
- “#1 electronics store”
- unsupported ratings
- fake shipping guarantees

For portfolio/demo mode, copy must clearly avoid misleading real-business claims.

---

## 19. Page Inventory

### Public / Customer
- Home
- Shop
- Category
- Search Results
- Product Detail
- Cart
- Checkout
- Order Success
- Login
- Register
- Profile
- Wishlist
- My Orders
- Order Detail
- 404 / Not Found

### Admin
- Dashboard
- Products
- Product Create/Edit
- Categories
- Inventory
- Orders
- Order Detail
- Customers
- Reviews

---

## 20. Design Differentiation Rules

To avoid becoming a generic dark electronics template:

1. Orbit Form Lab must be a recurring signature concept.
2. White editorial breaks must contrast intentionally with dark commerce areas.
3. Orbital/technical geometry replaces generic cyberpunk decoration.
4. Orange is commerce/action, not decoration.
5. Lime is discovery/specification, not the main purchase action.
6. No repeated identical promotional-banner formula.
7. At least 2 major campaign sections should use distinct compositions.
8. Product/shop/cart/checkout remain familiar and conversion-oriented.
9. Motion is concentrated in memorable moments, not every interaction.
10. The design must still make sense if all decorative effects are removed.

---

## 21. Design Acceptance Criteria

The design stage can pass only when:

- brand direction is approved;
- color roles are consistent;
- typography is locked;
- desktop/mobile behavior is defined;
- homepage hierarchy is approved;
- product-card system is approved;
- product detail structure is defined;
- shop/filter UX is defined;
- cart/checkout remain calm and clear;
- Orbit Form Lab signature is defined;
- motion boundaries are defined;
- accessibility floor is explicit;
- admin uses an operational rather than marketing UI;
- no unsupported trust claims remain;
- implementation does not require developers to guess major visual rules.

---

## 22. Current Gate

**Conversational visual direction:** APPROVED  
**Written design spec:** PROPOSED — USER REVIEW REQUIRED  
**Implementation plan:** NOT STARTED  
**Code implementation:** NOT STARTED

### Next Gate

User reviews and explicitly approves this written design spec.

Only after that approval should the project move to the detailed implementation plan.
