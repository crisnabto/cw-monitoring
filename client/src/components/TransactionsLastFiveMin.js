/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getLastFiveMinutes } from '../services/api';

function TransactionsLastFiveMin() {
  const chartRef = useRef(null);
  const [fiveMinutes, setFiveMinutes] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [alertAnom, setAlertAnom] = useState([]);

  useEffect(() => {
    const fetchTrans = async () => {
      const result = await getLastFiveMinutes();
      const contadores2 = {
        sum: 0,
        approved: 0,
        denied: 0,
        reversed: 0,
        refunded: 0,
        processing: 0,
        failed: 0,
      };
      for (let i = 0; i < result.length; i += 1) {
        if (result[i].status === 'approved') contadores2.approved += result[i].f0;
        if (result[i].status === 'denied') contadores2.denied += result[i].f0;
        if (result[i].status === 'failed') contadores2.failed += result[i].f0;
        if (result[i].status === 'refunded') contadores2.refunded += result[i].f0;
        if (result[i].status === 'reversed') contadores2.reversed += result[i].f0;
        if (result[i].status === 'backend_reversed') contadores2.reversed += result[i].f0;
        if (result[i].status === 'processing') contadores2.processing += result[i].f0;
      }
      let soma = 0;
      for (const chave in contadores2) {
        soma += contadores2[chave];
      }
      contadores2.sum = soma;
      if ((contadores2.denied / soma) > 0.15) {
        const resultPercent = ((contadores2.denied / soma) * 100).toFixed();
        setAlertAnom(`Anomaly detected: an upward trend in declined transactions: > ${resultPercent}%`);
      } else if ((contadores2.reversed / soma) > 0.014) {
        const resultPercent = ((contadores2.reversed / soma) * 100).toFixed();
        setAlertAnom(`Anomaly detected: an upward trend in reversed transactions: > ${resultPercent}%`);
      } else if ((contadores2.failed / soma) > 0.005) {
        const resultPercent = ((contadores2.failed / soma) * 100).toFixed();
        setAlertAnom(`Anomaly detected: an upward trend in failed transactions: > ${resultPercent}%`);
      } else {
        setAlertAnom('');
      }
      setFiveMinutes(contadores2);
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
  }, [fiveMinutes]);

  useEffect(() => {
    if (fiveMinutes) {
      const ctx = chartRef.current.getContext('2d');
      const chartConfig = {
        type: 'bar',
        data: {
          labels: Object.keys(fiveMinutes),
          datasets: [
            {
              label: '',
              data: Object.values(fiveMinutes),
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
      };
      const myChart = new Chart(ctx, chartConfig);

      return () => {
        myChart.destroy();
      };
    }
    return () => {}; // retorna uma funcao vazia quando !fiveMinutes
  }, [currentTime]);

  return (
    <div>
      <h1>{`Transactions by status in the last 5 minutes. Current time: ${currentTime}`}</h1>
      <canvas ref={chartRef} width="1200" height="400" />
      {alertAnom && <h3>{alertAnom}</h3>}
    </div>
  );
}

export default TransactionsLastFiveMin;
