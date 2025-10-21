import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertyList from '@/components/PropertyList';
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

describe('PropertyList', () => {
  const mockProperties: Property[] = [
    {
      id: '1',
      idOwner: 'owner1',
      name: 'Casa de Lujo 1',
      addressProperty: 'Av. Principal 123',
      priceProperty: 2500000,
      image: 'https://example.com/image1.jpg',
    },
    {
      id: '2',
      idOwner: 'owner2',
      name: 'Casa de Lujo 2',
      addressProperty: 'Av. Secundaria 456',
      priceProperty: 3000000,
      image: 'https://example.com/image2.jpg',
    },
    {
      id: '3',
      idOwner: 'owner3',
      name: 'Casa de Lujo 3',
      addressProperty: 'Av. Terciaria 789',
      priceProperty: 3500000,
      image: 'https://example.com/image3.jpg',
    },
  ];

  it('renders all properties', () => {
    render(<PropertyList properties={mockProperties} />);
    
    expect(screen.getByText('Casa de Lujo 1')).toBeInTheDocument();
    expect(screen.getByText('Casa de Lujo 2')).toBeInTheDocument();
    expect(screen.getByText('Casa de Lujo 3')).toBeInTheDocument();
  });

  it('renders property addresses', () => {
    render(<PropertyList properties={mockProperties} />);
    
    expect(screen.getByText('Av. Principal 123')).toBeInTheDocument();
    expect(screen.getByText('Av. Secundaria 456')).toBeInTheDocument();
    expect(screen.getByText('Av. Terciaria 789')).toBeInTheDocument();
  });

  it('renders formatted prices', () => {
    render(<PropertyList properties={mockProperties} />);
    
    expect(screen.getByText(/US\$.*2\.500\.000/)).toBeInTheDocument();
    expect(screen.getByText(/US\$.*3\.000\.000/)).toBeInTheDocument();
    expect(screen.getByText(/US\$.*3\.500\.000/)).toBeInTheDocument();
  });

  it('renders property images with correct alt text', () => {
    render(<PropertyList properties={mockProperties} />);
    
    expect(screen.getByAltText('Casa de Lujo 1')).toBeInTheDocument();
    expect(screen.getByAltText('Casa de Lujo 2')).toBeInTheDocument();
    expect(screen.getByAltText('Casa de Lujo 3')).toBeInTheDocument();
  });

  it('renders exclusiva chips for all properties', () => {
    render(<PropertyList properties={mockProperties} />);
    
    const exclusivaChips = screen.getAllByText('EXCLUSIVA');
    expect(exclusivaChips).toHaveLength(3);
  });

  it('renders empty list when no properties provided', () => {
    render(<PropertyList properties={[]} />);
    
    expect(screen.queryByText('Casa de Lujo 1')).not.toBeInTheDocument();
  });

  it('renders single property correctly', () => {
    const singleProperty = [mockProperties[0]];
    render(<PropertyList properties={singleProperty} />);
    
    expect(screen.getByText('Casa de Lujo 1')).toBeInTheDocument();
    expect(screen.queryByText('Casa de Lujo 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Casa de Lujo 3')).not.toBeInTheDocument();
  });

  it('has correct grid layout classes', () => {
    render(<PropertyList properties={mockProperties} />);
    
    const gridContainer = screen.getByText('Casa de Lujo 1').closest('[class*="MuiGrid"]');
    expect(gridContainer).toBeTruthy();
  });

  it('renders location icons', () => {
    render(<PropertyList properties={mockProperties} />);
    
    const locationIcons = document.querySelectorAll('svg');
    expect(locationIcons.length).toBeGreaterThan(0);
  });

  it('handles properties with special characters in names', () => {
    const specialProperties: Property[] = [
      {
        id: '1',
        idOwner: 'owner1',
        name: 'Casa & Apartamento "Especial"',
        addressProperty: 'Av. Principal 123',
        priceProperty: 2500000,
        image: 'https://example.com/image1.jpg',
      },
    ];

    render(<PropertyList properties={specialProperties} />);
    expect(screen.getByText('Casa & Apartamento "Especial"')).toBeInTheDocument();
  });

  it('renders loading skeleton when loading is true', () => {
    render(<PropertyList properties={[]} loading={true} />);
    
    const skeletons = document.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('handles properties with very long names', () => {
    const longNameProperties: Property[] = [
      {
        id: '1',
        idOwner: 'owner1',
        name: 'Casa de Lujo con Piscina y Jardín Amplio en Zona Residencial Exclusiva',
        addressProperty: 'Av. Principal 123',
        priceProperty: 2500000,
        image: 'https://example.com/image1.jpg',
      },
    ];

    render(<PropertyList properties={longNameProperties} />);
    expect(screen.getByText('Casa de Lujo con Piscina y Jardín Amplio en Zona Residencial Exclusiva')).toBeInTheDocument();
  });
});
