import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import PortfolioAnalytics from '../features/portfolio/PortfolioAnalytics';

const PortfolioContainer = styled.div`
  padding: 2rem;
`;

const SectionTitle = styled(Typography)`
  margin-bottom: 1.5rem;
  color: #ffffff;
`;

function Portfolio() {
  return (
    <PortfolioContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SectionTitle variant="h4">
            My Portfolio
          </SectionTitle>
        </Grid>

        <Grid item xs={12}>
          <PortfolioAnalytics />
        </Grid>
      </Grid>
    </PortfolioContainer>
  );
}

export default Portfolio; 