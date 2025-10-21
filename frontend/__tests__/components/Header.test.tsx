import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Header', () => {
  it('renders MILLION logo text', () => {
    render(<Header />);
    expect(screen.getByText('MILLION')).toBeInTheDocument();
  });

  it('renders subtitle text', () => {
    render(<Header />);
    expect(screen.getByText('EXCLUSIVE REAL ESTATE')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    render(<Header />);
    expect(screen.getByText('COLECCIONES')).toBeInTheDocument();
    expect(screen.getByText('EXCLUSIVAS')).toBeInTheDocument();
    expect(screen.getByText('CONTACTO')).toBeInTheDocument();
  });

  it('renders diamond icon', () => {
    render(<Header />);
    const diamondIcon = screen.getByTestId('DiamondIcon') || 
                       document.querySelector('[data-testid="DiamondIcon"]') ||
                       document.querySelector('svg');
    expect(diamondIcon).toBeTruthy();
  });

  it('has correct link structure', () => {
    render(<Header />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('has responsive navigation classes', () => {
    render(<Header />);
    const navigation = screen.getByText('COLECCIONES').closest('div');
    expect(navigation).toHaveClass('MuiBox-root');
  });
});
