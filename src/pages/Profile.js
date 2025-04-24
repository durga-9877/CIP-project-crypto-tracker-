import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Typography, Space, Avatar, Upload, message } from 'antd';
import { UserOutlined, CameraOutlined } from '@ant-design/icons';
import { auth, db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';

const { Title, Text } = Typography;

const ProfileContainer = styled.div`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
`;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const StyledAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
  background: #FFB700;
`;

const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          form.setFieldsValue(userDoc.data());
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        message.error('Failed to load profile data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [form]);

  const onFinish = async (values) => {
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), values);
      message.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Failed to update profile');
    }
  };

  return (
    <ProfileContainer>
      <StyledCard>
        <AvatarContainer>
          <StyledAvatar icon={<UserOutlined />} />
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            onChange={({ file }) => {
              if (file) {
                // Handle image upload here
                message.info('Image upload functionality will be implemented');
              }
            }}
          >
            <Button icon={<CameraOutlined />}>Change Photo</Button>
          </Upload>
        </AvatarContainer>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={userData}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              { pattern: /^[0-9]{10}$/, message: 'Please enter a valid phone number!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </StyledCard>

      <StyledCard title="Account Security">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button type="primary" danger>
            Change Password
          </Button>
          <Button type="default">
            Enable Two-Factor Authentication
          </Button>
        </Space>
      </StyledCard>
    </ProfileContainer>
  );
};

export default Profile; 