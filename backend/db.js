const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  
});
// console.log('PG_PASSWORD:', process.env.PG_PASSWORD);
// console.log('PG_USER:', process.env.PG_USER);
module.exports = pool;