<?php 
    $connect = new mysqli("172.18.0.1", "root", "pole", "order_food", "13306");
    if ($connect->connect_error) {
        die("\n\rConnection failed: " . $connect->connect_error);
    }