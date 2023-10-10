import React, { useState } from 'react';
import searchImage from '../Assets/search-removebg-preview.png';

const CurrencyValue = () => {
  const [data, setData] = useState([]);
  const [multipliedValues, setMultipliedValues] = useState({});

  const Apikey = '88e2718d827479142bb4a06e6bbca911';

  const Search = async () => {
    try {
      const currenciesInput = document.querySelector('.currencies');
      const mainCurrencyInput = document.querySelector('.main_currencies');
      const amountInput = document.querySelector('.amount');

      if (!currenciesInput.value || !mainCurrencyInput.value || !amountInput.value) {
        alert('Please enter both main currency, target currency, and amount.');
        return;
      }

      const url = `http://apilayer.net/api/live?access_key=${Apikey}&currencies=${currenciesInput.value}&source=${mainCurrencyInput.value}&format=1`;

      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await resp.json();
      const quotes = jsonData.quotes;
      setData(quotes);

      // Calculate the multiplied value for each currency
      const multipliedValuesData = {};
      Object.entries(quotes).forEach(([currency, value]) => {
        multipliedValuesData[currency] = value * parseFloat(amountInput.value);
      });
      setMultipliedValues(multipliedValuesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='container'>
      <h1>Currency Value App</h1>
      <div className='seari'>
        <span className='sear'>
        <label>Currencies</label>
        <input type='text' className='currencies' placeholder='EUR,GBP,CAD,PLN - search' />
        <label>Main Currency</label>
        <input type='text' className='main_currencies' placeholder='USD - Search' />
        <label>Amount</label>
        <input type='number' step='any' className='amount' placeholder='Amount in the main currency' />
        </span>
        <span onClick={Search} className='search_btn'>
          <h5>Submit</h5>
          </span>
      </div>
      {Object.keys(data).length > 0 && (
        <div className='feed'>
          <h4>Quotes:</h4>
          <ul>
            {Object.entries(data).map(([currency, value], index) => (
              <div key={index}>
                <li>
                  {currency}: {value}
                  <br />
                  {currency} = {multipliedValues[currency]}
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencyValue;
