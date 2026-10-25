---
name: Modern Mobile Commerce
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#575e70'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#141b2b'
  on-primary-container: '#7d8497'
  inverse-primary: '#c0c6db'
  secondary: '#006d2f'
  on-secondary: '#ffffff'
  secondary-container: '#5dfd8a'
  on-secondary-container: '#007232'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0b1c30'
  on-tertiary-container: '#75859d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce2f7'
  primary-fixed-dim: '#c0c6db'
  on-primary-fixed: '#141b2b'
  on-primary-fixed-variant: '#404758'
  secondary-fixed: '#66ff8e'
  secondary-fixed-dim: '#3de273'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005322'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
  price-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: -0.01em
  price-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1rem
  margin-sm: 0.75rem
  margin-lg: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system defines a high-conversion, contemporary mobile commerce experience prioritizing effortless discovery, spatial purity, and friction-free purchasing. It is engineered specifically for mobile-first shoppers who expect speed, intuitive gestures, and clear visual hierarchies without visual clutter.

The aesthetic blends **Elevated Minimalism** with subtle **Tactile Polish**:
- **Purity & Clarity:** Ample negative space, unadorned structured surfaces, and intentional typography that prioritizes product photography and essential purchase actions.
- **Direct Conversion Pathways:** High-contrast neutral structure paired with an unmistakable, high-intent conversational checkout trigger (WhatsApp confirmation).
- **Physical Feedback:** Tactile, fluid micro-interactions for quantity adjustments, cart additions, and order execution that instill confidence and operational feedback on handheld devices.

## Colors

The color architecture is built around functional discipline: grounding structure in dark slate, maintaining pristine neutrality for content canvases, and reserving vivid chroma strictly for conversion and messaging actions.

- **Primary (`#111827` - Dark Slate / Near Black):** Used for primary system actions (Add to Cart, Buy Now), dominant typographic headings, and structural anchors. Ensures maximum WCAG AAA legibility against white and light backgrounds.
- **Secondary (`#25D366` - Conversational Green):** Dedicated purposefully to final checkout flows, conversational support, and order placement via WhatsApp. It signals direct action, customer reassurance, and instant communication.
- **Tertiary (`#64748B` - Slate Muted):** Used for metadata, inactive states, labels, secondary specifications, and subtle iconography.
- **Neutral Canvas (`#F8FAFC` to `#FFFFFF`):** A clean, crisp foundation that elevates product imagery without color cast. Structural dividers use low-opacity slate (`#E2E8F0` at 1px).
- **Semantic Feedback:** Critical states (out of stock, errors) employ `#EF4444`, while badges and subtle highlights leverage `#F1F5F9`.

## Typography

Typography relies uniformly on **Inter** to ensure maximum legibility at compact viewports, immediate system-font parity, and zero rendering latency.

- **Scale Rationale:** The scale caps at `32px` on mobile viewports to prevent awkward wrapping in multi-word product titles or localized pricing terms.
- **Numbers & Prices:** Tabular numbers (`tnum`) must be enforced across all pricing tokens (`price-lg`, `price-md`) to ensure alignment across dynamic updates and cart calculations.
- **Contrast Ratios:** Primary body text and headers use `#111827` (exceeding 14:1 contrast ratio against `#FFFFFF`). Secondary tags, SKU numbers, and meta information use `#64748B` (4.6:1 ratio, strictly adhering to WCAG AA for small text).

## Layout & Spacing

The layout operates on a flexible, 4-column fluid mobile grid spanning up to a maximum container width of 480px for handheld viewports (expanding to a centered single or double column frame when rendered on tablets).

- **Grid Architecture:** 
  - Mobile portrait: 4 columns, `gutter-sm` (12px) or `gutter` (16px), with a standard `margin` of 16px.
  - Product Catalog Grid: Strict 2-column card view on screens below 420px; responsive 3-column reflow for large mobile or mini-tablets above 600px.
- **Touch Ergonomics & Safe Zones:**
  - Critical conversion elements (Sticky Cart bar, WhatsApp confirmation button) are pinned to the bottom screen edge, observing device safe-area insets (`env(safe-area-inset-bottom) + 12px`).
  - Minimum interactive touch-target dimensions are enforced at 44x44px, using invisible hit-padding where visual elements are smaller.

## Elevation & Depth

