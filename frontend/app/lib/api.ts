import { Property, PropertyListResponse, PropertyFilters } from '@/types/property';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export async function getProperties(filters: PropertyFilters = {}): Promise<PropertyListResponse> {
  const params = new URLSearchParams();

  if (filters.name) params.append('name', filters.name);
  if (filters.address) params.append('address', filters.address);
  if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
  if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.pageSize) params.append('pageSize', filters.pageSize.toString());

  const url = `${API_URL}/api/properties${params.toString() ? `?${params.toString()}` : ''}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }

  return response.json();
}

export async function getPropertyById(id: string): Promise<Property> {
  const response = await fetch(`${API_URL}/api/properties/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch property');
  }

  return response.json();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

