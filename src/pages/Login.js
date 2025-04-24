import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { 
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from 'firebase/auth';
import { Card, Form, Input, Button, Typography, Space, Alert, Divider, Tabs } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1A1F3C 0%, #12152C 100%);
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
`;

const Login = () => {
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
          handlePhoneSignIn();
        },
        'expired-callback': () => {
          setError('reCAPTCHA expired. Please try again.');
        }
      });
    }
  };

  const handlePhoneSignIn = async () => {
    try {
      if (!phoneNumber) {
        setError('Please enter a phone number');
        return;
      }

      // Format phone number with country code
      const formattedPhoneNumber = `+91${phoneNumber.replace(/\D/g, '')}`;
      
      // Reset any previous errors
      setError('');
      
      // Setup recaptcha
      setupRecaptcha();
      
      const appVerifier = window.recaptchaVerifier;
      console.log('Sending OTP to:', formattedPhoneNumber);
      
      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setShowOtpInput(true);
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError(err.message || 'Failed to send OTP. Please try again.');
      // Reset recaptcha on error
      window.recaptchaVerifier = null;
    }
  };

  const verifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const onFinish = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <LoginContainer>
      <StyledCard>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2} style={{ color: '#FFB700', marginBottom: 0 }}>Welcome Back</Title>
            <Text type="secondary">Sign in to continue to your account</Text>
          </div>

          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
            />
          )}

          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Email Login" key="1">
              <Form
                name="login"
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Email"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" block>
                    Sign In
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>

            <TabPane tab="Phone Login" key="2">
              {!showOtpInput ? (
                <Form layout="vertical">
                  <Form.Item
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="Phone Number"
                      size="large"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      addonBefore="+91"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button 
                      type="primary" 
                      size="large" 
                      block
                      onClick={handlePhoneSignIn}
                    >
                      Send OTP
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <Form layout="vertical">
                  <Form.Item
                    rules={[{ required: true, message: 'Please input the OTP!' }]}
                  >
                    <Input
                      placeholder="Enter OTP"
                      size="large"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button 
                      type="primary" 
                      size="large" 
                      block
                      onClick={verifyOtp}
                    >
                      Verify OTP
                    </Button>
                  </Form.Item>
                </Form>
              )}
              <div id="recaptcha-container"></div>
            </TabPane>
          </Tabs>

          <div style={{ textAlign: 'center' }}>
            <Text>Don't have an account? </Text>
            <Link to="/register">
              <Text style={{ color: '#FFB700' }}>Sign up</Text>
            </Link>
          </div>
        </Space>
      </StyledCard>
    </LoginContainer>
  );
};

export default Login; 