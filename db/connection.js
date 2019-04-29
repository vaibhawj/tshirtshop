const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.CLEARDB_HOST || 'localhost',
        database: process.env.CLEARDB_SCHEMA || 'tshirtshop',
        user: process.env.CLEARDB_USER || 'shopuser',
        password: process.env.CLEARDB_PASSWORD || 'password'
    },
    pool: { min: 0, max: 7 }
});

module.exports = knex;