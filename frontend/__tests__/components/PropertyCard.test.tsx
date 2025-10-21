import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types/property';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('PropertyCard', () => {
  const mockProperty: Property = {
    id: '1',
    idOwner: 'owner1',
    name: 'Casa de Lujo',
    addressProperty: 'Av. Principal 123',
    priceProperty: 2500000,
    image: 'https://example.com/image.jpg',
  };

  it('renders property name', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText('Casa de Lujo')).toBeInTheDocument();
  });

  it('renders property address', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText('Av. Principal 123')).toBeInTheDocument();
  });

  it('renders formatted price', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText(/US\$.*2\.500\.000/)).toBeInTheDocument();
  });

  it('renders property image with correct src', () => {
    render(<PropertyCard property={mockProperty} />);
    const image = screen.getByAltText('Casa de Lujo');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders exclusiva chip', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText('EXCLUSIVA')).toBeInTheDocument();
  });
});

