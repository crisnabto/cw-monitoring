/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
const transactionsController = require('../controllers/transactions.controller');
const checkoutController = require('../controllers/checkout.controller');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/transactions', transactionsController.getAllTransactions);
app.get('/transactions-status', transactionsController.getTransactionsStatus);
app.get('/last-five-minutes', transactionsController.getLastFiveMinutes);
app.get('/minute', transactionsController.getTransactionsPerMinute);
app.get('/checkout-transactions', checkoutController.getCheckout);

module.exports = app;
