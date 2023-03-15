/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getCheckout } from '../services/api';

function Checkout() {
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sumTotal = {
        totalToday: 0,
        totalYesterday: 0,
        totalSDLW: 0,
        totalAvgLW: 0,
        totalAvgLM: 0,
      };
      const result = await getCheckout();
      // console.log(result);
      for (let i = 0; i < result.length; i += 1) {
        sumTotal.totalToday += result[i].today;
        sumTotal.totalYesterday += result[i].yesterday;
        sumTotal.totalSDLW += result[i].same_day_last_week;
        sumTotal.totalAvgLW += result[i].avg_last_week;
        sumTotal.totalAvgLM += result[i].avg_last_month;
      }
      setTotalData(sumTotal);
      setData(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length) {
      const ctx = chartRef.current.getContext('2d');
      const chartConfig = {
        type: 'line',
        data: {
          labels: data.map((row) => row.time),
          datasets: [
            {
              label: 'Today',
              data: data.map((row) => row.today),
              borderColor: 'red',
              fill: false,
            },
            {
              label: 'Yesterday',
              data: data.map((row) => row.yesterday),
              borderColor: 'blue',
              fill: false,
            },
            {
              label: 'Same Day Last Week',
              data: data.map((row) => row.same_day_last_week),
              borderColor: 'green',
              fill: false,
            },
            {
              label: 'Avg Last Week',
              data: data.map((row) => row.avg_last_week),
              borderColor: 'purple',
              fill: true,
            },
            {
              label: 'Avg Last Month',
              data: data.map((row) => row.avg_last_month),
              borderColor: 'orange',
              fill: true,
            },
          ],
        },
      };
      const myChart = new Chart(ctx, chartConfig);

      return () => {
        myChart.destroy();
      };
    }
    return () => {};
  }, [data]);

  useEffect(() => {
    if (data.length) {
      const ctx = chartRef2.current.getContext('2d');
      const chartConfig = {
        type: 'bar',
        data: {
          labels: data.map((row) => row.time),
          datasets: [
            {
              label: 'Today',
              data: data.map((row) => row.today),
              borderColor: 'light-blue',
              backgroundColor: 'lightskyblue',
              fill: false,
              type: 'bar',
              stack: 'Stack 0',
            },
            {
              label: 'Today',
              data: data.map((row) => row.today),
              backgroundColor: 'purple',
              borderColor: 'purple',
              fill: false,
              type: 'line',
            },
            {
              label: 'Today - Avr Last Month',
              data: data.map((row) => row.today_avgl_month),
              borderColor: 'navy',
              backgroundColor: 'navy',
              fill: false,
              type: 'bar',
              stack: 'Stack 0',
            },
            {
              label: 'Average Last Month',
              data: data.map((row) => row.avg_last_month),
              borderColor: 'red',
              backgroundColor: 'red',
              fill: false,
              type: 'line',
            },
          ],
        },
        options: {
          scales: {
            y: {
              ticks: {
                beginAtZero: false,
                suggestedMin: -10,
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
  }, [data]);

  useEffect(() => {
    if (data.length) {
      const ctx = chartRef3.current.getContext('2d');
      const chartConfig = {
        type: 'bar',
        data: {
          labels: data.map((row) => row.time),
          datasets: [
            {
              label: 'Today',
              data: data.map((row) => row.today),
              backgroundColor: 'orange',
              borderColor: 'orange',
              fill: false,
              type: 'line',
            },
            {
              label: 'Yesterday',
              data: data.map((row) => row.yesterday),
              backgroundColor: 'rgb(110, 155, 187)',
              borderColor: 'rgb(110, 155, 187)',
              fill: false,
              type: 'line',
            },
            {
              label: 'Avg Last Month',
              data: data.map((row) => row.avg_last_month),
              backgroundColor: 'pink',
              borderColor: 'pink',
              fill: false,
              type: 'line',
            },
            {
              label: 'Avg Last Week',
              data: data.map((row) => row.avg_last_week),
              backgroundColor: 'green',
              borderColor: 'green',
              fill: false,
              type: 'line',
            },
            {
              label: 'Same day last week',
              data: data.map((row) => row.same_day_last_week),
              backgroundColor: 'blue',
              borderColor: 'blue',
              fill: false,
              type: 'line',
            },
            {
              label: 'Today - Yesterday',
              data: data.map((row) => row.today_yesterday),
              backgroundColor: 'lightskyblue',
              borderColor: 'lightskyblue',
              fill: false,
              type: 'line',
            },
            {
              label: 'Today - SDLWeek',
              data: data.map((row) => row.today_sdl_week),
              backgroundColor: 'purple',
              borderColor: 'purple',
              fill: false,
              type: 'line',
            },
            {
              label: 'Today - Avg Last Week',
              data: data.map((row) => row.today_avgl_week),
              borderColor: 'navy',
              backgroundColor: 'navy',
              fill: false,
              type: 'line',
            },
            {
              label: 'Today - Avg Last Month',
              data: data.map((row) => row.today_avgl_month),
              borderColor: 'red',
              backgroundColor: 'red',
              fill: false,
              type: 'line',
            },
          ],
        },
        options: {
          scales: {
            y: {
              ticks: {
                beginAtZero: false,
                suggestedMin: -10,
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
  }, [data]);

  return (
    <div>
      <canvas ref={chartRef} width="1000" height="400" />
      <canvas ref={chartRef2} width="1000" height="400" />
      <canvas ref={chartRef3} width="1000" height="400" />
      {totalData && (
        <div>
          <p>
            Total sales today:
            {' '}
            {totalData.totalToday}
          </p>
          <p>
            Total sales yesterday:
            {' '}
            {totalData.totalYesterday}
          </p>
          <p>
            Total sales same day last week:
            {' '}
            {totalData.totalSDLW}
          </p>
          <p>
            Total average sales last week:
            {' '}
            {totalData.totalAvgLW}
          </p>
          <p>
            Total average sales last month:
            {' '}
            {totalData.totalAvgLM}
          </p>
        </div>
      )}
    </div>
  );
}

export default Checkout;