Visual hierarchy uses a flat, low-contrast outline model combined with select ambient shadows to retain a lightweight digital feel.

- **Surface Tiers:**
  - **Base Canvas (`#F8FAFC`):** Application foundation and background.
  - **Surface Default (`#FFFFFF`):** Product cards, input fields, sheet modals, and category pills.
  - **Ghost Outlines:** Low-contrast borders (`#E2E8F0` at 1px) delimit card boundaries without introducing visual weight.
- **Ambient Shadows:**
  - **Floating Conversion Bar:** `0px -4px 16px rgba(17, 24, 39, 0.05)` coupled with a 1px top border of `#E2E8F0` to cleanly detach sticky checkouts from scrolling content.
  - **Modals & Slide-overs:** `0px 12px 32px rgba(17, 24, 39, 0.12)`.
  - **Cards & Inputs:** Rest states feature 0px shadow with 1px border. On active press or drag, elevation moves to `0px 4px 12px rgba(17, 24, 39, 0.06)`.

## Shapes

The design system adopts a rounded, soft visual geometry (`roundedness: 2` with standard radii scaling into 16px (`rounded-lg`) and 24px (`rounded-xl`)) to make product cards and mobile surfaces feel approachable and touch-friendly.

- **Cards & Product Containers:** Standardized at `16px` (`rounded-lg`) to balance photographic edges with modern organic rounding.
- **Primary Buttons & Bottom Sheets:** Standardized at `16px` to harmonize with cards, while modal sheets feature top corners curved at `24px` (`rounded-xl`).
- **Interactive Micro-controls & Chips:** Filter pills, badge tags, and stepper counters use full pill curvature (`9999px`) to visually signal self-contained interactive touch targets.

## Components

### Buttons
- **Primary Action (Add to Cart / Standard CTA):** Background `#111827`, text `#FFFFFF`, height 48px, radius 16px, typography `label-lg`. Pressed state applies a scale transform (`scale(0.98)`) and transitions to `#1E293B`.
- **Checkout / WhatsApp Action:** Background `#25D366`, text `#FFFFFF`, height 52px, radius 16px, typography `label-lg` with embedded WhatsApp icon (20x20px). Pressed state drops opacity to `0.9` and shifts scale (`scale(0.98)`).
- **Secondary / Ghost Button:** Background transparent, 1px border `#E2E8F0`, text `#111827`.

### Stepper Quantity Counter (+ / -)
- **Container:** Pill-shaped (`rounded-full`), height 36px, background `#F1F5F9`, border 1px solid `#E2E8F0`.
- **Buttons (+ and -):** Width 32px, height 32px, circular hit area. Tactile feedback with background `#FFFFFF` on press, subtle drop shadow (`0 1px 3px rgba(0,0,0,0.1)`), and text `#111827`.
- **Value Display:** Monospaced tabular figures, minimum width 24px, centered, typography `label-md`.

### Product Cards
- **Structure:** Surface `#FFFFFF`, 1px border `#E2E8F0`, radius 16px, overflow hidden.
- **Media Box:** 1:1 aspect ratio, light-gray neutral background (`#F8FAFC`) to gracefully accommodate varied product imagery.
- **Content Area:** 12px padding. Includes Category label (`label-sm`, `#64748B`), Product Title (`title-md`, `#111827`, 2-line clamp), Price (`price-md`, `#111827`), and an inline rapid-add button.

### Filter & Category Chips
- **Rest State:** Background `#FFFFFF`, 1px border `#E2E8F0`, text `#64748B`, height 32px, radius 9999px, padding 0 14px.
- **Active State:** Background `#111827`, border `#111827`, text `#FFFFFF`, font weight `600`.

### Form Fields & Inputs
- **Base Input:** Height 48px, background `#FFFFFF`, border 1px solid `#E2E8F0`, radius 12px, padding 0 16px, typography `body-md`. Focus state shifts border color to `#111827` without harsh glow effects.

### Sticky Order Summary / Checkout Bar
- **Surface:** Fixed at viewport bottom, background `#FFFFFF` with `backdrop-filter: blur(12px)` when semi-translucent, 1px top border `#E2E8F0`.
- **Layout:** Horizontal alignment featuring real-time total order price on the left (`price-lg`) and WhatsApp Checkout CTA filling the remaining width on the right.