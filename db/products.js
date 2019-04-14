const pool = require('./connectionUtil');

async function getProducts() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * from product', function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        });
    });
}

module.exports = {
    getProducts
}