import React, { useState, useEffect } from 'react';
import { Card, Select, Typography, List, Space, Tag, Progress, Row, Col, Statistic } from 'antd';
import { DollarOutlined, GlobalOutlined, RiseOutlined, SafetyOutlined, LineChartOutlined, PercentageOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const countryData = {
  'US': {
    name: 'United States',
    ppp: 1.0,
    riskLevel: 'Low',
    marketTrend: 'Bullish',
    recommendedCryptos: [
      { name: 'Bitcoin', symbol: 'BTC', reason: 'Most stable and widely accepted', allocation: 40, risk: 'Low' },
      { name: 'Ethereum', symbol: 'ETH', reason: 'Strong development ecosystem', allocation: 30, risk: 'Medium' },
      { name: 'Solana', symbol: 'SOL', reason: 'High performance blockchain', allocation: 20, risk: 'Medium' },
      { name: 'Chainlink', symbol: 'LINK', reason: 'Leading oracle network', allocation: 10, risk: 'High' }
    ],
    marketInsights: {
      trend: 'Growing institutional adoption',
      riskFactors: ['Regulatory clarity', 'Market maturity', 'Institutional interest'],
      opportunities: ['DeFi growth', 'NFT market expansion', 'Layer 2 solutions']
    }
  },
  'IN': {
    name: 'India',
    ppp: 0.3,
    riskLevel: 'Medium',
    marketTrend: 'Neutral',
    recommendedCryptos: [
      { name: 'Bitcoin', symbol: 'BTC', reason: 'Store of value', allocation: 50, risk: 'Low' },
      { name: 'Polygon', symbol: 'MATIC', reason: 'Indian-based project', allocation: 30, risk: 'Medium' },
      { name: 'Cardano', symbol: 'ADA', reason: 'Low transaction fees', allocation: 20, risk: 'Medium' }
    ],
    marketInsights: {
      trend: 'Growing retail adoption',
      riskFactors: ['Regulatory uncertainty', 'Tax implications', 'Market volatility'],
      opportunities: ['P2P trading', 'Local crypto projects', 'Remittance solutions']
    }
  },
  'UK': {
    name: 'United Kingdom',
    ppp: 0.8,
    riskLevel: 'Low',
    marketTrend: 'Bullish',
    recommendedCryptos: [
      { name: 'Bitcoin', symbol: 'BTC', reason: 'Mainstream adoption', allocation: 45, risk: 'Low' },
      { name: 'Ethereum', symbol: 'ETH', reason: 'Smart contract platform', allocation: 35, risk: 'Medium' },
      { name: 'Polkadot', symbol: 'DOT', reason: 'Interoperability focus', allocation: 20, risk: 'Medium' }
    ],
    marketInsights: {
      trend: 'Strong regulatory framework',
      riskFactors: ['Market competition', 'Technological risks', 'Economic conditions'],
      opportunities: ['CBDC development', 'Fintech innovation', 'Institutional adoption']
    }
  }
};

const getRiskColor = (risk) => {
  switch(risk.toLowerCase()) {
    case 'low': return '#52c41a';
    case 'medium': return '#faad14';
    case 'high': return '#f5222d';
    default: return '#d9d9d9';
  }
};

const CountryCryptoRecommendation = () => {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [countryInfo, setCountryInfo] = useState(countryData['US']);

  useEffect(() => {
    setCountryInfo(countryData[selectedCountry]);
  }, [selectedCountry]);

  return (
    <Card 
      title={
        <Space>
          <GlobalOutlined />
          <span>Country-Specific Crypto Recommendations</span>
        </Space>
      }
      style={{ margin: '20px' }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Text strong>Select Country:</Text>
          <Select
            style={{ width: 200, marginLeft: 10 }}
            value={selectedCountry}
            onChange={setSelectedCountry}
          >
            {Object.keys(countryData).map(country => (
              <Option key={country} value={country}>
                {countryData[country].name}
              </Option>
            ))}
          </Select>
        </div>

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card type="inner" title="Market Overview">
              <Statistic
                title="Market Trend"
                value={countryInfo.marketTrend}
                prefix={<LineChartOutlined />}
                valueStyle={{ color: countryInfo.marketTrend === 'Bullish' ? '#52c41a' : '#f5222d' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card type="inner" title="Risk Assessment">
              <Statistic
                title="Risk Level"
                value={countryInfo.riskLevel}
                prefix={<SafetyOutlined />}
                valueStyle={{ color: getRiskColor(countryInfo.riskLevel) }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card type="inner" title="Economic Indicator">
              <Statistic
                title="Purchasing Power Parity"
                value={countryInfo.ppp}
                prefix={<DollarOutlined />}
                precision={2}
              />
            </Card>
          </Col>
        </Row>

        <Card type="inner" title="Recommended Portfolio Allocation">
          <List
            dataSource={countryInfo.recommendedCryptos}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Space>
                      <Text strong>{item.name}</Text>
                      <Tag color="blue">{item.symbol}</Tag>
                      <Tag color={getRiskColor(item.risk)}>{item.risk} Risk</Tag>
                    </Space>
                  }
                  description={
                    <Space direction="vertical">
                      <Text>{item.reason}</Text>
                      <Progress percent={item.allocation} size="small" />
                      <Text type="secondary">Recommended Allocation: {item.allocation}%</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>

        <Card type="inner" title="Market Insights">
          <Space direction="vertical">
            <Text strong>Current Trend:</Text>
            <Text>{countryInfo.marketInsights.trend}</Text>
            
            <Text strong>Key Risk Factors:</Text>
            <ul>
              {countryInfo.marketInsights.riskFactors.map((factor, index) => (
                <li key={index}>{factor}</li>
              ))}
            </ul>
            
            <Text strong>Investment Opportunities:</Text>
            <ul>
              {countryInfo.marketInsights.opportunities.map((opportunity, index) => (
                <li key={index}>{opportunity}</li>
              ))}
            </ul>
          </Space>
        </Card>
      </Space>
    </Card>
  );
};

export default CountryCryptoRecommendation; 