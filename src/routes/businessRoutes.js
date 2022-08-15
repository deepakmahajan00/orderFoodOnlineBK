const express = require('express');
const router = express.Router();

const  { 
    getResturantByOpenTiming
} = require('../controller/businessHourController');



router.get("/getResturantByOpenTiming", getResturantByOpenTiming);


module.exports = router;