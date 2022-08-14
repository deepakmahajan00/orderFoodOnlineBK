<?php 

    require_once("connect.php");

    
    $query = "INSERT INTO resturants (name, cash_balance, opening_hours)
        SELECT resturant_name, cash_balance, opening_hours FROM resturants_and_menus";

    try {
        $connect->multi_query($query);
        echo "\n Resturant data inserted";
    } catch(\Exception $err) {
        echo "\n Unable to load data :". $err;
    }

    $connect->close();
    
    