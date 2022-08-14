const db = require('../config/db');
class ResturantDish {
    static findResturantDishsByName(names, resturantId) {
        var sql = `SELECT * FROM resturant_menus WHERE resturant_id = ${resturantId} AND dish_name IN (${names})`;
        return db.execute(sql);
    };

    static findById(customerId) {
        var sql = `SELECT * FROM customers WHERE cust_id = ${customerId} LIMIT 1`;
        return db.execute(sql);
    }

    static saveOrder(customerId, resturantName, dishes, resturatnId) {
        db.query('START TRANSACTION');
        try {
            let totalPrice = 0.00;
            dishes.forEach(dish => {
                totalPrice += dish.price;
                db.query(`INSERT INTO orders SET cust_id = ${customerId}, dish_name = '${dish.dish_name}', resturant_name = '${resturantName}', transaction_amount = ${dish.price}, transaction_date = 'NOW()'`);    
                //console.log(sql);
                //db.query(sql);
            });
            
            this.handleCustomerCashBalancePostSaveOrder(customerId, totalPrice);
            this.handleResturantCashBalancePostSaveOrder(resturatnId, totalPrice);

            db.query('COMMIT');
            console.log('End Tranaction!');
            return ['order created successfully'];


        } catch (error) {
            console.error(`Error occurred while creating order: ${error.message}`, error);
            db.query('ROLLBACK');
            console.info('Rollback successful');
            return ['error creating order'];
        }
    }

    static handleCustomerCashBalancePostSaveOrder(customerId, totalPrice) {
        try {
            var sql = `UPDATE customers SET cash_balance = cash_balance - ${totalPrice} WHERE cust_id = ${customerId};`;
            db.execute(sql);
        } catch (error) {
            console.log(error)
            next(error);
        }
        
    }

    static handleResturantCashBalancePostSaveOrder(resturatnId, totalPrice) {
        try {
            var sql =`UPDATE resturants SET cash_balance = cash_balance + ${totalPrice} WHERE resturant_id = ${resturatnId}`;
            db.execute(sql);
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

module.exports = ResturantDish;