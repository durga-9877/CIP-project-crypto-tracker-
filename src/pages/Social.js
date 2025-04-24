import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';

const SocialContainer = styled.div`
  padding: 2rem;
`;

const SectionTitle = styled(Typography)`
  margin-bottom: 1.5rem;
  color: #ffffff;
`;

function Social() {
  return (
    <SocialContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SectionTitle variant="h4">
            Social Sentiment
          </SectionTitle>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Coming soon: Social sentiment analysis and community insights for cryptocurrencies.
          </Typography>
        </Grid>
      </Grid>
    </SocialContainer>
  );
}

export default Social; 