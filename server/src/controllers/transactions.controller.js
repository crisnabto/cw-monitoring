/* eslint-disable no-console */
const transactionService = require('../services/transactions.service');

const getLastFiveMinutes = async (req, res) => {
  const { type, message } = await transactionService.getLastFiveMinutes();
  return res.status(type).json(message);
};

const getAllTransactions = async (req, res) => {
  const { type, message } = await transactionService.getAllTransactions();
  return res.status(type).json(message);
};

const getTransactionsStatus = async (req, res) => {
  const { type, message } = await transactionService.getTransactionsStatus();
  return res.status(type).json(message);
};

const getTransactionsPerMinute = async (req, res) => {
  const { minute } = req.body;
  const { type, message } = await transactionService.getTransactionsPerMinute(minute);
  return res.status(type).json(message);
};

module.exports = {
  getLastFiveMinutes,
  getTransactionsStatus,
  getTransactionsPerMinute,
  getAllTransactions,
};
