# Expandable Monuments Categories Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a responsive, expandable/collapsible categories navigation bar for the Monuments page to solve label overflow in English and improve overall UI aesthetics.

**Architecture:** Add state (`isCategoriesExpanded`) to `Monuments.jsx`. Render a collapsed bar by default with active category label + toggle icon button. When clicked, expand to display all 7 category options in a glass grid panel.

**Tech Stack:** React 18, lucide-react icons, Vitest + React Testing Library, Vanilla CSS.

## Global Constraints

- Preserve all current category IDs (`pharaonic`, `obelisks`, `grecoRoman`, `coptic`, `islamic`, `modern`, `natural`).
- Maintain glassmorphic design system and gold accents (`var(--color-gold)`).
- Ensure accessibility (`aria-expanded`, keyboard shortcuts `Enter`/`Space` and `Escape`).

---

### Task 1: Add Translations for Categories Toggle Button

**Files:**
- Modify: `src/i18n/translations.js:100-111` and `src/i18n/translations.js:1200-1211`

**Interfaces:**
- Produces: `t('monuments.allCategories')` and `t('monuments.closeCategories')` strings in both English and Arabic.

- [ ] **Step 1: Update `src/i18n/translations.js` with new keys**

Add `allCategories` and `closeCategories` under `monuments` in English (`en`) and Arabic (`ar`).

- [ ] **Step 2: Commit translation changes**

```bash
git add src/i18n/translations.js
git commit -m "i18n: add translation keys for expandable monuments categories"
```

---

### Task 2: Implement Expandable Categories in `Monuments.jsx` with Vitest Test

**Files:**
- Modify: `src/pages/Monuments.jsx`
- Create: `src/pages/Monuments.test.jsx`

**Interfaces:**
- Consumes: `t('monuments.allCategories')`, `t('monuments.closeCategories')`, `lucide-react` icons (`Grid`, `ChevronDown`, `ChevronUp`, `X`).
- Produces: Interactive categories navigation with expandable state and accessible aria attributes.

- [ ] **Step 1: Write test for Monuments category toggle behavior in `src/pages/Monuments.test.jsx`**

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Monuments from './Monuments';
import { LanguageProvider } from '../context/LanguageContext';

