import { Property, PropertyListResponse, PropertyFilters } from '@/types/property';

describe('Property Types', () => {
  describe('Property interface', () => {
    it('should have all required properties', () => {
      const property: Property = {
        id: 'test-id',
        idOwner: 'owner-id',
        name: 'Test Property',
        addressProperty: 'Test Address',
        priceProperty: 1000000,
        image: 'https://example.com/image.jpg',
      };

      expect(property.id).toBe('test-id');
      expect(property.idOwner).toBe('owner-id');
      expect(property.name).toBe('Test Property');
      expect(property.addressProperty).toBe('Test Address');
      expect(property.priceProperty).toBe(1000000);
      expect(property.image).toBe('https://example.com/image.jpg');
    });

    it('should handle optional id', () => {
      const property: Property = {
        id: undefined,
        idOwner: 'owner-id',
        name: 'Test Property',
        addressProperty: 'Test Address',
        priceProperty: 1000000,
        image: 'https://example.com/image.jpg',
      };

      expect(property.id).toBeUndefined();
      expect(property.idOwner).toBe('owner-id');
    });

    it('should handle decimal prices', () => {
      const property: Property = {
        id: 'test-id',
        idOwner: 'owner-id',
        name: 'Test Property',
        addressProperty: 'Test Address',
        priceProperty: 1000000.50,
        image: 'https://example.com/image.jpg',
      };

      expect(property.priceProperty).toBe(1000000.50);
    });

    it('should handle zero price', () => {
      const property: Property = {
        id: 'test-id',
        idOwner: 'owner-id',
        name: 'Test Property',
        addressProperty: 'Test Address',
        priceProperty: 0,
        image: 'https://example.com/image.jpg',
      };

      expect(property.priceProperty).toBe(0);
    });

    it('should handle very large prices', () => {
      const property: Property = {
        id: 'test-id',
        idOwner: 'owner-id',
        name: 'Test Property',
        addressProperty: 'Test Address',
        priceProperty: 999999999.99,
        image: 'https://example.com/image.jpg',
      };

      expect(property.priceProperty).toBe(999999999.99);
    });
  });

  describe('PropertyListResponse interface', () => {
    it('should have all required properties', () => {
      const response: PropertyListResponse = {
        properties: [
          {
            id: '1',
            idOwner: 'owner1',
            name: 'Property 1',
            addressProperty: 'Address 1',
            priceProperty: 1000000,
            image: 'https://example.com/image1.jpg',
          },
        ],
        totalCount: 1,
        page: 1,
        pageSize: 10,
        totalPages: 1,
      };

      expect(response.properties).toHaveLength(1);
      expect(response.totalCount).toBe(1);
      expect(response.page).toBe(1);
      expect(response.pageSize).toBe(10);
      expect(response.totalPages).toBe(1);
    });

    it('should handle empty properties array', () => {
      const response: PropertyListResponse = {
        properties: [],
        totalCount: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0,
      };

      expect(response.properties).toHaveLength(0);
      expect(response.totalCount).toBe(0);
      expect(response.totalPages).toBe(0);
    });

    it('should handle multiple properties', () => {
      const response: PropertyListResponse = {
        properties: [
          {
            id: '1',
            idOwner: 'owner1',
            name: 'Property 1',
            addressProperty: 'Address 1',
            priceProperty: 1000000,
            image: 'https://example.com/image1.jpg',
          },
          {
            id: '2',
            idOwner: 'owner2',
            name: 'Property 2',
            addressProperty: 'Address 2',
            priceProperty: 2000000,
            image: 'https://example.com/image2.jpg',
          },
        ],
        totalCount: 2,
        page: 1,
        pageSize: 10,
        totalPages: 1,
      };

      expect(response.properties).toHaveLength(2);
      expect(response.totalCount).toBe(2);
    });

    it('should handle pagination correctly', () => {
      const response: PropertyListResponse = {
        properties: [],
        totalCount: 100,
        page: 5,
        pageSize: 10,
        totalPages: 10,
      };

      expect(response.totalCount).toBe(100);
      expect(response.page).toBe(5);
      expect(response.pageSize).toBe(10);
      expect(response.totalPages).toBe(10);
    });
  });

  describe('PropertyFilters interface', () => {
    it('should handle empty filters', () => {
      const filters: PropertyFilters = {};

      expect(filters).toEqual({});
    });

    it('should handle all filter properties', () => {
      const filters: PropertyFilters = {
        name: 'Casa',
        address: 'Bogotá',
        minPrice: 1000000,
        maxPrice: 5000000,
        page: 2,
        pageSize: 20,
      };

      expect(filters.name).toBe('Casa');
      expect(filters.address).toBe('Bogotá');
      expect(filters.minPrice).toBe(1000000);
      expect(filters.maxPrice).toBe(5000000);
      expect(filters.page).toBe(2);
      expect(filters.pageSize).toBe(20);
    });

    it('should handle partial filters', () => {
      const filters: PropertyFilters = {
        name: 'Casa',
        page: 1,
      };

      expect(filters.name).toBe('Casa');
      expect(filters.address).toBeUndefined();
      expect(filters.minPrice).toBeUndefined();
      expect(filters.maxPrice).toBeUndefined();
      expect(filters.page).toBe(1);
      expect(filters.pageSize).toBeUndefined();
    });

    it('should handle price filters only', () => {
      const filters: PropertyFilters = {
        minPrice: 1000000,
        maxPrice: 5000000,
      };

      expect(filters.minPrice).toBe(1000000);
      expect(filters.maxPrice).toBe(5000000);
      expect(filters.name).toBeUndefined();
      expect(filters.address).toBeUndefined();
    });

    it('should handle pagination only', () => {
      const filters: PropertyFilters = {
        page: 3,
        pageSize: 15,
      };

      expect(filters.page).toBe(3);
      expect(filters.pageSize).toBe(15);
      expect(filters.name).toBeUndefined();
      expect(filters.address).toBeUndefined();
      expect(filters.minPrice).toBeUndefined();
      expect(filters.maxPrice).toBeUndefined();
    });

    it('should handle undefined values', () => {
      const filters: PropertyFilters = {
        name: undefined,
        address: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        page: undefined,
        pageSize: undefined,
      };

      expect(filters.name).toBeUndefined();
      expect(filters.address).toBeUndefined();
      expect(filters.minPrice).toBeUndefined();
      expect(filters.maxPrice).toBeUndefined();
      expect(filters.page).toBeUndefined();
      expect(filters.pageSize).toBeUndefined();
    });

    it('should handle zero values', () => {
      const filters: PropertyFilters = {
        minPrice: 0,
        maxPrice: 0,
        page: 0,
        pageSize: 0,
      };

      expect(filters.minPrice).toBe(0);
      expect(filters.maxPrice).toBe(0);
      expect(filters.page).toBe(0);
      expect(filters.pageSize).toBe(0);
    });

    it('should handle empty string values', () => {
      const filters: PropertyFilters = {
        name: '',
        address: '',
      };

      expect(filters.name).toBe('');
      expect(filters.address).toBe('');
    });
  });
});
