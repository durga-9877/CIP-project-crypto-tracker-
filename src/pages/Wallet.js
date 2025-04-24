import React, { useState, useEffect } from 'react';
import { Card, Table, Typography, Button, Space, Statistic, Row, Col, Input, Select } from 'antd';
import { WalletOutlined, SendOutlined, SwapOutlined, DownloadOutlined } from '@ant-design/icons';
import { auth, db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';

const { Title, Text } = Typography;
const { Option } = Select;

const WalletContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Wallet = () => {
  const [walletData, setWalletData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setWalletData(data.portfolio || []);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  const columns = [
    {
      title: 'Cryptocurrency',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Value (USD)',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" icon={<SendOutlined />} size="small">
            Send
          </Button>
          <Button type="default" icon={<SwapOutlined />} size="small">
            Swap
          </Button>
        </Space>
      ),
    },
  ];

  const handleDeposit = async () => {
    if (!selectedCrypto || !amount) return;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        const updatedPortfolio = [...(data.portfolio || [])];
        
        const existingCrypto = updatedPortfolio.find(item => item.symbol === selectedCrypto);
        if (existingCrypto) {
          existingCrypto.balance = (parseFloat(existingCrypto.balance) + parseFloat(amount)).toString();
        } else {
          updatedPortfolio.push({
            symbol: selectedCrypto,
            balance: amount,
            value: '0' // This would be calculated based on current market price
          });
        }

        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          portfolio: updatedPortfolio
        });

        setWalletData(updatedPortfolio);
        setSelectedCrypto('');
        setAmount('');
      }
    } catch (error) {
      console.error('Error updating wallet:', error);
    }
  };

  return (
    <WalletContainer>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <StyledCard>
            <Title level={2}>My Wallet</Title>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Row gutter={[24, 24]}>
                <Col span={8}>
                  <Statistic
                    title="Total Balance"
                    value={walletData.reduce((sum, item) => sum + parseFloat(item.value || 0), 0)}
                    prefix="$"
                    precision={2}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Total Assets"
                    value={walletData.length}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Active Transactions"
                    value={0}
                  />
                </Col>
              </Row>
            </Space>
          </StyledCard>
        </Col>

        <Col span={24}>
          <StyledCard title="Deposit Funds">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Select Cryptocurrency"
                    value={selectedCrypto}
                    onChange={setSelectedCrypto}
                  >
                    <Option value="BTC">Bitcoin (BTC)</Option>
                    <Option value="ETH">Ethereum (ETH)</Option>
                    <Option value="USDT">Tether (USDT)</Option>
                    <Option value="BNB">Binance Coin (BNB)</Option>
                  </Select>
                </Col>
                <Col span={8}>
                  <Input
                    placeholder="Amount"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                  />
                </Col>
                <Col span={8}>
                  <Button type="primary" onClick={handleDeposit} block>
                    Deposit
                  </Button>
                </Col>
              </Row>
            </Space>
          </StyledCard>
        </Col>

        <Col span={24}>
          <StyledCard title="My Assets">
            <Table
              columns={columns}
              dataSource={walletData}
              loading={loading}
              rowKey="symbol"
            />
          </StyledCard>
        </Col>
      </Row>
    </WalletContainer>
  );
};

export default Wallet; 