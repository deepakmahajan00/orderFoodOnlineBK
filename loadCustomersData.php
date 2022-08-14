<?php 

    require_once("connect.php");

    
    $query = "INSERT INTO customers (cust_name, cash_balance) SELECT cust_name, cash_balance FROM customers_and_purchase";

    try {
        $connect->multi_query($query);
        echo "\n Resturant data inserted";
    } catch(\Exception $err) {
        echo "\n Unable to load data :". $err;
    }

    $connect->close();
    
    