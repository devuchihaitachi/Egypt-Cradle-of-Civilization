import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from './Router';
import { Github, Globe, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { t, language, toggleLanguage } = useLanguage();
  const { navigateTo } = useNavigation();
  const footerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight) {
        const progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / (windowHeight * 0.8)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer ref={footerRef} className="footer-motion-wrapper">
      {/* Standalone Giant Brand Title ABOVE the Footer Card */}
      <div 
        className="footer-standalone-title-container"
        style={{
          transform: `translateY(${(1 - scrollProgress) * 45}px) scale(${0.92 + scrollProgress * 0.08})`,
          opacity: 0.35 + scrollProgress * 0.65
        }}
      >
        <h1 className="footer-standalone-title">
          {t('footer.bigTitle')}
        </h1>
      </div>

      {/* Full-Width Edge to Edge Footer Card */}
      <div 
        className="footer-fullwidth-card"
        style={{
          transform: `translateY(${(1 - scrollProgress) * 25}px)`
        }}
      >
        {/* Footer Grid Content */}
        <div className="footer-content-grid">
          {/* Column 1: Brand Tagline */}
          <div className="footer-col footer-col-brand">
            <h2 className="footer-brand-heading">{t('footer.tagline')}</h2>
            <p className="footer-brand-desc">{t('footer.desc')}</p>
            
            <div className="footer-social-row">
              <a 
                href="https://github.com/devuchihaitachi/Egypt-Cradle-of-Civilization" 
                target="_blank" 
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="GitHub Repository"
              >
                <Github size={18} />
              </a>
              <button 
                onClick={toggleLanguage} 
                className="footer-social-btn lang-toggle-btn"
                aria-label="Toggle Language"
              >
                <Globe size={18} />
                <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col">
            <h3 className="footer-col-title">{t('footer.navigation')}</h3>
            <ul className="footer-links-list">
              <li><button onClick={() => navigateTo('home')}>{t('nav.home')}</button></li>
              <li><button onClick={() => navigateTo('pyramids')}>{t('nav.pyramids')}</button></li>
              <li><button onClick={() => navigateTo('monuments')}>{t('nav.monuments')}</button></li>
              <li><button onClick={() => navigateTo('pharaohs')}>{t('nav.pharaohs')}</button></li>
              <li><button onClick={() => navigateTo('history')}>{t('nav.history')}</button></li>
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div className="footer-col">
            <h3 className="footer-col-title">{t('footer.explore')}</h3>
            <ul className="footer-links-list">
              <li><button onClick={() => navigateTo('culture')}>{t('nav.culture')}</button></li>
              <li><button onClick={() => navigateTo('gem')}>{t('nav.gem')}</button></li>
              <li><button onClick={() => navigateTo('unesco')}>{t('nav.unesco')}</button></li>
              <li><button onClick={() => navigateTo('discoveries')}>{t('nav.discoveries')}</button></li>
            </ul>
          </div>

          {/* Column 4: Interactive Tools */}
          <div className="footer-col">
            <h3 className="footer-col-title">{t('footer.interactive')}</h3>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => navigateTo('hieroglyphics')} className="link-with-icon">
                  <Sparkles size={14} />
                  <span>{t('nav.hieroglyphics')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('visit')} className="link-with-icon">
                  <Compass size={14} />
                  <span>{t('nav.visit')}</span>
                </button>
              </li>
              <li>
                <a 
                  href="https://github.com/devuchihaitachi/Egypt-Cradle-of-Civilization" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="link-with-icon"
                >
                  <ShieldCheck size={14} />
                  <span>{t('footer.github')}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-rights">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
