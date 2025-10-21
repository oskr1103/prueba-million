'use client';

import { useState, useEffect, useCallback } from 'react';
import { PropertyFilters, PropertyListResponse } from '@/types/property';
import { getProperties } from '@/lib/api';

export function useProperties(initialFilters: PropertyFilters = { page: 1, pageSize: 6 }) {
  const [data, setData] = useState<PropertyListResponse | null>(null);
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProperties(filters);
      setData(response);
    } catch (err) {
      setError('Error al cargar las propiedades. Por favor, intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleSearch = useCallback(() => {
    setFilters(prev => ({ ...prev, page: 1 }));
  }, []);

  const handlePageChange = useCallback((_event: React.ChangeEvent<unknown>, page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const updateFilters = useCallback((newFilters: Partial<PropertyFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  return {
    data,
    filters,
    loading,
    error,
    handleSearch,
    handlePageChange,
    updateFilters,
    refetch: fetchProperties,
  };
}
