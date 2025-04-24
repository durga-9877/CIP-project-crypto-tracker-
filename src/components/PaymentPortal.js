import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Tabs,
  Tab,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import {
  CreditCard as CardIcon,
  AccountBalance as BankIcon,
  PhoneAndroid as UpiIcon,
} from '@mui/icons-material';

const PaymentCard = styled(Card)`
  background: rgba(26, 31, 60, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin: 2rem auto;
  max-width: 600px;
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

const PayButton = styled(Button)`
  background: linear-gradient(135deg, #FFB700 0%, #FF8C00 100%);
  color: #12152C;
  font-weight: 600;
  border-radius: 12px;
  padding: 12px 24px;
  margin-top: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #FF8C00 0%, #FFB700 100%);
    box-shadow: 0 4px 12px rgba(255, 183, 0, 0.3);
  }
`;

function PaymentPortal({ amount, coin, onPaymentSuccess }) {
  const [tabValue, setTabValue] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePayment = () => {
    // Here you would integrate with actual payment gateway
    console.log('Processing payment...');
    onPaymentSuccess();
  };

  return (
    <PaymentCard>
      <CardContent>
        <Typography variant="h5" gutterBottom style={{ color: '#ffffff' }}>
          Payment Details
        </Typography>
        <Typography variant="subtitle1" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Amount to Pay: ${amount}
        </Typography>
        <Typography variant="subtitle1" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          For: {coin?.amount} {coin?.symbol}
        </Typography>

        <Box sx={{ marginTop: 2 }}>
          <FormControl component="fieldset">
            <RadioGroup
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              style={{ color: 'white' }}
            >
              <FormControlLabel
                value="upi"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <UpiIcon sx={{ marginRight: 1 }} />
                    UPI Payment
                  </Box>
                }
              />
              {paymentMethod === 'upi' && (
                <StyledTextField
                  fullWidth
                  label="UPI ID"
                  variant="outlined"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  style={{ marginTop: 1 }}
                />
              )}

              <FormControlLabel
                value="card"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CardIcon sx={{ marginRight: 1 }} />
                    Card Payment
                  </Box>
                }
              />
              {paymentMethod === 'card' && (
                <Grid container spacing={2} style={{ marginTop: 1 }}>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Card Number"
                      variant="outlined"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <StyledTextField
                      fullWidth
                      label="Expiry Date"
                      variant="outlined"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <StyledTextField
                      fullWidth
                      label="CVV"
                      variant="outlined"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </Grid>
                </Grid>
              )}

              <FormControlLabel
                value="bank"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BankIcon sx={{ marginRight: 1 }} />
                    Net Banking
                  </Box>
                }
              />
              {paymentMethod === 'bank' && (
                <Grid container spacing={2} style={{ marginTop: 1 }}>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Account Number"
                      variant="outlined"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="IFSC Code"
                      variant="outlined"
                      value={ifsc}
                      onChange={(e) => setIfsc(e.target.value)}
                    />
                  </Grid>
                </Grid>
              )}
            </RadioGroup>
          </FormControl>
        </Box>

        <PayButton
          fullWidth
          variant="contained"
          onClick={handlePayment}
          style={{ marginTop: 2 }}
        >
          Pay Now
        </PayButton>
      </CardContent>
    </PaymentCard>
  );
}

export default PaymentPortal; 