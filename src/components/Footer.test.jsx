import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';
import { LanguageProvider } from '../context/LanguageContext';
import { NavigationProvider } from './Router';

describe('Footer Component', () => {
  it('renders negative motion footer title and navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/en']}>
        <LanguageProvider>
          <NavigationProvider>
            <Footer />
          </NavigationProvider>
        </LanguageProvider>
      </MemoryRouter>
    );

    // Check big title
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/EGYPT|مِصْرُ/i);

    // Check navigation buttons exist
    expect(screen.getByRole('button', { name: /Home|الرئيسية/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Pyramids|الأهرامات/i })).toBeInTheDocument();
  });
});
