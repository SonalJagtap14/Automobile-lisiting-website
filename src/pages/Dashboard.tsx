import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import FilterBar from '../components/car/FilterBar';
import CarList from '../components/car/CarList';

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Browse Cars
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Explore our curated collection of vehicles. Use filters to find your perfect match.
        </Typography>
      </Box>
      
      <FilterBar />
      <CarList />
    </Container>
  );
};

export default Dashboard;