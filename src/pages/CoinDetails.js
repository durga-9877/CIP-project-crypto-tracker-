import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { FaArrowLeft, FaArrowUp, FaArrowDown } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  text-decoration: none;
  margin-bottom: 2rem;
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const CoinImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
`;

const CoinInfo = styled.div`
  flex: 1;
`;

const CoinName = styled.h1`
  font-size: 2rem;
  margin: 0;
  color: #fff;
`;

const CoinSymbol = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
`;

const PriceSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const CurrentPrice = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1rem;
`;

const PriceChange = styled.div`
  color: ${props => props.isPositive ? '#4CAF50' : '#F44336'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
`;

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 12px;
`;

function CoinDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const [coinResponse, chartResponse] = await Promise.all([
          axios.get(`https://api.coingecko.com/api/v3/coins/${id}`),
          axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
            params: {
              vs_currency: 'usd',
              days: '7',
            },
          }),
        ]);

        setCoin(coinResponse.data);
        
        const chartData = {
          labels: chartResponse.data.prices.map(price => 
            new Date(price[0]).toLocaleDateString()
          ),
          datasets: [
            {
              label: 'Price',
              data: chartResponse.data.prices.map(price => price[1]),
              borderColor: '#2196F3',
              tension: 0.1,
            },
          ],
        };
        
        setChartData(chartData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch coin data. Please try again later.');
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!coin) return null;

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft /> Back to Home
      </BackButton>

      <Header>
        <CoinImage src={coin.image.large} alt={coin.name} />
        <CoinInfo>
          <CoinName>{coin.name}</CoinName>
          <CoinSymbol>{coin.symbol.toUpperCase()}</CoinSymbol>
        </CoinInfo>
      </Header>

      <PriceSection>
        <CurrentPrice>
          ${coin.market_data.current_price.usd.toLocaleString()}
        </CurrentPrice>
        <PriceChange isPositive={coin.market_data.price_change_percentage_24h >= 0}>
          {coin.market_data.price_change_percentage_24h >= 0 ? (
            <FaArrowUp />
          ) : (
            <FaArrowDown />
          )}
          {Math.abs(coin.market_data.price_change_percentage_24h).toFixed(2)}%
        </PriceChange>
      </PriceSection>

      <StatsGrid>
        <StatCard>
          <StatLabel>Market Cap</StatLabel>
          <StatValue>${coin.market_data.market_cap.usd.toLocaleString()}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>24h Trading Volume</StatLabel>
          <StatValue>${coin.market_data.total_volume.usd.toLocaleString()}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Circulating Supply</StatLabel>
          <StatValue>{coin.market_data.circulating_supply.toLocaleString()}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Total Supply</StatLabel>
          <StatValue>{coin.market_data.total_supply?.toLocaleString() || 'N/A'}</StatValue>
        </StatCard>
      </StatsGrid>

      <ChartContainer>
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
            scales: {
              y: {
                beginAtZero: false,
              },
            },
          }}
        />
      </ChartContainer>
    </Container>
  );
}

export default CoinDetails; 