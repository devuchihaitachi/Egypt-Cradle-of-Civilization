# Design Spec: Merging Timeline with History Page

**Date:** 2026-07-17  
**Status:** Draft  
**Author:** Antigravity (AI Coding Assistant)  
**Topic:** Merging Timeline page into History (Pharaohs) page as a tabbed sub-category.

---

## 1. Project Goal & Overview
Currently, the website has separate pages for **History** (driven by the `Pharaohs` component) and **Timeline** (driven by the `Timeline` component). These two pages cover similar content and represent duplicate concepts.

The goal is to merge them into a single **History** page, where the user can toggle between:
1. **Dynasties & Pharaohs** (the current `Pharaohs` view listing eras, rulers, and achievements).
2. **Detailed Timeline** (the current `Timeline` view showing an alternating timeline chart of eras).

This will streamline the navigation bar, clean up routes, and unify the history-focused views.

---

## 2. Proposed Changes

### File Modifications

#### [MODIFY] [translations.js](file:///C:/Users/PC'/Documents/antigravity/friendly-noether/src/i18n/translations.js)
Add tab translation keys under `pharaohs` block:
- English (`en.pharaohs`):
  - `tabDynasties: 'Dynasties & Pharaohs'`
  - `tabTimeline: 'Detailed Timeline'`
- Arabic (`ar.pharaohs`):
  - `tabDynasties: 'الأسر والفراعنة'`
  - `tabTimeline: 'الجدول الزمني'`

#### [MODIFY] [Pharaohs.jsx](file:///C:/Users/PC'/Documents/antigravity/friendly-noether/src/pages/Pharaohs.jsx)
- Import the `<Timeline>` component from `./Timeline`.
- Manage a state variable `activeTab` ('dynasties' or 'timeline').
- Render a category selector tab bar styled similarly to the Monuments page tabs.
- Render either the Pharaohs list or the Timeline component depending on `activeTab`.

#### [MODIFY] [Router.jsx](file:///C:/Users/PC'/Documents/antigravity/friendly-noether/src/components/Router.jsx)
- Remove the `'timeline'` entry from the `pages` array to hide it from the Navbar and navigation flow.

#### [MODIFY] [App.jsx](file:///C:/Users/PC'/Documents/antigravity/friendly-noether/src/App.jsx)
- Remove the `<Route path="/:lang/timeline" element={<Timeline />} />` routing declaration.

#### [MODIFY] [index.css](file:///C:/Users/PC'/Documents/antigravity/friendly-noether/src/index.css)
- Share the tab container styling (hiding scrollbars, responsive padding) between `.monuments-tabs-container` and `.history-tabs-container` (or `.monuments-tabs` and `.history-tabs`).

---

## 3. Verification Plan

### Automated Tests
- Run `npm run test` to verify all 15 tests pass.
- Update `src/components/Router.test.jsx` or other files if they depend on `'timeline'` in the page sequence.

### Manual Verification
- Go to `http://localhost:3000/en/pharaohs` -> the title should be History.
- Verify that a tab switcher exists with "Dynasties & Pharaohs" and "Detailed Timeline".
- Toggling tabs should switch the view between the Pharaohs cards and the timeline spine layout correctly.
- Verify that "Timeline" is no longer visible in the Navbar.
