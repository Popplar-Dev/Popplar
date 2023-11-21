-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: k9a705.p.ssafy.io    Database: hotspot
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `deleted` bit(1) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `hot_place_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  `question_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3erw1a3t0r78st8ty27x6v3g1` (`question_id`),
  CONSTRAINT `FK3erw1a3t0r78st8ty27x6v3g1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (2,'2023-11-02 03:56:51.484417',_binary '\0','2023-11-02 03:56:51.484422','답변도 수정 완료',123123123,1,2),(3,'2023-11-02 07:10:27.200899',_binary '\0','2023-11-02 07:10:27.200903','답변 테스트',21414107,3,4),(4,'2023-11-03 02:00:49.190236',_binary '\0','2023-11-03 02:00:49.190239','ddd',21414107,3,4),(5,'2023-11-03 02:08:29.985937',_binary '\0','2023-11-03 02:08:29.985939','zzz',21414107,3,4),(6,'2023-11-03 02:12:15.945364',_binary '\0','2023-11-03 02:12:15.945367','ddddd',21414107,3,3),(7,'2023-11-03 02:22:37.753259',_binary '\0','2023-11-03 02:22:37.753262','그래',21414107,3,16),(8,'2023-11-03 02:24:25.154649',_binary '\0','2023-11-03 02:24:25.154651','ㅇㅇㅇ',21414107,3,16),(9,'2023-11-03 02:25:08.142183',_binary '\0','2023-11-03 02:25:08.142186','ㄴㄴㄴㄴㄴ',21414107,3,16),(10,'2023-11-03 02:26:07.497273',_binary '\0','2023-11-03 02:26:07.497276','ㄴㄴ',21414107,3,15),(11,'2023-11-03 02:26:51.996968',_binary '\0','2023-11-03 02:26:51.996971','ㅌㅅㅌ',21414107,3,17),(12,'2023-11-03 04:08:49.270623',_binary '\0','2023-11-03 04:08:49.270625','서동훈345',21414107,3,18),(13,'2023-11-03 04:20:04.119641',_binary '\0','2023-11-03 04:20:04.119642','ㄹㅎㅇㄹㅎㄹㅇㄹㅎㅇ',21414107,3,18),(14,'2023-11-03 04:23:30.338859',_binary '\0','2023-11-03 04:23:30.338861','ㅋㅋㅋ',21414107,3,19),(15,'2023-11-03 04:52:35.281949',_binary '\0','2023-11-03 04:52:35.281953','ㅇㅇㅇ',21414107,3,20),(16,'2023-11-03 05:07:27.227480',_binary '\0','2023-11-03 05:07:27.227480','ㅅㅅㅅㅅㅅㅅ',21414107,3,21),(17,'2023-11-03 05:07:30.061872',_binary '\0','2023-11-03 05:07:30.061876','ㅛㅛㅛㅛㅛㅛㅛ',21414107,3,21),(18,'2023-11-03 05:12:20.503966',_binary '\0','2023-11-03 05:12:20.503968','ㅂㅂㅂㅂ',21414107,3,22),(19,'2023-11-03 05:12:22.591136',_binary '\0','2023-11-03 05:12:22.591140','ㄱㄱㄱㄱ',21414107,3,22),(20,'2023-11-03 05:13:20.857470',_binary '\0','2023-11-03 05:13:20.857473','ㄹㄹㄹㄹㄹ',21414107,3,22),(21,'2023-11-03 05:13:24.696359',_binary '\0','2023-11-03 05:13:24.696362','ㅋㅋㅋㅋㅋ',21414107,3,22),(22,'2023-11-03 05:14:38.564435',_binary '\0','2023-11-03 05:14:38.564439','ㄱㄱㄱㄱ',21414107,3,23),(23,'2023-11-03 05:14:40.383372',_binary '\0','2023-11-03 05:14:40.383374','ㄷㄷㄷㄷ',21414107,3,23),(24,'2023-11-03 05:16:22.218417',_binary '\0','2023-11-03 05:16:22.218420','ㄱㄱㄱㄱㄱ',21414107,3,24),(25,'2023-11-03 05:16:24.050668',_binary '\0','2023-11-03 05:16:24.050671','ㅅㅅㅅㅅㅅ',21414107,3,24),(26,'2023-11-03 05:17:24.951358',_binary '\0','2023-11-03 05:17:24.951360','ㄱㄱㄱㄱㄱ',21414107,3,25),(27,'2023-11-03 05:17:27.418837',_binary '\0','2023-11-03 05:17:27.418840','ㅅㅅㅅㅅㅅ',21414107,3,25),(28,'2023-11-03 05:18:58.112880',_binary '\0','2023-11-03 05:18:58.112882','ㅌㅌㅌㅌㅌ',21414107,3,26),(29,'2023-11-03 05:18:59.646934',_binary '\0','2023-11-03 05:18:59.646936','ㅍㅍㅍㅍㅍ',21414107,3,26),(30,'2023-11-03 05:19:39.180705',_binary '\0','2023-11-03 05:19:39.180708','ㄱ죡ㅈㅅ',21414107,3,27),(31,'2023-11-03 05:19:41.832845',_binary '\0','2023-11-03 05:19:41.832847','ㅗㅗㅓㅓㅓㅓ',21414107,3,27),(32,'2023-11-03 05:23:16.031058',_binary '\0','2023-11-03 05:23:16.031060','ㅅㅅㅅㅅ',21414107,3,28),(33,'2023-11-03 05:23:18.146971',_binary '\0','2023-11-03 05:23:18.146973','ㅓㅓㅓㅓㅓ',21414107,3,28),(34,'2023-11-03 05:26:33.587707',_binary '\0','2023-11-03 05:26:33.587710','ㅜㅜㅜㅜㅜ',21414107,3,29),(35,'2023-11-03 05:26:35.680505',_binary '\0','2023-11-03 05:26:35.680508','ㅡㅡㅡㅡㅡ',21414107,3,29),(36,'2023-11-03 05:37:58.383521',_binary '\0','2023-11-03 05:37:58.383523','T',21414107,4,4),(37,'2023-11-03 06:57:38.039081',_binary '','2023-11-03 06:57:38.039083','ㅎㅎ',21414107,8,30),(38,'2023-11-03 06:57:43.070140',_binary '','2023-11-03 06:57:43.070143','ㅎㅎ',21414107,8,30),(39,'2023-11-03 06:57:52.650534',_binary '','2023-11-03 06:57:52.650537','22',21414107,8,31),(40,'2023-11-03 06:57:55.340009',_binary '','2023-11-03 06:57:55.340012','ㄱㄱㅌㅊㅊㅈㅎ',21414107,8,31),(41,'2023-11-03 06:57:56.367623',_binary '','2023-11-03 06:57:56.367626','',21414107,8,31),(42,'2023-11-03 06:57:58.742452',_binary '','2023-11-03 06:57:58.742454','ㅍㅊㅇㅇ',21414107,8,31),(43,'2023-11-03 08:35:00.405327',_binary '\0','2023-11-03 08:35:00.405330','ㅎㅎ',27560699,3,34),(44,'2023-11-07 02:11:36.352257',_binary '\0','2023-11-07 02:11:36.352257','ㅇㅇㅇ',21414107,3,35),(45,'2023-11-07 02:11:38.029704',_binary '\0','2023-11-07 02:11:38.029704','ㄹㄹㄹ',21414107,3,35),(46,'2023-11-07 02:11:39.371653',_binary '\0','2023-11-07 02:11:39.371653','ㄱㄱㄱ',21414107,3,35),(47,'2023-11-09 03:01:40.237835',_binary '\0','2023-11-09 03:01:40.237835','짜장면',16034535,4,38),(48,'2023-11-10 04:06:51.934994',_binary '\0','2023-11-10 04:06:51.934994','그건 좀',16034535,3,38),(49,'2023-11-10 05:01:55.904061',_binary '\0','2023-11-10 05:01:55.904061','치킨이요',16034535,4,40),(50,'2023-11-10 07:29:00.266522',_binary '\0','2023-11-10 07:29:00.266522','뭔데요 ㅋ',21414107,9,35),(51,'2023-11-10 07:29:19.054006',_binary '\0','2023-11-10 07:29:19.054006','엥?',21414107,9,35),(52,'2023-11-10 07:29:43.367410',_binary '\0','2023-11-10 07:29:43.367410','이제되나',21414107,9,35),(53,'2023-11-10 07:30:25.882340',_binary '\0','2023-11-10 07:30:25.882340','싫어\n',21414107,9,33),(54,'2023-11-10 07:31:30.088751',_binary '\0','2023-11-10 07:31:30.088751','왜	',21414107,9,33),(55,'2023-11-10 07:31:30.435308',_binary '\0','2023-11-10 07:31:30.435308','',21414107,9,33),(56,'2023-11-10 07:31:31.265167',_binary '\0','2023-11-10 07:31:31.265167','',21414107,9,33),(57,'2023-11-10 07:40:29.308908',_binary '\0','2023-11-10 07:40:29.308908','됐는데?',21414107,9,35),(58,'2023-11-10 07:42:01.974187',_binary '\0','2023-11-10 07:42:01.974187','안되잖아	',21414107,9,35),(59,'2023-11-10 07:44:31.240943',_binary '\0','2023-11-10 07:44:31.240943','굳',16034535,3,40),(60,'2023-11-10 07:46:24.130722',_binary '\0','2023-11-10 07:46:24.130722','테스트',16034535,3,38),(61,'2023-11-10 07:47:23.331168',_binary '\0','2023-11-10 07:47:23.331168','ㄱㄱ',16034535,3,38),(62,'2023-11-10 07:57:33.956498',_binary '\0','2023-11-10 07:57:33.956498','되잖아',21414107,3,35),(63,'2023-11-10 08:04:46.728566',_binary '\0','2023-11-10 08:04:46.728566','뭘 돼 아오	',21414107,9,35),(64,'2023-11-13 15:58:46.721824',_binary '\0','2023-11-13 15:58:46.721824','  ',21414107,4,35),(65,'2023-11-14 04:50:17.309624',_binary '\0','2023-11-14 04:50:17.309624','받아주세요\n',13092437,9,41),(66,'2023-11-14 04:50:56.538934',_binary '\0','2023-11-14 04:50:56.538934','질문이 뭔데요',13092437,3,44),(67,'2023-11-15 15:13:45.117188',_binary '\0','2023-11-15 15:13:45.117188','안',21414107,14,35),(68,'2023-11-15 15:14:12.210083',_binary '\0','2023-11-15 15:14:12.210083','아ㅏ아어어엉어어어엉어어ㅓㅇ야양',21414107,14,35),(69,'2023-11-15 15:14:13.310573',_binary '\0','2023-11-15 15:14:13.310573','',21414107,14,35),(70,'2023-11-15 17:00:26.682573',_binary '\0','2023-11-15 17:00:26.682573','근데요?',21414107,3,45),(71,'2023-11-15 18:18:17.220427',_binary '\0','2023-11-15 18:18:17.220427','오',21414107,4,45),(72,'2023-11-15 18:33:22.749677',_binary '\0','2023-11-15 18:33:22.749677','',21414107,4,35),(73,'2023-11-15 18:35:35.885454',_binary '\0','2023-11-15 18:35:35.885454','',21414107,4,45),(74,'2023-11-16 09:52:34.291650',_binary '\0','2023-11-16 09:52:34.291650','ㄱㄱㄱ',21414107,3,48),(75,'2023-11-16 09:52:36.122117',_binary '\0','2023-11-16 09:52:36.122117','ㄱㄱㄱ',21414107,3,48),(76,'2023-11-16 09:59:26.139408',_binary '\0','2023-11-16 09:59:26.139408','를 ㄹ ㄹ',21414107,3,45),(77,'2023-11-16 09:59:38.927074',_binary '\0','2023-11-16 09:59:38.927074','카페에서는 그냥 무조간 아메리카노지요... 다른 메뉴를 생각할 필요가 없어요',1742463036,14,49),(78,'2023-11-16 10:56:14.614575',_binary '\0','2023-11-16 10:56:14.614575','그걸 제가 어제 아나요',21414107,3,51),(79,'2023-11-16 10:56:20.544677',_binary '\0','2023-11-16 10:56:20.544677','근데 아마 20층?',21414107,3,51),(80,'2023-11-16 10:59:44.638603',_binary '\0','2023-11-16 10:59:44.638603','그건 모르죠 저도',21414107,3,52),(81,'2023-11-16 11:00:31.163931',_binary '\0','2023-11-16 11:00:31.163931','안 가보셨나요?',21414107,4,52),(82,'2023-11-16 11:07:08.592651',_binary '\0','2023-11-16 11:07:08.592651','저는 라떼파인데요',1742463036,3,49),(83,'2023-11-16 11:08:47.010676',_binary '\0','2023-11-16 11:08:47.010676','ㅇㅇㅇ',21414107,3,48),(84,'2023-11-16 11:09:30.831022',_binary '\0','2023-11-16 11:09:30.831022','ㄱㄱㄱ',21414107,3,48),(85,'2023-11-16 12:37:45.572733',_binary '\0','2023-11-16 12:37:45.572733','그냥 간짜장이 더 맛있던데요',13092437,3,47),(86,'2023-11-16 04:01:46.689583',_binary '\0','2023-11-16 04:01:46.689583','헉',21414107,14,52),(87,'2023-11-16 04:04:49.237617',_binary '\0','2023-11-16 04:04:49.237617','ㅋㅋ커ㅕ켴',21414107,9,52),(88,'2023-11-16 04:05:13.621187',_binary '\0','2023-11-16 04:05:13.621187','ㅋㅋㅋㅋㅋ',21414107,9,53),(89,'2023-11-16 04:05:23.589345',_binary '\0','2023-11-16 04:05:23.589345','멀캠 짱!',21414107,3,53),(90,'2023-11-16 04:43:01.714088',_binary '\0','2023-11-16 04:43:01.714088','오늘이 제일 핫하죠',21414107,3,54),(91,'2023-11-16 04:50:32.675669',_binary '\0','2023-11-16 04:50:32.675669','도망치세요',21414107,3,55),(92,'2023-11-16 05:49:01.257318',_binary '\0','2023-11-16 05:49:01.257318','좋아요^^',21414107,4,55),(93,'2023-11-16 05:49:11.529687',_binary '\0','2023-11-16 05:49:11.529687','추워요',21414107,4,54);
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blocked_members`
--

DROP TABLE IF EXISTS `blocked_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blocked_members` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `blocked_member_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blocked_members`
--

LOCK TABLES `blocked_members` WRITE;
/*!40000 ALTER TABLE `blocked_members` DISABLE KEYS */;
INSERT INTO `blocked_members` VALUES (1,5,3),(3,5,8),(10,5,1),(11,5,2),(12,5,5),(13,5,6),(14,5,7),(15,5,9),(16,5,10),(19,5,4);
/*!40000 ALTER TABLE `blocked_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_category_counts`
--

DROP TABLE IF EXISTS `member_category_counts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_category_counts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` enum('ATTRACTION','CAFE','CULTURAL','ETC','RESTAURANT','SCHOOL') DEFAULT NULL,
  `member_id` bigint NOT NULL,
  `visited_set` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_category_counts`
