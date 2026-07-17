# Merge Timeline with History Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merge the Timeline page into the History (Pharaohs) page as a tabbed sub-category, update translations, router, and CSS styling.

**Architecture:** Add tab translations to `translations.js`, modify `Pharaohs.jsx` to render sub-tabs and import `Timeline`, update `Router.jsx` to remove `'timeline'` from `pages`, remove timeline route in `App.jsx`, and group CSS tab styles.

**Tech Stack:** React, Vite, react-router-dom, Vitest, React Testing Library.

## Global Constraints

- react-router-dom must be used for routing.
- The timeline must render inside the Pharaohs page under a tab.
- All existing tests must pass or be updated.

---

### Task 1: Update translations.js

**Files:**
- Modify: `src/i18n/translations.js`

**Interfaces:**
- Consumes: None
- Produces: New translation keys `tabDynasties` and `tabTimeline` under `pharaohs` key.

- [ ] **Step 1: Add English translations**

Find the `pharaohs` block inside the `en` object in `src/i18n/translations.js` (around line 299). Add:
```javascript
      tabDynasties: 'Dynasties & Pharaohs',
      tabTimeline: 'Detailed Timeline',
```

- [ ] **Step 2: Add Arabic translations**

Find the `pharaohs` block inside the `ar` object in `src/i18n/translations.js` (around line 1354). Add:
```javascript
      tabDynasties: 'الأسر والفراعنة',
      tabTimeline: 'الجدول الزمني',
```

- [ ] **Step 3: Commit**

Run:
```bash
git add src/i18n/translations.js
git commit -m "chore: add tab translations for history page"
```

---

### Task 2: Refactor Pharaohs.jsx and Timeline.jsx

**Files:**
- Modify: `src/pages/Pharaohs.jsx`
- Modify: `src/pages/Timeline.jsx`

**Interfaces:**
- Consumes: `Timeline` component inside `Pharaohs` component.
- `Timeline` accepts a prop `hideHeader` (boolean).

- [ ] **Step 1: Update Timeline.jsx to accept hideHeader**

Update `src/pages/Timeline.jsx` to accept `hideHeader`:
```javascript
/* eslint-disable react/prop-types */
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

const erasKeys = ['early', 'old', 'middle', 'new', 'late', 'ptolemaic', 'coptic', 'islamic', 'modern'];

export default function Timeline({ hideHeader = false }) {
  const { t } = useLanguage();

  return (
    <div className={`page-view page-container timeline-page ${hideHeader ? 'sub-page' : ''}`}>
      {!hideHeader && (
        <ScrollReveal>
          <div className="section-header">
            <h1>{t('timeline.title')}</h1>
            <p>{t('timeline.subtitle')}</p>
          </div>
        </ScrollReveal>
      )}

      <div className="timeline-container" style={hideHeader ? { marginTop: '1rem' } : {}}>
        <div className="timeline-spine"></div>

        {erasKeys.map((key, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div 
              key={key} 
              className={`timeline-item ${isLeft ? 'left-item' : 'right-item'}`}
            >
              <ScrollReveal delay={index * 100}>
                <div className="timeline-badge-dot"></div>
                <div className="glass-panel glass-panel-interactive timeline-card">
                  <div className="timeline-card-header">
                    <span className="era-date">{t(`timeline.eras.${key}.date`)}</span>
                    <h2 className="era-title">{t(`timeline.eras.${key}.name`)}</h2>
                  </div>
                  <div className="timeline-card-body">
                    <p className="era-desc">{t(`timeline.eras.${key}.desc`)}</p>
                    <div className="era-facts">
                      <strong>{t('monuments.location') === 'الموقع' ? 'أهم المعالم والأحداث:' : 'Key Highlights:'}</strong>
                      <span className="facts-content"> {t(`timeline.eras.${key}.facts`)}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update Pharaohs.jsx to render tabs and switch view**

Update `src/pages/Pharaohs.jsx` with the following content:
```javascript
import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import Timeline from './Timeline';

const timelineEras = [
  { id: 'predynastic' },
  { id: 'early' },
  { id: 'old' },
  { id: 'transition1' },
  { id: 'middle' },
  { id: 'transition2' },
  { id: 'new' },
  { id: 'late' },
  { id: 'ptolemaic' },
  { id: 'coptic' },
  { id: 'islamic' },
  { id: 'modern' }
];

