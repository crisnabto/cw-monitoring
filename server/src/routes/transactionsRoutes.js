const express = require('express');
const transactionsController = require('../controllers/transactions.controller');

const router = express.Router();

router.get('/', transactionsController.getAllTransactions);
router.get('/minute', transactionsController.getTransactionsPerMinute);

module.exports = {
  router,
};
