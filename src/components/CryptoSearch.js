import React, { useState } from 'react';
import { Card, Input, Typography, Space, Button, Statistic, Row, Col, Divider, Tabs, Alert, Spin, InputNumber, Select } from 'antd';
import { 
  SearchOutlined, 
  DollarOutlined, 
  LoadingOutlined, 
  InfoCircleOutlined, 
  WalletOutlined 
} from '@ant-design/icons';
import axios from 'axios';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;

const CryptoSearch = () => {
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buyAmount, setBuyAmount] = useState(0);
  const [suggestedAmounts] = useState([100, 500, 1000, 5000]);
  const [selectedCurrency, setSelectedCurrency] = useState('usd');

  const handleSearch = async (value) => {
    if (!value) return;
    setLoading(true);
    setError(null);
    try {
      // Search for the cryptocurrency
      const searchResponse = await axios.get(`https://api.coingecko.com/api/v3/search?query=${value}`);
      const coinId = searchResponse.data.coins[0]?.id;
      
      if (!coinId) {
        throw new Error('Cryptocurrency not found');
      }

      // Get detailed information about the cryptocurrency
      const [coinData, marketData] = await Promise.all([
        axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`),
        axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${selectedCurrency}&days=1`)
      ]);

      const priceData = marketData.data.prices;
      const currentPrice = priceData[priceData.length - 1][1];
      const previousPrice = priceData[0][1];
      const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;

      setCryptoData({
        id: coinData.data.id,
        name: coinData.data.name,
        symbol: coinData.data.symbol.toUpperCase(),
        price: currentPrice,
        marketCap: coinData.data.market_data.market_cap[selectedCurrency],
        volume24h: coinData.data.market_data.total_volume[selectedCurrency],
        change24h: priceChange,
        description: coinData.data.description.en,
        technicalDetails: {
          consensus: coinData.data.genesis_date ? 'Proof of Work' : 'Proof of Stake',
          maxSupply: coinData.data.market_data.max_supply || 'No max supply',
          circulatingSupply: coinData.data.market_data.circulating_supply,
          blockTime: coinData.data.block_time_in_minutes ? `${coinData.data.block_time_in_minutes} minutes` : 'N/A',
          algorithm: coinData.data.hashing_algorithm || 'N/A'
        },
        socialLinks: {
          website: coinData.data.links.homepage[0],
          twitter: `https://twitter.com/${coinData.data.links.twitter_screen_name}`,
          github: coinData.data.links.repos_url.github[0]
        },
        image: coinData.data.image.large
      });
    } catch (err) {
      setError('Failed to fetch crypto data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = () => {
    if (buyAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    // In a real application, this would integrate with your exchange or wallet
    alert(`Buy ${buyAmount} USD worth of ${cryptoData.symbol} functionality would be implemented here`);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCurrency.toUpperCase()
    }).format(value);
  };

  return (
    <Card title="Crypto Search & Details" style={{ margin: '20px' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Search
          placeholder="Search for a cryptocurrency (e.g., Bitcoin, Ethereum)"
          allowClear
          enterButton={<Button type="primary" icon={<SearchOutlined />}>Search</Button>}
          size="large"
          onSearch={handleSearch}
          style={{ marginBottom: '20px' }}
        />

        <Select
          value={selectedCurrency}
          onChange={setSelectedCurrency}
          style={{ width: 120, marginBottom: '20px' }}
        >
          <Select.Option value="usd">USD</Select.Option>
          <Select.Option value="inr">INR</Select.Option>
          <Select.Option value="eur">EUR</Select.Option>
        </Select>

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
          />
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            <Text>Loading cryptocurrency data...</Text>
          </div>
        )}

        {cryptoData && (
          <>
            <Card type="inner">
              <Row gutter={[16, 16]}>
                <Col span={24} style={{ textAlign: 'center' }}>
                  <img src={cryptoData.image} alt={cryptoData.name} style={{ width: '64px', height: '64px' }} />
                  <Title level={2}>{cryptoData.name} ({cryptoData.symbol})</Title>
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Current Price"
                    value={cryptoData.price}
                    prefix={<DollarOutlined />}
                    precision={2}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="24h Change"
                    value={cryptoData.change24h}
                    precision={2}
                    valueStyle={{ color: cryptoData.change24h >= 0 ? '#3f8600' : '#cf1322' }}
                    suffix="%"
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Market Cap"
                    value={cryptoData.marketCap}
                    prefix={<DollarOutlined />}
                    precision={0}
                  />
                </Col>
              </Row>
            </Card>

            <Tabs defaultActiveKey="1">
              <TabPane tab="Overview" key="1">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Title level={4}>About {cryptoData.name}</Title>
                  <Paragraph>{cryptoData.description}</Paragraph>
                  
                  <Title level={4}>Technical Details</Title>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Card type="inner" size="small">
                        <Space direction="vertical">
                          <Text strong>Consensus Mechanism</Text>
                          <Text>{cryptoData.technicalDetails.consensus}</Text>
                        </Space>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card type="inner" size="small">
                        <Space direction="vertical">
                          <Text strong>Max Supply</Text>
                          <Text>{cryptoData.technicalDetails.maxSupply}</Text>
                        </Space>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card type="inner" size="small">
                        <Space direction="vertical">
                          <Text strong>Circulating Supply</Text>
                          <Text>{cryptoData.technicalDetails.circulatingSupply.toLocaleString()}</Text>
                        </Space>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card type="inner" size="small">
                        <Space direction="vertical">
                          <Text strong>Block Time</Text>
                          <Text>{cryptoData.technicalDetails.blockTime}</Text>
                        </Space>
                      </Card>
                    </Col>
                  </Row>
                </Space>
              </TabPane>

              <TabPane tab="Links" key="2">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button type="link" href={cryptoData.socialLinks.website} target="_blank">
                    <InfoCircleOutlined /> Website
                  </Button>
                  <Button type="link" href={cryptoData.socialLinks.twitter} target="_blank">
                    <InfoCircleOutlined /> Twitter
                  </Button>
                  <Button type="link" href={cryptoData.socialLinks.github} target="_blank">
                    <InfoCircleOutlined /> GitHub
                  </Button>
                </Space>
              </TabPane>
            </Tabs>

            <Divider />

            <Card type="inner" title="Buy Options">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Alert
                  message="Important Notice"
                  description="Please ensure you have sufficient funds in your wallet before proceeding with the purchase."
                  type="info"
                  showIcon
                />
                
                <Text strong>Quick Amounts (USD):</Text>
                <Space>
                  {suggestedAmounts.map(amount => (
                    <Button 
                      key={amount} 
                      onClick={() => setBuyAmount(amount)}
                    >
                      {formatCurrency(amount)}
                    </Button>
                  ))}
                </Space>

                <Text strong>Custom Amount:</Text>
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  value={buyAmount}
                  onChange={setBuyAmount}
                  prefix={<DollarOutlined />}
                  precision={2}
                />

                <Button 
                  type="primary" 
                  size="large" 
                  icon={<WalletOutlined />}
                  onClick={handleBuy}
                  style={{ width: '100%', marginTop: '16px' }}
                >
                  Buy {formatCurrency(buyAmount)} worth of {cryptoData.symbol}
                </Button>
              </Space>
            </Card>
          </>
        )}
      </Space>
    </Card>
  );
};

export default CryptoSearch; 