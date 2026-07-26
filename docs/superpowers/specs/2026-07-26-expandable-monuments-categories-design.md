# Design Document: Expandable Monuments Categories Navigation

**Date:** 2026-07-26  
**Status:** Approved by User  
**Target File(s):** 
- `src/pages/Monuments.jsx`
- `src/index.css`
- `src/i18n/translations.js`

---

## 1. Background & Goals

In the Monuments page (`/#/:lang/monuments`), the category names in English (such as *"PHARAONIC & PTOLEMAIC"*, *"ROYAL PALACES & MODERN"*, *"ISLAMIC & FORTRESSES"*) are long text strings. In the current horizontal capsule layout, these labels cause horizontal overflow, line wrapping, or tight squeezing on smaller resolutions and mobile screens.

The goal is to replace the static wide horizontal tab strip with an **Expandable/Collapsible Categories Bar**.

---

## 2. Proposed Design & Behavior

### A. Collapsed State (Default)
- Displays a clean, compact glass container.
- Shows the **Active Category Pill** indicating which category is currently selected.
- Includes a prominent **Toggle Icon Button** (`⊞ All Categories` / `⊞ جميع التصنيفات`).
- Saves vertical and horizontal screen real estate.

### B. Expanded State
- Clicking the toggle button smoothly expands the category container downward into a structured **Glass Grid / Card Array**.
- Displays all 7 category pills neatly formatted with gold borders, hover effects, and active state highlights.
- Clicking any category pill selects that category and automatically collapses the menu back to the compact state.
- Clicking the toggle button again (or pressing `Escape`) collapses the menu back to compact state.

---

## 3. Detailed Component & Code Changes

### A. `src/i18n/translations.js`
Add translations for toggle button actions:
- `en.monuments.allCategories`: `"All Categories"`
- `en.monuments.closeCategories`: `"Close Categories"`
- `ar.monuments.allCategories`: `"جميع التصنيفات"`
- `ar.monuments.closeCategories`: `"إغلاق التصنيفات"`

### B. `src/pages/Monuments.jsx`
- Introduce component state: `const [isExpanded, setIsExpanded] = useState(false);`
- Wrap category navigation in a dynamic container `.monuments-categories-wrapper`.
- Build the collapsed header with active category indicator + toggle button.
- Build the expandable grid containing all 7 category buttons.
- Handle keyboard accessibility (`Escape` key listener, `aria-expanded`, `aria-controls`).

### C. `src/index.css`
- Add modern glassmorphic styles for `.monuments-categories-wrapper`, `.categories-collapsed-bar`, `.categories-toggle-btn`, `.categories-grid-expanded`.
- Add smooth CSS transitions (`transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1)`).
- Ensure mobile & tablet media queries adjust grid columns (`repeat(auto-fill, minmax(180px, 1fr))`) and typography dynamically.

---

## 4. Verification Plan

- Test expanded/collapsed toggle in both English (`en`) and Arabic (`ar`).
- Verify smooth animation and layout on Desktop (1920px), Tablet (768px), and Mobile (375px).
- Verify category switching works correctly and updates the monument cards below.
- Run build/lint tests (`npm run test` / `npm run build`).
