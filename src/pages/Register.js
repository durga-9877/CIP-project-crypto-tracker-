import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { 
  auth, 
  db, 
  googleProvider, 
  facebookProvider, 
  twitterProvider
} from '../config/firebase';
import { 
  createUserWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Card, Form, Input, Button, Typography, Space, Alert, Divider, Steps } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, GoogleOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = Typography;
const { Step } = Steps;

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1A1F3C 0%, #12152C 100%);
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
`;

const SocialButton = styled(Button)`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Register = () => {
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSocialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        createdAt: new Date(),
        portfolio: [],
        watchlist: []
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const onFinish = async (values) => {
    try {
      const { email, password, name, phone } = values;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        phone,
        createdAt: new Date(),
        portfolio: [],
        watchlist: []
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    navigate('/dashboard');
    return null;
  }

  const steps = [
    {
      title: 'Account Details',
      content: (
        <>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Full Name"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>
        </>
      )
    },
    {
      title: 'Security',
      content: (
        <>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              size="large"
            />
          </Form.Item>
        </>
      )
    },
    {
      title: 'Contact',
      content: (
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            { pattern: /^[0-9]{10}$/, message: 'Please enter a valid phone number!' }
          ]}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Phone Number"
            size="large"
          />
        </Form.Item>
      )
    }
  ];

  return (
    <RegisterContainer>
      <StyledCard>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2} style={{ color: '#FFB700', marginBottom: 0 }}>Create Account</Title>
            <Text type="secondary">Join our crypto community</Text>
          </div>

          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
            />
          )}

          <Steps current={currentStep} style={{ marginBottom: 24 }}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>

          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
          >
            {steps[currentStep].content}

            <div style={{ marginTop: 24 }}>
              {currentStep > 0 && (
                <Button style={{ marginRight: 8 }} onClick={prevStep}>
                  Previous
                </Button>
              )}
              {currentStep < steps.length - 1 && (
                <Button type="primary" onClick={nextStep}>
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              )}
            </div>
          </Form>

          <Divider>Or register with</Divider>

          <Space direction="vertical" style={{ width: '100%' }}>
            <SocialButton 
              icon={<GoogleOutlined />}
              onClick={() => handleSocialLogin(googleProvider)}
            >
              Continue with Google
            </SocialButton>
            <SocialButton 
              icon={<FacebookOutlined />}
              onClick={() => handleSocialLogin(facebookProvider)}
            >
              Continue with Facebook
            </SocialButton>
            <SocialButton 
              icon={<TwitterOutlined />}
              onClick={() => handleSocialLogin(twitterProvider)}
            >
              Continue with Twitter
            </SocialButton>
          </Space>

          <div style={{ textAlign: 'center' }}>
            <Text>Already have an account? </Text>
            <Link to="/login">
              <Text style={{ color: '#FFB700' }}>Sign in</Text>
            </Link>
          </div>
        </Space>
      </StyledCard>
    </RegisterContainer>
  );
};

export default Register; 