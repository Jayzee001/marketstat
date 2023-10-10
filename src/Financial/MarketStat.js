import React, { useState, useRef } from 'react';
import searcch from '../Assets/search-removebg-preview.png';
import Table from 'react-bootstrap/Table';
import jsPDF from 'jspdf';
import './currency.css';
import html2canvas from 'html2canvas';

function ResponsiveExample() {
  const [data, setData] = useState([]);
  const [elementT, setElementT] = useState('');
  const pdfRef = useRef(null);
  const Apikey = '33MRWTBNR75XL94K';

  const search = async () => {
    try {
      const elementTValue = document.querySelector('.stock').value;
      const period = document.querySelector('#period').value;
      const interval = document.querySelector('#time').value;

      if (!elementTValue || !period) {
        alert('Please enter a stock symbol and select a period.');
        return;
      }

      let requestURL;
      if (period === 'TIME_SERIES_INTRADAY') {
        requestURL = `https://www.alphavantage.co/query?function=${period}&symbol=${elementTValue}&interval=${interval}&apikey=${Apikey}`;
      }else if (period === 'TIME_SERIES_DAILY') {
        requestURL = `https://www.alphavantage.co/query?function=${period}&symbol=${elementTValue}&apikey=${Apikey}`;
      }else if (period === 'TIME_SERIES_WEEKLY') {
        requestURL = `https://www.alphavantage.co/query?function=${period}&symbol=${elementTValue}&apikey=${Apikey}`;
      }else {
        requestURL = `https://www.alphavantage.co/query?function=${period}&symbol=${elementTValue}&apikey=${Apikey}`;
      }

      const response = await fetch(requestURL);
      const responseData = await response.json();
  console.log('API Response Data:', responseData);
  
      const timeSeriesData = responseData['Time Series (Daily)'] ||
        responseData['Monthly Time Series'] ||
        responseData['Weekly Time Series'] ||
        responseData['Time Series (60min)'] ||
        responseData['Time Series (1min)'] ||
        responseData['Time Series (15min)'] ||
        responseData['Time Series (30min)'] ||
      responseData['Time Series (5min)']
    const mappedData = Object.keys(timeSeriesData).map(date => ({
      date,
      open: timeSeriesData[date]['1. open'],
      high: timeSeriesData[date]['2. high'],
      low: timeSeriesData[date]['3. low'],
      close: timeSeriesData[date]['4. close'],
      volume: timeSeriesData[date]['5. volume']
    }));

    console.log('Mapped Data:', mappedData);

    setData(mappedData);
      setElementT(elementTValue);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generatePDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgX = 0;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight);
      pdf.save(`Stock_Report_${elementT}.pdf`);
    });
  };

  return (
    <div className='contain'>
      <h1>Market Statistics App</h1>
      <div className='search'>
        <select name="period" id="period">
          <option value="">Choose period</option>
          <option value="TIME_SERIES_INTRADAY">Intraday</option>
          <option value="TIME_SERIES_DAILY">Daily</option>
          <option value="TIME_SERIES_WEEKLY">Weekly</option>
          <option value="TIME_SERIES_MONTHLY">Monthly</option>
        </select>
        <input type='text' className='stock' placeholder='AAPL, MSFT - Search' />
        <select name="time" id="time">
          <option title='if you picked a intraday' value="">Choose Time interval</option>
          <option value="1min">1min</option>
          <option value="5min">5min</option>
          <option value="15min">15min</option>
          <option value="30min">30min</option>
          <option value="60min">60min</option>
        </select>
        <span className='btn' onClick={search}>
          <img src={searcch} alt='logo' />
        </span>
      </div>
      <div className='feeds' ref={pdfRef}>
        <Table responsive='sm'>
          <thead>
            <tr>
              <th>#</th>
              <th>Opening value</th>
              <th>High</th>
              <th>Low</th>
              <th>Closing value</th>
              <th>Volume</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className='' style={{background:'#fff'}}>{index + 1}</td>
                <td className='copy' style={{background:'#fda172'}}>{item.open}</td>
                <td className='copy' style={{background:'#74b72e'}}>{item.high}</td>
                <td className='copy' style={{background:'#d21404'}}>{item.low}</td>
                <td className='copy' style={{background: item.close > item.open ? '#00FF00' : '#FF0000'}}>{item.close}</td>
                <td className='copy' style={{background: '#00FF99' , color: '#fff'}}>{item.volume}</td>
                <td className='copy' style={{background:'#fff'}}>{item.date}</td>
              </tr>
            ))}
          </tbody>
            </Table>
      </div>
      <button className='download' onClick={generatePDF}>
        Download as PDF
      </button>
    </div>
  );
}

export default ResponsiveExample;
