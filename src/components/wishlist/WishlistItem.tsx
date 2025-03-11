import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  IconButton, 
  Button,
  Grid
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { removeCarFromWishlist } from '../../features/wishlist/wishlistSlice';
import { CarDTO } from '../../types';
import { AppDispatch } from '../../store';

interface WishlistItemProps {
  car: CarDTO;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ car }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = () => {
    dispatch(removeCarFromWishlist(car.id));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card sx={{ display: 'flex', mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 160 }}
        image={car.image}
        alt={`${car.make} ${car.model}`}
      />
      
      <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
        <Grid container>
          <Grid item xs={10}>
            <Typography component="div" variant="h5">
              {car.make} {car.model}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {car.year} • {car.mileage.toLocaleString()} miles
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {car.fuelType} • {car.transmission} • {car.color}
            </Typography>
            <Typography variant="h6" color="primary">
              {formatPrice(car.price)}
            </Typography>
          </Grid>
          
          <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <IconButton 
              aria-label="remove from wishlist" 
              onClick={handleRemove}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', mt: 'auto', pt: 1 }}>
          <Button size="small" variant="contained" sx={{ mr: 1 }}>
            View Details
          </Button>
          <Button size="small" variant="outlined">
            Contact Seller
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WishlistItem;