import React from 'react';
import { 
  Drawer, 
  Toolbar, 
  List, 
  Divider, 
  IconButton, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Box
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Favorite as FavoriteIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const drawerWidth = 240;

const Sidebar: React.FC<SidebarProps> = ({ open, handleDrawerClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Wishlist', icon: <FavoriteIcon />, path: '/wishlist' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 1, justifyContent: 'flex-end' }}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Divider />
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text} 
            disablePadding
            sx={{ 
              backgroundColor: location.pathname === item.path ? 'rgba(0, 0, 0, 0.08)' : 'transparent'
            }}
          >
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;