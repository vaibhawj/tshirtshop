const knex = require('./connection');

async function addCustomer(customer) {
    return knex.transaction(trx => {
        return knex.raw(
            'Call customer_add(?,?,?)',
            [customer.name, customer.email, customer.password]
        )
    });
}

module.exports = {
    addCustomer
}