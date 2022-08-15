<?php 
    require_once("connect.php");

    $query = '';

    $filename = "resturants_with_menus.json";
    $data = file_get_contents($filename); 
    $array = json_decode($data, true); 
    
    $count = 0;
    // Extracting row by row
    foreach($array as $row) {
        $name = str_replace(['\'',], "", $row["restaurantName"]);

        $menu = str_replace(['\'',], "", json_encode($row["menu"]));

        $query .= "INSERT INTO resturants_and_menus (resturant_name, cash_balance, opening_hours, menu) 
        VALUES ('".$name."', ".$row["cashBalance"].", '".$row["openingHours"]."', '".$menu."'); "; 
        $count++;
    }
    if($connect->multi_query($query)) {
        echo "Total number of records inserted : ". count($array) . "\n\r";
        
    }
    else
    {
        "\n\r Unable to load data";
    }
    $connect->close();
    unset($query, $array, $data);