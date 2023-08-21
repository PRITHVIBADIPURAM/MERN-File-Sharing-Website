

import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [stockPrices, setStockPrices] = useState({});
  const topCryptos = ['bitcoin', 'ethereum', 'ripple']; // List of top cryptocurrencies
  const stockSymbols = ['AAPL', 'GOOGL', 'AMZN']; // List of Indian stock symbols
  const apiKey = '9G9AM8RO1L3AWFM8';
  const [loading, setLoading] = useState(true);


  const fetchCryptoPrices = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${topCryptos.join(',')}&vs_currencies=inr`
      );
      setCryptoPrices(response.data);
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
    }
  };


  const fetchStockPrices = async () => {
    try {
      const promises = stockSymbols.map(async (symbol) => {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`
        );
        return { symbol, data: response.data };
      });


      const stockData = await Promise.all(promises);
      const formattedStockPrices = {};


      stockData.forEach(({ symbol, data }) => {
        const latestData = data['Time Series (5min)'];
        const latestTimestamp = Object.keys(latestData)[0];
        const latestPrice = latestData[latestTimestamp]['4. close'];
        formattedStockPrices[symbol] = latestPrice;
      });


      setStockPrices(formattedStockPrices);
    } catch (error) {
      console.error('Error fetching stock prices:', error);
    }
  };


  useEffect(() => {
    fetchCryptoPrices();
    fetchStockPrices();
    setLoading(false);
  }, []);


  return (
    <div className='container'>
      <div className='custom-container'>
        <h2>Cryptocurrency and Indian Stock Prices</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='crypto-cards'>
            <h3>Cryptocurrencies</h3>
            {topCryptos.map((cryptoId) => (
              <div className='crypto-card' key={cryptoId}>
                <h4>{cryptoId}</h4>
                <p>Price: INR {cryptoPrices[cryptoId]?.inr}</p>
              </div>
            ))}
            <div className='ind'>
            <h3 >Indian Stocks</h3>
            {stockSymbols.map((symbol) => (
              <div className='stock-card' key={symbol}>
                <h4>{symbol}</h4>
                <p>Price INR: {stockPrices[symbol]}</p>
              </div>
            ))}
            </div>
          </div>
        )}
      </div>
      <div className='wrapper'>
        <h1>Simple file sharing!</h1>
        <p>Upload and share the download link.</p>
       
        <button>Upload</button>
        <input type="file" style={{ display: "none" }} />
       
        <a href='#' target='_blank'>File Link</a>
      </div>
    </div>
  );
}


export default App;