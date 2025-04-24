import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import PriceAlerts from '../features/alerts/PriceAlerts';

const AlertsContainer = styled.div`
  padding: 2rem;
`;

const SectionTitle = styled(Typography)`
  margin-bottom: 1.5rem;
  color: #ffffff;
`;

function Alerts() {
  return (
    <AlertsContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SectionTitle variant="h4">
            Price Alerts
          </SectionTitle>
        </Grid>

        <Grid item xs={12}>
          <PriceAlerts />
        </Grid>
      </Grid>
    </AlertsContainer>
  );
}

export default Alerts; 