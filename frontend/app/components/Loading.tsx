import { Box, Skeleton, Grid } from '@mui/material';

export default function Loading() {
  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {Array.from({ length: 9 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ p: 2 }}>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 2 }} />
              <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
