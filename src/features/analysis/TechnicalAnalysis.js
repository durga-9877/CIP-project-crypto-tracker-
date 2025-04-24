import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Card,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Tabs,
  Tab,
  Box
} from '@mui/material';
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

const AnalysisContainer = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  margin: 1rem;
`;

const AnalysisCard = styled(Card)`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const IndicatorCard = styled(Card)`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analysis-tabpanel-${index}`}
      aria-labelledby={`analysis-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

function TechnicalAnalysis() {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [timeframe, setTimeframe] = useState('1d');
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState({
    priceData: {
      labels: [],
      datasets: [{
        label: 'Price',
        data: [],
        borderColor: '#00ff88',
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    indicators: {
      rsi: 0,
      macd: {
        value: 0,
        signal: 0,
        histogram: 0
      },
      sma: {
        short: 0,
        medium: 0,
        long: 0
      }
    }
  });

  useEffect(() => {
    // Mock data for demonstration
    const mockData = {
      priceData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Price',
          data: [45000, 46000, 45500, 47000, 46500, 48000],
          borderColor: '#00ff88',
          backgroundColor: 'rgba(0, 255, 136, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      indicators: {
        rsi: 65.4,
        macd: {
          value: 0.5,
          signal: 0.3,
          histogram: 0.2
        },
        sma: {
          short: 47500,
          medium: 47000,
          long: 46500
        }
      }
    };

    setAnalysisData(mockData);
  }, [selectedCoin, timeframe]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <AnalysisContainer>
      <Typography variant="h4" gutterBottom style={{ color: '#ffffff' }}>
        Technical Analysis
      </Typography>

      <Grid container spacing={2} style={{ marginBottom: '2rem' }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Select Coin</InputLabel>
            <Select
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
              style={{ color: '#ffffff', background: 'rgba(255, 255, 255, 0.02)' }}
            >
              <MenuItem value="bitcoin">Bitcoin (BTC)</MenuItem>
              <MenuItem value="ethereum">Ethereum (ETH)</MenuItem>
              <MenuItem value="solana">Solana (SOL)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Timeframe</InputLabel>
            <Select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              style={{ color: '#ffffff', background: 'rgba(255, 255, 255, 0.02)' }}
            >
              <MenuItem value="1h">1 Hour</MenuItem>
              <MenuItem value="1d">1 Day</MenuItem>
              <MenuItem value="1w">1 Week</MenuItem>
              <MenuItem value="1m">1 Month</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        style={{ marginBottom: '1rem' }}
      >
        <Tab label="Price Chart" style={{ color: '#ffffff' }} />
        <Tab label="Indicators" style={{ color: '#ffffff' }} />
        <Tab label="Analysis" style={{ color: '#ffffff' }} />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <AnalysisCard>
          <Typography variant="h6" gutterBottom style={{ color: '#ffffff' }}>
            Price Chart
          </Typography>
          <Line
            data={analysisData.priceData}
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
                      return formatCurrency(context.parsed.y);
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
                      return formatCurrency(value);
                    }
                  }
                }
              }
            }}
          />
        </AnalysisCard>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <IndicatorCard>
              <Typography variant="h6" style={{ color: '#ffffff' }}>
                RSI (14)
              </Typography>
              <Typography variant="h4" style={{ 
                color: analysisData.indicators.rsi > 70 ? '#ff4444' : 
                       analysisData.indicators.rsi < 30 ? '#00ff88' : '#ffffff',
                margin: '0.5rem 0'
              }}>
                {analysisData.indicators.rsi.toFixed(2)}
              </Typography>
              <Typography variant="body2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {analysisData.indicators.rsi > 70 ? 'Overbought' :
                 analysisData.indicators.rsi < 30 ? 'Oversold' : 'Neutral'}
              </Typography>
            </IndicatorCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <IndicatorCard>
              <Typography variant="h6" style={{ color: '#ffffff' }}>
                MACD
              </Typography>
              <Typography variant="body1" style={{ color: '#ffffff' }}>
                Value: {analysisData.indicators.macd.value.toFixed(4)}
              </Typography>
              <Typography variant="body1" style={{ color: '#ffffff' }}>
                Signal: {analysisData.indicators.macd.signal.toFixed(4)}
              </Typography>
              <Typography variant="body1" style={{ 
                color: analysisData.indicators.macd.histogram > 0 ? '#00ff88' : '#ff4444'
              }}>
                Histogram: {analysisData.indicators.macd.histogram.toFixed(4)}
              </Typography>
            </IndicatorCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <IndicatorCard>
              <Typography variant="h6" style={{ color: '#ffffff' }}>
                Moving Averages
              </Typography>
              <Typography variant="body1" style={{ color: '#ffffff' }}>
                SMA (20): {formatCurrency(analysisData.indicators.sma.short)}
              </Typography>
              <Typography variant="body1" style={{ color: '#ffffff' }}>
                SMA (50): {formatCurrency(analysisData.indicators.sma.medium)}
              </Typography>
              <Typography variant="body1" style={{ color: '#ffffff' }}>
                SMA (200): {formatCurrency(analysisData.indicators.sma.long)}
              </Typography>
            </IndicatorCard>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <AnalysisCard>
          <Typography variant="h6" gutterBottom style={{ color: '#ffffff' }}>
            Technical Analysis Summary
          </Typography>
          <Typography variant="body1" style={{ color: '#ffffff', marginBottom: '1rem' }}>
            Based on the current indicators:
          </Typography>
          <ul style={{ color: '#ffffff', paddingLeft: '1.5rem' }}>
            <li>
              RSI is {analysisData.indicators.rsi > 70 ? 'indicating overbought conditions' :
                      analysisData.indicators.rsi < 30 ? 'indicating oversold conditions' :
                      'in neutral territory'}
            </li>
            <li>
              MACD is showing {analysisData.indicators.macd.histogram > 0 ? 'bullish' : 'bearish'} momentum
            </li>
            <li>
              Moving averages are {analysisData.indicators.sma.short > analysisData.indicators.sma.long ?
                                'in a bullish alignment' : 'in a bearish alignment'}
            </li>
          </ul>
        </AnalysisCard>
      </TabPanel>
    </AnalysisContainer>
  );
}

export default TechnicalAnalysis; 