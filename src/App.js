import React, { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    processData();
  }, []);

  const fetchData = async () => {
    // TODO Bitcoin prices
    return [
      54700.27,
      58065.64,
      58213.93,
      33557.15,
      32933.58,
      43753.22
    ]
  }

  const processData = async () => {
    const bitcointPrices = await fetchData()
    const invested = [100, 100, 100, 100, 100, 100] // TODO use input

    let dcaData = [[
      bitcointPrices[0],
      invested[0],
      invested[0],
      0,
    ]]

    let roi = invested[0]
    let accumulatedInvestment = invested[0]

    for (let i = 1; i < invested.length; i++) {
      const portfolioValue = roi * bitcointPrices[i] / bitcointPrices[i-1] 
      roi = portfolioValue + invested[i] 
      accumulatedInvestment += invested[i]

      dcaData.push([
        bitcointPrices[i], 
        dcaData[i-1][1] + invested[i], // invested 
        Math.round(roi*100) / 100, // value portfolio
        Math.round((roi/accumulatedInvestment - 1)*100) /100 + '%',
      ]);

    }
    setData(dcaData)
  }

  return (
    <div className="App">
      <label>Monthly Investment (USD): </label>
      <input type="number" min="1" placeholder="200"/>
      <div>
        <table>
          <tr> 
            <th>Bitcoin price</th>
            <th>Invested (USD)</th>
            <th>Portfolio Value</th>
            <th>Change (%)</th>
          </tr>
          {data.map((monthData, i) => {
            return <tr>
            {monthData.map((val, i) => {
                return <td>{val}</td>
              })}
            </tr>
          })}
        </table>
      </div>
    </div>
  );
}

export default App;
