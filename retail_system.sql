-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: retail_system
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customerId` int(11) NOT NULL,
  `paymentId` int(11) NOT NULL,
  `voucherId` int(11) DEFAULT NULL,
  `amount` float NOT NULL,
  `tax` decimal(5,2) DEFAULT NULL,
  `taxAmount` float DEFAULT NULL,
  `finalAmount` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(125) NOT NULL,
  `updatedBy` varchar(125) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (78,5,1,4,450,14.00,63,436.05,'2019-07-01 20:58:42','2019-07-01 20:58:42','5d1a3e0918da4257b46336a4','5d1a3e0918da4257b46336a4'),(79,8,2,NULL,560,14.00,78.4,638.4,'2019-07-01 21:00:50','2019-07-01 21:00:50','5d1a3e0918da4257b46336a4','5d1a3e0918da4257b46336a4'),(80,7,3,NULL,460,14.00,64.4,524.4,'2019-07-01 21:02:31','2019-07-01 21:02:31','5d1a3e0918da4257b46336a4','5d1a3e0918da4257b46336a4'),(81,9,1,NULL,540,14.00,75.6,615.6,'2019-07-01 21:11:23','2019-07-01 21:11:23','5d1a3e0918da4257b46336a4','5d1a3e0918da4257b46336a4'),(82,6,1,4,910,14.00,127.4,881.79,'2019-07-01 21:13:08','2019-07-01 21:13:08','5d1a3e0918da4257b46336a4','5d1a3e0918da4257b46336a4');
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billed_item`
--

