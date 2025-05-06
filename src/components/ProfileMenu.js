import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Menu, Dropdown, Space } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
  background: #FFB700;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledDropdown = styled(Dropdown)`
  .ant-dropdown-menu {
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ProfileMenu = () => {
  const navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate('/profile')}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />} onClick={() => navigate('/settings')}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => navigate('/logout')}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <StyledDropdown overlay={menu} placement="bottomRight" trigger={['click']}>
      <Space>
        <StyledAvatar icon={<UserOutlined />} />
      </Space>
    </StyledDropdown>
  );
};

export default ProfileMenu; 