const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.CLEARDB_DATABASE_URL || 'localhost',
    database: process.env.CLEARDB_SCHEMA || 'tshirtshop',
    user: process.env.CLEARDB_USER || 'shopuser',
    password: process.env.CLEARDB_PASSWORD || 'password'
});

module.exports = pool;