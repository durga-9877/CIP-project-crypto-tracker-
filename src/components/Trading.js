import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Tabs,
  Tab,
  Divider,
  Dialog,
} from '@mui/material';
import {
  TrendingUp as BuyIcon,
  TrendingDown as SellIcon,
} from '@mui/icons-material';
import PaymentPortal from './PaymentPortal';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

const TradingCard = styled(Card)`
  background: rgba(26, 31, 60, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
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

const BuyButton = styled(Button)`
  background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
  color: #12152C;
  font-weight: 600;
  border-radius: 12px;
  padding: 12px 24px;
  margin-top: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #00cc6a 0%, #00ff88 100%);
    box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
  }
`;

const SellButton = styled(Button)`
  background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);
  color: white;
  font-weight: 600;
  border-radius: 12px;
  padding: 12px 24px;
  margin-top: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #cc0000 0%, #ff4444 100%);
    box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
  }
`;

const PriceInfo = styled(Box)`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  margin: 1rem 0;
`;

function Trading({ coin }) {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState(0);
  const [showPaymentPortal, setShowPaymentPortal] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (value && coin?.current_price) {
      setTotal(value * coin.current_price);
    } else {
      setTotal(0);
    }
  };

  const handleBuy = () => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }
    setShowPaymentPortal(true);
  };

  const handleSell = () => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }
    // Implement sell functionality
    console.log('Selling', amount, coin.symbol, 'for', total);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentPortal(false);
    // Here you would update the user's portfolio
    console.log('Payment successful!');
  };

  return (
    <>
      <TradingCard>
        <CardContent>
          <Typography variant="h6" gutterBottom style={{ color: '#ffffff' }}>
            Trade {coin?.name}
          </Typography>
          
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab 
              icon={<BuyIcon />} 
              label="Buy" 
              style={{ color: tabValue === 0 ? '#00ff88' : 'rgba(255, 255, 255, 0.7)' }}
            />
            <Tab 
              icon={<SellIcon />} 
              label="Sell" 
              style={{ color: tabValue === 1 ? '#ff4444' : 'rgba(255, 255, 255, 0.7)' }}
            />
          </Tabs>
          
          <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', margin: '1rem 0' }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Amount"
                variant="outlined"
                value={amount}
                onChange={handleAmountChange}
                type="number"
                InputProps={{
                  endAdornment: <Typography style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{coin?.symbol}</Typography>,
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <PriceInfo>
                <Typography variant="body2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Current Price: ${coin?.current_price?.toLocaleString()}
                </Typography>
                <Typography variant="body2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Total: ${total.toLocaleString()}
                </Typography>
              </PriceInfo>
            </Grid>
            
            <Grid item xs={12}>
              {tabValue === 0 ? (
                <BuyButton
                  fullWidth
                  variant="contained"
                  onClick={handleBuy}
                  disabled={!amount || amount <= 0}
                >
                  Buy {coin?.symbol}
                </BuyButton>
              ) : (
                <SellButton
                  fullWidth
                  variant="contained"
                  onClick={handleSell}
                  disabled={!amount || amount <= 0}
                >
                  Sell {coin?.symbol}
                </SellButton>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </TradingCard>

      <Dialog
        open={showPaymentPortal}
        onClose={() => setShowPaymentPortal(false)}
        maxWidth="md"
        fullWidth
      >
        <PaymentPortal
          amount={total}
          coin={{ ...coin, amount }}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </Dialog>
    </>
  );
}

export default Trading; 