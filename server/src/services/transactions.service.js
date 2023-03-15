const transactionsModel = require('../models/transactions.model');

const getLastFiveMinutes = async () => {
  const transactions = await transactionsModel.getLastFiveMinutes();
  return { type: 200, message: transactions };
};

const getAllTransactions = async () => {
  const transactions = await transactionsModel.getAllTransactions();
  return { type: 200, message: transactions };
};

const getTransactionsStatus = async () => {
  const transactions = await transactionsModel.getAllTransactions();
  return { type: 200, message: transactions };
};

const getTransactionsPerMinute = async (minute) => {
  const transactions = await transactionsModel.getTransactionsPerMinute(minute);
  return { type: 200, message: transactions };
};

module.exports = {
  getLastFiveMinutes,
  getTransactionsStatus,
  getTransactionsPerMinute,
  getAllTransactions,
};
