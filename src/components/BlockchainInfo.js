import React from 'react';
import styled from 'styled-components';

const BlockchainContainer = styled.div`
  background: rgba(26, 26, 26, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  margin-top: 2rem;
`;

const Title = styled.h3`
  color: #ffffff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const InfoCard = styled.div`
  background: rgba(30, 30, 30, 0.7);
  border-radius: 10px;
  padding: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 157, 0.1);
  }
`;

const Label = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Value = styled.div`
  color: #00ff9d;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ExplorerLink = styled.a`
  color: #00ccff;
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #00ff9d;
  }
`;

const StatusIndicator = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 0.5rem;
  background-color: ${props => props.status === 'online' ? '#00ff9d' : '#ff4444'};
  box-shadow: 0 0 10px ${props => props.status === 'online' ? 'rgba(0, 255, 157, 0.5)' : 'rgba(255, 68, 68, 0.5)'};
`;

function BlockchainInfo({ coin }) {
  // Mock data - in a real app, this would come from an API
  const blockchainData = {
    networkStatus: 'online',
    lastBlock: '15,432,567',
    avgBlockTime: '2.5s',
    transactions24h: '1,234,567',
    gasPrice: '25 Gwei',
    smartContracts: '45,678',
    networkHashrate: '850 TH/s'
  };

  const explorers = {
    ethereum: 'https://etherscan.io',
    bitcoin: 'https://blockchain.com',
    binance: 'https://bscscan.com',
    polygon: 'https://polygonscan.com'
  };

  return (
    <BlockchainContainer>
      <Title>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#00ff9d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="#00ff9d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#00ff9d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Blockchain Information
      </Title>
      <InfoGrid>
        <InfoCard>
          <Label>Network Status</Label>
          <Value>
            <StatusIndicator status={blockchainData.networkStatus} />
            {blockchainData.networkStatus.charAt(0).toUpperCase() + blockchainData.networkStatus.slice(1)}
          </Value>
        </InfoCard>
        <InfoCard>
          <Label>Last Block</Label>
          <Value>{blockchainData.lastBlock}</Value>
        </InfoCard>
        <InfoCard>
          <Label>Average Block Time</Label>
          <Value>{blockchainData.avgBlockTime}</Value>
        </InfoCard>
        <InfoCard>
          <Label>24h Transactions</Label>
          <Value>{blockchainData.transactions24h}</Value>
        </InfoCard>
        <InfoCard>
          <Label>Gas Price</Label>
          <Value>{blockchainData.gasPrice}</Value>
        </InfoCard>
        <InfoCard>
          <Label>Smart Contracts</Label>
          <Value>{blockchainData.smartContracts}</Value>
        </InfoCard>
        <InfoCard>
          <Label>Network Hashrate</Label>
          <Value>{blockchainData.networkHashrate}</Value>
        </InfoCard>
      </InfoGrid>
      <ExplorerLink href={explorers[coin.id] || explorers.ethereum} target="_blank" rel="noopener noreferrer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        View on Blockchain Explorer
      </ExplorerLink>
    </BlockchainContainer>
  );
}

export default BlockchainInfo; 