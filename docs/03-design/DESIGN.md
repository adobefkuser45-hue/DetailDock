# UI/UX Design System Specification — DetailDock

**Project:** DetailDock — Smart Auto Detailing & Service Booking Platform  
**Document Version:** 1.0.0  
**Status:** PROPOSED  
**Date:** 2026-10-09  
**Design Philosophy:** Luxury Automotive Atelier & High-Precision Service Studio  

---

## 1. Aesthetic Direction & Brand Identity

DetailDock embraces the visual language of high-performance automotive design (inspired by modern Porsche GT and Aston Martin studio aesthetics). Rather than generic bright SaaS tropes or pastel gradients, the interface delivers a dark, refined, and tactile mechanical experience.

### 1.1 Core Design Pillars
1. **Precision Automotive Dark Mode:** Deep obsidian backgrounds with elevated metallic surfaces, hairline borders, and subtle radial sheen.
2. **Tactile Feedback & Dynamic Clarity:** Every vehicle size toggle, add-on chip, and calendar slot feels like a calibrated physical button with instantaneous pricing updates.
3. **No AI-Slop Design Discipline (TasteSkill & Impeccable Enforced):**
   - Zero generic purple-to-pink gradients.
   - Zero arbitrary oversized rounded corners (`rounded-full` used only for pill tags).
   - High text contrast with strict typographic hierarchy.
   - Purposeful motion governed by Emil Kowalski spring physics.

---

## 2. Color Palette & Token Hierarchy

```css
:root {
  /* Surfaces & Backgrounds */
  --bg-canvas: #090C12;          /* Deepest obsidian chassis */
  --bg-surface: #101522;         /* Detailing bay / card surface */
  --bg-surface-elevated: #161D2E;/* Modals, drawers, active cards */
  --bg-subtle: #1F273B;          /* Hover states, active tabs */

  /* Hairlines & Borders */
  --border-subtle: #1D2536;      /* Subtle section dividers */
  --border-muted: #2A364E;       /* Card borders & inputs */
  --border-active: #38BDF8;      /* Active selection border (Electric Cyan) */

  /* Typography */
  --text-primary: #F8FAFC;       /* Crisp titanium white */
  --text-secondary: #94A3B8;     /* Technical slate */
  --text-muted: #64748B;         /* Helper text & timestamps */

  /* Brand Accents (Precision Metallic & Performance) */
  --accent-primary: #0284C7;     /* High-performance Cyan/Azure */
  --accent-primary-hover: #0369A1;
  --accent-glow: rgba(56, 189, 248, 0.15);
  
  --accent-amber: #F59E0B;       /* Warm ceramic/amber badge */
  --accent-success: #10B981;     /* Confirmed / Ready status */
  --accent-danger: #EF4444;      /* Cancelled / Error */
}
```

---

## 3. Typography System

- **Primary Font Family:** `Plus Jakarta Sans`, sans-serif (Google Fonts, SIL Open Font License 1.1).
- **Secondary / Monospace Font Family:** `JetBrains Mono` or system mono for booking codes (`DD-84920`) and pricing tokens.

| Scale Token | Font Size | Line Height | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `display-2xl` | 3.5rem (56px) | 1.1 | 800 (Extrabold) | Hero headline, marketing punchlines |
| `heading-xl` | 2.25rem (36px) | 1.2 | 700 (Bold) | Page titles, Builder header |
| `heading-lg` | 1.5rem (24px) | 1.3 | 600 (Semibold) | Package card titles, Modal headers |
| `body-base` | 1.0rem (16px) | 1.6 | 400 (Regular) | Primary paragraphs, descriptions |
| `body-sm` | 0.875rem (14px) | 1.5 | 500 (Medium) | Input fields, table cells, feature lists |
| `caption-xs` | 0.75rem (12px) | 1.4 | 600 (Semibold) | Badges, vehicle multipliers, tags |

---

## 4. Signature Component: Smart Package Builder UI

The configurator is structured as a sticky, progressive 3-column or responsive vertical flow:

```text
┌────────────────────────────────────────────────────────────────────────┐
│  STEP 1: SELECT VEHICLE BODY TYPE                                      │
│  [ Sedan / Coupe 1.0x ]  [ Compact SUV 1.2x ]  [ Full SUV / Truck 1.4x ]│
├────────────────────────────────────────────────────────────────────────┤
│  STEP 2: CHOOSE DETAILING PACKAGE                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐      │
│  │ Express Refresh  │  │ Signature Detail │  │ Ceramic Guard ★  │      │
│  │ $149 • 90m       │  │ $249 • 180m      │  │ $399 • 240m      │      │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘      │
├────────────────────────────────────────────────────────────────────────┤
│  STEP 3: SELECT OPTIONAL UPGRADES (ADD-ONS)                            │
│  [✓] Engine Bay Clean (+$65)   [ ] Pet Hair Removal (+$50)             │
│  [✓] Leather Restoration (+$80)[ ] Headlight Polish (+$45)             │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│  STICKY BOTTOM BAR (Mobile & Desktop):                                 │
│  Vehicle: Full SUV (1.4x)  |  Est. Duration: 4h 45m  |  Total: $423.60 │
│                                            [ SCHEDULE APPOINTMENT ➔ ]  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Motion & Micro-interaction Rules (`design-motion-principles`)

All UI animations use the `motion` library with strict physical constraints:
- **No Float / Bouncing Gimmicks:** No looping hover animations that distract from the booking task.
- **Spring Transition Standard:**
  ```javascript
  const springTransition = {
    type: "spring",
    stiffness: 450,
    damping: 35
  };
  ```
- **Live Counter Motion:** When prices recalculate, digits roll with a smooth tabular numeric layout (`font-variant-numeric: tabular-nums`) so numbers do not cause layout jank.
- **Before / After Image Slider:** Smooth drag gesture with real-time divider clip-path tracking.

---

## 6. Logo & Bespoke Code-Native Vector Brand

- **Brand Symbol:** A minimalist precision geometric mark fusing a stylized automotive wheel hub/disc brake caliper with a shipyard dock anchor outline (symbolizing detail precision + secure booking dock).
- **Implementation:** Pure SVG code component (`<DetailDockLogo />`), resolution-independent, zero third-party copyright, 100% commercially sellable.
