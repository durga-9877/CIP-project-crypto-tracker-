import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import PortfolioAnalytics from '../features/portfolio/PortfolioAnalytics';
import MarketData from '../features/market/MarketData';
import TechnicalAnalysis from '../features/analysis/TechnicalAnalysis';
import SocialSentiment from '../features/social/SocialSentiment';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const SectionTitle = styled(Typography)`
  margin-bottom: 1.5rem;
  color: #ffffff;
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SectionTitle variant="h4">
            Welcome to Crypto Tracker
          </SectionTitle>
        </Grid>

        <Grid item xs={12} md={6}>
          <PortfolioAnalytics />
        </Grid>

        <Grid item xs={12} md={6}>
          <MarketData />
        </Grid>

        <Grid item xs={12} md={6}>
          <TechnicalAnalysis />
        </Grid>

        <Grid item xs={12} md={6}>
          <SocialSentiment />
        </Grid>
      </Grid>
    </DashboardContainer>
  );
}

export default Dashboard; 