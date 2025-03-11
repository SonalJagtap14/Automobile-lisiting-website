import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ProfileForm from '../components/profile/ProfileForm';

const Profile: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          View and edit your account information.
        </Typography>
      </Box>
      
      <ProfileForm />
    </Container>
  );
};

export default Profile;