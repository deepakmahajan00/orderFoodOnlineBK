<?php 
    require_once("connect.php");

    $query = '';

    $connect->multi_query("SELECT id, menu FROM resturants_and_menus;");
    $insertCount = 0;

    do {
        /* store the result set in PHP */
        if ($result = $connect->store_result()) {
            while ($row = $result->fetch_assoc()) {
                $menus = json_decode($row['menu'], true);
                foreach ($menus as $menu) {
                    $dishName = str_replace(['\'',], "", $menu["dishName"]);
                    $query .= "INSERT INTO resturant_menus (dish_name, price, resturant_id) VALUES ('".$dishName."', ".$menu["price"].", ".$row['id']."); "; 
                    $insertCount++;
                }
            }
        }
        /* print divider */
        if ($connect->more_results()) {
            printf("-----------------\n");
        }
    } while ($connect->next_result());
    
    //echo "\n".$query;

    if($connect->multi_query($query)) {
        echo "\n\rTotal number of menus inserted : ". $insertCount . "\n\r";
        
    }
    else
    {
        "\n\r Unable to load data";
    }
    $connect->close();