<?php 
    require_once("connect.php");

    $query = '';

    $filename = "users_with_purchase_history.json";
    $data = file_get_contents($filename); 
    $array = json_decode($data, true); 
    
    $count = 0;
    // Extracting row by row
    foreach($array as $row) {
        $name = str_replace(['\'',], "", $row["name"]);
        $purchaseHistory = str_replace(['\'',], '', json_encode($row["purchaseHistory"]));
        
        $query .= "INSERT INTO customers_and_purchase (cust_name, cash_balance, purchase_history) 
        VALUES ('".$name."', ".$row["cashBalance"].", '".$purchaseHistory."'); "; 

        $count++;
    }

    if($connect->multi_query($query)) {
        echo "Total number of records inserted : ". count($array);
    }
    else
    {
        "\n\r Unable to load data";
    }
    $connect->close();