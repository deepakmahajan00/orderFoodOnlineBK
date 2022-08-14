const Customer = require('../models/Customer');
const Resturant = require('../models/Resturant');
const ResturantDish = require('../models/ResturantDish');

const getCustomerPurchaseHistory = async (req, res, next) => {
    try {
        let customername = req.params.customername;
        if (customername.length == 0 || typeof customername == 'undefined') {
            res.status(500).json({'error_message': 'Bad request param. customername input is missing'});
        }

        let [resturant, _] = await Customer.findPurchaseHistoryByName(customername);
        let totalRecords = Object.keys(resturant).length;
        res.status(200).json({'total_records': totalRecords, resturant});
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const orderFood = async (req, res, next) => {
    try {
        error = [];
        if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
            error.push('Bad request param. body is missing');
        }
        if (req.params.customerId.length == 0 || typeof req.params.customerId == 'undefined') {
            error.push('Bad request param. customerId input is missing');
        }

        let body = req.body;
        
        if (typeof body.resturant_name == 'undefined' || body.resturant_name.length === 0) {
            error.push('Bad request param. resturant_name is missing');
        }
        if (typeof body.dishes == 'undefined' || body.dishes.length === 0) {
            error.push('Bad request param. dishes is missing. It should be array');
        }
        
        let customerId = req.params.customerId;
        let resturantName = body.resturant_name;
        let dishes = body.dishes;
       
        let [customer] = await Customer.findById(customerId);
        if (customer.length == 0)
        {
            error.push('Customer doesnot exists');
        }

        let [resturant, _] = await Resturant.findResturantByName(resturantName);
        if (resturant.length === 0)
        {
            error.push('Resturant "'+ resturantName + '" doesnot exists');
        }

        let inputDishes = dishes.map(dish => `'${dish}'`);
        let resturatnId = resturant[0].resturant_id;
        let [resturantDishes] = await ResturantDish.findResturantDishsByName(inputDishes, resturatnId)
        if (resturantDishes.length == 0 || resturantDishes.length != dishes.length)
        {
            error.push('Dishes : '+ inputDishes + ' doesnot exists');
        }

        if (error.length > 0) {
            res.status(400).json({'error_message': error});
        }


        let [newRecord] = await ResturantDish.saveOrder(customerId, resturantName, resturantDishes, resturatnId);
        res.status(200).json({newRecord});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    getCustomerPurchaseHistory,
    orderFood,
}

