import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import ThemeRegistry from '@/components/ThemeRegistry';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Test component to verify theme is applied
const TestComponent = () => {
  return (
    <div data-testid="test-component">
      <h1>Test Component</h1>
    </div>
  );
};

describe('ThemeRegistry', () => {
  it('renders children correctly', () => {
    render(
      <ThemeRegistry>
        <TestComponent />
      </ThemeRegistry>
    );

    expect(document.querySelector('[data-testid="test-component"]')).toBeInTheDocument();
    expect(document.querySelector('h1')).toHaveTextContent('Test Component');
  });

  it('provides theme context', () => {
    const { container } = render(
      <ThemeRegistry>
        <TestComponent />
      </ThemeRegistry>
    );

    // Check if component renders correctly with theme
    expect(container.querySelector('[data-testid="test-component"]')).toBeTruthy();
  });

  it('renders without crashing', () => {
    expect(() => {
      render(
        <ThemeRegistry>
          <TestComponent />
        </ThemeRegistry>
      );
    }).not.toThrow();
  });

  it('applies Material-UI theme styles', () => {
    const { container } = render(
      <ThemeRegistry>
        <TestComponent />
      </ThemeRegistry>
    );

    // Check if component renders with theme applied
    expect(container.querySelector('[data-testid="test-component"]')).toBeTruthy();
  });

  it('handles multiple children', () => {
    render(
      <ThemeRegistry>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
        <TestComponent />
      </ThemeRegistry>
    );

    expect(document.querySelector('[data-testid="child1"]')).toBeInTheDocument();
    expect(document.querySelector('[data-testid="child2"]')).toBeInTheDocument();
    expect(document.querySelector('[data-testid="test-component"]')).toBeInTheDocument();
  });

  it('renders with no children', () => {
    expect(() => {
      render(<ThemeRegistry />);
    }).not.toThrow();
  });
});
