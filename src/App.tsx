import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { getCars } from './features/cars/carsSlice';
import { getWishlist } from './features/wishlist/wishlistSlice';
import { getUserInfo } from './features/user/userSlice';
import { AppDispatch } from './store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCars());
    dispatch(getWishlist());
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;