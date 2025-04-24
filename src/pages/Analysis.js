import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import TechnicalAnalysis from '../features/analysis/TechnicalAnalysis';

const AnalysisContainer = styled.div`
  padding: 2rem;
`;

const SectionTitle = styled(Typography)`
  margin-bottom: 1.5rem;
  color: #ffffff;
`;

function Analysis() {
  return (
    <AnalysisContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SectionTitle variant="h4">
            Technical Analysis
          </SectionTitle>
        </Grid>

        <Grid item xs={12}>
          <TechnicalAnalysis />
        </Grid>
      </Grid>
    </AnalysisContainer>
  );
}

export default Analysis; 