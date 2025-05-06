import React, { useState, useContext } from 'react';
import { Box, Container, Typography, TextField, Button, Avatar, Grid } from '@mui/material';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';

const ProfileContainer = styled(Container)`
  padding: 2rem;
`;

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // Add profile update logic here
  };

  return (
    <ProfileContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile Settings
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
            <Avatar
              sx={{ width: 120, height: 120, mb: 2 }}
              src={currentUser?.photoURL}
            />
            <Typography variant="h6">{currentUser?.displayName || 'User'}</Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUser?.email}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box component="form" onSubmit={handleUpdateProfile} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <TextField
              fullWidth
              label="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              disabled
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Update Profile
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ProfileContainer>
  );
};

export default Profile; 