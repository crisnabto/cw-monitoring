/* eslint-disable no-console */
const checkoutService = require('../services/checkout.service');

const getCheckout = async (req, res) => {
  const { type, message } = await checkoutService.getCheckout();
  return res.status(type).json(message);
};

module.exports = { getCheckout };
