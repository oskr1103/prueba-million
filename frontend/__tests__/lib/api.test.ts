import { formatCurrency, getProperties, getPropertyById } from '@/lib/api';

// Mock fetch
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('API Utils', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('formatCurrency', () => {
    it('formats numbers correctly and includes USD', () => {
      const result = formatCurrency(1000000);
      expect(result).toContain('US$');
      expect(result).toContain('1.000.000');
    });

    it('handles zero correctly', () => {
      const result = formatCurrency(0);
      expect(result).toContain('US$');
      expect(result).toContain('0');
    });

    it('formats small numbers', () => {
      const result = formatCurrency(500);
      expect(result).toContain('US$');
      expect(result).toContain('500');
    });

    it('formats large numbers with commas', () => {
      const result = formatCurrency(9999999);
      expect(result).toContain('US$');
      expect(result).toContain('9.999.999');
    });

    it('handles decimals with two decimal places', () => {
      const result = formatCurrency(1234.56);
      expect(result).toContain('US$');
      expect(result).toContain('1.234,56');
    });

    it('handles negative numbers', () => {
      const result = formatCurrency(-1000);
      expect(result).toContain('US$');
      expect(result).toContain('-US$');
    });

    it('handles very large numbers', () => {
      const result = formatCurrency(999999999);
      expect(result).toContain('US$');
      expect(result).toContain('999.999.999');
    });

    it('handles numbers with many decimal places', () => {
      const result = formatCurrency(1234.56789);
      expect(result).toContain('US$');
      expect(result).toContain('1.234,57'); // Should round to 2 decimal places
    });
  });

  describe('getProperties', () => {
    const mockResponse = {
      properties: [
        {
          id: '1',
          idOwner: 'owner1',
          name: 'Test Property',
          addressProperty: 'Test Address',
          priceProperty: 1000000,
          image: 'https://example.com/image.jpg',
        },
      ],
      totalCount: 1,
      page: 1,
      pageSize: 10,
      totalPages: 1,
    };

    it('fetches properties successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await getProperties();
      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:5001/api/properties');
    });

    it('fetches properties with filters', async () => {
      const filters = {
        name: 'Casa',
        address: 'Bogotá',
        minPrice: 1000000,
        maxPrice: 5000000,
        page: 2,
        pageSize: 5,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await getProperties(filters);
      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:5001/api/properties?name=Casa&address=Bogot%C3%A1&minPrice=1000000&maxPrice=5000000&page=2&pageSize=5'
      );
    });

    it('handles API errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response);

      await expect(getProperties()).rejects.toThrow('Failed to fetch properties');
    });

    it('handles network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getProperties()).rejects.toThrow('Network error');
    });

    it('handles JSON parsing errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      } as Response);

      await expect(getProperties()).rejects.toThrow('Invalid JSON');
    });

    it('uses default page and pageSize when not provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await getProperties({});
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:5001/api/properties');
    });

    it('handles empty filters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await getProperties({ page: 1, pageSize: 10 });
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:5001/api/properties?page=1&pageSize=10');
    });
  });

  describe('getPropertyById', () => {
    const mockProperty = {
      id: 'test-id',
      idOwner: 'owner1',
      name: 'Test Property',
      addressProperty: 'Test Address',
      priceProperty: 1000000,
      image: 'https://example.com/image.jpg',
    };

    it('fetches property by ID successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProperty,
      } as Response);

      const result = await getPropertyById('test-id');
      expect(result).toEqual(mockProperty);
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:5001/api/properties/test-id');
    });

    it('handles property not found', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      await expect(getPropertyById('non-existent-id')).rejects.toThrow('Failed to fetch property');
    });

    it('handles API errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response);

      await expect(getPropertyById('test-id')).rejects.toThrow('Failed to fetch property');
    });

    it('handles network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getPropertyById('test-id')).rejects.toThrow('Network error');
    });

    it('handles JSON parsing errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      } as Response);

      await expect(getPropertyById('test-id')).rejects.toThrow('Invalid JSON');
    });

    it('handles empty ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProperty,
      } as Response);

      await getPropertyById('');
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:5001/api/properties/');
    });
  });
});