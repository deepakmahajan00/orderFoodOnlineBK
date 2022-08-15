const express = require('express');
const router = express.Router();


const  { 
    getCustomerPurchaseHistory,
    orderFood
} = require('../controller/customerController');



router.get("/getCustomerPurchaseHistory/:customername", getCustomerPurchaseHistory);
router.post('/order/:customerId', orderFood);


module.exports = router;