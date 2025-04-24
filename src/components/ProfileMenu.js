import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Dropdown, Avatar, Space } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined, WalletOutlined } from '@ant-design/icons';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import styled from 'styled-components';

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
  background: #FFB700;
  &:hover {
    opacity: 0.8;
  }
`;

const ProfileMenu = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleWalletClick = () => {
    navigate('/wallet');
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={handleProfileClick}>
        Profile
      </Menu.Item>
      <Menu.Item key="wallet" icon={<WalletOutlined />} onClick={handleWalletClick}>
        My Wallet
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />} onClick={handleSettingsClick}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
      <Space>
        <StyledAvatar icon={<UserOutlined />} />
      </Space>
    </Dropdown>
  );
};

export default ProfileMenu; 