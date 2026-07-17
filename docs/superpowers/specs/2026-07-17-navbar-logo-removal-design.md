# Design Spec: Navbar Logo Removal & Category Alignment

**Date:** 2026-07-17  
**Status:** Draft  
**Author:** Antigravity (AI Coding Assistant)  
**Topic:** Removing the Navbar logo and aligning categories from left-to-right (English) and right-to-left (Arabic).

---

## 1. Project Goal & Overview
The user requested to remove the "Egypt" / "مصر" logo text from the top Navbar. Once the logo is removed, the page categories/navigation links should align to the start of the navbar (left in English, right in Arabic), while the desktop language toggle button should be pushed to the far opposite end (right in English, left in Arabic).

---

## 2. Proposed Changes

### File Modifications

#### [MODIFY] [Navbar.jsx](file:///C:/Users/PC'/Documents/antigravity/friendly-noether/src/components/Navbar.jsx)
- Remove the `.navbar-logo` markup from the DOM completely.
- Move the `<button className="desktop-lang-toggle">` element outside of the `<nav className="navbar-links">` container, making it a direct child of the `<header className="navbar">` element.

#### [MODIFY] [index.css](file:///C:/Users/PC'/Documents/antigravity/friendly-noether/src/index.css)
- Update `.navbar` on desktop to use `justify-content: flex-start` with a `gap: 2rem` layout.
- Update `.desktop-lang-toggle` to have `margin-left: auto` (which pushes it to the far right in LTR).
- Under RTL direction, apply `margin-right: auto` and `margin-left: 0` to `.desktop-lang-toggle` (pushing it to the far left).
- Update `.navbar-header-row` on mobile to use `justify-content: flex-end` to align the mobile language toggle to the end when the logo is absent.

#### [MODIFY] [LayoutComponents.test.jsx](file:///C:/Users/PC'/Documents/antigravity/friendly-noether/src/components/LayoutComponents.test.jsx)
- Remove assertions checking for logo rendering and click interactions, as the logo is no longer part of the Navbar layout.

---

## 3. Verification Plan

### Automated Tests
- Run `npm run test` and check that all 15 tests pass.

### Manual Verification
- Access the homepage in English -> categories should start from the far left of the navbar, and the "العربية" toggle button should be on the far right.
- Switch to Arabic -> categories should start from the far right of the navbar, and the "English" toggle button should be on the far left.
- Verify that the word "Egypt" / "مصر" is completely removed from the navbar.
