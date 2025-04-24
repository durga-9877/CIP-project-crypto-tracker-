import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Typography, Box } from '@mui/material';
import MarketData from '../features/market/MarketData';
import RegulatoryInfo from '../components/RegulatoryInfo';
import CoinDetails from '../components/CoinDetails';
import Trading from '../components/Trading';

const MarketContainer = styled.div`
  padding: 2rem;
`;

const SectionTitle = styled(Typography)`
  margin-bottom: 1.5rem;
  color: #ffffff;
`;

const InfoContainer = styled(Box)`
  margin-top: 2rem;
`;

function Market() {
  const [selectedCoin, setSelectedCoin] = useState(null);

  // This would typically come from an API call
  useEffect(() => {
    // Mock data for demonstration
    setSelectedCoin({
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      current_price: 50000,
      market_cap: 1000000000000,
      price_change_percentage_24h: 2.5,
    });
  }, []);

  return (
    <MarketContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SectionTitle variant="h4">
            Market Overview
          </SectionTitle>
        </Grid>

        <Grid item xs={12}>
          <MarketData onCoinSelect={setSelectedCoin} />
        </Grid>

        {selectedCoin && (
          <InfoContainer>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Trading coin={selectedCoin} />
              </Grid>
              <Grid item xs={12} md={4}>
                <RegulatoryInfo coin={selectedCoin} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CoinDetails coin={selectedCoin} />
              </Grid>
            </Grid>
          </InfoContainer>
        )}
      </Grid>
    </MarketContainer>
  );
}

export default Market; 