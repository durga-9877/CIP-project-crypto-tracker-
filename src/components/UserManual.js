import React from 'react';
import { Card, Typography, Steps, Space, Divider, Collapse, Alert } from 'antd';
import { UserOutlined, GlobalOutlined, DollarOutlined, CheckCircleOutlined, SafetyOutlined, LineChartOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;
const { Panel } = Collapse;

const UserManual = () => {
  return (
    <Card title="User Manual & Workflow" style={{ margin: '20px' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Alert
          message="Important Notice"
          description="This tool provides recommendations based on general market conditions and country-specific factors. Always conduct your own research and consult with financial advisors before making investment decisions."
          type="info"
          showIcon
        />

        <Title level={3}>How to Use the Crypto Tracker</Title>
        
        <Steps direction="vertical" current={-1}>
          <Step
            title="Select Your Country"
            description={
              <Text>
                Choose your country from the dropdown menu to get personalized crypto recommendations based on your region's economic conditions.
              </Text>
            }
            icon={<GlobalOutlined />}
          />
          <Step
            title="View Country Information"
            description={
              <Text>
                The system will display your country's Purchasing Power Parity (PPP), market trends, and risk assessment.
              </Text>
            }
            icon={<DollarOutlined />}
          />
          <Step
            title="Review Recommendations"
            description={
              <Text>
                Get a list of recommended cryptocurrencies with detailed explanations, risk levels, and portfolio allocation suggestions.
              </Text>
            }
            icon={<CheckCircleOutlined />}
          />
        </Steps>

        <Divider />

        <Title level={4}>Understanding the Features</Title>
        
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Purchasing Power Parity (PPP)" key="1">
            <Paragraph>
              PPP is a measure that compares the relative value of currencies and their ability to buy goods and services.
              In our system:
            </Paragraph>
            <ul>
              <li>High PPP (greater than 0.7): Recommended for high-value investments in established cryptocurrencies</li>
              <li>Low PPP (less than 0.7): Recommended for cost-effective investments with lower transaction fees</li>
            </ul>
          </Panel>

          <Panel header="Risk Assessment" key="2">
            <Paragraph>
              Our system evaluates risk based on multiple factors:
            </Paragraph>
            <ul>
              <li>Market volatility</li>
              <li>Regulatory environment</li>
              <li>Economic stability</li>
              <li>Technological maturity</li>
            </ul>
          </Panel>

          <Panel header="Portfolio Allocation" key="3">
            <Paragraph>
              The recommended portfolio allocation is based on:
            </Paragraph>
            <ul>
              <li>Risk tolerance</li>
              <li>Market conditions</li>
              <li>Investment goals</li>
              <li>Country-specific factors</li>
            </ul>
          </Panel>
        </Collapse>

        <Divider />

        <Title level={4}>Best Practices</Title>
        <Card type="inner">
          <Space direction="vertical">
            <Text strong>Research & Analysis</Text>
            <ul>
              <li>Always do your own research before investing</li>
              <li>Understand the technology behind each cryptocurrency</li>
              <li>Follow market trends and news</li>
              <li>Analyze historical performance</li>
            </ul>

            <Text strong>Risk Management</Text>
            <ul>
              <li>Consider your risk tolerance</li>
              <li>Diversify your portfolio</li>
              <li>Set stop-loss orders</li>
              <li>Keep track of market trends</li>
            </ul>

            <Text strong>Security Measures</Text>
            <ul>
              <li>Use secure wallets for storage</li>
              <li>Enable two-factor authentication</li>
              <li>Keep private keys offline</li>
              <li>Regularly update security measures</li>
            </ul>
          </Space>
        </Card>

        <Divider />

        <Title level={4}>Glossary</Title>
        <Card type="inner">
          <dl>
            <dt><Text strong>PPP (Purchasing Power Parity)</Text></dt>
            <dd>The relative value of currencies and their ability to buy goods and services</dd>

            <dt><Text strong>Market Trend</Text></dt>
            <dd>The general direction in which the market is moving (Bullish, Bearish, or Neutral)</dd>

            <dt><Text strong>Portfolio Allocation</Text></dt>
            <dd>The percentage distribution of investments across different cryptocurrencies</dd>

            <dt><Text strong>Risk Level</Text></dt>
            <dd>Assessment of potential risks associated with investments (Low, Medium, High)</dd>
          </dl>
        </Card>
      </Space>
    </Card>
  );
};

export default UserManual; 