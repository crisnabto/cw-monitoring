const connection = require('./connection');
// import { connect } from '../api/app';

// const getAllTransactions = async () => {
//   const [result] = await connection.execute(
//     'SELECT id, time, status, f0 FROM cw_monitoring_system.transactions_1',
//   );
//   return result;
// };

const getLastFiveMinutes = async () => {
  const [result] = await connection.execute(
    `SELECT * FROM cw_monitoring_system.transactions_1 
    WHERE TIME(CONCAT(SUBSTRING(time,1,2),':',SUBSTRING(time,5,2))) BETWEEN TIME(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 5 MINUTE), '%H:%i')) AND TIME(DATE_FORMAT(NOW(), '%H:%i'));
    `,
  );
  return result;
};

const getAllTransactions = async () => {
  const [result] = await connection.execute(
    `SELECT * FROM cw_monitoring_system.transactions_1 
    WHERE TIME(CONCAT(SUBSTRING(time,1,2),':',SUBSTRING(time,5,2))) <= TIME(DATE_FORMAT(NOW(), '%H:%i'));
    `,
  );
  return result;
};

const getTransactionsStatus = async () => {
  const [result] = await connection.execute(
    `SELECT * FROM cw_monitoring_system.transactions_1 
    WHERE TIME(CONCAT(SUBSTRING(time,1,2),':',SUBSTRING(time,5,2))) <= TIME(DATE_FORMAT(NOW(), '%H:%i'));
    `,
  );
  return result;
};

const getTransactionsPerMinute = async (minute) => {
  const [result] = await connection.execute(
    'SELECT * FROM cw_monitoring_system.transactions_1 WHERE time = ?',
    [minute],
  );
  return result;
};

module.exports = {
  getLastFiveMinutes,
  getTransactionsStatus,
  getTransactionsPerMinute,
  getAllTransactions,
};
