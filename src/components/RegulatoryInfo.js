import React from 'react';
import styled from 'styled-components';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
  Box,
} from '@mui/material';
import {
  Verified as VerifiedIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Security as SecurityIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

const RegulatoryCard = styled(Card)`
  background: rgba(26, 31, 60, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const InfoSection = styled(Box)`
  padding: 1rem 0;
`;

const StyledChip = styled(Chip)`
  margin: 0.5rem;
  &.approved {
    background: rgba(0, 255, 136, 0.1);
    color: #00ff88;
  }
  &.not-approved {
    background: rgba(255, 0, 0, 0.1);
    color: #ff4444;
  }
  &.pending {
    background: rgba(255, 183, 0, 0.1);
    color: #FFB700;
  }
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

function RegulatoryInfo({ coin }) {
  // Mock data for regulatory status
  const regulatoryStatus = {
    'bitcoin': {
      approved: true,
      status: 'Approved',
      lastUpdated: '2023-12-15',
      restrictions: 'No restrictions',
      taxTreatment: 'Capital gains tax applicable',
    },
    'ethereum': {
      approved: true,
      status: 'Approved',
      lastUpdated: '2023-12-15',
      restrictions: 'No restrictions',
      taxTreatment: 'Capital gains tax applicable',
    },
    'ripple': {
      approved: false,
      status: 'Not Approved',
      lastUpdated: '2023-12-15',
      restrictions: 'Trading restricted',
      taxTreatment: 'Not applicable',
    },
    'default': {
      approved: false,
      status: 'Pending Review',
      lastUpdated: '2023-12-15',
      restrictions: 'Under review',
      taxTreatment: 'To be determined',
    }
  };

  const coinInfo = regulatoryStatus[coin?.id?.toLowerCase()] || regulatoryStatus.default;

  return (
    <RegulatoryCard>
      <CardContent>
        <Typography variant="h6" gutterBottom style={{ color: '#ffffff' }}>
          Regulatory Information
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledChip
              icon={coinInfo.approved ? <VerifiedIcon /> : <WarningIcon />}
              label={`India Status: ${coinInfo.status}`}
              className={coinInfo.approved ? 'approved' : 'not-approved'}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', margin: '1rem 0' }} />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <InfoSection>
              <Typography variant="subtitle1" style={{ color: '#ffffff', marginBottom: '1rem' }}>
                Legal Status
              </Typography>
              <InfoItem>
                <InfoIcon />
                <Typography variant="body2">
                  Last Updated: {coinInfo.lastUpdated}
                </Typography>
              </InfoItem>
              <InfoItem>
                <SecurityIcon />
                <Typography variant="body2">
                  Restrictions: {coinInfo.restrictions}
                </Typography>
              </InfoItem>
            </InfoSection>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <InfoSection>
              <Typography variant="subtitle1" style={{ color: '#ffffff', marginBottom: '1rem' }}>
                Tax Information
              </Typography>
              <InfoItem>
                <TimelineIcon />
                <Typography variant="body2">
                  Tax Treatment: {coinInfo.taxTreatment}
                </Typography>
              </InfoItem>
            </InfoSection>
          </Grid>
        </Grid>
      </CardContent>
    </RegulatoryCard>
  );
}

export default RegulatoryInfo; 