import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    color: white;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 12px;
    
    & fieldset {
      border-color: rgba(255, 255, 255, 0.1);
    }
    
    &:hover fieldset {
      border-color: rgba(255, 183, 0, 0.3);
    }
    
    &.Mui-focused fieldset {
      border-color: #FFB700;
    }
  }
  
  & .MuiInputLabel-root {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const ResultsPaper = styled(Paper)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 8px;
  background: rgba(26, 31, 60, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  max-height: 400px;
  overflow-y: auto;
`;

const StyledListItem = styled(ListItem)`
  &:hover {
    background: rgba(255, 183, 0, 0.1);
  }
`;

const PriceChange = styled(Typography)`
  color: ${props => props.change >= 0 ? '#00ff88' : '#ff4444'};
  font-weight: 600;
`;

const FilterChips = styled(Box)`
  display: flex;
  gap: 8px;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const StyledChip = styled(Chip)`
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
  
  &.active {
    background: rgba(255, 183, 0, 0.2);
    color: #FFB700;
  }
`;

function SearchBar({ onSelectCoin, coins }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setLoading(true);
      const filtered = coins.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCoins(filtered);
      setLoading(false);
    } else {
      setFilteredCoins([]);
    }
  }, [searchTerm, coins]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    let filtered = [...coins];
    
    switch (filter) {
      case 'top':
        filtered = filtered.sort((a, b) => b.market_cap - a.market_cap).slice(0, 10);
        break;
      case 'trending':
        filtered = filtered.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 10);
        break;
      case 'approved':
        filtered = filtered.filter(coin => coin.approved);
        break;
      default:
        break;
    }
    
    setFilteredCoins(filtered);
  };

  const handleSelectCoin = (coin) => {
    onSelectCoin(coin);
    setSearchTerm('');
    setShowResults(false);
  };

  return (
    <SearchContainer>
      <StyledTextField
        fullWidth
        variant="outlined"
        placeholder="Search for coins..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowResults(true);
        }}
        InputProps={{
          startAdornment: <SearchIcon style={{ color: 'rgba(255, 255, 255, 0.4)', marginRight: '8px' }} />,
        }}
      />

      <FilterChips>
        <StyledChip
          label="All"
          onClick={() => handleFilterChange('all')}
          className={activeFilter === 'all' ? 'active' : ''}
        />
        <StyledChip
          label="Top 10"
          onClick={() => handleFilterChange('top')}
          className={activeFilter === 'top' ? 'active' : ''}
        />
        <StyledChip
          label="Trending"
          onClick={() => handleFilterChange('trending')}
          className={activeFilter === 'trending' ? 'active' : ''}
        />
        <StyledChip
          label="Approved"
          onClick={() => handleFilterChange('approved')}
          className={activeFilter === 'approved' ? 'active' : ''}
        />
      </FilterChips>

      {showResults && (searchTerm || activeFilter !== 'all') && (
        <ResultsPaper>
          {loading ? (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress size={24} />
            </Box>
          ) : filteredCoins.length > 0 ? (
            <List>
              {filteredCoins.map((coin) => (
                <StyledListItem
                  key={coin.id}
                  button
                  onClick={() => handleSelectCoin(coin)}
                >
                  <ListItemAvatar>
                    <Avatar src={coin.image} alt={coin.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1" style={{ color: '#ffffff' }}>
                          {coin.name}
                        </Typography>
                        <Typography variant="body2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {coin.symbol.toUpperCase()}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="body2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          ${coin.current_price?.toLocaleString()}
                        </Typography>
                        <PriceChange variant="body2" change={coin.price_change_percentage_24h}>
                          {coin.price_change_percentage_24h?.toFixed(2)}%
                        </PriceChange>
                      </Box>
                    }
                  />
                </StyledListItem>
              ))}
            </List>
          ) : (
            <Box p={2}>
              <Typography variant="body2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                No coins found
              </Typography>
            </Box>
          )}
        </ResultsPaper>
      )}
    </SearchContainer>
  );
}

export default SearchBar; 