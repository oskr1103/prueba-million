import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types/property';
import { formatCurrency } from '@/lib/api';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} style={{ textDecoration: 'none' }}>
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <CardMedia 
          sx={{ 
            position: 'relative', 
            height: 320,
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, rgba(10, 10, 10, 0.4) 60%, rgba(10, 10, 10, 0.9) 100%)',
              transition: 'opacity 0.4s ease',
              zIndex: 1,
            },
            '&:hover img': {
              transform: 'scale(1.08)',
            },
          }}
        >
          <Image
            src={property.image}
            alt={property.name}
            fill
            style={{ 
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
            loading="lazy"
          />
          <Box 
            className="property-overlay"
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(183, 110, 121, 0.15) 100%)',
              opacity: 0,
              transition: 'opacity 0.4s ease',
              zIndex: 1,
            }}
          />
          <Box sx={{ 
            position: 'absolute', 
            top: 16, 
            right: 16, 
            zIndex: 2,
            display: 'flex',
            gap: 1,
          }}>
            <Chip 
              label="EXCLUSIVA" 
              size="small"
              sx={{ 
                backgroundColor: '#000000',
                backdropFilter: 'blur(10px)',
                color: '#FFFFFF',
                border: '1px solid #000000',
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
              }} 
            />
          </Box>
        </CardMedia>
        <CardContent 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2,
            p: 3,
            background: '#FFFFFF',
          }}
        >
          <Typography 
            variant="h6" 
            component="h2" 
            sx={{ 
              fontWeight: 600,
              fontSize: '1.25rem',
              color: '#111827',
              lineHeight: 1.3,
              minHeight: '2.6rem',
            }}
          >
            {property.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, color: '#6B7280' }}>
            <LocationOnIcon sx={{ fontSize: 18, mt: 0.3, color: '#000000' }} />
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: '0.875rem',
                lineHeight: 1.4,
                flex: 1,
              }}
            >
              {property.addressProperty}
            </Typography>
          </Box>

          <Box sx={{ 
            mt: 'auto', 
            pt: 2, 
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                color: '#000000',
              }}
            >
              {formatCurrency(property.priceProperty)}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#B8B8B8',
                letterSpacing: '0.1em',
                fontSize: '0.7rem',
              }}
            >
              MXN
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
