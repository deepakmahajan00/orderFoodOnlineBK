const Resturant = require('../models/Resturant');

const getResturantsMoreOrLessNumberOfDishes = async (req, res, next) => {
    try {
        let morethan = req.query.morethan;
        let lessthan = req.query.lessthan;
        let minPrice = req.query.minprice;
        let maxPrice = req.query.maxprice;

        let error = [];
        if (typeof minPrice == 'undefined' || typeof maxPrice == 'undefined') {
            error.push('param minprice should should not be empty');
        } 
        if (typeof lessthan !== 'undefined' && typeof morethan !== 'undefined') {
            error.push('Api need morethan or lessthan input param');
        }
        if (typeof lessthan == 'undefined' && typeof morethan == 'undefined') {
            error.push('lessthan or morethan param not provided');
        } 
        if (error.length > 0) {
            res.status(400).json({'error_message': error});
        } else {
            if (typeof lessthan !== 'undefined')
            {
                condition = 'lessthan';
                checkValue = lessthan;
            }
            if (typeof morethan !== 'undefined')
            {
                condition = 'morethan';
                checkValue = morethan;
            }
            let [resturant, _] = await Resturant.findByNumberOfDishes(condition, checkValue, minPrice, maxPrice);
            let totalRecords = Object.keys(resturant).length;
            res.status(200).json({'total_records': totalRecords, resturant});
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getResturantByNameOrDishName = async (req, res, next) => {
    try {
        let resturantOrDishName = req.params.resturantOrDishName;
        let [resturant, _] = await Resturant.findByResturantOrDishName(resturantOrDishName);
        let totalRecords = Object.keys(resturant).length;
        res.status(200).json({'total_records': totalRecords, resturant});
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    getResturantByNameOrDishName,
    getResturantsMoreOrLessNumberOfDishes
}

