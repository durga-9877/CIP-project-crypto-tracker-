import React, { useContext } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PortfolioAnalytics from '../features/portfolio/PortfolioAnalytics';
import MarketData from '../features/market/MarketData';
import TechnicalAnalysis from '../features/analysis/TechnicalAnalysis';
import SocialSentiment from '../features/social/SocialSentiment';

const DashboardContainer = styled(Container)`
  padding: 2rem;
`;

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <DashboardContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {currentUser.email}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Your Crypto Dashboard
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Portfolio Overview
            </Typography>
            <PortfolioAnalytics />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Market Overview
            </Typography>
            <MarketData />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Technical Analysis
            </Typography>
            <TechnicalAnalysis />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Social Sentiment
            </Typography>
            <SocialSentiment />
          </Box>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default Dashboard; 