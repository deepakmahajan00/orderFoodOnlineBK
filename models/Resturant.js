const db = require('../config/db');
class Resturant {
    static findResturantByName(name) {
        try {
            var sql = `SELECT resturant_id, name FROM resturants WHERE  name = '${name}' LIMIT 1`;
            return db.execute(sql);
        } catch (error) {
            console.log(error);
            next(error);
        }
        
    }

    static findByResturantOrDishName(name) {
        var sql = `SELECT r.name, rm.dish_name, rm.price
        FROM resturants r
        JOIN resturant_menus rm ON rm.resturant_id = r.resturant_id
        WHERE (
            CONCAT(r.name, ' ' , rm.dish_name) LIKE '${name}%' OR
            CONCAT(r.name, ' ' , rm.dish_name) LIKE '%${name}%' OR
            CONCAT(r.name, ' ' , rm.dish_name) LIKE '%${name}'
        )
        ORDER BY case
            WHEN CONCAT(r.name, ' ' , rm.dish_name) LIKE '${name}%' THEN 1
            WHEN CONCAT(r.name, ' ' , rm.dish_name) LIKE '%${name}%' THEN 2
            WHEN CONCAT(r.name, ' ' , rm.dish_name) LIKE '%${name}' THEN 3
        ELSE 4 END`;
        return db.execute(sql);
    }

    static findByDayOpenAndCloseTime(day, openTime, closeTime) {
        var sql = `SELECT r.name, r.resturant_id, bh.open_time, bh.close_time, bh.day_of_week
        FROM resturants r
        JOIN business_hours bh ON bh.resturant_id = r.resturant_id
        WHERE bh.day_of_week = '${day}' AND bh.open_time >= '${openTime}' AND bh.close_time <= '${closeTime}'
        ORDER BY bh.open_time ASC`;
        return db.execute(sql);
    }

    static findByNumberOfDishes(condition, numOfDishes, minPrice, maxPrice) {
        let countCondition = ''
        if (condition === 'lessthan')
        {
            countCondition = `HAVING num_of_dishes < ${numOfDishes}`;
        } else {
            countCondition = `HAVING num_of_dishes > ${numOfDishes}`;
        }

        let priceCondition = '';
        if (minPrice > 0 && maxPrice > 0)
        {
            priceCondition = `WHERE rm.price >= ${minPrice} AND rm.price <= ${maxPrice}`
        } 
        
        // var sql = `SELECT r.resturant_id, r.name, rm.menu_id, rm.price, count(*) as num_of_dishes
        // SELECT r.resturant_id, r.name
        // FROM resturants r
        // JOIN resturant_menus rm ON rm.resturant_id = r.resturant_id
        // ${priceCondition}
        // GROUP BY r.resturant_id
        // ${countCondition}
        // ORDER BY r.name ASC`;
        // return db.execute(sql);

        var sql = `
        SELECT r.resturant_id, r.name, rm.menu_id, rm.price, count(*) as num_of_dishes
        FROM resturants AS r
        JOIN resturant_menus AS rm ON rm.resturant_id = r.resturant_id
        ${priceCondition}
        GROUP BY r.resturant_id
        ${countCondition}
        ORDER BY r.name ASC`;
        return db.execute(sql);
    };
}

module.exports = Resturant;