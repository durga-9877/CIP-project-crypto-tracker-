import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Market from './pages/Market';
import Analysis from './pages/Analysis';
import Alerts from './pages/Alerts';
import Social from './pages/Social';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import CountryCryptoRecommendation from './components/CountryCryptoRecommendation';
import UserManual from './components/UserManual';
import CryptoSearch from './components/CryptoSearch';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Settings from './pages/Settings';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFB700',
    },
    secondary: {
      main: '#00ff88',
    },
    background: {
      default: '#12152C',
      paper: '#1A1F3C',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #12152C;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  margin-left: 240px; // Width of sidebar
  @media (max-width: 900px) {
    margin-left: 0;
  }
`;

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContainer>
            <Sidebar />
            <MainContent>
              <Navbar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/portfolio" element={<PrivateRoute><Portfolio /></PrivateRoute>} />
                <Route path="/market" element={<PrivateRoute><Market /></PrivateRoute>} />
                <Route path="/analysis" element={<PrivateRoute><Analysis /></PrivateRoute>} />
                <Route path="/alerts" element={<PrivateRoute><Alerts /></PrivateRoute>} />
                <Route path="/social" element={<PrivateRoute><Social /></PrivateRoute>} />
                <Route path="/country-recommendations" element={<PrivateRoute><CountryCryptoRecommendation /></PrivateRoute>} />
                <Route path="/user-manual" element={<PrivateRoute><UserManual /></PrivateRoute>} />
                <Route path="/crypto-search" element={<PrivateRoute><CryptoSearch /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/wallet" element={<PrivateRoute><Wallet /></PrivateRoute>} />
                <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
              </Routes>
            </MainContent>
          </AppContainer>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App; 