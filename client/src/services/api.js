/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const defaultPort = 3001;

const port = process.env.REACT_APP_BACKEND_PORT || defaultPort;

const api = axios.create({
  baseURL: `http://localhost:${port}`,
});

export const getLastFiveMinutes = async () => {
  const result = await api.get('/last-five-minutes');
  return result.data;
};

export const getTransactionsStatus = async () => {
  const result = await api.get('/transactions-status');
  return result.data;
};

export const getAllTransactions = async () => {
  const result = await api.get('/transactions');
  return result.data;
};

export const getCheckout = async () => {
  const result = await api.get('/checkout-transactions');
  return result.data;
};
