import { useState } from 'react';
import { Crown, Sparkles, Grid, ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Modal from '../components/Modal';
import { useLanguage } from '../context/LanguageContext';
import ImageWithFallback from '../components/ImageWithFallback';
import { img } from '../utils/imagePath';

const rulersList = [
  'narmer', 'djoser', 'sneferu', 'khufu', 'khafre', 'pepi2', 'mentuhotep2', 
  'ahmose1', 'thutmose1', 'hatshepsut', 'thutmose3', 'amenhotep3', 'akhenaten', 
  'tutankhamun', 'seti1', 'ramesses2', 'merneptah', 'ramesses3', 'ptolemy1', 'cleopatra7'
];

const deitiesList = [
  'ra', 'osiris', 'isis', 'horus', 'set', 'anubis', 'thoth', 'amun', 
  'hathor', 'bastet', 'sekhmet', 'maat', 'ptah', 'nut', 'geb', 'khnum', 
  'sobek', 'tefnut', 'nephthys', 'aten'
];

export default function Pharaohs() {
  const { t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState(null); // { type: 'ruler' | 'deity', id: string }
  const [activeSection, setActiveSection] = useState('rulers');
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesExpanded((prev) => !prev);
  };

  const handleSectionSelect = (sectionId) => {
    setActiveSection(sectionId);
    setIsCategoriesExpanded(false);
    document.getElementById(`${sectionId}-section`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const renderDescription = (val) => {
    if (Array.isArray(val)) {
      return val.map((para, idx) => <p key={idx} className="modal-description-paragraph">{para}</p>);
    }
    return <p className="modal-description-paragraph">{val}</p>;
  };

  const selectedData = selectedItem 
    ? (selectedItem.type === 'ruler' 
      ? {
          name: t(`pharaohs.rulers.${selectedItem.id}.name`),
          subtitle: t(`pharaohs.rulers.${selectedItem.id}.reign`),
          details: t(`pharaohs.rulers.${selectedItem.id}.achievements`),
          fallback: img('/images/pharaohs.jpg')
        }
      : {
          name: t(`pharaohs.deities.${selectedItem.id}.name`),
          subtitle: t(`pharaohs.deities.${selectedItem.id}.title`),
          details: t(`pharaohs.deities.${selectedItem.id}.myth`),
          fallback: img('/images/gods.jpg')
        })
    : null;

  return (
    <div className="page-view page-container pharaohs-gods-page">
      <ScrollReveal>
        <div className="section-header">
          <h1>{t('pharaohs.title')}</h1>
          <p>{t('pharaohs.subtitle')}</p>
        </div>
      </ScrollReveal>

      {/* Expandable Category Navigation */}
      <div className="monuments-categories-wrapper">
        <div className="categories-header-bar">
          <div className="active-category-pill">
            <span className="pill-dot"></span>
            <span className="pill-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              {activeSection === 'rulers' ? <Crown size={16} /> : <Sparkles size={16} />}
              {activeSection === 'rulers' ? t('pharaohs.rulersSection') : t('pharaohs.godsSection')}
            </span>
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
          <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
            <button
              className={`category-grid-btn ${activeSection === 'rulers' ? 'active' : ''}`}
              onClick={() => handleSectionSelect('rulers')}
            >
              <Crown size={16} style={{ marginInlineEnd: '0.4rem' }} />
              <span className="cat-btn-text">{t('pharaohs.rulersSection')}</span>
            </button>
            <button
              className={`category-grid-btn ${activeSection === 'gods' ? 'active' : ''}`}
              onClick={() => handleSectionSelect('gods')}
            >
              <Sparkles size={16} style={{ marginInlineEnd: '0.4rem' }} />
              <span className="cat-btn-text">{t('pharaohs.godsSection')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rulers Section */}
      <div id="rulers-section" className="page-sub-section">
        <ScrollReveal>
          <h2 className="section-subtitle">{t('pharaohs.rulersSection')}</h2>
        </ScrollReveal>
        <div className="gods-grid">
          {rulersList.map((id, index) => {
            return (
              <ScrollReveal key={id} delay={(index % 4) * 80}>
                <div
                  className="glass-panel glass-panel-interactive god-card clickable-card"
                  onClick={() => setSelectedItem({ type: 'ruler', id })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedItem({ type: 'ruler', id });
                  }}
                >
                  <div className="god-card-content">
                    <div className="god-card-thumb-wrapper">
                      <ImageWithFallback
                        src={img(`/images/items/${id}.jpg`)}
                        fallbackSrc={img('/images/pharaohs.jpg')}
                        alt={t(`pharaohs.rulers.${id}.name`)}
                        className="god-card-thumb"
                      />
                    </div>
                    <div className="god-card-info">
                      <h2>{t(`pharaohs.rulers.${id}.name`)}</h2>
                      <h4>{t(`pharaohs.rulers.${id}.reign`)}</h4>
                      <p className="god-card-desc">
                        {Array.isArray(t(`pharaohs.rulers.${id}.achievements`)) 
                          ? t(`pharaohs.rulers.${id}.achievements`)[0] 
                          : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <div id="gods-section" className="page-sub-section" style={{ marginTop: '5rem' }}>
        <ScrollReveal>
          <h2 className="section-subtitle">{t('pharaohs.godsSection')}</h2>
        </ScrollReveal>
        <div className="gods-grid">
          {deitiesList.map((id, index) => {
            return (
              <ScrollReveal key={id} delay={(index % 4) * 80}>
                <div
                  className="glass-panel glass-panel-interactive god-card clickable-card"
                  onClick={() => setSelectedItem({ type: 'deity', id })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedItem({ type: 'deity', id });
                  }}
                >
                  <div className="god-card-content">
                    <div className="god-card-thumb-wrapper">
                      <ImageWithFallback
                        src={img(`/images/items/${id}.jpg`)}
                        fallbackSrc={img('/images/gods.jpg')}
                        alt={t(`pharaohs.deities.${id}.name`)}
                        className="god-card-thumb"
                      />
                    </div>
                    <div className="god-card-info">
                      <h2>{t(`pharaohs.deities.${id}.name`)}</h2>
                      <h4>{t(`pharaohs.deities.${id}.title`)}</h4>
                      <p className="god-card-desc">
                        {t(`pharaohs.deities.${id}.myth`)}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        title={selectedData ? selectedData.name : ''}
      >
        {selectedItem && selectedData && (
          <div className="split-modal-content">
            <div className="split-modal-image-side">
              <ImageWithFallback
                src={img(`/images/items/${selectedItem.id}.jpg`)}
                fallbackSrc={selectedData.fallback}
                alt={selectedData.name}
                className="split-modal-image"
              />
            </div>
            <div className="split-modal-text-side">
              <p className="modal-subtitle-text" style={{ marginTop: 0 }}>
                {selectedData.subtitle}
              </p>
              <div className="modal-description-box" style={{ marginBottom: 0 }}>
                {selectedItem.type === 'ruler' ? (
                  <ul className="modal-achievements-list">
                    {Array.isArray(selectedData.details) && selectedData.details.map((ach, idx) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>
                ) : (
                  renderDescription(selectedData.details)
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
