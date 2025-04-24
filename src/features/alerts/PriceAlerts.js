import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';

const AlertsContainer = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  margin: 1rem;
`;

const AlertCard = styled(Card)`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  margin-bottom: 1rem;
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

const StyledButton = styled(Button)`
  background: linear-gradient(135deg, #FFB700 0%, #FF9900 100%);
  color: #12152C;
  font-weight: 600;
  border-radius: 12px;
  padding: 12px 24px;
  margin-top: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #FF9900 0%, #FFB700 100%);
    box-shadow: 0 4px 12px rgba(255, 183, 0, 0.3);
  }
`;

function PriceAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({
    coin: '',
    condition: 'above',
    price: '',
    isActive: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load saved alerts from localStorage
    const savedAlerts = JSON.parse(localStorage.getItem('priceAlerts') || '[]');
    setAlerts(savedAlerts);
  }, []);

  const handleAddAlert = () => {
    if (!newAlert.coin || !newAlert.price) {
      toast.error('Please fill in all fields');
      return;
    }

    const price = parseFloat(newAlert.price);
    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    const alert = {
      id: Date.now(),
      ...newAlert,
      price: price,
      createdAt: new Date().toISOString()
    };

    const updatedAlerts = [...alerts, alert];
    setAlerts(updatedAlerts);
    localStorage.setItem('priceAlerts', JSON.stringify(updatedAlerts));
    
    setNewAlert({
      coin: '',
      condition: 'above',
      price: '',
      isActive: true
    });

    toast.success('Alert added successfully');
  };

  const handleDeleteAlert = (id) => {
    const updatedAlerts = alerts.filter(alert => alert.id !== id);
    setAlerts(updatedAlerts);
    localStorage.setItem('priceAlerts', JSON.stringify(updatedAlerts));
    toast.success('Alert deleted successfully');
  };

  const handleToggleAlert = (id) => {
    const updatedAlerts = alerts.map(alert => {
      if (alert.id === id) {
        return { ...alert, isActive: !alert.isActive };
      }
      return alert;
    });
    setAlerts(updatedAlerts);
    localStorage.setItem('priceAlerts', JSON.stringify(updatedAlerts));
  };

  return (
    <AlertsContainer>
      <Typography variant="h4" gutterBottom style={{ color: '#ffffff' }}>
        Price Alerts
      </Typography>

      <AlertCard>
        <Typography variant="h6" gutterBottom style={{ color: '#ffffff' }}>
          Create New Alert
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <StyledTextField
              fullWidth
              label="Cryptocurrency"
              variant="outlined"
              value={newAlert.coin}
              onChange={(e) => setNewAlert({ ...newAlert, coin: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Condition</InputLabel>
              <Select
                value={newAlert.condition}
                onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value })}
                style={{ color: '#ffffff', background: 'rgba(255, 255, 255, 0.02)' }}
              >
                <MenuItem value="above">Price Above</MenuItem>
                <MenuItem value="below">Price Below</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StyledTextField
              fullWidth
              label="Price (USD)"
              variant="outlined"
              type="number"
              value={newAlert.price}
              onChange={(e) => setNewAlert({ ...newAlert, price: e.target.value })}
            />
          </Grid>
        </Grid>
        <StyledButton
          fullWidth
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddAlert}
        >
          Add Alert
        </StyledButton>
      </AlertCard>

      <Typography variant="h6" style={{ color: '#ffffff', marginTop: '2rem', marginBottom: '1rem' }}>
        Your Alerts
      </Typography>
      <List>
        {alerts.map((alert) => (
          <ListItem
            key={alert.id}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              marginBottom: '0.5rem'
            }}
          >
            <ListItemText
              primary={
                <Typography style={{ color: '#ffffff' }}>
                  {alert.coin} - Alert when price is {alert.condition} ${alert.price}
                </Typography>
              }
              secondary={
                <Typography style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Created: {new Date(alert.createdAt).toLocaleString()}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={alert.isActive}
                onChange={() => handleToggleAlert(alert.id)}
                color="primary"
              />
              <IconButton
                edge="end"
                onClick={() => handleDeleteAlert(alert.id)}
                style={{ color: '#ff4444' }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        {alerts.length === 0 && (
          <Typography style={{ color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center', marginTop: '2rem' }}>
            No alerts set up yet. Create your first alert above.
          </Typography>
        )}
      </List>
    </AlertsContainer>
  );
}

export default PriceAlerts; 