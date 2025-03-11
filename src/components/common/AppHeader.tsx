import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Badge, 
  Box,
  Avatar
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Favorite as FavoriteIcon,
  AccountCircle 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface AppHeaderProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ open, handleDrawerOpen }) => {
  const navigate = useNavigate();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: (theme) => theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography 
          variant="h6" 
          noWrap 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Automobile Listings
        </Typography>
        
        <Box sx={{ display: 'flex' }}>
          <IconButton 
            color="inherit" 
            onClick={() => navigate('/wishlist')}
            aria-label="show wishlist"
          >
            <Badge badgeContent={wishlistItems.length} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>
          
          <IconButton
            color="inherit"
            onClick={() => navigate('/profile')}
            aria-label="account"
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;