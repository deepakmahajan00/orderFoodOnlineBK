<?php
require_once("connect.php");

$query ='';

$query .= "DROP TABLE IF EXISTS `resturants_and_menus` ;
CREATE TABLE `resturants_and_menus` (
  `id` INT(5) NOT NULL AUTO_INCREMENT,
  `resturant_name` varchar(100) NOT NULL,
  `cash_balance` DOUBLE NOT NULL DEFAULT 0.0,
  `opening_hours` varchar(255) NOT NULL,
  `menu` BLOB NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `IDX_RESTURANT_NAME` (`resturant_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8; ";

$query .= "DROP TABLE IF EXISTS `resturants` ;
CREATE TABLE `resturants` (
  `resturant_id` INT(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `cash_balance` DOUBLE NOT NULL DEFAULT 0.0,
  `opening_hours` varchar(255) NOT NULL,
  PRIMARY KEY (`resturant_id`),
  KEY `IDX_RESTURANT_NAME` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8; ";

$query .= "DROP TABLE IF EXISTS `resturant_menus` ;
CREATE TABLE `resturant_menus` (
  `menu_id` INT(5) NOT NULL AUTO_INCREMENT,
  `dish_name` varchar(255) NOT NULL,
  `price` DOUBLE NOT NULL DEFAULT 0.0,
  `resturant_id` INT(5) NOT NULL DEFAULT 0,
  PRIMARY KEY (`menu_id`),
  KEY `IDX_DISH_NAME` (`dish_name`),
  KEY `IDX_DISH_PRICE` (`price`),
  KEY `IDX_RESTURANT_ID` (`resturant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8; ";

$query .= "DROP TABLE IF EXISTS `customers_and_purchase` ;
CREATE TABLE `customers_and_purchase` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `cust_name` varchar(255) NOT NULL,
  `cash_balance` DOUBLE NOT NULL DEFAULT 0.0,
  `purchase_history` TEXT NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8; ";

$query .= "DROP TABLE IF EXISTS `customers` ;
CREATE TABLE `customers` (
  `cust_id` INT(5) NOT NULL AUTO_INCREMENT,
  `cust_name` varchar(255) NOT NULL,
  `cash_balance` DOUBLE NOT NULL DEFAULT 0.0,
  PRIMARY KEY (`cust_id`),
  KEY `IDX_CUST_NAME` (`cust_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8; ";

$query .= "DROP TABLE IF EXISTS `orders` ;
CREATE TABLE  `orders` (
  `order_id` INT(5) NOT NULL AUTO_INCREMENT,
  `cust_id` INT(5) NOT NULL,
  `dish_name` varchar(255) NOT NULL,
  `resturant_name` varchar(100) NOT NULL,
  `transaction_amount` DOUBLE NOT NULL DEFAULT 0.0,
  `transaction_date` varchar(100) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `IDX_CUST_ID` (`cust_id`),
  KEY `IDX_TRANSACTION_DATE` (`transaction_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8; ";

$query .= "DROP TABLE IF EXISTS `business_hours`;
CREATE TABLE `business_hours` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `resturant_id` INT(5) NOT NULL DEFAULT 0,
  `day_of_week` VARCHAR(5) NOT NULL DEFAULT '',
  `open_time` TIME ,
  `close_time` TIME,
  PRIMARY KEY (`id`),
  CONSTRAINT `resturant_day` UNIQUE (resturant_id,day_of_week),
  KEY `IDX_RESTURANT_ID` (`resturant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8; ";

if($connect->multi_query($query)) {
    echo "Required tables created";
}
else
{
    "\n\r Unable to load data";
}
$connect->close();