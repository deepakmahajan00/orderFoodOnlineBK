const db = require('../config/db');
class Customer {
    static findPurchaseHistoryByName(name) {
        var sql = `SELECT c.cust_name, c.cash_balance, o.dish_name, o.resturant_name, o.transaction_amount, o.transaction_date
        FROM customers c
        JOIN orders o ON o.cust_id = c.cust_id
        WHERE c.cust_name = '${name}'
        ORDER BY o.transaction_date DESC`;
        return db.execute(sql);
    };

    static findById(customerId) {
        var sql = `SELECT * FROM customers WHERE cust_id = ${customerId} LIMIT 1`;
        return db.execute(sql);
    }
}

module.exports = Customer;