export default function Pharaohs() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('dynasties');

  return (
    <div className="page-view page-container pharaohs-timeline-page">
      <ScrollReveal>
        <div className="section-header">
          <h1>{t('pharaohs.title')}</h1>
          <p>{t('pharaohs.subtitle')}</p>
        </div>
      </ScrollReveal>

      {/* Tabs */}
      <ScrollReveal delay={100}>
        <div className="history-tabs-container">
          <div className="history-tabs">
            <button
              className={`tab-btn ${activeTab === 'dynasties' ? 'active' : ''}`}
              onClick={() => setActiveTab('dynasties')}
            >
              {t('pharaohs.tabDynasties')}
            </button>
            <button
              className={`tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
              onClick={() => setActiveTab('timeline')}
            >
              {t('pharaohs.tabTimeline')}
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* View Switcher */}
      {activeTab === 'dynasties' ? (
        <div className="timeline-container">
          {timelineEras.map((era, index) => (
            <div key={era.id} className="timeline-era">
              <ScrollReveal delay={index * 100}>
                <h2 className="era-title">{t(`pharaohs.eras.${era.id}`)}</h2>
              </ScrollReveal>
              <div className="era-cards">
                <ScrollReveal delay={index * 100 + 50}>
                  <div className="glass-panel pharaoh-card">
                    <h3>{t(`pharaohs.items.${era.id}.name`)}</h3>
                    <p className="reign-text">
                      {t('pharaohs.reign')}: {t(`pharaohs.items.${era.id}.reign`)}
                    </p>
                    <p className="achievement-text">
                      <strong>{t('pharaohs.achievement')}:</strong> {t(`pharaohs.items.${era.id}.achievement`)}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Timeline hideHeader={true} />
      )}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

Run:
```bash
git add src/pages/Pharaohs.jsx src/pages/Timeline.jsx
git commit -m "feat: merge Timeline page into Pharaohs (History) page as a tab"
```

---

### Task 3: Update Router.jsx and App.jsx

**Files:**
- Modify: `src/components/Router.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: None
- Produces: Router and App routing configurations without `'timeline'` page

- [ ] **Step 1: Modify Router.jsx**

Remove `'timeline'` from the `pages` array in `src/components/Router.jsx`.

- [ ] **Step 2: Modify App.jsx**

Remove `<Route path="/:lang/timeline" element={<Timeline />} />` from `src/App.jsx`.

- [ ] **Step 3: Commit**

Run:
```bash
git add src/components/Router.jsx src/App.jsx
git commit -m "chore: remove timeline from main routes and pages configuration"
```

---

### Task 4: Update index.css

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: None
- Produces: Grouped CSS rules styling both monuments tabs and history tabs

- [ ] **Step 1: Update CSS rules**

Find `.monuments-tabs-container` and `.monuments-tabs` in `src/index.css` (around line 1496). Update them to:
```css
.monuments-tabs-container, .history-tabs-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 3rem;
  overflow-x: auto;
  padding: 0 1rem 0.5rem 1rem;
  scrollbar-width: none; /* Hide scrollbar on Firefox */
  -ms-overflow-style: none; /* Hide scrollbar on IE/Edge */
}
.monuments-tabs-container::-webkit-scrollbar, .history-tabs-container::-webkit-scrollbar {
  display: none; /* Hide scrollbar on Chrome/Safari/Edge */
}
@media (min-width: 1024px) {
  .monuments-tabs-container, .history-tabs-container {
    justify-content: center;
    padding: 0 0 0.5rem 0;
  }
}
.monuments-tabs, .history-tabs {
  display: flex;
  gap: 0.4rem;
  background: rgba(11, 11, 15, 0.6);
  border: 1px solid var(--glass-border);
  padding: 0.3rem;
  border-radius: 30px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
@supports not ((backdrop-filter: blur(12px)) or (-webkit-backdrop-filter: blur(12px))) {
  .monuments-tabs, .history-tabs {
    background: rgba(11, 11, 15, 0.95);
  }
}
```

- [ ] **Step 2: Commit**

Run:
```bash
git add src/index.css
git commit -m "style: share styling between monuments tabs and history tabs"
```

---

### Task 5: Fix Tests and Verify

**Files:**
- None (or verify files)

**Interfaces:**
- Consumes: Test runner
- Produces: Passing test suite

- [ ] **Step 1: Run all tests to verify**

Run: `cmd /c npm run test`
Expected: All 15 tests pass.
