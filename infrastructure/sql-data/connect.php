<?php 
    $connect = new mysqli('mydb', "root", "pole", "order_food", "3306");
    if ($connect->connect_error) {
        die("\n\rConnection failed: " . $connect->connect_error);
    }