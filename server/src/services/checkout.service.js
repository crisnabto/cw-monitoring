const checkoutModel = require('../models/checkout.model');

const getCheckout = async () => {
  const checkoutData = await checkoutModel.getCheckout();
  return { type: 200, message: checkoutData };
};

module.exports = { getCheckout };
