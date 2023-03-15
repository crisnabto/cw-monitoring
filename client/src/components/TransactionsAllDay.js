/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getTransactionsStatus } from '../services/api';

function TransactionsAllDay() {
  const chartRef = useRef(null);
  const [transStatus, settransStatus] = useState([]);
  const [currentTime, setCurrentTime] = useState('');

  const contadores = {
    sum: 0,
    approved: 0,
    denied: 0,
    reversed: 0,
    refunded: 0,
    processing: 0,
    failed: 0,
  };

  useEffect(() => {
    const fetchTrans = async () => {
      const result = await getTransactionsStatus();
      for (let i = 0; i < result.length; i += 1) {
        if (result[i].status === 'approved') contadores.approved += result[i].f0;
        if (result[i].status === 'denied') contadores.denied += result[i].f0;
        if (result[i].status === 'failed') contadores.failed += result[i].f0;
        if (result[i].status === 'refunded') contadores.refunded += result[i].f0;
        if (result[i].status === 'reversed') contadores.reversed += result[i].f0;
        if (result[i].status === 'backend_reversed') contadores.reversed += result[i].f0;
        if (result[i].status === 'processing') contadores.processing += result[i].f0;
      }
      let soma = 0;
      for (const chave in contadores) {
        soma += contadores[chave];
      }
      contadores.sum = soma;
      settransStatus(contadores);
    };
    fetchTrans();
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
      fetchTrans();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (transStatus) {
      const ctx = chartRef.current.getContext('2d');
      const chartConfig = {
        type: 'bar',
        data: {
          labels: Object.keys(transStatus),
          datasets: [
            {
              label: '',
              data: Object.values(transStatus),
              backgroundColor: [
                'rgba(75, 14, 192, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(75, 14, 192, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            }],
        },
        options: {
          legend: {
            display: false,
          },
        },
      };
      const myChart = new Chart(ctx, chartConfig);

      return () => {
        myChart.destroy();
      };
    }
    return () => {};
  }, [transStatus]);

  return (
    <div>
      <h1>
        All transactions today - 00:00 -
        {' '}
        {currentTime}
      </h1>
      <canvas ref={chartRef} width="1200" height="400" />
    </div>
  );
}

export default TransactionsAllDay;
