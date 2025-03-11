import React from 'react';
import { 
  Card, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Button, 
  Typography, 
  Box,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Info as InfoIcon,
  LocalGasStation as GasIcon,
  Speed as SpeedIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { CarDTO } from '../../types';
import { addCarToWishlist, removeCarFromWishlist } from '../../features/wishlist/wishlistSlice';
import { AppDispatch, RootState } from '../../store';

interface CarCardProps {
  car: CarDTO;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const dispatch = useDispatch<AppDispatch>();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
 // const isInWishlist = wishlistItems.includes(car.id);

  // const handleWishlistToggle = () => {
  //   if (isInWishlist) {
  //     dispatch(removeCarFromWishlist(car.id));
  //   } else {
  //     dispatch(addCarToWishlist(car.id));
  //   }
  // };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const isInWishlist = wishlistItems.some((item) => item.id === car.id);

const handleWishlistToggle = () => {
  if (isInWishlist) {
    dispatch(removeCarFromWishlist(car.id));
  } else {
    dispatch(addCarToWishlist(car)); // Pass the whole car object
  }
};
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={car.image}
        alt={`${car.make} ${car.model}`}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {car.make} {car.model}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6" color="text.primary">
            {formatPrice(car.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {car.year}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip 
            icon={<GasIcon />} 
            label={car.fuelType} 
            size="small" 
            color="primary" 
            variant="outlined" 
          />
          <Chip 
            icon={<SpeedIcon />} 
            label={`${car.mileage.toLocaleString()} mi`} 
            size="small" 
            color="primary" 
            variant="outlined" 
          />
          <Chip 
            label={car.transmission} 
            size="small" 
            color="primary" 
            variant="outlined" 
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          Class: {car.class}
        </Typography>
      </CardContent>
      
      <CardActions>
        {/* <Button size="small" variant="contained" color="primary">
          Details
        </Button>
        <Button size="small" variant="outlined">
          Compare
        </Button> */}
        <Box sx={{ ml: 'auto' }}>
          <Tooltip title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}>
            <IconButton
              onClick={handleWishlistToggle}
              color={isInWishlist ? "secondary" : "default"}
              aria-label="add to wishlist"
            >
              {isInWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
};

export default CarCard;