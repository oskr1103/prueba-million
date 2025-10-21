import { renderHook, act, waitFor } from '@testing-library/react';
import { useProperties } from '@/hooks/useProperties';
import { getProperties } from '@/lib/api';

// Mock the API
jest.mock('@/lib/api');
const mockGetProperties = getProperties as jest.MockedFunction<typeof getProperties>;

describe('useProperties', () => {
  const mockProperties = [
    { id: '1', name: 'Property 1', addressProperty: 'Address 1', priceProperty: 1000000, image: 'image1.jpg', idOwner: 'owner1' },
    { id: '2', name: 'Property 2', addressProperty: 'Address 2', priceProperty: 2000000, image: 'image2.jpg', idOwner: 'owner2' },
  ];

  const mockResponse = {
    properties: mockProperties,
    totalCount: 2,
    page: 1,
    pageSize: 6,
    totalPages: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetProperties.mockResolvedValue(mockResponse);
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useProperties());

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.filters).toEqual({
      page: 1,
      pageSize: 6,
    });
  });

  it('should fetch properties on mount', async () => {
    renderHook(() => useProperties());

    await waitFor(() => {
      expect(mockGetProperties).toHaveBeenCalledWith({
        page: 1,
        pageSize: 6,
      });
    });
  });

  it('should handle successful data fetch', async () => {
    const { result } = renderHook(() => useProperties());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.data).toEqual(mockResponse);
    });
  });

  it('should handle API errors', async () => {
    const errorMessage = 'API Error';
    mockGetProperties.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useProperties());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Error al cargar las propiedades. Por favor, intenta de nuevo.');
      expect(result.current.data).toBeNull();
    });
  });

  it('should update filters when handleSearch is called', async () => {
    const { result } = renderHook(() => useProperties());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.updateFilters({ name: 'Test Property' });
    });

    act(() => {
      result.current.handleSearch();
    });

    await waitFor(() => {
      expect(mockGetProperties).toHaveBeenCalledWith({
        page: 1,
        pageSize: 6,
        name: 'Test Property',
      });
    });
  });

  it('should handle page changes', async () => {
    const { result } = renderHook(() => useProperties());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.handlePageChange({} as any, 2);
    });

    await waitFor(() => {
      expect(mockGetProperties).toHaveBeenCalledWith({
        page: 2,
        pageSize: 6,
      });
    });
  });

  it('should clear filters correctly', async () => {
    const { result } = renderHook(() => useProperties());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Set some filters first
    act(() => {
      result.current.updateFilters({ name: 'Test Property', minPrice: 1000000 });
    });

    // Clear filters
    act(() => {
      result.current.clearFilters();
    });

    await waitFor(() => {
      expect(mockGetProperties).toHaveBeenCalledWith({
        page: 1,
        pageSize: 6,
        name: '',
        address: '',
        minPrice: undefined,
        maxPrice: undefined,
      });
    });
  });

  it('should use custom initial filters', () => {
    const customFilters = {
      name: 'Custom Property',
      page: 2,
      pageSize: 10,
    };

    const { result } = renderHook(() => useProperties(customFilters));

    expect(result.current.filters).toEqual({
      name: 'Custom Property',
      page: 2,
      pageSize: 10,
    });
  });
});
