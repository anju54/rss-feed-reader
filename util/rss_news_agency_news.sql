CREATE DATABASE  IF NOT EXISTS `rss_news` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rss_news`;
-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: localhost    Database: rss_news
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agency_news`
--

DROP TABLE IF EXISTS `agency_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agency_news` (
  `agency_news_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(500) DEFAULT NULL,
  `description` varchar(600) DEFAULT NULL,
  `guid` varchar(500) DEFAULT NULL,
  `link` varchar(500) DEFAULT NULL,
  `news_published_date` datetime DEFAULT NULL,
  `agency_feed_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `pic_src` varchar(600) DEFAULT NULL,
  `agency_id` int DEFAULT NULL,
  PRIMARY KEY (`agency_news_id`),
  KEY `fk1_idx` (`agency_feed_id`),
  KEY `fk2_idx` (`agency_id`),
  KEY `fk3_idx` (`category_id`),
  CONSTRAINT `fk11` FOREIGN KEY (`agency_id`) REFERENCES `agency` (`agency_id`),
  CONSTRAINT `fk22` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `fk33` FOREIGN KEY (`agency_feed_id`) REFERENCES `agency_feed` (`agency_feed_id`)
) ENGINE=InnoDB AUTO_INCREMENT=305931 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-21 20:54:40
