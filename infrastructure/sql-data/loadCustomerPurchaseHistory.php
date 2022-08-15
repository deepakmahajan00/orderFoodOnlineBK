<?php 
    require_once("connect.php");

    $query = '';

    $connect->multi_query("SELECT id, purchase_history FROM customers_and_purchase;");
    $insertCount = 0;

    do {
        /* store the result set in PHP */
        if ($result = $connect->store_result()) {
            while ($row = $result->fetch_assoc()) {
                $histories = json_decode($row['purchase_history'], true);
                foreach ($histories as $purchase) {
                    $dishName = str_replace(['\'',], "", $purchase["dishName"]);
                    $restaurantName = str_replace(['\'',], "", $purchase["restaurantName"]);
                    
                    $query .= "INSERT INTO orders (cust_id, dish_name, resturant_name, transaction_amount, transaction_date)
                    VALUES (".$row['id'].", '".$dishName."', '".$restaurantName."', ".$purchase['transactionAmount'].", '".$purchase['transactionDate']."'); "; 
                    $insertCount++;
                }
            }
        }
        /* print divider */
        if ($connect->more_results()) {
            printf("-----------------\n");
        }
    } while ($connect->next_result());
    

    if($connect->multi_query($query)) {
        echo "\n\rTotal number of menus inserted : ". $insertCount . "\n\r";
    }
    else
    {
        "\n\r Unable to load data";
    }
    $connect->close();