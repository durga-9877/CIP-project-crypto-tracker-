import React from 'react';
import styled from 'styled-components';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Code as CodeIcon,
  Storage as StorageIcon,
  Timeline as TimelineIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
  TrendingUp as TrendingIcon,
  TrendingDown as DownIcon,
  Link as LinkIcon,
  GitHub as GitHubIcon,
  Description as DocIcon,
  Public as PublicIcon,
} from '@mui/icons-material';

const DetailsCard = styled(Card)`
  background: rgba(26, 31, 60, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const InfoItem = styled(Box)`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  color: rgba(255, 255, 255, 0.7);
  
  svg {
    margin-right: 0.5rem;
    color: #FFB700;
  }
`;

const SectionTitle = styled(Typography)`
  color: #ffffff;
  margin-bottom: 1rem;
`;

const StyledChip = styled(Chip)`
  margin: 0.25rem;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
  
  &.positive {
    background: rgba(0, 255, 136, 0.1);
    color: #00ff88;
  }
  
  &.negative {
    background: rgba(255, 0, 0, 0.1);
    color: #ff4444;
  }
`;

const LinkItem = styled.a`
  display: flex;
  align-items: center;
  color: #FFB700;
  text-decoration: none;
  margin: 0.5rem 0;
  transition: all 0.3s ease;
  
  &:hover {
    color: #FF9900;
    text-decoration: underline;
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

function CoinDetails({ coin }) {
  // Mock data for coin details
  const coinDetails = {
    'bitcoin': {
      technology: 'Proof of Work',
      consensus: 'SHA-256',
      blockTime: '10 minutes',
      maxSupply: '21,000,000',
      circulatingSupply: '19,500,000',
      marketDominance: '40%',
      developmentStatus: 'Active',
      whitepaper: 'https://bitcoin.org/bitcoin.pdf',
      github: 'https://github.com/bitcoin/bitcoin',
      website: 'https://bitcoin.org',
      explorer: 'https://blockchain.info',
      community: {
        twitter: 'https://twitter.com/bitcoin',
        reddit: 'https://reddit.com/r/bitcoin',
        telegram: 'https://t.me/bitcoin',
      },
      metrics: {
        allTimeHigh: 69000,
        allTimeLow: 0.01,
        marketCapRank: 1,
        liquidityScore: 95,
        developerScore: 90,
        communityScore: 95,
      }
    },
    'ethereum': {
      technology: 'Proof of Stake',
      consensus: 'Ethash',
      blockTime: '12 seconds',
      maxSupply: 'No limit',
      circulatingSupply: '120,000,000',
      marketDominance: '20%',
      developmentStatus: 'Active',
      whitepaper: 'https://ethereum.org/en/whitepaper/',
      github: 'https://github.com/ethereum',
      website: 'https://ethereum.org',
      explorer: 'https://etherscan.io',
      community: {
        twitter: 'https://twitter.com/ethereum',
        reddit: 'https://reddit.com/r/ethereum',
        telegram: 'https://t.me/ethereum',
      },
      metrics: {
        allTimeHigh: 4800,
        allTimeLow: 0.42,
        marketCapRank: 2,
        liquidityScore: 90,
        developerScore: 95,
        communityScore: 90,
      }
    },
    'default': {
      technology: 'Unknown',
      consensus: 'Unknown',
      blockTime: 'Unknown',
      maxSupply: 'Unknown',
      circulatingSupply: 'Unknown',
      marketDominance: 'Unknown',
      developmentStatus: 'Unknown',
      whitepaper: 'Not available',
      github: 'Not available',
      website: 'Not available',
      explorer: 'Not available',
      community: {
        twitter: '',
        reddit: '',
        telegram: '',
      },
      metrics: {
        allTimeHigh: 0,
        allTimeLow: 0,
        marketCapRank: 0,
        liquidityScore: 0,
        developerScore: 0,
        communityScore: 0,
      }
    }
  };

  const details = coinDetails[coin?.id?.toLowerCase()] || coinDetails.default;

  return (
    <DetailsCard>
      <CardContent>
        <SectionTitle variant="h6" gutterBottom>
          Technical Details
        </SectionTitle>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <InfoItem>
              <CodeIcon />
              <Typography variant="body2">
                Technology: {details.technology}
              </Typography>
            </InfoItem>
            <InfoItem>
              <StorageIcon />
              <Typography variant="body2">
                Consensus: {details.consensus}
              </Typography>
            </InfoItem>
            <InfoItem>
              <TimelineIcon />
              <Typography variant="body2">
                Block Time: {details.blockTime}
              </Typography>
            </InfoItem>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <InfoItem>
              <PeopleIcon />
              <Typography variant="body2">
                Market Dominance: {details.marketDominance}
              </Typography>
            </InfoItem>
            <InfoItem>
              <SecurityIcon />
              <Typography variant="body2">
                Development Status: {details.developmentStatus}
              </Typography>
            </InfoItem>
          </Grid>
          
          <Grid item xs={12}>
            <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', margin: '1rem 0' }} />
          </Grid>
          
          <Grid item xs={12}>
            <SectionTitle variant="subtitle1">
              Market Metrics
            </SectionTitle>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InfoItem>
                  <Typography variant="body2">
                    All Time High: ${details.metrics.allTimeHigh.toLocaleString()}
                  </Typography>
                </InfoItem>
                <InfoItem>
                  <Typography variant="body2">
                    All Time Low: ${details.metrics.allTimeLow.toLocaleString()}
                  </Typography>
                </InfoItem>
                <InfoItem>
                  <Typography variant="body2">
                    Market Cap Rank: #{details.metrics.marketCapRank}
                  </Typography>
                </InfoItem>
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoItem>
                  <Typography variant="body2">
                    Liquidity Score: {details.metrics.liquidityScore}/100
                  </Typography>
                </InfoItem>
                <InfoItem>
                  <Typography variant="body2">
                    Developer Score: {details.metrics.developerScore}/100
                  </Typography>
                </InfoItem>
                <InfoItem>
                  <Typography variant="body2">
                    Community Score: {details.metrics.communityScore}/100
                  </Typography>
                </InfoItem>
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={12}>
            <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', margin: '1rem 0' }} />
          </Grid>
          
          <Grid item xs={12}>
            <SectionTitle variant="subtitle1">
              Resources
            </SectionTitle>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <LinkItem href={details.website} target="_blank" rel="noopener noreferrer">
                  <PublicIcon /> Website
                </LinkItem>
                <LinkItem href={details.explorer} target="_blank" rel="noopener noreferrer">
                  <LinkIcon /> Block Explorer
                </LinkItem>
                <LinkItem href={details.whitepaper} target="_blank" rel="noopener noreferrer">
                  <DocIcon /> Whitepaper
                </LinkItem>
              </Grid>
              <Grid item xs={12} md={6}>
                <LinkItem href={details.github} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon /> GitHub
                </LinkItem>
                <LinkItem href={details.community.twitter} target="_blank" rel="noopener noreferrer">
                  <PublicIcon /> Twitter
                </LinkItem>
                <LinkItem href={details.community.reddit} target="_blank" rel="noopener noreferrer">
                  <PublicIcon /> Reddit
                </LinkItem>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </DetailsCard>
  );
}

export default CoinDetails; 