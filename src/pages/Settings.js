import React, { useState, useEffect } from 'react';
import { Card, Form, Switch, Select, Button, Typography, Space, Divider, Radio, Input } from 'antd';
import { auth, db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';

const { Title, Text } = Typography;
const { Option } = Select;

const SettingsContainer = styled.div`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
`;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Settings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    notifications: true,
    theme: 'dark',
    language: 'en',
    currency: 'USD',
    twoFactor: false,
    emailNotifications: true,
    priceAlerts: true,
    marketUpdates: true
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.settings) {
            setSettings(data.settings);
            form.setFieldsValue(data.settings);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching settings:', error);
        setLoading(false);
      }
    };

    fetchSettings();
  }, [form]);

  const onFinish = async (values) => {
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        settings: values
      });
      setSettings(values);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <SettingsContainer>
      <StyledCard>
        <Title level={2}>Settings</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={settings}
        >
          <Divider orientation="left">Appearance</Divider>
          <Form.Item
            name="theme"
            label="Theme"
          >
            <Radio.Group>
              <Radio.Button value="light">Light</Radio.Button>
              <Radio.Button value="dark">Dark</Radio.Button>
              <Radio.Button value="system">System</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Divider orientation="left">Preferences</Divider>
          <Form.Item
            name="language"
            label="Language"
          >
            <Select>
              <Option value="en">English</Option>
              <Option value="es">Spanish</Option>
              <Option value="fr">French</Option>
              <Option value="de">German</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="currency"
            label="Default Currency"
          >
            <Select>
              <Option value="USD">USD ($)</Option>
              <Option value="EUR">EUR (€)</Option>
              <Option value="GBP">GBP (£)</Option>
              <Option value="JPY">JPY (¥)</Option>
            </Select>
          </Form.Item>

          <Divider orientation="left">Notifications</Divider>
          <Form.Item
            name="notifications"
            label="Enable Notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="emailNotifications"
            label="Email Notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="priceAlerts"
            label="Price Alerts"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="marketUpdates"
            label="Market Updates"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Divider orientation="left">Security</Divider>
          <Form.Item
            name="twoFactor"
            label="Two-Factor Authentication"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </StyledCard>
    </SettingsContainer>
  );
};

export default Settings; 