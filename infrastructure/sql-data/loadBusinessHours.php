<?php 
    require_once("connect.php");

    $query = '';
    $insertCount = 0;
    $standardDays = [
        1 => 'Mon' ,
        2 => 'Tues',
        3 => 'Weds',
        4 => 'Thurs',
        5 => 'Fri',
        6 => 'Sat',
        7 => 'Sun',
    ];

    $connect->multi_query("SELECT id, opening_hours FROM resturants_and_menus;");
    
    do {
        /* store the result set in PHP */
        
        if ($result = $connect->store_result()) {
            while ($row = $result->fetch_assoc()) {
                $resturantsWithOpeningHoursDetail = $temp = [];
                
                $newRow = str_replace(' ', '', $row['opening_hours']);
                $openingHours = explode('/', $newRow);

                foreach ($openingHours as $openHour)
                {
                    $diffArr = preg_split('/(?=\d)/', $openHour, 2);

                    $days = explode(',', $diffArr[0]);
                    $times = explode('-', $diffArr[1]);
                    foreach ($days as $day)
                    {
                        if (strpos($day, '-'))
                        {
                            $newDays = explode('-', $day);
                            $dayRange = [];
                            $dayRange[] = $newDays[0];
                            $dayRange[] = end($newDays);
                            
                            $newDayRange = array_intersect($standardDays, $dayRange);
                            for ($i = array_key_first($newDayRange); array_key_last($newDayRange) >= $i; $i++)
                            {
                                $temp[$standardDays[$i]]['open_time'] = $times[0];
                                $temp[$standardDays[$i]]['close_time'] = $times[1];
                            }
                            
                        } else {
                            $temp[$day]['open_time'] = $times[0];
                            $temp[$day]['close_time'] = $times[1];
                        }

                        
                    }
                }
                foreach ($temp as $key => $data)
                {
                    $insertCount++;
                    $opentime = (new DateTime($data['open_time']))->format('H:i:s');
                    $closetime = (new DateTime($data['close_time']))->format('H:i:s');
                    
                    $query .= "INSERT INTO business_hours (resturant_id, day_of_week, open_time, close_time) VALUES (".$row['id'].", '".$key."', '".$opentime."', '".$closetime."');\n"; 
                }

            }
            
        }
        /* print divider */
        if ($connect->more_results()) {
            printf("-----------------\n");
        }
    } while ($connect->next_result());

   // echo "\n".$query;

    
    if($connect->multi_query($query)) {
        echo "\n\rTotal number of menus inserted : ". $insertCount . "\n\n";
        
    }
    else
    {
        "\n\r Unable to load data";
    }
    $connect->close();