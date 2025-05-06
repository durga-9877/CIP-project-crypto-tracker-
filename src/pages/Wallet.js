import React, { useState, useContext } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';

const WalletContainer = styled(Container)`
  padding: 2rem;
`;

const Wallet = () => {
  const { currentUser } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);

  const handleAddFunds = () => {
    setBalance(prevBalance => prevBalance + 100); // Example: Add $100
  };

  return (
    <WalletContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Wallet
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome, {currentUser?.email}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Balance
              </Typography>
              <Typography variant="h4" sx={{ mb: 2 }}>
                ${balance.toFixed(2)}
              </Typography>
              <Button variant="contained" color="primary" onClick={handleAddFunds}>
                Add Funds
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Transactions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No recent transactions
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Send/Receive
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary">
                  Send
                </Button>
                <Button variant="outlined" color="primary">
                  Receive
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </WalletContainer>
  );
};

export default Wallet; 