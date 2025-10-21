export interface Property {
  id: string;
  idOwner: string;
  name: string;
  addressProperty: string;
  priceProperty: number;
  image: string;
}

export interface PropertyListResponse {
  properties: Property[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PropertyFilters {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
}

