import { render, screen, waitFor } from '@testing-library/react';
import PropertyListContainer from '@/components/PropertyListContainer';
import { useProperties } from '@/hooks/useProperties';

// Mock the useProperties hook
jest.mock('@/hooks/useProperties');
const mockUseProperties = useProperties as jest.MockedFunction<typeof useProperties>;

// Mock the components
jest.mock('@/components/FilterBar', () => {
  return function MockFilterBar({ filters, onChange, onSearch, onClear }: any) {
    return (
      <div data-testid="filter-bar">
        <input data-testid="name-input" defaultValue={filters.name || ''} />
        <button data-testid="search-button" onClick={onSearch}>Buscar</button>
        <button data-testid="clear-button" onClick={onClear}>Limpiar</button>
      </div>
    );
  };
});

jest.mock('@/components/PropertyList', () => {
  return function MockPropertyList({ properties }: any) {
    return (
      <div data-testid="property-list">
        {properties.map((property: any) => (
          <div key={property.id} data-testid={`property-${property.id}`}>
            {property.name}
          </div>
        ))}
      </div>
    );
  };
});

describe('PropertyListContainer', () => {
  const mockFilters = {
    name: '',
    address: '',
    minPrice: undefined,
    maxPrice: undefined,
    page: 1,
    pageSize: 6,
  };

  const mockProperties = [
    { id: '1', name: 'Property 1', addressProperty: 'Address 1', priceProperty: 1000000, image: 'image1.jpg', idOwner: 'owner1' },
    { id: '2', name: 'Property 2', addressProperty: 'Address 2', priceProperty: 2000000, image: 'image2.jpg', idOwner: 'owner2' },
  ];

  const mockData = {
    properties: mockProperties,
    totalCount: 2,
    page: 1,
    pageSize: 6,
    totalPages: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    mockUseProperties.mockReturnValue({
      data: null,
      filters: mockFilters,
      loading: true,
      error: null,
      handleSearch: jest.fn(),
      handlePageChange: jest.fn(),
      updateFilters: jest.fn(),
      clearFilters: jest.fn(),
      refetch: jest.fn(),
    });

    render(<PropertyListContainer />);
    
    expect(screen.getByText('Cargando propiedades...')).toBeInTheDocument();
    expect(screen.getByTestId('filter-bar')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockUseProperties.mockReturnValue({
      data: null,
      filters: mockFilters,
      loading: false,
      error: 'Error loading properties',
      handleSearch: jest.fn(),
      handlePageChange: jest.fn(),
      updateFilters: jest.fn(),
      clearFilters: jest.fn(),
      refetch: jest.fn(),
    });

    render(<PropertyListContainer />);
    
    expect(screen.getByText('Error loading properties')).toBeInTheDocument();
    expect(screen.getByTestId('filter-bar')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    mockUseProperties.mockReturnValue({
      data: { ...mockData, properties: [] },
      filters: mockFilters,
      loading: false,
      error: null,
      handleSearch: jest.fn(),
      handlePageChange: jest.fn(),
      updateFilters: jest.fn(),
      clearFilters: jest.fn(),
      refetch: jest.fn(),
    });

    render(<PropertyListContainer />);
    
    expect(screen.getByText('No se encontraron propiedades')).toBeInTheDocument();
    expect(screen.getByText('Intenta ajustar tus criterios de búsqueda')).toBeInTheDocument();
    expect(screen.getByTestId('filter-bar')).toBeInTheDocument();
  });

  it('renders properties list', () => {
    mockUseProperties.mockReturnValue({
      data: mockData,
      filters: mockFilters,
      loading: false,
      error: null,
      handleSearch: jest.fn(),
      handlePageChange: jest.fn(),
      updateFilters: jest.fn(),
      clearFilters: jest.fn(),
      refetch: jest.fn(),
    });

    render(<PropertyListContainer />);
    
    expect(screen.getByTestId('filter-bar')).toBeInTheDocument();
    expect(screen.getByTestId('property-list')).toBeInTheDocument();
    expect(screen.getByTestId('property-1')).toBeInTheDocument();
    expect(screen.getByTestId('property-2')).toBeInTheDocument();
  });

  it('renders pagination when totalPages > 1', () => {
    const mockDataWithPagination = {
      ...mockData,
      totalPages: 3,
    };

    mockUseProperties.mockReturnValue({
      data: mockDataWithPagination,
      filters: mockFilters,
      loading: false,
      error: null,
      handleSearch: jest.fn(),
      handlePageChange: jest.fn(),
      updateFilters: jest.fn(),
      clearFilters: jest.fn(),
      refetch: jest.fn(),
    });

    render(<PropertyListContainer />);
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('does not render pagination when totalPages <= 1', () => {
    mockUseProperties.mockReturnValue({
      data: mockData,
      filters: mockFilters,
      loading: false,
      error: null,
      handleSearch: jest.fn(),
      handlePageChange: jest.fn(),
      updateFilters: jest.fn(),
      clearFilters: jest.fn(),
      refetch: jest.fn(),
    });

    render(<PropertyListContainer />);
    
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});