--

LOCK TABLES `member_category_counts` WRITE;
/*!40000 ALTER TABLE `member_category_counts` DISABLE KEYS */;
INSERT INTO `member_category_counts` VALUES (1,'ATTRACTION',1,1),(2,'ETC',3,8),(3,'CAFE',3,5),(4,'RESTAURANT',3,6),(5,'RESTAURANT',6,1),(6,'ETC',9,8),(7,'RESTAURANT',9,1),(8,'ETC',6,1),(9,'ETC',4,3),(10,'CAFE',9,1),(11,'ETC',14,2),(12,'RESTAURANT',14,2),(13,'CAFE',4,3),(14,'ETC',15,1),(15,'RESTAURANT',4,2);
/*!40000 ALTER TABLE `member_category_counts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `updated_at` datetime(6) DEFAULT NULL,
  `exp` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `social_id` varchar(255) DEFAULT NULL,
  `social_type` enum('GOOGLE','KAKAO') DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `my_hot_place_id` bigint NOT NULL,
  `firebase_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'2023-10-20 16:33:50.113611',0,'2023-11-16 04:57:51.489765',1,'김민석','1','KAKAO','https://mblogthumb-phinf.pstatic.net/MjAyMDA1MjBfMjUz/MDAxNTg5OTExMTQwMTk0.HO649sun8l1KxgrpXRFm4Wq4gj-WAfdMhaEbxwWhrDwg.vQ55h6vql333wLHtzTdbw7oh2WAxGyz2KzEfyXJP0UAg.JPEG.happy9826/IMG_7332.JPG?type=w800',0,NULL),(2,'2023-11-06 08:51:23.165649',0,'2023-11-06 08:51:23.165649',0,'더미(2)','2','KAKAO','https://popplar-profile-image-bucket.s3.ap-northeast-2.amazonaws.com/avatar1.png',0,NULL),(3,'2023-11-02 04:52:27.576165',0,'2023-11-16 06:56:02.539701',0,'동훈쓰','3142623202','KAKAO','https://popplar-profile-image-bucket.s3.ap-northeast-2.amazonaws.com/avatar3.png',1411567340,'need to insert token'),(4,'2023-11-02 07:01:38.355991',0,'2023-11-16 07:35:15.885085',0,'je','3144514043','KAKAO','https://popplar-profile-image-bucket.s3.ap-northeast-2.amazonaws.com/avatar9.png',13092437,'need to insert token'),(5,'2023-11-02 07:01:38.355991',0,'2023-11-15 14:02:28.280981',0,'오성락이다옹','970907','KAKAO','https://popplar-profile-image-bucket.s3.ap-northeast-2.amazonaws.com/avatar1.png',0,NULL),(6,'2023-11-02 08:07:32.645099',0,'2023-11-16 03:56:28.673742',0,'지우','3143260817','KAKAO','https://popplar-profile-image-bucket.s3.ap-northeast-2.amazonaws.com/avatar8.png',21414107,'need to insert token'),(7,'2023-11-02 17:13:21.838614',0,'2023-11-16 09:46:10.729569',0,'hello','3145552617','KAKAO','https://popplar-profile-image-bucket.s3.ap-northeast-2.amazonaws.com/avatar1.png',21414107,NULL),(8,'2023-11-06 08:51:23.165649',0,'2023-11-10 13:11:57.381710',0,'바꿀이름','8','KAKAO','https://popplar-profile-image-bucket.s3.ap-northeast-2.amazonaws.com/avatar1.png',0,NULL),(9,'2023-11-06 08:51:23.165649',0,'2023-11-16 06:47:22.896933',0,'오락성','3145807454','KAKAO','https://popplar-profile-image-bucket.s3.ap-northeast-2.amazonaws.com/avatar2.png',1372855768,'need to insert token'),(10,'2023-11-06 08:51:23.165649',0,'2023-11-06 08:51:23.165649',0,'더미(10)','10','KAKAO','https://popplar-profile-image-bucket.s3.ap-northeast-2.amazonaws.com/avatar1.png',0,NULL),(13,'2023-11-13 08:11:57.836554',0,'2023-11-13 08:13:08.794336',0,'Woodyverse','3160984258','KAKAO','https://popplar-profile-image-bucket.s3.ap-northeast-2.amazonaws.com/avatar1.png',0,NULL),(14,'2023-11-13 08:25:33.726192',0,'2023-11-16 04:45:30.499807',0,'징오징오','3161005093','KAKAO','https://popplar-profile-image-bucket.s3.ap-northeast-2.amazonaws.com/avatar1.png',21414107,NULL),(15,'2023-11-16 04:09:23.954784',0,'2023-11-16 04:15:40.148812',0,'Woonchoi','3165267238','KAKAO','https://popplar-profile-image-bucket.s3.ap-northeast-2.amazonaws.com/avatar1.png',21414107,NULL);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `deleted` bit(1) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `checked` bit(1) NOT NULL,
  `content` varchar(600) DEFAULT NULL,
  `received_member_id` bigint NOT NULL,
  `sent_member_id` bigint NOT NULL,
  `received_message_deleted` bit(1) NOT NULL,
  `sent_message_deleted` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'2023-11-03 06:22:37.393432',_binary '\0','2023-11-03 06:22:37.393438',_binary '','쪽지테스트',8,3,_binary '\0',_binary '\0'),(2,'2023-11-03 06:22:46.134840',_binary '','2023-11-03 06:22:46.134848',_binary '','쪽지테스트',8,3,_binary '\0',_binary '\0'),(3,'2023-11-03 06:22:48.768361',_binary '\0','2023-11-03 06:22:48.768367',_binary '\0','쪽지테스트3',8,3,_binary '\0',_binary '\0'),(4,'2023-11-06 07:38:26.674613',_binary '\0','2023-11-06 07:38:26.674613',_binary '\0','안녕',8,4,_binary '\0',_binary '\0'),(5,'2023-11-06 07:38:34.369278',_binary '\0','2023-11-06 07:38:34.369278',_binary '\0','졸려',8,4,_binary '\0',_binary '\0'),(6,'2023-11-06 07:47:09.771457',_binary '\0','2023-11-16 12:29:53.313142',_binary '\0','졸려',8,4,_binary '\0',_binary ''),(7,'2023-11-06 07:52:21.787952',_binary '','2023-11-14 08:13:29.698782',_binary '','잘 지내니',4,4,_binary '\0',_binary '\0'),(8,'2023-11-06 07:52:36.994469',_binary '','2023-11-14 08:13:29.694958',_binary '','그럼',4,4,_binary '\0',_binary '\0'),(9,'2023-11-14 01:47:34.270302',_binary '','2023-11-14 01:51:04.441508',_binary '\0','dd',4,4,_binary '\0',_binary '\0'),(10,'2023-11-14 01:49:35.928215',_binary '','2023-11-14 01:51:04.435562',_binary '\0','gg',4,4,_binary '\0',_binary '\0'),(11,'2023-11-14 01:50:35.850046',_binary '','2023-11-14 01:51:04.431518',_binary '\0','ff',4,4,_binary '\0',_binary '\0'),(12,'2023-11-14 01:58:43.976501',_binary '','2023-11-14 01:58:53.030669',_binary '\0','rr',4,4,_binary '\0',_binary '\0'),(13,'2023-11-14 05:34:35.030140',_binary '\0','2023-11-16 10:20:44.946554',_binary '','aa',9,4,_binary '',_binary '\0'),(14,'2023-11-14 08:13:24.214307',_binary '\0','2023-11-16 12:30:04.931808',_binary '','rrr',4,4,_binary '',_binary '\0'),(15,'2023-11-15 10:22:19.551490',_binary '\0','2023-11-16 10:20:44.944565',_binary '','hi',9,4,_binary '',_binary '\0'),(16,'2023-11-15 10:22:20.299152',_binary '','2023-11-15 13:43:37.707538',_binary '\0','hi',9,4,_binary '\0',_binary '\0'),(17,'2023-11-15 10:24:29.698327',_binary '\0','2023-11-16 10:20:44.942150',_binary '','dd',9,4,_binary '',_binary '\0'),(18,'2023-11-15 10:30:35.783846',_binary '\0','2023-11-15 14:21:26.386726',_binary '','hi',6,4,_binary '\0',_binary '\0'),(19,'2023-11-15 10:30:50.031987',_binary '','2023-11-15 10:31:00.164704',_binary '','me',4,4,_binary '\0',_binary '\0'),(20,'2023-11-15 10:31:39.985345',_binary '\0','2023-11-16 10:47:02.160810',_binary '','mm',4,4,_binary '',_binary '\0'),(21,'2023-11-15 12:53:00.778552',_binary '\0','2023-11-16 04:51:16.101891',_binary '','야 한대 맞을래?',9,3,_binary '',_binary '\0'),(22,'2023-11-15 12:54:56.010365',_binary '\0','2023-11-15 12:55:11.838615',_binary '','ㅗㅗ',3,9,_binary '\0',_binary '\0'),(23,'2023-11-15 12:55:18.745084',_binary '\0','2023-11-16 04:51:16.098355',_binary '','뒤질래?',9,3,_binary '',_binary '\0'),(24,'2023-11-15 13:31:45.030541',_binary '\0','2023-11-16 10:20:44.949596',_binary '','채팅방에서 쪽지하기ㅗㅗㅗㅗ',9,3,_binary '',_binary '\0'),(25,'2023-11-15 13:37:38.244170',_binary '','2023-11-15 13:43:32.955857',_binary '\0','ㄱㄱ',9,4,_binary '\0',_binary '\0'),(26,'2023-11-15 13:37:51.020780',_binary '\0','2023-11-16 12:31:42.786814',_binary '\0','ㄴㄴ',4,4,_binary '',_binary '\0'),(27,'2023-11-15 13:38:02.398631',_binary '\0','2023-11-16 04:52:04.151231',_binary '','ㅛㅛ',4,4,_binary '',_binary '\0'),(28,'2023-11-15 13:49:54.352634',_binary '\0','2023-11-16 10:47:02.156506',_binary '','테스트',4,3,_binary '',_binary '\0'),(29,'2023-11-15 13:50:16.095950',_binary '\0','2023-11-15 13:50:16.095950',_binary '\0','테스트',5,3,_binary '\0',_binary '\0'),(30,'2023-11-15 13:53:20.607544',_binary '','2023-11-15 14:10:35.604406',_binary '\0','나한테 보내기?',3,3,_binary '\0',_binary '\0'),(31,'2023-11-15 13:53:23.097325',_binary '\0','2023-11-16 04:12:46.020077',_binary '','성공?',3,4,_binary '',_binary '\0'),(32,'2023-11-15 14:11:06.709436',_binary '\0','2023-11-15 14:21:29.058102',_binary '','옛다 쪽지다',6,3,_binary '\0',_binary '\0'),(33,'2023-11-15 14:51:52.353857',_binary '\0','2023-11-16 12:30:56.209648',_binary '','답장',3,4,_binary '\0',_binary ''),(34,'2023-11-15 14:52:14.295783',_binary '\0','2023-11-16 10:42:50.131983',_binary '','hi',6,4,_binary '\0',_binary '\0'),(35,'2023-11-15 15:07:57.179881',_binary '\0','2023-11-16 10:28:41.310876',_binary '','ㅎㅇㅎㅇ',4,14,_binary '\0',_binary '\0'),(36,'2023-11-15 16:03:04.775707',_binary '\0','2023-11-15 16:03:04.775707',_binary '\0','당신 누구야',7,3,_binary '\0',_binary '\0'),(37,'2023-11-15 16:03:21.697638',_binary '\0','2023-11-16 09:43:39.626389',_binary '','오징어야',14,3,_binary '',_binary '\0'),(38,'2023-11-15 16:54:48.461106',_binary '\0','2023-11-16 12:31:25.407553',_binary '','아오ㅑ',3,14,_binary '\0',_binary '\0'),(39,'2023-11-15 17:48:42.213094',_binary '\0','2023-11-16 10:42:56.147103',_binary '','쯧쯧',4,4,_binary '',_binary '\0'),(40,'2023-11-16 09:31:34.149164',_binary '\0','2023-11-16 12:31:22.680256',_binary '','헝헝',3,14,_binary '\0',_binary '\0'),(41,'2023-11-16 09:31:45.771259',_binary '\0','2023-11-16 10:19:59.049563',_binary '','아오',9,14,_binary '\0',_binary '\0'),(42,'2023-11-16 10:20:05.347324',_binary '\0','2023-11-16 04:08:40.447861',_binary '','뭐요 팍쒸',14,9,_binary '\0',_binary '\0'),(43,'2023-11-16 10:43:01.530354',_binary '\0','2023-11-16 10:46:24.662044',_binary '','쪽지~',4,6,_binary '\0',_binary '\0'),(44,'2023-11-16 10:43:13.035792',_binary '\0','2023-11-16 10:43:49.797160',_binary '\0','멀캠에서 뭐하니',4,9,_binary '',_binary '\0'),(45,'2023-11-16 10:44:23.516224',_binary '\0','2023-11-16 10:46:35.826524',_binary '','안녕하세용~',4,9,_binary '\0',_binary '\0'),(46,'2023-11-16 10:46:07.454942',_binary '\0','2023-11-16 10:46:07.454942',_binary '\0','안녕하세요~ 닉네임이 hello네요',7,4,_binary '\0',_binary '\0'),(47,'2023-11-16 10:46:30.533667',_binary '\0','2023-11-16 10:46:30.533667',_binary '\0','안녕ㅎㅎ',6,4,_binary '\0',_binary '\0'),(48,'2023-11-16 12:20:16.812390',_binary '\0','2023-11-16 12:20:16.812390',_binary '\0','ㅋㅋㅋ',4,4,_binary '\0',_binary '\0'),(49,'2023-11-16 04:02:24.294852',_binary '\0','2023-11-16 04:02:51.884132',_binary '','하이',9,9,_binary '\0',_binary '\0'),(50,'2023-11-16 04:02:36.891569',_binary '\0','2023-11-16 04:02:45.823806',_binary '','하이',3,9,_binary '\0',_binary '\0'),(51,'2023-11-16 04:02:40.989761',_binary '\0','2023-11-16 04:03:01.181327',_binary '','ㅎㅇ',3,14,_binary '\0',_binary '\0'),(52,'2023-11-16 04:02:55.656127',_binary '\0','2023-11-16 04:03:00.118788',_binary '','안녕하십니까 잘부탁드립니다',9,3,_binary '\0',_binary '\0'),(53,'2023-11-16 04:03:09.899257',_binary '\0','2023-11-16 04:08:36.007331',_binary '','당신 누구야',14,3,_binary '\0',_binary '\0'),(54,'2023-11-16 04:03:13.537192',_binary '\0','2023-11-16 04:12:33.707821',_binary '','방가',3,9,_binary '\0',_binary '\0'),(55,'2023-11-16 04:14:58.596789',_binary '\0','2023-11-16 04:17:00.421512',_binary '','야',15,14,_binary '\0',_binary '\0'),(56,'2023-11-16 04:16:18.485456',_binary '\0','2023-11-16 04:16:58.588945',_binary '','야야',15,14,_binary '\0',_binary '\0'),(57,'2023-11-16 04:16:31.401440',_binary '\0','2023-11-16 04:16:52.150293',_binary '','하이요',14,15,_binary '\0',_binary '\0'),(58,'2023-11-16 04:16:31.961480',_binary '\0','2023-11-16 04:16:48.029698',_binary '','제 정복자 돌려주세요',15,3,_binary '\0',_binary '\0'),(59,'2023-11-16 04:17:12.085695',_binary '\0','2023-11-16 04:17:12.085695',_binary '\0','190회 비결이 뭔가요',15,4,_binary '\0',_binary '\0');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `deleted` tinyint NOT NULL DEFAULT '0',
  `updated_at` datetime(6) DEFAULT NULL,
  `content` varchar(600) DEFAULT NULL,
  `hot_place_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  `adopted_answer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_89iye6bjaecpv4grk6ctoun0t` (`adopted_answer_id`),
  CONSTRAINT `FK3or2n2umdccqtbpngfj9tfv9s` FOREIGN KEY (`adopted_answer_id`) REFERENCES `answers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (2,'2023-11-02 03:47:26.814715',0,'2023-11-02 03:47:26.814724','변경완료',123123123,1,2),(3,'2023-11-02 06:59:26.144123',0,'2023-11-02 06:59:26.144131','테스트',21414107,3,6),(4,'2023-11-02 07:02:16.322113',0,'2023-11-02 07:02:16.322123','과연?',21414107,3,3),(13,'2023-11-02 07:33:57.908317',0,'2023-11-02 07:33:57.908329','ㅌㅌㅌㅌ111ㅌㅌ',123123123,4,NULL),(15,'2023-11-03 02:17:08.390089',0,'2023-11-03 02:17:08.390094','ssss',21414107,3,10),(16,'2023-11-03 02:22:18.034959',0,'2023-11-03 02:22:18.034965','오류 좀 그만 나라',21414107,3,7),(17,'2023-11-03 02:26:45.170646',0,'2023-11-03 02:26:45.170652','채택 테스트',21414107,3,11),(18,'2023-11-03 04:08:38.246863',0,'2023-11-03 04:08:38.246869','오성락123',21414107,3,13),(19,'2023-11-03 04:23:25.782984',0,'2023-11-03 04:23:25.782990','테스트\n',21414107,3,14),(20,'2023-11-03 04:52:30.374251',0,'2023-11-03 04:52:30.374257','ㅋㅋ',21414107,3,15),(21,'2023-11-03 05:07:22.463006',0,'2023-11-03 05:07:22.463011','ㅎㄹㅎㄹㄹㄹㅎ',21414107,3,17),(22,'2023-11-03 05:12:16.800988',0,'2023-11-03 05:12:16.800995','ㅌㅌㅌㅌ',21414107,3,20),(23,'2023-11-03 05:14:34.407029',0,'2023-11-03 05:14:34.407035','ㅁㅁㅁㅁ',21414107,3,23),(24,'2023-11-03 05:16:18.439315',0,'2023-11-03 05:16:18.439321','ㅂㅂㅂㅂㅂㅂ',21414107,3,25),(25,'2023-11-03 05:17:10.080567',0,'2023-11-03 05:17:10.080571','ㄱㄱㄱㄱㄱㄱ',21414107,3,27),(26,'2023-11-03 05:18:54.839408',0,'2023-11-03 05:18:54.839413','ㅈㅈㅈㅈㅈ',21414107,3,29),(27,'2023-11-03 05:19:35.148943',0,'2023-11-03 05:19:35.148949','ㅎㄹㅇㅎㄹㅎㅇㄹㅎ',21414107,3,31),(28,'2023-11-03 05:23:04.583170',0,'2023-11-03 05:23:04.583203','ㄱㄱㄱㄱ',21414107,3,33),(29,'2023-11-03 05:26:30.068627',0,'2023-11-03 05:26:30.068632','ㅜㅜㅜㅜ',21414107,3,34),(30,'2023-11-03 06:57:32.525836',0,'2023-11-03 06:57:32.525840','ㅗ',21414107,3,37),(31,'2023-11-03 06:57:49.311888',0,'2023-11-03 06:57:49.311893','11',21414107,3,40),(32,'2023-11-03 08:32:53.477035',0,'2023-11-03 08:32:53.477038','가고싶다',21414107,3,NULL),(33,'2023-11-03 08:33:35.603946',0,'2023-11-03 08:33:35.603950','가자갖가자가',21414107,3,NULL),(34,'2023-11-03 08:34:41.363502',0,'2023-11-03 08:34:41.363506','ㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱ',27560699,3,NULL),(35,'2023-11-06 00:51:53.819615',0,'2023-11-07 02:11:43.951801','순서대로 나오니',21414107,3,44),(36,'2023-11-07 01:58:00.606377',0,'2023-11-07 01:58:00.606377','핫플 아니어도 질문 되나요',920722448,3,NULL),(37,'2023-11-07 06:12:35.492647',0,'2023-11-07 06:12:35.492647','여기 뭔디요',522405452,9,NULL),(38,'2023-11-08 07:39:26.397748',0,'2023-11-08 07:39:26.397748','오늘 저녁 추천해 줄 사람',16034535,3,NULL),(39,'2023-11-10 00:47:30.451882',0,'2023-11-10 00:47:30.451882','왜 이 래 민석아',515645751,3,NULL),(40,'2023-11-10 04:03:03.032545',0,'2023-11-10 07:41:17.236539','오늘 저녁은 뭘 먹을까요?',16034535,3,49),(41,'2023-11-13 06:36:07.940290',0,'2023-11-16 12:38:04.825097','질문 좀 남기세요',13092437,3,65),(42,'2023-11-13 06:45:12.113771',0,'2023-11-13 06:45:12.113771','테스트',1926629690,3,NULL),(43,'2023-11-13 09:28:52.130798',0,'2023-11-13 09:28:52.130798','부산 1달살기 어떤가요',8202423,4,NULL),(44,'2023-11-14 04:50:39.789764',0,'2023-11-14 04:50:39.789764','저도 지금 질문 남길게요\n',13092437,9,NULL),(45,'2023-11-15 16:55:08.136527',0,'2023-11-16 09:54:36.668469','어옹이건잘대',21414107,14,71),(46,'2023-11-15 18:37:20.445291',0,'2023-11-15 18:37:20.445291','무슨 메뉴가 제일 맛있나요',13092437,4,NULL),(47,'2023-11-16 09:33:16.156514',0,'2023-11-16 09:33:16.156514','여기는 삼선 간짜장이 최고에요',13092437,14,NULL),(48,'2023-11-16 09:52:28.928740',0,'2023-11-16 09:52:28.928740','ㅌㅅㅌ',21414107,3,NULL),(49,'2023-11-16 09:59:14.407011',0,'2023-11-16 10:40:25.464858','무슨 메뉴가 제일 맛있나요',1742463036,4,77),(50,'2023-11-16 10:31:24.386712',0,'2023-11-16 10:31:24.386712','안녕하세요 여기 사람 많나요?',20494146,4,NULL),(51,'2023-11-16 10:55:39.845875',0,'2023-11-16 10:56:59.179740','몇층까지 있나요 여기',21414107,4,79),(52,'2023-11-16 10:58:36.411038',0,'2023-11-16 10:58:36.411038','20층 뷰 좋나요',21414107,4,NULL),(53,'2023-11-16 04:05:02.221919',0,'2023-11-16 04:05:38.490876','여기 좋러요',21414107,9,89),(54,'2023-11-16 04:20:41.601442',0,'2023-11-16 04:20:41.601442','역삼 오늘 핫한가요?',21414107,15,NULL),(55,'2023-11-17 04:20:41.601442',0,'2023-11-17 04:20:41.601442','싸피 11기 지원하려고 하는데 싸피 좋나요??',21414107,1,NULL);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stamps`
--

DROP TABLE IF EXISTS `stamps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stamps` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `deleted` bit(1) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `hot_place_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  `visited_count` int NOT NULL,
  `hot_place_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=665 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stamps`
--

LOCK TABLES `stamps` WRITE;
/*!40000 ALTER TABLE `stamps` DISABLE KEYS */;
INSERT INTO `stamps` VALUES (620,'2023-11-10 06:33:34.032464',_binary '\0','2023-11-10 06:33:34.480350','ATTRACTION',8202423,1,1,'광안리해수욕장'),(621,'2023-11-10 06:33:37.513562',_binary '\0','2023-11-16 10:49:33.138617','ETC',21414107,3,5,'멀티캠퍼스 역삼'),(622,'2023-11-10 06:37:18.748216',_binary '\0','2023-11-10 06:37:18.776789','CAFE',2131363102,3,1,'스타벅스 리버사이드팔당DT점'),(623,'2023-11-10 06:54:55.912330',_binary '\0','2023-11-16 04:21:38.918142','ETC',16034535,3,6,'대명벨리온'),(624,'2023-11-10 07:00:34.524514',_binary '\0','2023-11-10 07:00:34.548759','RESTAURANT',515645751,3,1,'뜰아래'),(625,'2023-11-10 07:03:01.400999',_binary '\0','2023-11-10 07:03:01.417888','ETC',7967869,3,1,'신논현역 9호선'),(626,'2023-11-10 07:14:37.161998',_binary '\0','2023-11-13 08:39:32.965083','ETC',25539194,3,3,'신라스테이 역삼'),(627,'2023-11-10 07:23:10.965254',_binary '\0','2023-11-13 06:47:06.071299','ETC',1926629690,3,2,'MNH엔터테인먼트'),(628,'2023-11-12 18:59:15.328161',_binary '\0','2023-11-12 18:59:15.366972','RESTAURANT',12026995,6,1,'지아니스나폴리 역삼점'),(629,'2023-11-13 01:41:09.910098',_binary '\0','2023-11-16 09:48:22.184483','ETC',16034535,9,4,'대명벨리온'),(630,'2023-11-13 01:42:56.278910',_binary '\0','2023-11-16 08:54:48.669013','ETC',21414107,9,3,'멀티캠퍼스 역삼'),(631,'2023-11-13 03:23:27.233663',_binary '\0','2023-11-16 09:26:38.012992','RESTAURANT',13092437,9,4,'양자강'),(632,'2023-11-13 04:20:19.134624',_binary '\0','2023-11-16 12:38:47.075622','RESTAURANT',12026995,3,2,'지아니스나폴리 역삼점'),(633,'2023-11-13 04:21:47.730471',_binary '\0','2023-11-14 00:15:44.107723','RESTAURANT',13092437,3,2,'양자강'),(634,'2023-11-13 05:19:06.389062',_binary '\0','2023-11-15 14:02:27.534090','ETC',21414107,6,2,'멀티캠퍼스 역삼'),(635,'2023-11-13 06:23:02.734364',_binary '\0','2023-11-13 06:23:02.752544','ETC',14970864,3,1,'아크플레이스'),(636,'2023-11-13 07:12:01.883579',_binary '\0','2023-11-13 07:12:01.950630','ETC',22539359,3,1,'참진한의원 강남본점'),(637,'2023-11-13 07:44:22.927062',_binary '\0','2023-11-13 07:44:22.945567','ETC',1926629690,9,1,'MNH엔터테인먼트'),(639,'2023-11-14 03:31:58.341705',_binary '\0','2023-11-16 06:51:18.497672','CAFE',1742463036,3,2,'매머드커피 역삼역점'),(640,'2023-11-14 03:48:39.541928',_binary '\0','2023-11-16 10:49:57.236811','ETC',21414107,4,3,'멀티캠퍼스 역삼'),(641,'2023-11-14 06:16:34.028285',_binary '\0','2023-11-16 04:30:35.154922','CAFE',1742463036,9,2,'매머드커피 역삼역점'),(642,'2023-11-14 08:31:16.245149',_binary '\0','2023-11-14 08:31:16.262150','ETC',21160619,3,1,'역삼역 2호선'),(643,'2023-11-15 09:11:03.339408',_binary '\0','2023-11-15 09:11:03.403891','RESTAURANT',261862227,3,1,'모터시티바이매니멀 역삼점'),(644,'2023-11-15 09:12:04.037226',_binary '\0','2023-11-15 09:12:04.058465','RESTAURANT',2103253212,3,1,'갓포돈'),(645,'2023-11-15 15:08:19.299171',_binary '\0','2023-11-16 09:08:35.999974','ETC',21414107,14,2,'멀티캠퍼스 역삼'),(646,'2023-11-15 17:33:15.884102',_binary '\0','2023-11-15 17:33:15.897773','ETC',21160619,9,1,'역삼역 2호선'),(647,'2023-11-15 17:51:44.448175',_binary '\0','2023-11-16 05:22:57.521161','ETC',16034535,4,2,'대명벨리온'),(648,'2023-11-16 09:33:30.075658',_binary '\0','2023-11-16 09:33:30.089890','RESTAURANT',13092437,14,1,'양자강'),(649,'2023-11-16 10:52:11.861411',_binary '\0','2023-11-16 10:52:11.880054','CAFE',20494146,4,1,'스타벅스 역삼대로점'),(650,'2023-11-16 04:04:35.658108',_binary '\0','2023-11-16 04:04:35.712519','ETC',16034535,14,1,'대명벨리온'),(651,'2023-11-16 04:10:08.948896',_binary '\0','2023-11-16 04:10:08.968036','ETC',21414107,15,1,'멀티캠퍼스 역삼'),(652,'2023-11-16 04:14:47.780792',_binary '\0','2023-11-16 04:14:47.800402','ETC',26557327,9,1,'호텔린'),(653,'2023-11-16 04:15:11.023446',_binary '\0','2023-11-16 04:15:11.037196','ETC',14527967,9,1,'호텔아드리게'),(654,'2023-11-16 04:19:15.194717',_binary '\0','2023-11-16 04:19:15.213745','CAFE',20494146,3,1,'스타벅스 역삼대로점'),(655,'2023-11-16 04:21:44.978947',_binary '\0','2023-11-16 04:21:44.991374','RESTAURANT',1977332252,14,1,'유미식당 본점'),(656,'2023-11-16 04:51:07.177864',_binary '\0','2023-11-16 04:51:07.192438','CAFE',1372855768,4,1,'바나프레소 테헤란로점'),(657,'2023-11-16 04:51:29.519257',_binary '\0','2023-11-16 04:51:29.534247','ETC',1174470222,9,1,'제이하우스'),(658,'2023-11-16 04:52:45.064996',_binary '\0','2023-11-16 04:52:45.080799','RESTAURANT',13092437,4,1,'양자강'),(659,'2023-11-16 04:52:58.148700',_binary '\0','2023-11-16 04:52:58.161391','ETC',1174470222,4,1,'제이하우스'),(660,'2023-11-16 04:56:45.542350',_binary '\0','2023-11-16 04:56:45.556364','CAFE',20089944,4,1,'투썸플레이스 역삼역점'),(661,'2023-11-16 04:57:34.615228',_binary '\0','2023-11-16 04:57:34.627716','RESTAURANT',1977332252,4,1,'유미식당 본점'),(662,'2023-11-16 06:53:36.892976',_binary '\0','2023-11-16 06:53:36.907055','CAFE',13322805,3,1,'클로리스 역삼GFC점'),(663,'2023-11-16 06:54:56.237618',_binary '\0','2023-11-16 06:54:56.251556','RESTAURANT',1563466700,3,1,'아우어베이커리 역삼점'),(664,'2023-11-16 06:56:03.543105',_binary '\0','2023-11-16 06:56:03.557771','CAFE',1411567340,3,1,'메가MGC커피 역삼중앙점');
/*!40000 ALTER TABLE `stamps` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-16 16:39:45