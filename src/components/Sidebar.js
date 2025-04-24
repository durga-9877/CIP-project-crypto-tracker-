import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Space } from 'antd';
import {
  DashboardOutlined,
  WalletOutlined,
  LineChartOutlined,
  AlertOutlined,
  TeamOutlined,
  SearchOutlined,
  UserOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import ProfileMenu from './ProfileMenu';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';

const { Sider } = Layout;

const StyledSider = styled(Sider)`
  background: #1A1F3C !important;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  height: 100vh;
  position: fixed;
  left: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFB700;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProfileSection = styled.div`
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #1A1F3C;
`;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/portfolio',
      icon: <WalletOutlined />,
      label: 'Portfolio',
    },
    {
      key: '/market',
      icon: <LineChartOutlined />,
      label: 'Market',
    },
    {
      key: '/analysis',
      icon: <LineChartOutlined />,
      label: 'Analysis',
    },
    {
      key: '/alerts',
      icon: <AlertOutlined />,
      label: 'Alerts',
    },
    {
      key: '/social',
      icon: <TeamOutlined />,
      label: 'Social',
    },
    {
      key: '/crypto-search',
      icon: <SearchOutlined />,
      label: 'Crypto Search',
    },
    {
      path: '/profile',
      icon: <PersonIcon />,
      label: 'Profile',
      isActive: location.pathname === '/profile'
    },
    {
      path: '/wallet',
      icon: <AccountBalanceWalletIcon />,
      label: 'Wallet',
      isActive: location.pathname === '/wallet'
    },
    {
      path: '/settings',
      icon: <SettingsIcon />,
      label: 'Settings',
      isActive: location.pathname === '/settings'
    },
  ];

  return (
    <StyledSider width={250}>
      <Logo>Crypto Tracker</Logo>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
      <ProfileSection>
        <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
          <ProfileMenu />
        </Space>
      </ProfileSection>
    </StyledSider>
  );
};

export default Sidebar; 