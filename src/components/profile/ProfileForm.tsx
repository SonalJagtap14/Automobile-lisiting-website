import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Typography, 
  Avatar,
  Snackbar,
  Alert
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../../features/user/userSlice';
import { AppDispatch, RootState } from '../../store';
import { UserDTO } from '../../types';

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: user, status } = useSelector((state: RootState) => state.user);
  
  const [formData, setFormData] = useState<Partial<UserDTO>>({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      dispatch(updateUserInfo({
        ...user,
        ...formData
      }));
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}>
          <PersonIcon fontSize="large" />
        </Avatar>
        <Typography variant="h5" component="h2">
          User Profile
        </Typography>
      </Box>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={2}
            />
          </Grid>
          
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              type="submit" 
              variant="contained"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Saving...' : 'Save Changes'}
            </Button>
          </Grid>
        </Grid>
      </form>
      
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ProfileForm;