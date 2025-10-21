import { Suspense } from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import Header from '@/components/Header';
import PropertyListContainer from '@/components/PropertyListContainer';
import Loading from '@/components/Loading';

export default function Home() {
  return (
    <>
      <Header />
      
      <Box 
        sx={{ 
          background: '#FAF8F5',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Box 
            sx={{ 
              textAlign: 'center', 
              mb: 6,
              py: 8,
              px: 2,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <DiamondIcon sx={{ fontSize: 48, color: '#1A1A1A' }} />
            </Box>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                color: '#1C1917',
                letterSpacing: '-0.02em',
                mb: 2,
              }}
            >
              Colección Exclusiva
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#78716C',
                fontWeight: 300,
                letterSpacing: '0.02em',
                fontSize: { xs: '0.9rem', md: '1.1rem' },
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.8,
              }}
            >
              Descubre propiedades de lujo excepcionales en las ubicaciones más prestigiosas
            </Typography>
            
            <Divider 
              sx={{ 
                my: 4, 
                borderColor: 'rgba(0, 0, 0, 0.06)',
                maxWidth: '200px',
                mx: 'auto',
              }} 
            />
          </Box>

          <Suspense fallback={<Loading />}>
            <PropertyListContainer />
          </Suspense>
        </Container>
      </Box>
    </>
  );
}