DROP TABLE IF EXISTS `billed_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `billed_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `billId` int(11) NOT NULL,
  `itemId` int(11) NOT NULL,
  `itemPrice` float NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billed_item`
--

LOCK TABLES `billed_item` WRITE;
/*!40000 ALTER TABLE `billed_item` DISABLE KEYS */;
INSERT INTO `billed_item` VALUES (79,78,21,140,2),(80,78,27,85,2),(81,79,13,60,2),(82,79,16,100,2),(83,79,26,120,2),(84,80,14,50,1),(85,80,18,135,2),(86,80,21,140,1),(87,81,15,40,1),(88,81,20,100,2),(89,81,28,150,2),(90,82,29,85,2),(91,82,28,150,2),(92,82,30,75,1),(93,82,23,85,1),(94,82,21,140,2);
/*!40000 ALTER TABLE `billed_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(125) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (4,'Watches','2019-07-01 19:07:17','2019-07-01 19:07:17'),(5,'Mugs','2019-07-01 19:07:46','2019-07-01 19:07:46'),(6,'Handmade Accessories','2019-07-01 19:08:39','2019-07-01 20:30:26'),(7,'Wooden Crafts','2019-07-01 19:08:53','2019-07-01 19:08:53'),(8,'Antiques','2019-07-01 19:09:17','2019-07-01 19:09:17');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(125) NOT NULL,
  `mobile` varchar(25) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(125) NOT NULL,
  `updatedBy` varchar(125) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (2,'Awad','01115719103','2019-06-14 15:50:33','2019-06-14 15:50:33','5cbd2c17dfb697b5080b846f','5cbd2c17dfb697b5080b846f'),(3,'guest','1122334455','2019-06-22 09:41:20','2019-06-22 09:41:20','5cbd2b6fdfb697b5080b846e','5cbd2b6fdfb697b5080b846e'),(4,'mohamed','124567894','2019-06-22 11:26:45','2019-06-22 11:26:45','5cbd2b6fdfb697b5080b846e','5cbd2b6fdfb697b5080b846e'),(5,'Mona Farid','01112223334','2019-07-01 19:10:43','2019-07-01 19:10:43','5d1a3e0918da4257b46336a4','5d1a3e0918da4257b46336a4'),(6,'Ahmed Saad','01224545454','2019-07-01 19:11:09','2019-07-01 19:11:09','5d1a3e0918da4257b46336a4','5d1a3e0918da4257b46336a4'),(7,'Youssef El Masry','01002366996','2019-07-01 19:12:08','2019-07-01 19:12:08','5d1a3e0918da4257b46336a4','5d1a3e0918da4257b46336a4'),(8,'Mariam Mohsen','01515456323','2019-07-01 19:12:55','2019-07-01 19:12:55','5d1a3e0918da4257b46336a4','5d1a3e0918da4257b46336a4'),(9,'Mohamed Abd-El Hakim ','01012365496','2019-07-01 19:13:25','2019-07-01 19:13:25','5d1a3e0918da4257b46336a4','5d1a3e0918da4257b46336a4');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expense`
--

DROP TABLE IF EXISTS `expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `expense` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(125) NOT NULL,
  `amount` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense`
--

LOCK TABLES `expense` WRITE;
/*!40000 ALTER TABLE `expense` DISABLE KEYS */;
INSERT INTO `expense` VALUES (1,'rent',500,'2019-06-01 13:44:15','2019-06-01 13:47:15'),(3,'Electricity',20,'2019-07-01 19:14:52','2019-07-01 19:14:52'),(4,'salary',100,'2019-07-01 19:15:31','2019-07-01 19:15:31');
/*!40000 ALTER TABLE `expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(125) NOT NULL,
  `name` varchar(125) NOT NULL,
  `cost` float NOT NULL,
  `price` float NOT NULL,
  `discount` float DEFAULT NULL,
  `finalPrice` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `providerId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (13,'444404','Sun Flower Mug',50,65,5,60,28,4,5,'2019-07-01 20:03:18','2019-07-01 21:00:50'),(14,'12202','Batman Mug',40,50,0,50,19,4,5,'2019-07-01 20:04:27','2019-07-01 21:02:31'),(15,'442244','Red Roses Mug',30,40,0,40,24,4,5,'2019-07-01 20:05:29','2019-07-01 21:11:23'),(16,'330033','Panda thermal Mug',80,110,10,100,18,4,5,'2019-07-01 20:06:27','2019-07-01 21:00:50'),(17,'660062','Super Mario Mug',35,45,0,45,25,4,5,'2019-07-01 20:07:41','2019-07-01 20:42:43'),(18,'88909','Brown leather watch',120,150,15,135,38,5,4,'2019-07-01 20:09:35','2019-07-01 21:02:31'),(19,'77065','Metal Men Wath silver',95,130,0,130,30,5,4,'2019-07-01 20:10:38','2019-07-01 20:43:17'),(20,'56565','Black Leather Women watch',80,100,0,100,23,5,4,'2019-07-01 20:11:29','2019-07-01 21:11:23'),(21,'90087','Metal Women Gold Watch',110,150,10,140,4,5,4,'2019-07-01 20:12:41','2019-07-01 21:13:44'),(22,'44020','Blue Leather Watch',100,140,10,130,35,5,4,'2019-07-01 20:13:57','2019-07-01 20:44:14'),(23,'22565','Sun Flower vase',65,85,0,85,14,7,8,'2019-07-01 20:18:08','2019-07-01 21:13:08'),(24,'223012','wooden flower coaster',15,20,0,20,30,7,7,'2019-07-01 20:19:45','2019-07-01 20:44:51'),(25,'220112','Disney pencil case ',35,45,0,45,20,7,7,'2019-07-01 20:20:57','2019-07-01 20:45:22'),(26,'89019','crystal chandelier',100,120,0,120,28,6,8,'2019-07-01 20:22:05','2019-07-01 21:00:50'),(27,'55654','crystal bird',75,85,0,85,23,6,8,'2019-07-01 20:22:59','2019-07-01 20:58:42'),(28,'66589','wood jewelry box',120,150,0,150,16,7,7,'2019-07-01 20:24:31','2019-07-01 21:13:08'),(29,'6548','Sun Flower Necklace',65,85,0,85,33,7,6,'2019-07-01 20:31:38','2019-07-01 21:13:08'),(30,'66598','Pearl Necklace',60,75,0,75,24,7,6,'2019-07-01 20:32:31','2019-07-01 21:13:08'),(31,'66362','Silver Round Ring',40,50,0,50,25,7,6,'2019-07-01 20:33:10','2019-07-01 21:08:48'),(32,'201234','Sun Flower Earrings',30,40,0,40,30,7,6,'2019-07-01 20:34:08','2019-07-01 20:46:27'),(33,'26401','Pearl Earrings',25,35,0,35,25,7,6,'2019-07-01 20:34:55','2019-07-01 21:08:48');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type_UNIQUE` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,'cash','2019-06-07 20:01:04','2019-06-07 20:01:19'),(2,'Visa','2019-07-01 20:35:52','2019-07-01 20:35:52'),(3,'Fawry','2019-07-01 20:35:59','2019-07-01 20:35:59');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider`
--

DROP TABLE IF EXISTS `provider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `provider` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(125) NOT NULL,
  `address` varchar(125) DEFAULT NULL,
  `phone` varchar(125) NOT NULL,
  `email` varchar(125) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider`
--

LOCK TABLES `provider` WRITE;
/*!40000 ALTER TABLE `provider` DISABLE KEYS */;
INSERT INTO `provider` VALUES (4,'Egypt Porcelin ','45 nasr st maadi cairo','01122112211','egyptporcelin@gmail.com'),(5,'Samir Fawzy','21 fursan towers , katameya , cairo','01006660066','Sfawzy@gmail.com'),(6,'La Group','36 kafr abdo , alexandria','01515150065','la_cairo@gmail.com'),(7,'Mai Hamdy','22 botrous ghaly, Heliopolis ','01233366644','maihamdy993@gmail.com');
/*!40000 ALTER TABLE `provider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `voucher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(125) NOT NULL,
  `startAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `expireAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `percentage` decimal(5,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `text_UNIQUE` (`text`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher`
--

LOCK TABLES `voucher` WRITE;
/*!40000 ALTER TABLE `voucher` DISABLE KEYS */;
INSERT INTO `voucher` VALUES (3,'dis30','2019-06-11 00:00:00','2019-12-30 00:00:00',30.00,'2019-06-12 15:15:53','2019-07-01 19:16:37'),(4,'dis15','2019-06-13 00:00:00','2019-12-15 00:00:00',15.00,'2019-06-12 15:16:30','2019-07-01 19:17:38');
/*!40000 ALTER TABLE `voucher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-01 23:18:13
