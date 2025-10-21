import { Box, TextField, Button, Paper, Typography, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { PropertyFilters } from '@/types/property';

interface FilterBarProps {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
  onSearch: () => void;
}

export default function FilterBar({ filters, onChange, onSearch }: FilterBarProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        mb: 5,
        position: { md: 'sticky' },
        top: { md: 80 },
        zIndex: 10,
        border: '1px solid rgba(0, 0, 0, 0.08)',
        background: '#FFFFFF',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <TuneIcon sx={{ color: '#000000', fontSize: 28 }} />
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            color: '#111827',
            letterSpacing: '0em',
          }}
        >
          Filtros de Búsqueda
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3, borderColor: 'rgba(0, 0, 0, 0.08)' }} />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 3,
        }}
      >
        <TextField
          label="Nombre de Propiedad"
          variant="outlined"
          size="medium"
          value={filters.name || ''}
          onChange={(e) => onChange({ ...filters, name: e.target.value })}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          InputLabelProps={{
            sx: { color: '#6B7280', '&.Mui-focused': { color: '#000000' } }
          }}
          sx={{
            '& input': { color: '#111827' }
          }}
        />
        <TextField
          label="Ubicación"
          variant="outlined"
          size="medium"
          value={filters.address || ''}
          onChange={(e) => onChange({ ...filters, address: e.target.value })}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          InputLabelProps={{
            sx: { color: '#6B7280', '&.Mui-focused': { color: '#000000' } }
          }}
          sx={{
            '& input': { color: '#111827' }
          }}
        />
        <TextField
          label="Precio Mínimo"
          variant="outlined"
          size="medium"
          type="number"
          value={filters.minPrice || ''}
          onChange={(e) => onChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          InputLabelProps={{
            sx: { color: '#6B7280', '&.Mui-focused': { color: '#000000' } }
          }}
          sx={{
            '& input': { color: '#111827' }
          }}
        />
        <TextField
          label="Precio Máximo"
          variant="outlined"
          size="medium"
          type="number"
          value={filters.maxPrice || ''}
          onChange={(e) => onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          InputLabelProps={{
            sx: { color: '#6B7280', '&.Mui-focused': { color: '#000000' } }
          }}
          sx={{
            '& input': { color: '#111827' }
          }}
        />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => {
            onChange({ page: 1, pageSize: 9, name: '', address: '', minPrice: undefined, maxPrice: undefined });
            setTimeout(onSearch, 100);
          }}
          sx={{
            minWidth: 120,
          }}
        >
          Limpiar
        </Button>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={onSearch}
          sx={{
            minWidth: 160,
          }}
        >
          Buscar
        </Button>
      </Box>
    </Paper>
  );
}
