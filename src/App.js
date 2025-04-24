import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import CountryCryptoRecommendation from './components/CountryCryptoRecommendation';
import UserManual from './components/UserManual';
import CryptoSearch from './components/CryptoSearch';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Settings from './pages/Settings';

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContainer>
          <Sidebar />
          <MainContent>
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/market" element={<Market />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/social" element={<Social />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/country-recommendations" element={<CountryCryptoRecommendation />} />
              <Route path="/user-manual" element={<UserManual />} />
              <Route path="/crypto-search" element={<CryptoSearch />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </MainContent>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App; 