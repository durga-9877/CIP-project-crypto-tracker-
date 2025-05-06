import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  InputBase,
  alpha
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ProfileMenu from './ProfileMenu';
import { useTheme } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  color: '#00ff00',
  boxShadow: '0 4px 8px rgba(0, 255, 0, 0.2)',
  backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${alpha('#00ff00', 0.2)}`,
  padding: theme.spacing(1, 2),
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#00ff00', 0.1),
  '&:hover': {
    backgroundColor: alpha('#00ff00', 0.2),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  transition: 'background-color 0.3s ease',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#00ff00',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const IconsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Implement theme switching logic here
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search coins, markets, news..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Box sx={{ flexGrow: 1 }} />

        <IconsContainer>
          <IconButton color="inherit" onClick={toggleDarkMode} aria-label="toggle dark mode">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/notifications')} aria-label="notifications">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/settings')} aria-label="settings">
            <SettingsIcon />
          </IconButton>
          <ProfileMenu />
        </IconsContainer>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navbar; 