import React, { useState, useContext } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Switch, FormControlLabel, Button } from '@mui/material';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';

const SettingsContainer = styled(Container)`
  padding: 2rem;
`;

const Settings = () => {
  const { currentUser } = useContext(AuthContext);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSaveSettings = () => {
    // Add settings save logic here
    console.log('Settings saved for user:', currentUser?.email);
  };

  return (
    <SettingsContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your account preferences, {currentUser?.email}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notification Settings
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                }
                label="Enable Notifications"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Appearance
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                  />
                }
                label="Dark Mode"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Security
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={twoFactor}
                    onChange={(e) => setTwoFactor(e.target.checked)}
                  />
                }
                label="Two-Factor Authentication"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveSettings}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </SettingsContainer>
  );
};

export default Settings; 