import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Box, CircularProgress, Alert, Pagination, Button } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const StyledContainer = styled(Container)`
  padding: 2rem;
  max-width: 1400px !important;
  min-height: 100vh;
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(0, 255, 136, 0.05) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(0, 184, 255, 0.05) 0%, transparent 40%);
    pointer-events: none;
  }
`;

const SearchBar = styled(TextField)`
  width: 300px;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  
  & .MuiOutlinedInput-root {
    color: white;
    border-radius: 12px;
    height: 48px;
    
    & fieldset {
      border-color: rgba(255, 255, 255, 0.1);
    }
    
    &:hover fieldset {
      border-color: rgba(255, 255, 255, 0.3);
    }
    
    &.Mui-focused fieldset {
      border-color: #00ff88;
    }
  }

  & .MuiInputLabel-root {
    color: rgba(255, 255, 255, 0.7);
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ControlsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  position: relative;
  z-index: 1;
`;

const ControlsGroup = styled(Box)`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 150px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  
  & .MuiOutlinedInput-root {
    color: white;
    border-radius: 12px;
    height: 48px;
    
    & fieldset {
      border-color: rgba(255, 255, 255, 0.1);
    }
    
    &:hover fieldset {
      border-color: rgba(255, 255, 255, 0.3);
    }
    
    &.Mui-focused fieldset {
      border-color: #00ff88;
    }
  }
  
  & .MuiInputLabel-root {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const CoinCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(0, 255, 136, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 255, 136, 0.1);
    border-color: rgba(0, 255, 136, 0.5);
    
    &::before {
      transform: translateX(100%);
    }
  }
`;

const CoinHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const CoinImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(0, 255, 136, 0.2);
`;

const CoinInfo = styled.div`
  text-align: left;
  flex: 1;
`;

const CoinName = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  color: white;
  font-weight: 600;
`;

const CoinSymbol = styled.span`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
`;

const CoinPrice = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  margin: 1rem 0;
`;

const PriceChange = styled.div`
  font-size: 1rem;
  color: ${props => props.isPositive ? '#00ff88' : '#ff4444'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const MarketInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const MarketCap = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Volume24h = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  color: rgba(255, 255, 255, 0.5);
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const GridContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 3rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  
  & .MuiPagination-root {
    & .MuiPaginationItem-root {
      color: white;
      border-color: rgba(255, 255, 255, 0.2);
      
      &.Mui-selected {
        background: rgba(0, 255, 136, 0.2);
        border-color: #00ff88;
      }
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
`;

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
  border: 0;
  color: white;
  padding: 8px 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(45deg, #1976D2 30%, #1E88E5 90%);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [sortBy, setSortBy] = useState('market_cap');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sortBy}&per_page=100&page=${page}&sparkline=false`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from API');
        }
        
        setCoins(data);
        
      } catch (error) {
        console.error('Error fetching coins:', error);
        setError(
          error.message === 'Failed to fetch' 
            ? 'Unable to connect to the server. Please check your internet connection and try again.'
            : `Error: ${error.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency, sortBy, page]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(price);
  };

  const formatPercentage = (percentage) => {
    if (percentage === null || percentage === undefined) return 'N/A';
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress style={{ color: '#00ff88' }} />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <StyledContainer>
        <Alert severity="error">{error}</Alert>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <ControlsWrapper>
        <SearchBar
          placeholder="Search coins..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          size="small"
        />
        <ControlsGroup>
          <StyledFormControl size="small">
            <InputLabel>Currency</InputLabel>
            <Select
              value={currency}
              onChange={handleCurrencyChange}
              label="Currency"
            >
              <MenuItem value="usd">USD</MenuItem>
              <MenuItem value="inr">INR</MenuItem>
              <MenuItem value="eur">EUR</MenuItem>
              <MenuItem value="gbp">GBP</MenuItem>
            </Select>
          </StyledFormControl>

          <StyledFormControl size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              label="Sort By"
            >
              <MenuItem value="market_cap">Market Cap</MenuItem>
              <MenuItem value="volume">Volume</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="price_change_percentage_24h">24h Change</MenuItem>
            </Select>
          </StyledFormControl>

          <StyledButton onClick={handleLogout}>
            Logout
          </StyledButton>
        </ControlsGroup>
      </ControlsWrapper>

      <GridContainer>
        <Grid container spacing={3}>
          {filteredCoins.map((coin) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={coin.id}>
              <CoinCard onClick={() => navigate(`/coin/${coin.id}`)}>
                <CoinHeader>
                  <CoinImage src={coin.image} alt={coin.name} />
                  <CoinInfo>
                    <CoinName>{coin.name}</CoinName>
                    <CoinSymbol>{coin.symbol.toUpperCase()}</CoinSymbol>
                  </CoinInfo>
                </CoinHeader>
                <CoinPrice>{formatPrice(coin.current_price)}</CoinPrice>
                <PriceChange isPositive={coin.price_change_percentage_24h > 0}>
                  {formatPercentage(coin.price_change_percentage_24h)}
                </PriceChange>
                <MarketInfo>
                  <MarketCap>
                    <Label>Market Cap</Label>
                    <span>{formatPrice(coin.market_cap)}</span>
                  </MarketCap>
                  <Volume24h>
                    <Label>24h Volume</Label>
                    <span>{formatPrice(coin.total_volume)}</span>
                  </Volume24h>
                </MarketInfo>
              </CoinCard>
            </Grid>
          ))}
        </Grid>
      </GridContainer>

      <PaginationContainer>
        <Pagination
          count={10}
          page={page}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </PaginationContainer>
    </StyledContainer>
  );
}

export default Home; 