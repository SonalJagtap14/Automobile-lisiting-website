import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import AppHeader from '../components/common/AppHeader';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppHeader open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;