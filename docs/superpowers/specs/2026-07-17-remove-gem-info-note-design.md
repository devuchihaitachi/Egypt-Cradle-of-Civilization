# Design Spec: Remove GEM Informational Opening Banner

**Date:** 2026-07-17  
**Status:** Draft  
**Author:** Antigravity (AI Coding Assistant)  
**Topic:** Removing the informational card banner about full opening on the Grand Egyptian Museum (GEM) page.

---

## 1. Project Goal & Overview
The user requested to remove the large informational card on the Grand Egyptian Museum (GEM) page that states: "Please note that all main exhibition halls of the Grand Egyptian Museum are now fully open to the public." / "تم افتتاح جميع قاعات المعروضات الرئيسية للمتحف المصري الكبير للجمهور."

The goal is to remove this element completely to clean up the page design.

---

## 2. Proposed Changes

### File Modifications

#### [MODIFY] [GEM.jsx](file:///C:/Users/PC'/Documents/antigravity/friendly-noether/src/pages/GEM.jsx)
- Remove the `<div className="glass-panel gem-info-note">` block that contains the opening note.

---

## 3. Verification Plan

### Automated Tests
- Run `npm run test` to verify all 15 tests pass.

### Manual Verification
- Deploy/start local server and open the website.
- Navigate to the **GEM** (Grand Egyptian Museum) page.
- Verify that the opening informational banner card is completely gone.
