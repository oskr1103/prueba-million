'use client';

import { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, Button, Alert, Skeleton, Chip, Grid, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DiamondIcon from '@mui/icons-material/Diamond';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import { Property } from '@/types/property';
import { getPropertyById, formatCurrency } from '@/lib/api';

// Función para generar storytelling desde el nombre
function generateStory(name: string, address: string): string {
  const keywords = name.toLowerCase();
  let story = '';

  if (keywords.includes('moderna') || keywords.includes('contemporánea')) {
    story = 'Esta excepcional residencia representa la cumbre del diseño contemporáneo. ';
  } else if (keywords.includes('colonial') || keywords.includes('clásica')) {
    story = 'Una joya arquitectónica que combina la elegancia atemporal con el confort moderno. ';
  } else if (keywords.includes('penthouse') || keywords.includes('departamento')) {
    story = 'Experimente el lujo elevado en esta exclusiva residencia de altura. ';
  } else {
    story = 'Una propiedad excepcional que redefine los estándares del lujo residencial. ';
  }

  const city = address.split(',').pop()?.trim() || 'la ciudad';
  story += `Ubicada en una de las zonas más prestigiosas de ${city}, esta propiedad ofrece una experiencia de vida sin igual. `;
  story += 'Cada detalle ha sido cuidadosamente considerado para crear un santuario de sofisticación y confort, donde la elegancia se encuentra con la funcionalidad suprema.';

  return story;
}

export default function PropertyDetail({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [priceVisible, setPriceVisible] = useState(false);
  const router = useRouter();
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPropertyById(params.id);
        setProperty(data);
      } catch (err) {
        setError('No se pudo cargar la propiedad');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPriceVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (priceRef.current) {
      observer.observe(priceRef.current);
    }

    return () => observer.disconnect();
  }, [property]);

  return (
    <>
      <Header />
      <Box sx={{ 
        background: '#FAF8F5',
        minHeight: '100vh',
        position: 'relative',
      }}>
        {loading ? (
          <Box sx={{ pt: 10 }}>
            <Skeleton variant="rectangular" height="100vh" sx={{ bgcolor: 'rgba(26, 26, 26, 0.8)' }} />
          </Box>
        ) : error ? (
          <Container maxWidth="lg" sx={{ py: 12 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => router.back()}
            sx={{ 
              mb: 4,
              color: '#000000',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
            }}
            >
              Volver
            </Button>
            <Alert 
              severity="error" 
              sx={{ 
                backgroundColor: 'rgba(183, 110, 121, 0.1)',
                border: '1px solid rgba(183, 110, 121, 0.3)',
                color: '#B76E79',
              }}
            >
              {error}
            </Alert>
          </Container>
        ) : property ? (
            <>
              {/* HERO SECTION - Compacto con Parallax */}
              <Box sx={{ 
                position: 'relative', 
                height: { xs: '70vh', md: '75vh' },
                maxHeight: '800px',
                overflow: 'hidden',
              }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    transform: `translateY(${scrollY * 0.4}px)`,
                    transition: 'transform 0.1s ease-out',
                  }}
                >
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </Box>

                {/* Overlay Gradient - Más oscuro para mejor contraste */}
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(5, 5, 5, 0.6) 0%, rgba(5, 5, 5, 0.3) 40%, rgba(5, 5, 5, 0.8) 100%)',
                    zIndex: 1,
                  }}
                />

                {/* Botón Volver (Top Left) */}
                <Box sx={{ position: 'absolute', top: 100, left: 32, zIndex: 3 }}>
                  <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => router.back()}
                    sx={{ 
                      color: '#FFFFFF',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      px: 3,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        borderColor: '#D4AF37',
                      }
                    }}
                  >
                    Volver
                  </Button>
                </Box>

                {/* Badge Exclusiva (Top Right) */}
                <Box sx={{ position: 'absolute', top: 100, right: 32, zIndex: 3 }}>
                  <Chip 
                    icon={<DiamondIcon sx={{ color: '#FFFFFF !important' }} />}
                    label="EXCLUSIVA"
                    sx={{
                      backgroundColor: '#000000',
                      backdropFilter: 'blur(20px)',
                      color: '#FFFFFF',
                      border: '1px solid #000000',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      fontSize: '0.875rem',
                      py: 3,
                      px: 1,
                    }}
                  />
                </Box>

                {/* Título y Ubicación (Centrado Verticalmente) */}
                <Container maxWidth="xl" sx={{ 
                  position: 'absolute', 
                  top: '50%',
                  left: 0, 
                  right: 0, 
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  px: { xs: 3, md: 6 },
                }}>
                  <Box
                    sx={{
                      opacity: scrollY < 200 ? 1 : 0.7,
                      transform: `translateY(${Math.min(scrollY * 0.3, 30)}px)`,
                      transition: 'all 0.3s ease-out',
                    }}
                  >
                    <Typography 
                      variant="h1" 
                      sx={{ 
                        fontWeight: 700,
                        color: '#FFFFFF',
                        fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                        lineHeight: 1.15,
                        mb: 3,
                        textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4)',
                        maxWidth: '90%',
                      }}
                    >
                      {property.name}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                      <LocationOnIcon sx={{ color: '#FFFFFF', fontSize: { xs: 24, md: 28 } }} />
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: '#FFFFFF',
                          fontWeight: 300,
                          letterSpacing: '0.02em',
                          fontSize: { xs: '1rem', md: '1.25rem' },
                          textShadow: '0 4px 16px rgba(0,0,0,0.9)',
                        }}
                      >
                        {property.addressProperty}
                      </Typography>
                    </Box>
                  </Box>
                </Container>

                {/* Scroll Indicator */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 30,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    zIndex: 2,
                    opacity: scrollY < 100 ? 1 : 0,
                    transition: 'opacity 0.3s ease-out',
                  }}
                >
                  <Typography 
                    sx={{ 
                      color: '#FFFFFF', 
                      fontSize: '0.7rem', 
                      letterSpacing: '0.2em',
                      fontWeight: 600,
                    }}
                  >
                    EXPLORAR
                  </Typography>
                  <KeyboardArrowDownIcon 
                    sx={{ 
                      color: '#FFFFFF',
                      fontSize: 28,
                      animation: 'bounce 2s infinite',
                      '@keyframes bounce': {
                        '0%, 100%': { transform: 'translateY(0)' },
                        '50%': { transform: 'translateY(8px)' },
                      }
                    }} 
                  />
                </Box>
              </Box>


              {/* SECCIÓN DE CONTENIDO */}
              <Container maxWidth="xl" sx={{ py: { xs: 8, md: 16 } }}>
                {/* SECCIÓN PRECIO Y INFO RÁPIDA */}
                <Grid container spacing={8} sx={{ mb: 16 }}>
                  {/* Columna Izquierda - Precio */}
                  <Grid item xs={12} md={6}>
                    <Box ref={priceRef}>
                      <Typography 
                        variant="overline" 
                        sx={{ 
                          color: '#78716C',
                          letterSpacing: '0.2em',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          display: 'block',
                          mb: 2,
                        }}
                      >
                        INVERSIÓN EXCLUSIVA
                      </Typography>
                      <Typography 
                        variant="h2" 
                        sx={{ 
                          fontWeight: 700,
                          color: '#1A1A1A',
                          fontSize: { xs: '3rem', md: '4.5rem' },
                          lineHeight: 1,
                          mb: 1,
                          opacity: priceVisible ? 1 : 0,
                          transform: priceVisible ? 'translateY(0)' : 'translateY(30px)',
                          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        {formatCurrency(property.priceProperty)}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: '#78716C',
                          letterSpacing: '0.15em',
                          fontSize: '0.875rem',
                        }}
                      >
                        DÓLARES AMERICANOS
                      </Typography>

                      {/* CTAs Primarios */}
                      <Box sx={{ display: 'flex', gap: 2, mt: 6, flexWrap: 'wrap' }}>
                        <Button 
                          variant="contained"
                          size="large"
                          sx={{ 
                            minWidth: 220,
                            py: 2,
                            fontSize: '0.875rem',
                          }}
                        >
                          Solicitar Información
                        </Button>
                        <Button 
                          variant="outlined"
                          size="large"
                          startIcon={<CalendarMonthIcon />}
                          sx={{ 
                            minWidth: 220,
                            py: 2,
                            fontSize: '0.875rem',
                          }}
                        >
                          Agendar Visita
                        </Button>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Columna Derecha - Detalles Rápidos */}
                  <Grid item xs={12} md={6}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                        p: 5,
                        background: '#FFFFFF',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        borderRadius: 3,
                      }}
                    >
                      <Typography 
                        variant="overline" 
                        sx={{ 
                          color: '#78716C',
                          letterSpacing: '0.2em',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          mb: 4,
                          display: 'block',
                        }}
                      >
                        DETALLES DE LA PROPIEDAD
                      </Typography>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: '#78716C',
                              letterSpacing: '0.12em',
                              fontSize: '0.7rem',
                              display: 'block',
                              mb: 0.5,
                            }}
                          >
                            UBICACIÓN
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationOnIcon sx={{ color: '#1A1A1A', fontSize: 20 }} />
                            <Typography 
                              sx={{ 
                                color: '#1C1917',
                                fontSize: '1rem',
                              }}
                            >
                              {property.addressProperty}
                            </Typography>
                          </Box>
                        </Box>

                        <Box>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: '#78716C',
                              letterSpacing: '0.12em',
                              fontSize: '0.7rem',
                              display: 'block',
                              mb: 0.5,
                            }}
                          >
                            CÓDIGO DE REFERENCIA
                          </Typography>
                          <Typography 
                            sx={{ 
                              fontFamily: 'monospace',
                              color: '#1A1A1A',
                              fontSize: '0.95rem',
                            }}
                          >
                            {property.id}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: '#78716C',
                              letterSpacing: '0.12em',
                              fontSize: '0.7rem',
                              display: 'block',
                              mb: 0.5,
                            }}
                          >
                            TIPO DE PROPIEDAD
                          </Typography>
                          <Typography 
                            sx={{ 
                              color: '#1C1917',
                              fontSize: '1rem',
                            }}
                          >
                            Residencia de Lujo
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>

                {/* SECCIÓN STORYTELLING */}
                <Box sx={{ mb: 16 }}>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#1C1917',
                      fontSize: { xs: '2rem', md: '2.75rem' },
                      mb: 4,
                      textAlign: 'center',
                    }}
                  >
                    Sobre Esta Residencia
                  </Typography>
                  <Box 
                    sx={{ 
                      maxWidth: 900, 
                      mx: 'auto',
                      px: { xs: 2, md: 0 },
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#78716C',
                        fontSize: { xs: '1.05rem', md: '1.15rem' },
                        lineHeight: 2,
                        textAlign: 'center',
                        fontWeight: 300,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {generateStory(property.name, property.addressProperty)}
                    </Typography>
                  </Box>
                </Box>

                {/* SECCIÓN CTAs FINALES */}
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: { xs: 6, md: 8 },
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: 3,
                    textAlign: 'center',
                  }}
                >
                  <DiamondIcon sx={{ fontSize: 48, color: '#1A1A1A', mb: 3, opacity: 0.8 }} />
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#1C1917',
                      mb: 2,
                    }}
                  >
                    Descubre Tu Nueva Residencia
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#78716C',
                      mb: 5,
                      maxWidth: 600,
                      mx: 'auto',
                    }}
                  >
                    Nuestro equipo de expertos está listo para guiarte en cada paso hacia tu nueva inversión exclusiva
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button 
                      variant="contained"
                      size="large"
                      sx={{ 
                        minWidth: 240,
                        py: 2,
                      }}
                    >
                      Solicitar Información
                    </Button>
                    <Button 
                      variant="outlined"
                      size="large"
                      startIcon={<ShareIcon />}
                      sx={{ 
                        minWidth: 180,
                        py: 2,
                      }}
                    >
                      Compartir
                    </Button>
                    <Button 
                      variant="outlined"
                      size="large"
                      startIcon={<FavoriteIcon />}
                      sx={{ 
                        minWidth: 180,
                        py: 2,
                      }}
                    >
                      Guardar
                    </Button>
                  </Box>
                </Paper>
              </Container>
            </>
          ) : (
            <Container maxWidth="lg" sx={{ py: 20 }}>
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: 12,
                  px: 4,
                  borderRadius: 3,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  background: '#FFFFFF',
                }}
              >
                <DiamondIcon sx={{ fontSize: 72, color: '#1A1A1A', mb: 4, opacity: 0.4 }} />
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: '#1C1917',
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  Propiedad No Encontrada
                </Typography>
                <Typography variant="body1" sx={{ color: '#78716C', mb: 4 }}>
                  Esta propiedad exclusiva no está disponible en este momento
                </Typography>
                <Button 
                  variant="contained"
                  onClick={() => router.back()}
                  sx={{ minWidth: 200 }}
                >
                  Volver al Catálogo
                </Button>
              </Box>
            </Container>
          )}
      </Box>
    </>
  );
}
