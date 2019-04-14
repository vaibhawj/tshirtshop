const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    database: 'tshirtshop',
    user: 'shopuser',
    password: 'password'
});

module.exports = pool;