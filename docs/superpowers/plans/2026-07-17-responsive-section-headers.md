# Responsive Page Section Headers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make page headers (`.section-header h1`) responsive on mobile and tablet screens.

**Architecture:** Modify `src/index.css` to add responsive font-sizes under the 768px and 480px media queries.

**Tech Stack:** CSS, Vitest.

## Global Constraints

- CSS changes only.
- All existing tests must pass or be updated.

---

### Task 1: Update index.css

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: None
- Produces: Responsive typography overrides for page headers

- [ ] **Step 1: Update 768px media query**

Find `@media (max-width: 768px)` in `src/index.css` (around line 2212) and add `.section-header h1`:
```css
@media (max-width: 768px) {
  .page-container {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
  .section-header h1 {
    font-size: 2.2rem;
  }
}
```

- [ ] **Step 2: Update 480px media query**

Find `@media (max-width: 480px)` in `src/index.css` (around line 2218) and add `.section-header h1`:
```css
@media (max-width: 480px) {
  .page-container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .section-header h1 {
    font-size: 1.75rem;
  }
  .modal-container {
    padding: 1.25rem 1rem;
    width: 95% !important;
  }
}
```

- [ ] **Step 3: Commit**

Run:
```bash
git add src/index.css
git commit -m "style: make section header titles responsive on tablet and mobile viewports"
```

---

### Task 2: Verify and Test

**Files:**
- None

**Interfaces:**
- Consumes: Test runner
- Produces: Passing test suite

- [ ] **Step 1: Run all tests to verify**

Run: `cmd /c npm run test`
Expected: All 15 tests pass.
