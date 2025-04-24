import React, { useState, useEffect } from 'react';
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
import styled from 'styled-components';
import { Card, Typography, Grid, Paper } from '@mui/material';
import { TrendingUp, TrendingDown, TrendingFlat } from '@mui/icons-material';

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

const AnalyticsContainer = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  margin: 1rem;
`;

const MetricCard = styled(Card)`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

const ChartContainer = styled(Paper)`
  padding: 2rem;
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
`;

function PortfolioAnalytics() {
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 0,
    dailyChange: 0,
    weeklyChange: 0,
    monthlyChange: 0,
    chartData: {
      labels: [],
      datasets: [{
        label: 'Portfolio Value',
        data: [],
        borderColor: '#00ff88',
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        tension: 0.4,
        fill: true
      }]
    }
  });

  useEffect(() => {
    // Mock data for demonstration
    const mockData = {
      totalValue: 12500.45,
      dailyChange: 2.5,
      weeklyChange: -1.2,
      monthlyChange: 15.8,
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Portfolio Value',
          data: [10000, 10500, 11000, 11500, 12000, 12500],
          borderColor: '#00ff88',
          backgroundColor: 'rgba(0, 255, 136, 0.1)',
          tension: 0.4,
          fill: true
        }]
      }
    };

    setPortfolioData(mockData);
  }, []);

  const getTrendIcon = (value) => {
    if (value > 0) return <TrendingUp style={{ color: '#00ff88' }} />;
    if (value < 0) return <TrendingDown style={{ color: '#ff4444' }} />;
    return <TrendingFlat style={{ color: '#ffb700' }} />;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <AnalyticsContainer>
      <Typography variant="h4" gutterBottom style={{ color: '#ffffff' }}>
        Portfolio Analytics
      </Typography>

      <Grid container spacing={3} style={{ marginTop: '1rem' }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard>
            <Typography variant="h6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Total Value
            </Typography>
            <Typography variant="h4" style={{ color: '#ffffff', margin: '0.5rem 0' }}>
              {formatCurrency(portfolioData.totalValue)}
            </Typography>
          </MetricCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard>
            <Typography variant="h6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              24h Change
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0' }}>
              {getTrendIcon(portfolioData.dailyChange)}
              <Typography variant="h4" style={{ 
                color: portfolioData.dailyChange >= 0 ? '#00ff88' : '#ff4444',
                marginLeft: '0.5rem'
              }}>
                {formatPercentage(portfolioData.dailyChange)}
              </Typography>
            </div>
          </MetricCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard>
            <Typography variant="h6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              7d Change
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0' }}>
              {getTrendIcon(portfolioData.weeklyChange)}
              <Typography variant="h4" style={{ 
                color: portfolioData.weeklyChange >= 0 ? '#00ff88' : '#ff4444',
                marginLeft: '0.5rem'
              }}>
                {formatPercentage(portfolioData.weeklyChange)}
              </Typography>
            </div>
          </MetricCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard>
            <Typography variant="h6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              30d Change
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0' }}>
              {getTrendIcon(portfolioData.monthlyChange)}
              <Typography variant="h4" style={{ 
                color: portfolioData.monthlyChange >= 0 ? '#00ff88' : '#ff4444',
                marginLeft: '0.5rem'
              }}>
                {formatPercentage(portfolioData.monthlyChange)}
              </Typography>
            </div>
          </MetricCard>
        </Grid>
      </Grid>

      <ChartContainer>
        <Typography variant="h6" gutterBottom style={{ color: '#ffffff' }}>
          Portfolio Value Over Time
        </Typography>
        <Line
          data={portfolioData.chartData}
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
      </ChartContainer>
    </AnalyticsContainer>
  );
}

export default PortfolioAnalytics; 