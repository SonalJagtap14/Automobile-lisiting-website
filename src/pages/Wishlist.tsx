import React, { useEffect } from 'react';
import { Container, Typography, Box, Button, Divider, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import WishlistItem from '../components/wishlist/WishlistItem';

const Wishlist: React.FC = () => {
  // const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  // const { items: cars } = useSelector((state: RootState) => state.cars);

const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
const wishlistedCars = wishlistItems; // No need to filter anymore

  // Filter cars that are in the wishlist
  //const wishlistedCars = cars.filter(car => wishlistItems.includes(car.id));

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Wishlist
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          View and manage your favorite cars.
        </Typography>
      </Box>
      
      {wishlistedCars.length > 0 ? (
        <Paper sx={{ p: 2 }}>
          {wishlistedCars.map(car => (
            <React.Fragment key={car.id}>
              <WishlistItem car={car} />
              <Divider sx={{ my: 2 }} />
            </React.Fragment>
          ))}
        </Paper>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 2,
          p: 5,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1
        }}>
          <Typography variant="h6">Your wishlist is empty</Typography>
          <Typography variant="body2" color="text.secondary">
            Start browsing our collection and add cars to your wishlist.
          </Typography>
          <Button 
            component={RouterLink} 
            to="/" 
            variant="contained" 
            color="primary"
            sx={{ mt: 2 }}
          >
            Browse Cars
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Wishlist;