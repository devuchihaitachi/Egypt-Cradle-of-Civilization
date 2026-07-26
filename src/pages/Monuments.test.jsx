import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Monuments from './Monuments';
import { LanguageProvider } from '../context/LanguageContext';

describe('Monuments Page Expandable Categories', () => {
  beforeAll(() => {
    global.IntersectionObserver = class {
      constructor(cb) { this.cb = cb; }
      observe(el) { this.cb([{ isIntersecting: true, target: el }]); }
      unobserve() {}
      disconnect() {}
    };
  });

  it('renders category toggle button and toggles expansion on click', () => {
    render(
      <MemoryRouter initialEntries={['/en/monuments']}>
        <LanguageProvider>
          <Monuments />
        </LanguageProvider>
      </MemoryRouter>
    );

    const toggleBtn = screen.getByRole('button', { name: /all categories|جميع التصنيفات/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: /close categories|إغلاق التصنيفات/i })).toBeInTheDocument();
  });
});