describe('Monuments Page Expandable Categories', () => {
  it('renders category toggle button and toggles expansion on click', () => {
    render(
      <LanguageProvider>
        <Monuments />
      </LanguageProvider>
    );

    const toggleBtn = screen.getByRole('button', { name: /all categories|جميع التصنيفات/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
  });
});
```

- [ ] **Step 2: Run test to confirm failure**

Run: `npm run test`
Expected: FAIL (Monuments.test.jsx fails because toggle button is not implemented yet).

- [ ] **Step 3: Update `src/pages/Monuments.jsx` with state, icons, and accessible toggle UI**

```jsx
import { useState } from 'react';
import { Grid, ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Modal from '../components/Modal';
import { useLanguage } from '../context/LanguageContext';
import ImageWithFallback from '../components/ImageWithFallback';
import { img } from '../utils/imagePath';

const categories = ['pharaonic', 'obelisks', 'grecoRoman', 'coptic', 'islamic', 'modern', 'natural'];

const monumentMap = {
  pharaonic: ['sphinx', 'karnakLuxor', 'valleyKings', 'abusimbel', 'edfuPhilae', 'dendera', 'komOmbo', 'tanis', 'amarna'],
  obelisks: ['unfinishedObelisk', 'hatshepsutObelisk', 'senusretObelisk', 'luxorParisObelisk', 'londonNeedle', 'newyorkNeedle', 'lateranRomeObelisk'],
  grecoRoman: ['qaitbayPompey', 'komShoqafa'],
  coptic: ['hangingChurch', 'abuSerga', 'babylonFort', 'catherineNatrun'],
  islamic: ['amrMosque', 'azharMoizz', 'citadelSaladin', 'ibnTulun', 'sinaiCastles', 'suhaymi', 'sultanHassanRifai', 'ghouri'],
  modern: ['abdeenManial', 'baronPalace', 'suezCanal', 'montazah', 'aishaFahmy', 'oldCataract'],
  natural: ['whaleValley', 'oasisTombs']
};

export default function Monuments() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('pharaonic');
  const [selectedMonumentId, setSelectedMonumentId] = useState(null);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesExpanded((prev) => !prev);
  };

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    setIsCategoriesExpanded(false);
  };

  return (
    <div className="page-view page-container monuments-page">
      <ScrollReveal>
        <div className="section-header">
          <h1>{t('monuments.title')}</h1>
          <p>{t('monuments.subtitle')}</p>
        </div>
      </ScrollReveal>

      {/* Expandable Category Navigation */}
      <ScrollReveal delay={100}>
        <div className="monuments-categories-wrapper">
          <div className="categories-header-bar">
            <div className="active-category-pill">
              <span className="pill-dot"></span>
              <span className="pill-text">{t(`monuments.categories.${activeCategory}`)}</span>
            </div>
            
            <button
              className="categories-toggle-btn"
              onClick={toggleCategories}
              aria-expanded={isCategoriesExpanded}
              aria-label={isCategoriesExpanded ? t('monuments.closeCategories') : t('monuments.allCategories')}
            >
              <Grid className="toggle-icon" size={16} />
              <span>{isCategoriesExpanded ? t('monuments.closeCategories') : t('monuments.allCategories')}</span>
              {isCategoriesExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          <div className={`categories-grid-panel ${isCategoriesExpanded ? 'expanded' : ''}`}>
            <div className="categories-grid">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-grid-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(cat)}
                >
                  <span className="cat-btn-text">{t(`monuments.categories.${cat}`)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Monuments Grid */}
      <div className="monuments-layout" key={activeCategory}>
        {monumentMap[activeCategory].map((id, index) => (
          <ScrollReveal key={id} delay={index * 120}>
            <div 
              className="glass-panel glass-panel-interactive monument-strip clickable-card"
              onClick={() => setSelectedMonumentId(id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedMonumentId(id);
                }
              }}
            >
              <div className="strip-thumb-container">
                <ImageWithFallback
                  src={img(`/images/items/${id}.jpg`)}
                  fallbackSrc={img('/images/temples.jpg')}
                  alt={t(`monuments.items.${id}.name`)}
                  className="strip-thumb-img"
                />
              </div>
              <div className="strip-info-content">
                <h2>{t(`monuments.items.${id}.name`)}</h2>
                <p className="strip-meta">
                  <strong>{t('monuments.location')}:</strong> {t(`monuments.items.${id}.location`)} &bull;{' '}
                  <strong>{t('monuments.age')}:</strong> {t(`monuments.items.${id}.age`)}
                </p>
                <p className="strip-desc-preview">{t(`monuments.items.${id}.desc`).substring(0, 120)}...</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={selectedMonumentId !== null}
        onClose={() => setSelectedMonumentId(null)}
        title={selectedMonumentId ? t(`monuments.items.${selectedMonumentId}.name`) : ''}
      >
        {selectedMonumentId && (
          <div className="split-modal-content">
            <div className="split-modal-image-side">
              <ImageWithFallback
                src={img(`/images/items/${selectedMonumentId}.jpg`)}
                fallbackSrc={img('/images/temples.jpg')}
                alt={t(`monuments.items.${selectedMonumentId}.name`)}
                className="split-modal-image"
              />
            </div>
            <div className="split-modal-text-side">
              <p className="modal-builder-info" style={{ marginTop: 0 }}>
                <strong>{t('monuments.location')}:</strong> {t(`monuments.items.${selectedMonumentId}.location`)}
              </p>
              <p className="modal-builder-info">
                <strong>{t('monuments.age')}:</strong> {t(`monuments.items.${selectedMonumentId}.age`)}
              </p>
              <div className="modal-description-text">
                <p>{t(`monuments.items.${selectedMonumentId}.desc`)}</p>
              </div>
              {selectedMonumentId === 'abusimbel' && (
                <div className="modal-info-note" style={{ marginTop: '1.5rem', padding: '1rem', border: '1px dashed rgba(212, 175, 55, 0.4)', borderRadius: '8px', background: 'rgba(212, 175, 55, 0.05)' }}>
                  <h4 style={{ color: 'var(--color-gold)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', fontSize: '1rem', marginTop: 0 }}>{t('monuments.nubiaRescueTitle')}</h4>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>{t('monuments.nubiaRescueDesc')}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test`
Expected: PASS

- [ ] **Step 5: Commit `Monuments.jsx` changes**

```bash
git add src/pages/Monuments.jsx src/pages/Monuments.test.jsx
git commit -m "feat: implement expandable categories UI in Monuments page"
```

---

### Task 3: Add Glassmorphic Styling in `src/index.css`

**Files:**
- Modify: `src/index.css:1498-1560`

**Interfaces:**
- Consumes: CSS custom properties (`--color-gold`, `--glass-border`, `--font-heading`).
- Produces: Glassmorphic expandable categories styling with smooth animations and dark theme consistency.

- [ ] **Step 1: Add expandable categories CSS in `src/index.css`**

Replace or extend `.monuments-tabs-container` with:

```css
/* ===== EXPANDABLE MONUMENTS CATEGORIES ===== */
.monuments-categories-wrapper {
  max-width: 900px;
  margin: 0 auto 2.5rem auto;
  padding: 0 1rem;
}

.categories-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: rgba(15, 15, 22, 0.85);
  border: 1px solid var(--color-gold-muted, rgba(212, 175, 55, 0.3));
  padding: 0.5rem 0.85rem 0.5rem 1.2rem;
  border-radius: 30px;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.categories-header-bar:hover {
  border-color: var(--color-gold);
  box-shadow: 0 10px 36px rgba(212, 175, 55, 0.15);
}

.active-category-pill {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.pill-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-gold);
  box-shadow: 0 0 10px var(--color-gold);
}

.pill-text {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  color: var(--color-gold);
  letter-spacing: 0.5px;
  font-weight: 600;
}

.categories-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%);
  border: 1px solid rgba(212, 175, 55, 0.4);
  color: var(--color-papyrus, #f0e6d2);
  padding: 0.45rem 0.95rem;
  border-radius: 20px;
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
}

.categories-toggle-btn:hover {
  background: rgba(212, 175, 55, 0.25);
  border-color: var(--color-gold);
  color: #ffffff;
  transform: translateY(-1px);
}

.toggle-icon {
  color: var(--color-gold);
}

.categories-grid-panel {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, margin-top 0.3s ease;
  margin-top: 0;
}

.categories-grid-panel.expanded {
  max-height: 500px;
  opacity: 1;
  margin-top: 0.85rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.6rem;
  background: rgba(12, 12, 18, 0.9);
  border: 1px solid var(--glass-border);
  padding: 1rem;
  border-radius: 20px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
}

.category-grid-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-papyrus);
  padding: 0.65rem 0.9rem;
  border-radius: 12px;
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  text-align: center;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-grid-btn:hover {
  background: rgba(212, 175, 55, 0.12);
  border-color: rgba(212, 175, 55, 0.5);
  color: #ffffff;
  transform: translateY(-2px);
}

.category-grid-btn.active {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.15) 100%);
  border-color: var(--color-gold);
  color: var(--color-gold);
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
}

@media (max-width: 600px) {
  .categories-grid {
    grid-template-columns: 1fr;
    padding: 0.75rem;
  }
  
  .pill-text {
    font-size: 0.8rem;
  }
  
  .categories-toggle-btn {
    padding: 0.35rem 0.7rem;
    font-size: 0.75rem;
  }
}
```

- [ ] **Step 2: Commit CSS styling**

```bash
git add src/index.css
git commit -m "style: add glassmorphic expandable categories styles"
```

---

### Task 4: End-to-End Verification & Build Check

**Files:** None modified directly.

- [ ] **Step 1: Run unit tests**

Run: `npm run test`
Expected: ALL PASS

- [ ] **Step 2: Run linter**

Run: `npm run lint`
Expected: PASS with 0 errors

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: PASS with output build in `dist`
