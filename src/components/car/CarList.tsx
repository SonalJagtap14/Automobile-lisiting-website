import React from 'react';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import CarCard from './CarCard';

const CarList: React.FC = () => {
  const { filteredItems, status, error } = useSelector((state: RootState) => state.cars);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <Typography>No cars match your filters. Try adjusting your criteria.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {filteredItems.map((car) => (
        <Grid item key={car.id} xs={12} sm={6} md={4} lg={3}>
          <CarCard car={car} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CarList;