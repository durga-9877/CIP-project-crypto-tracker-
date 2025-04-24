import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Card,
  Typography,
  Grid,
  CircularProgress,
  Tabs,
  Tab,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip
} from '@mui/material';
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

const SocialContainer = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  margin: 1rem;
`;

const SocialCard = styled(Card)`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const MetricCard = styled(Card)`
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
      id={`social-tabpanel-${index}`}
      aria-labelledby={`social-tab-${index}`}
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

function SocialSentiment() {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sentimentData, setSentimentData] = useState({
    twitter: {
      mentions: 12500,
      sentiment: 0.65,
      trending: true,
      tweets: [
        { id: 1, text: 'Bitcoin showing strong support at $45k! 🚀', author: '@cryptoexpert', time: '2h ago' },
        { id: 2, text: 'Ethereum 2.0 upgrade is coming soon! #ETH', author: '@ethdev', time: '3h ago' },
        { id: 3, text: 'New DeFi project launching on Solana! #SOL', author: '@defi_news', time: '4h ago' }
      ]
    },
    reddit: {
      mentions: 8500,
      sentiment: 0.55,
      trending: true,
      posts: [
        { id: 1, title: 'Bitcoin Price Analysis - Bullish Pattern Forming', subreddit: 'r/Bitcoin', time: '5h ago' },
        { id: 2, title: 'Ethereum Layer 2 Solutions Comparison', subreddit: 'r/ethereum', time: '6h ago' },
        { id: 3, title: 'Solana Ecosystem Growth', subreddit: 'r/solana', time: '7h ago' }
      ]
    },
    google: {
      trends: [
        { term: 'Bitcoin', score: 85 },
        { term: 'Ethereum', score: 75 },
        { term: 'Solana', score: 65 }
      ]
    },
    sentimentChart: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Sentiment Score',
        data: [0.4, 0.5, 0.6, 0.55, 0.65, 0.7],
        borderColor: '#00ff88',
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        tension: 0.4,
        fill: true
      }]
    }
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getSentimentColor = (score) => {
    if (score > 0.7) return '#00ff88';
    if (score < 0.3) return '#ff4444';
    return '#ffb700';
  };

  const getSentimentLabel = (score) => {
    if (score > 0.7) return 'Very Positive';
    if (score > 0.5) return 'Positive';
    if (score > 0.3) return 'Neutral';
    return 'Negative';
  };

  return (
    <SocialContainer>
      <Typography variant="h4" gutterBottom style={{ color: '#ffffff' }}>
        Social Sentiment
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        style={{ marginBottom: '1rem' }}
      >
        <Tab label="Overview" style={{ color: '#ffffff' }} />
        <Tab label="Twitter" style={{ color: '#ffffff' }} />
        <Tab label="Reddit" style={{ color: '#ffffff' }} />
        <Tab label="Google Trends" style={{ color: '#ffffff' }} />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard>
              <Typography variant="h6" style={{ color: '#ffffff' }}>
                Twitter Mentions
              </Typography>
              <Typography variant="h4" style={{ color: '#ffffff', margin: '0.5rem 0' }}>
                {sentimentData.twitter.mentions.toLocaleString()}
              </Typography>
              <Chip
                label={sentimentData.twitter.trending ? 'Trending Up' : 'Stable'}
                color={sentimentData.twitter.trending ? 'success' : 'default'}
                size="small"
              />
            </MetricCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MetricCard>
              <Typography variant="h6" style={{ color: '#ffffff' }}>
                Reddit Mentions
              </Typography>
              <Typography variant="h4" style={{ color: '#ffffff', margin: '0.5rem 0' }}>
                {sentimentData.reddit.mentions.toLocaleString()}
              </Typography>
              <Chip
                label={sentimentData.reddit.trending ? 'Trending Up' : 'Stable'}
                color={sentimentData.reddit.trending ? 'success' : 'default'}
                size="small"
              />
            </MetricCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MetricCard>
              <Typography variant="h6" style={{ color: '#ffffff' }}>
                Twitter Sentiment
              </Typography>
              <Typography variant="h4" style={{ 
                color: getSentimentColor(sentimentData.twitter.sentiment),
                margin: '0.5rem 0'
              }}>
                {(sentimentData.twitter.sentiment * 100).toFixed(1)}%
              </Typography>
              <Typography variant="body2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {getSentimentLabel(sentimentData.twitter.sentiment)}
              </Typography>
            </MetricCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MetricCard>
              <Typography variant="h6" style={{ color: '#ffffff' }}>
                Reddit Sentiment
              </Typography>
              <Typography variant="h4" style={{ 
                color: getSentimentColor(sentimentData.reddit.sentiment),
                margin: '0.5rem 0'
              }}>
                {(sentimentData.reddit.sentiment * 100).toFixed(1)}%
              </Typography>
              <Typography variant="body2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {getSentimentLabel(sentimentData.reddit.sentiment)}
              </Typography>
            </MetricCard>
          </Grid>
        </Grid>

        <SocialCard>
          <Typography variant="h6" gutterBottom style={{ color: '#ffffff' }}>
            Sentiment Trend
          </Typography>
          <Line
            data={sentimentData.sentimentChart}
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
                      return `Sentiment: ${(context.parsed.y * 100).toFixed(1)}%`;
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
                      return `${(value * 100).toFixed(0)}%`;
                    }
                  }
                }
              }
            }}
          />
        </SocialCard>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <SocialCard>
          <Typography variant="h6" gutterBottom style={{ color: '#ffffff' }}>
            Recent Tweets
          </Typography>
          <List>
            {sentimentData.twitter.tweets.map((tweet) => (
              <ListItem
                key={tweet.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  marginBottom: '0.5rem'
                }}
              >
                <ListItemAvatar>
                  <Avatar>{tweet.author.charAt(1)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography style={{ color: '#ffffff' }}>
                      {tweet.text}
                    </Typography>
                  }
                  secondary={
                    <Typography style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      {tweet.author} • {tweet.time}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </SocialCard>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <SocialCard>
          <Typography variant="h6" gutterBottom style={{ color: '#ffffff' }}>
            Recent Reddit Posts
          </Typography>
          <List>
            {sentimentData.reddit.posts.map((post) => (
              <ListItem
                key={post.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  marginBottom: '0.5rem'
                }}
              >
                <ListItemText
                  primary={
                    <Typography style={{ color: '#ffffff' }}>
                      {post.title}
                    </Typography>
                  }
                  secondary={
                    <Typography style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      {post.subreddit} • {post.time}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </SocialCard>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <SocialCard>
          <Typography variant="h6" gutterBottom style={{ color: '#ffffff' }}>
            Google Trends
          </Typography>
          <List>
            {sentimentData.google.trends.map((trend, index) => (
              <ListItem
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  marginBottom: '0.5rem'
                }}
              >
                <ListItemText
                  primary={
                    <Typography style={{ color: '#ffffff' }}>
                      {trend.term}
                    </Typography>
                  }
                  secondary={
                    <Typography style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      Interest Score: {trend.score}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </SocialCard>
      </TabPanel>
    </SocialContainer>
  );
}

export default SocialSentiment; 