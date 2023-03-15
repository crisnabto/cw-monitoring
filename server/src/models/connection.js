/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable prefer-template */
require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const file = path.resolve(__dirname, '../data/transactions_1.csv');
const file2 = path.resolve(__dirname, '../data/checkout_1.csv');
// const file = require('../data/inventory.csv');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  port: process.env.MYSQL_PORT || 3306,
});
async function connect() {
  try {
    console.log('Conectado ao banco de dados MySQL com sucesso!');

    const dropDB = 'DROP DATABASE IF EXISTS cw_monitoring_system';

    const createDatabase = `
  CREATE DATABASE IF NOT EXISTS cw_monitoring_system;
`;
    const useDatabaseQuery = 'USE cw_monitoring_system;';

    await connection.query(dropDB);
    await connection.query(createDatabase);
    await connection.query(useDatabaseQuery);

    const createTable = `
      CREATE TABLE IF NOT EXISTS transactions_1 (
        id INT NOT NULL auto_increment,
        time VARCHAR(6) NOT NULL,
        status VARCHAR(30) NOT NULL,
        f0 INT NOT NULL,
        PRIMARY KEY (id)
      );
    `;

    await connection.query(createTable);
    console.log('Tabela criada com sucesso!');

    const results = [];

    fs.createReadStream(file)
      .pipe(csv({ headers: ['time', 'status', 'f0'], skipLines: 1 }))
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', async () => {
        const insertQuery = `
          INSERT INTO transactions_1 (time, status, f0)
          VALUES ?;
        `;

        const values = results.map((result) => [
          result.time,
          result.status,
          result.f0,
        ]);

        await connection.query(insertQuery, [values]);
        console.log('Dados inseridos com sucesso!');

        const createTableCheckout = `
          CREATE TABLE IF NOT EXISTS checkout_1 (
            time VARCHAR(6) NOT NULL,
            today INT,
            yesterday INT,
            same_day_last_week INT,
            avg_last_week FLOAT,
            avg_last_month FLOAT,
            today_yesterday FLOAT AS (today - yesterday),
            today_sdl_week FLOAT as (today - same_day_last_week),
            today_avgl_week FLOAT AS (today - avg_last_week),
            today_avgl_month FLOAT AS (today - avg_last_month),
            PRIMARY KEY (time)
          );
        `;

        await connection.query(createTableCheckout);
        console.log('Tabela criada com sucesso!');

        const results2 = [];

        fs.createReadStream(file2)
          .pipe(csv({ headers: ['time', 'today', 'yesterday', 'same_day_last_week', 'avg_last_week', 'avg_last_month'], skipLines: 1 }))
          .on('data', (data) => {
            results2.push(data);
          })
          .on('end', async () => {
            await connection.query(useDatabaseQuery);
            const insertQuery2 = `
            INSERT INTO checkout_1 (time, today, yesterday, same_day_last_week, avg_last_week, avg_last_month)
            VALUES ?;
            `;

            const values2 = results2.map((result) => [
              result.time,
              result.today,
              result.yesterday,
              result.same_day_last_week,
              result.avg_last_week,
              result.avg_last_month,
            ]);

            await connection.query(insertQuery2, [values2]);
            console.log('Dados inseridos com sucesso!');
          });
      });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados: ' + error.stack);
  }
}

connect();

module.exports = connection;
