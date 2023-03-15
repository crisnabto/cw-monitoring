const connection = require('./connection');

const getCheckout = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM cw_monitoring_system.checkout_1',
  );
  return result;
};

module.exports = { getCheckout };
