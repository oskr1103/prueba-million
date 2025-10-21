'use client';

import { Box, Pagination, Alert, Typography, Fade } from '@mui/material';
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
    updateFilters,
    clearFilters
  } = useProperties();


  const renderContent = () => {
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
        <Fade in={!loading} timeout={300}>
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 8,
              px: 4,
              mt: 4,
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#78716C',
                mb: 2,
                fontWeight: 500,
              }}
            >
              No se encontraron propiedades
            </Typography>
            <Typography variant="body2" sx={{ color: '#78716C' }}>
              Intenta ajustar tus criterios de búsqueda
            </Typography>
          </Box>
        </Fade>
      );
    }

    return (
      <Fade in={!loading} timeout={300}>
        <Box>
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
                    color: '#78716C',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      borderColor: 'rgba(0, 0, 0, 0.2)',
                    },
                    '&.Mui-selected': {
                      backgroundColor: '#1A1A1A',
                      borderColor: '#1A1A1A',
                      color: '#FFFFFF',
                      '&:hover': {
                        backgroundColor: '#333333',
                      },
                    },
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Fade>
    );
  };

  return (
    <>
      <FilterBar
        filters={filters}
        onChange={updateFilters}
        onSearch={handleSearch}
        onClear={clearFilters}
      />
      
      {renderContent()}
    </>
  );
}
