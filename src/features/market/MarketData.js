import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Card, Typography, Chip, CircularProgress } from '@mui/material';
import { TrendingUp, TrendingDown, TrendingFlat } from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MarketContainer = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  margin: 1rem;
`;

const MarketCard = styled(Card)`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  height: 100%;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

const ChartCard = styled(Card)`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  margin-top: 2rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

function MarketData() {
  const [marketData, setMarketData] = useState({
    globalData: {
      totalMarketCap: 0,
      totalVolume: 0,
      marketCapChange: 0,
      activeCryptocurrencies: 0,
      marketCapDominance: {}
    },
    trendingCoins: [],
    marketChart: {
      labels: [],
      datasets: [{
        label: 'Market Cap',
        data: [],
        borderColor: '#00ff88',
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    loading: true
  });

  useEffect(() => {
    // Mock data for demonstration
    const mockData = {
      globalData: {
        totalMarketCap: 1200000000000,
        totalVolume: 80000000000,
        marketCapChange: 2.5,
        activeCryptocurrencies: 12000,
        marketCapDominance: {
          btc: 42.5,
          eth: 18.3,
          others: 39.2
        }
      },
      trendingCoins: [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 45000, change: 2.5 },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3000, change: 1.8 },
        { id: 'solana', name: 'Solana', symbol: 'SOL', price: 100, change: -0.5 }
      ],
      marketChart: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Market Cap',
          data: [1000, 1100, 1050, 1150, 1200, 1250],
          borderColor: '#00ff88',
          backgroundColor: 'rgba(0, 255, 136, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      loading: false
    };

    setMarketData(mockData);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getTrendIcon = (value) => {
    if (value > 0) return <TrendingUp style={{ color: '#00ff88' }} />;
    if (value < 0) return <TrendingDown style={{ color: '#ff4444' }} />;
    return <TrendingFlat style={{ color: '#ffb700' }} />;
  };

  if (marketData.loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  return (
    <MarketContainer>
      <Typography variant="h4" gutterBottom style={{ color: '#ffffff' }}>
        Market Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <MarketCard>
            <Typography variant="h6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Total Market Cap
            </Typography>
            <Typography variant="h4" style={{ color: '#ffffff', margin: '0.5rem 0' }}>
              {formatCurrency(marketData.globalData.totalMarketCap)}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {getTrendIcon(marketData.globalData.marketCapChange)}
              <Typography
                variant="body2"
                style={{
                  color: marketData.globalData.marketCapChange >= 0 ? '#00ff88' : '#ff4444',
                  marginLeft: '0.5rem'
                }}
              >
                {formatPercentage(marketData.globalData.marketCapChange)}
              </Typography>
            </div>
          </MarketCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MarketCard>
            <Typography variant="h6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              24h Volume
            </Typography>
            <Typography variant="h4" style={{ color: '#ffffff', margin: '0.5rem 0' }}>
              {formatCurrency(marketData.globalData.totalVolume)}
            </Typography>
          </MarketCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MarketCard>
            <Typography variant="h6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Active Cryptocurrencies
            </Typography>
            <Typography variant="h4" style={{ color: '#ffffff', margin: '0.5rem 0' }}>
              {marketData.globalData.activeCryptocurrencies.toLocaleString()}
            </Typography>
          </MarketCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MarketCard>
            <Typography variant="h6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Market Dominance
            </Typography>
            <div style={{ marginTop: '0.5rem' }}>
              <Chip
                label={`BTC: ${marketData.globalData.marketCapDominance.btc}%`}
                style={{ margin: '0.25rem', background: '#f7931a', color: '#ffffff' }}
              />
              <Chip
                label={`ETH: ${marketData.globalData.marketCapDominance.eth}%`}
                style={{ margin: '0.25rem', background: '#627eea', color: '#ffffff' }}
              />
              <Chip
                label={`Others: ${marketData.globalData.marketCapDominance.others}%`}
                style={{ margin: '0.25rem', background: '#00ff88', color: '#12152c' }}
              />
            </div>
          </MarketCard>
        </Grid>
      </Grid>

      <ChartCard>
        <Typography variant="h6" gutterBottom style={{ color: '#ffffff' }}>
          Market Cap Trend
        </Typography>
        <Line
          data={marketData.marketChart}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: '#ffffff'
                }
              },
              tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                  label: function(context) {
                    return formatCurrency(context.parsed.y * 1000000000);
                  }
                }
              }
            },
            scales: {
              x: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  color: '#ffffff'
                }
              },
              y: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  color: '#ffffff',
                  callback: function(value) {
                    return formatCurrency(value * 1000000000);
                  }
                }
              }
            }
          }}
        />
      </ChartCard>

      <Typography variant="h5" style={{ color: '#ffffff', marginTop: '2rem', marginBottom: '1rem' }}>
        Trending Coins
      </Typography>
      <Grid container spacing={2}>
        {marketData.trendingCoins.map((coin) => (
          <Grid item xs={12} sm={6} md={4} key={coin.id}>
            <MarketCard>
              <Typography variant="h6" style={{ color: '#ffffff' }}>
                {coin.name} ({coin.symbol})
              </Typography>
              <Typography variant="h4" style={{ color: '#ffffff', margin: '0.5rem 0' }}>
                {formatCurrency(coin.price)}
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {getTrendIcon(coin.change)}
                <Typography
                  variant="body2"
                  style={{
                    color: coin.change >= 0 ? '#00ff88' : '#ff4444',
                    marginLeft: '0.5rem'
                  }}
                >
                  {formatPercentage(coin.change)}
                </Typography>
              </div>
            </MarketCard>
          </Grid>
        ))}
      </Grid>
    </MarketContainer>
  );
}

export default MarketData; 