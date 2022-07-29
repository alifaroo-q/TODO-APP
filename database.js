const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_SCHEMA
});

module.exports = connection;