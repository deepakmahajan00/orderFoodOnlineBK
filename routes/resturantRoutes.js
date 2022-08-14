const express = require('express');
const router = express.Router();

const  { 
    getResturantsMoreOrLessNumberOfDishes,
    getResturantByNameOrDishName,
} = require('../controller/resturantController');



router.get("/getResturantsMoreOrLessNumberOfDishes", getResturantsMoreOrLessNumberOfDishes);
router.get("/:resturantOrDishName", getResturantByNameOrDishName);


module.exports = router;