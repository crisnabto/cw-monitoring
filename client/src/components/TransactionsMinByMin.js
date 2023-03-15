/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getAllTransactions } from '../services/api';

function TransactionsMinByMin() {
  const chartRef = useRef(null);
  const [trans, setTrans] = useState([]);

  useEffect(() => {
    const fetchTrans = async () => {
      const result = await getAllTransactions();
      setTrans(result);
    };
    fetchTrans();
    const interval = setInterval(() => {
      fetchTrans();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (trans.length) {
      const ctx = chartRef.current.getContext('2d');
      const chartConfig = {
        type: 'bar',
        data: {
          labels: trans.map((tr) => tr.time),
          datasets: [
            {
              label: 'Denied',
              data: trans.map((tr) => (tr.status === 'denied' ? tr.f0 : 0)),
              backgroundColor: 'red',
              borderColor: 'red',
              borderWidth: 1,
              barThickness: 0.4,
            },
            {
              label: 'Approved',
              // data: time.map((t) => countsByMinute[t.time]?.approved || 0),
              data: trans.map((tr) => (tr.status === 'approved' ? tr.f0 : 0)),
              backgroundColor: 'green',
              borderColor: 'green',
              borderWidth: 1,
              barThickness: 0.4,
            },
            {
              label: 'Reversed',
              // data: trans.map((t) => countsByMinute[t.time]?.refunded || 0),
              data: trans.map((tr) => (tr.status === 'reversed' ? tr.f0 : 0)),
              backgroundColor: 'blue',
              borderColor: 'blue',
              borderWidth: 1,
              barThickness: 2,
            },
            {
              label: 'Failed',
              // data: trans.map((t) => countsByMinute[t.time]?.refunded || 0),
              data: trans.map((tr) => (tr.status === 'failed' ? tr.f0 : 0)),
              backgroundColor: 'yellow',
              borderColor: 'yellow',
              borderWidth: 1,
              barThickness: 2,
            },
          ],
        },
        options: {
          scales: {
            x: {
              gridLines: {
                display: false,
              },
            },
            y: {
              gridLines: {
                display: false,
              },
            },
          },
        },
      };

      const myChart = new Chart(ctx, chartConfig);

      return () => {
        myChart.destroy();
      };
    }
    return () => {};
  }, [trans]);

  return (
    <div>
      <h1>Transactions minute by minute</h1>
      <canvas ref={chartRef} width="1400" height="300" />
    </div>
  );
}

export default TransactionsMinByMin;
