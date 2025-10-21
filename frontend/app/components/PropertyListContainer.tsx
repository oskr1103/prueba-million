'use client';

import { Box, Pagination, Alert, Typography } from '@mui/material';
import FilterBar from '@/components/FilterBar';
import PropertyList from '@/components/PropertyList';
import { useProperties } from '@/hooks/useProperties';

export default function PropertyListContainer() {
  const { 
    data, 
    filters,
    loading, 
    error, 
    handleSearch, 
    handlePageChange,
    updateFilters
  } = useProperties();

  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ 
          mb: 4,
          backgroundColor: 'rgba(183, 110, 121, 0.1)',
          border: '1px solid rgba(183, 110, 121, 0.3)',
          color: '#B76E79',
        }}
      >
        {error}
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" sx={{ color: '#78716C' }}>
          Cargando propiedades...
        </Typography>
      </Box>
    );
  }

  if (!data || data.properties.length === 0) {
    return (
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 12,
          px: 4,
          borderRadius: 2,
          border: '1px solid rgba(212, 175, 55, 0.1)',
          background: 'rgba(26, 26, 26, 0.4)',
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#B8B8B8',
            fontFamily: 'Playfair Display, serif',
            mb: 2,
          }}
        >
          No se encontraron propiedades
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          Intenta ajustar tus criterios de búsqueda
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <FilterBar
        filters={filters}
        onChange={updateFilters}
        onSearch={handleSearch}
      />

      <PropertyList properties={data.properties} />

      {data.totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 4 }}>
          <Pagination
            count={data.totalPages}
            page={data.page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#B8B8B8',
                borderColor: 'rgba(212, 175, 55, 0.2)',
                '&:hover': {
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  borderColor: 'rgba(212, 175, 55, 0.4)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  borderColor: '#D4AF37',
                  color: '#D4AF37',
                  '&:hover': {
                    backgroundColor: 'rgba(212, 175, 55, 0.3)',
                  },
                },
              },
            }}
          />
        </Box>
      )}
    </>
  );
}
