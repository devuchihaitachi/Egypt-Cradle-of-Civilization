# Mobile Horizontal Overflow Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix horizontal layout overflow on mobile screens across all pages (especially World Heritage/UNESCO and Discoveries).

**Architecture:** Modify `src/index.css` to add `overflow-x: hidden` to `.app-shell`, `flex-wrap: wrap` to `.card-meta-row`, and reduce card padding for mobile screens under 480px.

**Tech Stack:** CSS, Vitest.

## Global Constraints

- Safe CSS selectors only.
- All existing tests must pass or be updated.

---

### Task 1: Update index.css layout classes

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: None
- Produces: Flex-wrap and hidden-overflow CSS rules for stable mobile rendering

- [ ] **Step 1: Add overflow safety to .app-shell**

Find `.app-shell` in `src/index.css` (around line 1168) and add `overflow-x: hidden` and `width: 100%`:
```css
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  width: 100%;
}
```

- [ ] **Step 2: Add wrapping to .card-meta-row**

Find `.card-meta-row` in `src/index.css` (around line 2343) and add `flex-wrap: wrap`:
```css
.card-meta-row {
  display: flex;
  gap: 1rem;
  margin-top: 1.2rem;
  font-size: 0.8rem;
  opacity: 0.8;
  color: var(--color-gold);
  flex-wrap: wrap;
}
```

- [ ] **Step 3: Add mobile card padding adjustments**

Append the following responsive style block at the end of `src/index.css`:
```css
@media (max-width: 480px) {
  .unesco-card, .discovery-card {
    padding: 1.25rem;
  }
}
```

- [ ] **Step 4: Commit**

Run:
```bash
git add src/index.css
git commit -m "style: fix horizontal overflow on mobile viewports by enabling flex wrapping and app shell overflow clipping"
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
