import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import Link from 'next/link';

export default function Header() {
  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1.5 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <DiamondIcon sx={{ fontSize: 32, color: '#000000' }} />
              <Box>
                <Typography 
                  variant="h5" 
                  component="div" 
                  sx={{ 
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: '#000000',
                  }}
                >
                  MILLION
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#6B7280',
                    letterSpacing: '0.2em',
                    fontSize: '0.65rem',
                    fontWeight: 400,
                  }}
                >
                  EXCLUSIVE REAL ESTATE
                </Typography>
              </Box>
            </Box>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
