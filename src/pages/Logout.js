import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  CircularProgress,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #1A1F3C 0%, #12152C 100%)',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 400,
  width: '100%',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
}));

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        console.error('Logout error:', error);
        navigate('/login');
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#FFB700' }}>
            Logging Out
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please wait while we sign you out...
          </Typography>
        </Box>
        <CircularProgress sx={{ color: '#FFB700', mb: 3 }} />
        <Button
          variant="outlined"
          onClick={() => navigate('/login')}
          sx={{
            color: '#FFB700',
            borderColor: '#FFB700',
            '&:hover': {
              borderColor: '#FFB700',
              backgroundColor: 'rgba(255, 183, 0, 0.1)',
            },
          }}
        >
          Return to Login
        </Button>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Logout; 