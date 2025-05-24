-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 22, 2025 at 04:07 PM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mvc_web2`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admins_username_unique` (`username`),
  UNIQUE KEY `admins_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `availabilities`
--

DROP TABLE IF EXISTS `availabilities`;
CREATE TABLE IF NOT EXISTS `availabilities` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `listing_id` bigint UNSIGNED NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `availabilities_listing_id_start_date_end_date_unique` (`listing_id`,`start_date`,`end_date`)
<<<<<<< HEAD
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
=======
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
>>>>>>> 5a5fa96c6c50d1325a5f8e1488529e1b2def7ba2

--
-- Dumping data for table `availabilities`
--

INSERT INTO `availabilities` (`id`, `listing_id`, `start_date`, `end_date`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-04-14', '2025-07-13', NULL, NULL),
(9, 2, '2025-04-14', '2025-05-14', NULL, NULL),
(7, 3, '2025-04-14', '2025-05-14', NULL, NULL),
(4, 4, '2025-04-14', '2025-07-13', NULL, NULL),
(5, 5, '2025-04-14', '2025-07-13', NULL, NULL),
(11, 6, '2025-04-14', '2025-05-15', NULL, NULL),
(8, 3, '2025-05-18', '2025-07-13', NULL, NULL),
(10, 2, '2025-05-18', '2025-07-13', NULL, NULL),
(28, 6, '2025-05-25', '2025-06-10', NULL, NULL),
(13, 7, '2025-05-15', '2025-06-14', NULL, NULL),
(14, 8, '2025-05-17', '2025-06-28', NULL, NULL),
(15, 9, '2025-05-15', '2025-06-14', NULL, NULL),
(16, 10, '2025-05-15', '2025-08-29', NULL, NULL),
(17, 11, '2025-05-15', '2025-06-14', NULL, NULL),
(27, 12, '2025-06-07', '2025-06-14', NULL, NULL),
(19, 13, '2025-05-15', '2025-06-14', NULL, NULL),
(20, 14, '2025-05-15', '2025-06-14', NULL, NULL),
(21, 15, '2025-05-15', '2025-06-14', NULL, NULL),
(22, 16, '2025-05-15', '2025-06-14', NULL, NULL),
(23, 17, '2025-05-15', '2025-06-14', NULL, NULL),
(24, 18, '2025-05-16', '2025-05-31', NULL, NULL),
(25, 20, '2025-05-18', '2025-05-28', NULL, NULL),
(26, 22, '2025-05-17', '2025-06-07', NULL, NULL),
(29, 6, '2025-06-29', '2025-07-13', NULL, NULL),
(31, 23, '2025-05-21', '2025-05-23', NULL, NULL),
(32, 23, '2025-05-29', '2025-05-31', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_cities', 'O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:40:{i:0;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:6;s:4:\"name\";s:6:\"Agadir\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:6;s:4:\"name\";s:6:\"Agadir\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:1;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:26;s:4:\"name\";s:6:\"Agadir\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:26;s:4:\"name\";s:6:\"Agadir\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:2;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:15;s:4:\"name\";s:11:\"Beni Mellal\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:15;s:4:\"name\";s:11:\"Beni Mellal\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:3;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:35;s:4:\"name\";s:11:\"Beni Mellal\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:35;s:4:\"name\";s:11:\"Beni Mellal\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:4;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:1;s:4:\"name\";s:10:\"Casablanca\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:1;s:4:\"name\";s:10:\"Casablanca\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:5;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:21;s:4:\"name\";s:10:\"Casablanca\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:21;s:4:\"name\";s:10:\"Casablanca\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:6;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:34;s:4:\"name\";s:9:\"El Jadida\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:34;s:4:\"name\";s:9:\"El Jadida\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:7;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:14;s:4:\"name\";s:9:\"El Jadida\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:14;s:4:\"name\";s:9:\"El Jadida\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:8;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:24;s:4:\"name\";s:3:\"Fes\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:24;s:4:\"name\";s:3:\"Fes\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:9;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:4;s:4:\"name\";s:3:\"Fes\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:4;s:4:\"name\";s:3:\"Fes\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:10;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:9;s:4:\"name\";s:7:\"Kenitra\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:9;s:4:\"name\";s:7:\"Kenitra\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:11;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:29;s:4:\"name\";s:7:\"Kenitra\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:29;s:4:\"name\";s:7:\"Kenitra\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:12;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:17;s:4:\"name\";s:9:\"Khouribga\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:17;s:4:\"name\";s:9:\"Khouribga\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:13;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:37;s:4:\"name\";s:9:\"Khouribga\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:37;s:4:\"name\";s:9:\"Khouribga\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:14;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:20;s:4:\"name\";s:13:\"Ksar El Kebir\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:20;s:4:\"name\";s:13:\"Ksar El Kebir\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:15;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:40;s:4:\"name\";s:13:\"Ksar El Kebir\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:40;s:4:\"name\";s:13:\"Ksar El Kebir\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:16;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:19;s:4:\"name\";s:7:\"Larache\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:19;s:4:\"name\";s:7:\"Larache\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:17;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:39;s:4:\"name\";s:7:\"Larache\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:39;s:4:\"name\";s:7:\"Larache\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:18;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:3;s:4:\"name\";s:9:\"Marrakech\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:3;s:4:\"name\";s:9:\"Marrakech\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:19;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:23;s:4:\"name\";s:9:\"Marrakech\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:23;s:4:\"name\";s:9:\"Marrakech\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:20;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:7;s:4:\"name\";s:6:\"Meknes\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:7;s:4:\"name\";s:6:\"Meknes\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:21;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:27;s:4:\"name\";s:6:\"Meknes\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:27;s:4:\"name\";s:6:\"Meknes\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:22;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:13;s:4:\"name\";s:10:\"Mohammedia\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:13;s:4:\"name\";s:10:\"Mohammedia\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:23;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:33;s:4:\"name\";s:10:\"Mohammedia\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:33;s:4:\"name\";s:10:\"Mohammedia\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:24;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:12;s:4:\"name\";s:5:\"Nador\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:12;s:4:\"name\";s:5:\"Nador\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:25;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:32;s:4:\"name\";s:5:\"Nador\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:32;s:4:\"name\";s:5:\"Nador\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:26;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:8;s:4:\"name\";s:5:\"Oujda\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:8;s:4:\"name\";s:5:\"Oujda\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:27;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:28;s:4:\"name\";s:5:\"Oujda\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:28;s:4:\"name\";s:5:\"Oujda\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:28;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:22;s:4:\"name\";s:5:\"Rabat\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:22;s:4:\"name\";s:5:\"Rabat\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:29;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:2;s:4:\"name\";s:5:\"Rabat\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:2;s:4:\"name\";s:5:\"Rabat\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:30;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:11;s:4:\"name\";s:5:\"Salé\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:11;s:4:\"name\";s:5:\"Salé\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:31;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:31;s:4:\"name\";s:5:\"Salé\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:31;s:4:\"name\";s:5:\"Salé\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:32;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:18;s:4:\"name\";s:6:\"Settat\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:18;s:4:\"name\";s:6:\"Settat\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:33;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:38;s:4:\"name\";s:6:\"Settat\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:38;s:4:\"name\";s:6:\"Settat\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:34;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:5;s:4:\"name\";s:7:\"Tangier\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:5;s:4:\"name\";s:7:\"Tangier\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:35;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:25;s:4:\"name\";s:7:\"Tangier\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:25;s:4:\"name\";s:7:\"Tangier\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:36;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:16;s:4:\"name\";s:4:\"Taza\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:16;s:4:\"name\";s:4:\"Taza\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:37;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:36;s:4:\"name\";s:4:\"Taza\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:36;s:4:\"name\";s:4:\"Taza\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:38;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:10;s:4:\"name\";s:7:\"Tetouan\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:10;s:4:\"name\";s:7:\"Tetouan\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:39;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:30;s:4:\"name\";s:7:\"Tetouan\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:30;s:4:\"name\";s:7:\"Tetouan\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}', 1747300009);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Bois et Derivés', '2025-05-14 01:51:18', '2025-05-14 01:51:18'),
(2, 'Matériaux de Construction', '2025-05-14 01:51:18', '2025-05-14 01:51:18'),
(3, 'Peinture et Revêtement', '2025-05-14 01:51:18', '2025-05-14 01:51:18'),
(4, 'Electricité', '2025-05-14 01:51:18', '2025-05-14 01:51:18'),
(5, 'Plomberie', '2025-05-14 01:51:18', '2025-05-14 01:51:18'),
(6, 'Outillage', '2025-05-14 01:51:18', '2025-05-14 01:51:18'),
(7, 'Isolation', '2025-05-14 01:51:18', '2025-05-14 01:51:18'),
(8, 'Revêtement de sol et murs', '2025-05-14 01:51:18', '2025-05-14 01:51:18'),
(9, 'Jardin et extérieur', '2025-05-14 01:51:18', '2025-05-14 01:51:18'),
(10, 'Bois et Derivés', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(11, 'Matériaux de Construction', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(12, 'Peinture et Revêtement', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(13, 'Electricité', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(14, 'Plomberie', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(15, 'Outillage', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(16, 'Isolation', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(17, 'Revêtement de sol et murs', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(18, 'Jardin et extérieur', '2025-05-14 02:17:13', '2025-05-14 02:17:13');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
CREATE TABLE IF NOT EXISTS `cities` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Casablanca', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(2, 'Rabat', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(3, 'Marrakech', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(4, 'Fes', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(5, 'Tangier', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(6, 'Agadir', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(7, 'Meknes', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(8, 'Oujda', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(9, 'Kenitra', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(10, 'Tetouan', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(11, 'Salé', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(12, 'Nador', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(13, 'Mohammedia', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(14, 'El Jadida', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(15, 'Beni Mellal', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(16, 'Taza', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(17, 'Khouribga', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(18, 'Settat', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(19, 'Larache', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(20, 'Ksar El Kebir', '2025-05-14 00:44:56', '2025-05-14 00:44:56'),
(21, 'Casablanca', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(22, 'Rabat', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(23, 'Marrakech', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(24, 'Fes', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(25, 'Tangier', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(26, 'Agadir', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(27, 'Meknes', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(28, 'Oujda', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(29, 'Kenitra', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(30, 'Tetouan', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(31, 'Salé', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(32, 'Nador', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(33, 'Mohammedia', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(34, 'El Jadida', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(35, 'Beni Mellal', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(36, 'Taza', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(37, 'Khouribga', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(38, 'Settat', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(39, 'Larache', '2025-05-14 02:17:13', '2025-05-14 02:17:13'),
(40, 'Ksar El Kebir', '2025-05-14 02:17:13', '2025-05-14 02:17:13');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `url` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `listing_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `images_listing_id_foreign` (`listing_id`)
<<<<<<< HEAD
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `url`, `listing_id`, `created_at`, `updated_at`) VALUES
(1, 'http://localhost/storage/listings/52180f3c-c8e8-41ee-bbaf-4527a6e14cd8.jpg', 7, '2025-05-15 01:19:28', '2025-05-15 01:19:28'),
(2, 'http://localhost/storage/listings/2ea35f7e-2d0f-416c-b5b9-da0bf1b43158.jpg', 8, '2025-05-15 01:49:53', '2025-05-15 01:49:53'),
(3, 'http://localhost/storage/listings/95a03f00-9dc9-4428-af6e-15d724ffc110.jpg', 9, '2025-05-15 03:32:28', '2025-05-15 03:32:28'),
(4, 'http://localhost/storage/listings/12f52bf9-a1ec-47cf-9e37-8b8bbdc29399.jpg', 10, '2025-05-15 03:34:58', '2025-05-15 03:34:58'),
(5, 'http://localhost/storage/listings/b7dbaa9d-8b11-4f17-9876-49002960cd33.jpg', 11, '2025-05-15 03:36:13', '2025-05-15 03:36:13'),
(6, 'http://localhost/storage/listings/b2fed681-8622-4266-9d23-64a9ea71d77b.jpg', 12, '2025-05-15 03:54:08', '2025-05-15 03:54:08'),
(7, 'http://localhost/storage/listings/36835c92-1f17-48b5-a3b2-24f2d8468fac.jpg', 13, '2025-05-15 04:17:30', '2025-05-15 04:17:30'),
(8, 'http://localhost/storage/listings/32fb7d95-ec0d-46ff-afd2-ba320c27f6c8.jpg', 14, '2025-05-15 05:01:07', '2025-05-15 05:01:07'),
(9, 'http://localhost/storage/listings/a2c479aa-407b-4c6d-84e5-5f1c153ca26b.jpg', 15, '2025-05-15 05:36:46', '2025-05-15 05:36:46'),
(10, 'http://localhost/storage/listings/95c5b0e8-e0e9-491e-9fd3-a9a0a4d4c6ce.jpg', 16, '2025-05-15 05:40:50', '2025-05-15 05:40:50'),
(11, 'http://localhost/storage/listings/0a33a10d-de09-4868-9b53-45c73d325037.jpg', 17, '2025-05-15 05:46:34', '2025-05-15 05:46:34'),
(12, 'http://localhost/storage/listings/2cd30b51-7fe6-4218-915b-d12dc3fd788c.jpg', 18, '2025-05-15 05:53:41', '2025-05-15 05:53:41'),
(13, 'http://localhost/storage/listings/cf87f5ce-18e6-45b7-9b05-0a922a83ce9f.jpg', 20, '2025-05-15 07:00:05', '2025-05-15 07:00:05'),
(14, '/storage/tool-images/1747297131_6825a36b9def5.jpg', 22, '2025-05-15 07:18:51', '2025-05-15 07:18:51'),
(15, '/storage/tool-images/1747298736_6825a9b05c2ca.jpg', 23, '2025-05-15 07:45:36', '2025-05-15 07:45:36');
=======
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
>>>>>>> 5a5fa96c6c50d1325a5f8e1488529e1b2def7ba2

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
<<<<<<< HEAD
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `queue`, `payload`, `attempts`, `reserved_at`, `available_at`, `created_at`) VALUES
(1, 'default', '{\"uuid\":\"56de491d-4de9-4b31-b033-af09ad8c9108\",\"displayName\":\"App\\\\Jobs\\\\CancelUnpaidReservation\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\CancelUnpaidReservation\",\"command\":\"O:32:\\\"App\\\\Jobs\\\\CancelUnpaidReservation\\\":2:{s:14:\\\"\\u0000*\\u0000reservation\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\Reservation\\\";s:2:\\\"id\\\";i:13;s:9:\\\"relations\\\";a:2:{i:0;s:6:\\\"client\\\";i:1;s:7:\\\"listing\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:5:\\\"delay\\\";O:25:\\\"Illuminate\\\\Support\\\\Carbon\\\":3:{s:4:\\\"date\\\";s:26:\\\"2025-05-16 00:45:25.857826\\\";s:13:\\\"timezone_type\\\";i:3;s:8:\\\"timezone\\\";s:3:\\\"UTC\\\";}}\"}}', 0, NULL, 1747356325, 1747269925),
(2, 'default', '{\"uuid\":\"745157ca-f5d0-47f2-977b-9b6f0253cd3d\",\"displayName\":\"App\\\\Jobs\\\\CancelUnpaidReservation\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\CancelUnpaidReservation\",\"command\":\"O:32:\\\"App\\\\Jobs\\\\CancelUnpaidReservation\\\":2:{s:14:\\\"\\u0000*\\u0000reservation\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\Reservation\\\";s:2:\\\"id\\\";i:12;s:9:\\\"relations\\\";a:2:{i:0;s:6:\\\"client\\\";i:1;s:7:\\\"listing\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:5:\\\"delay\\\";O:25:\\\"Illuminate\\\\Support\\\\Carbon\\\":3:{s:4:\\\"date\\\";s:26:\\\"2025-05-16 00:45:37.140578\\\";s:13:\\\"timezone_type\\\";i:3;s:8:\\\"timezone\\\";s:3:\\\"UTC\\\";}}\"}}', 0, NULL, 1747356337, 1747269937),
(3, 'default', '{\"uuid\":\"f3aff9c6-6748-4075-b294-8a94965d9cdf\",\"displayName\":\"App\\\\Jobs\\\\CancelUnpaidReservation\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\CancelUnpaidReservation\",\"command\":\"O:32:\\\"App\\\\Jobs\\\\CancelUnpaidReservation\\\":2:{s:14:\\\"\\u0000*\\u0000reservation\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\Reservation\\\";s:2:\\\"id\\\";i:14;s:9:\\\"relations\\\";a:2:{i:0;s:6:\\\"client\\\";i:1;s:7:\\\"listing\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:5:\\\"delay\\\";O:25:\\\"Illuminate\\\\Support\\\\Carbon\\\":3:{s:4:\\\"date\\\";s:26:\\\"2025-05-16 00:49:04.954660\\\";s:13:\\\"timezone_type\\\";i:3;s:8:\\\"timezone\\\";s:3:\\\"UTC\\\";}}\"}}', 0, NULL, 1747356544, 1747270144),
(4, 'default', '{\"uuid\":\"aae655fe-9b94-4738-a157-e246d2f9fa06\",\"displayName\":\"App\\\\Jobs\\\\CancelUnpaidReservation\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\CancelUnpaidReservation\",\"command\":\"O:32:\\\"App\\\\Jobs\\\\CancelUnpaidReservation\\\":2:{s:14:\\\"\\u0000*\\u0000reservation\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\Reservation\\\";s:2:\\\"id\\\";i:11;s:9:\\\"relations\\\";a:2:{i:0;s:6:\\\"client\\\";i:1;s:7:\\\"listing\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:5:\\\"delay\\\";O:25:\\\"Illuminate\\\\Support\\\\Carbon\\\":3:{s:4:\\\"date\\\";s:26:\\\"2025-05-16 00:50:00.917366\\\";s:13:\\\"timezone_type\\\";i:3;s:8:\\\"timezone\\\";s:3:\\\"UTC\\\";}}\"}}', 0, NULL, 1747356600, 1747270200),
(5, 'default', '{\"uuid\":\"547e5dc3-3ac1-4b86-877f-80ab949ca8ce\",\"displayName\":\"App\\\\Jobs\\\\CancelUnpaidReservation\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\CancelUnpaidReservation\",\"command\":\"O:32:\\\"App\\\\Jobs\\\\CancelUnpaidReservation\\\":2:{s:14:\\\"\\u0000*\\u0000reservation\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\Reservation\\\";s:2:\\\"id\\\";i:16;s:9:\\\"relations\\\";a:2:{i:0;s:6:\\\"client\\\";i:1;s:7:\\\"listing\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:5:\\\"delay\\\";O:25:\\\"Illuminate\\\\Support\\\\Carbon\\\":3:{s:4:\\\"date\\\";s:26:\\\"2025-05-16 01:19:29.072317\\\";s:13:\\\"timezone_type\\\";i:3;s:8:\\\"timezone\\\";s:3:\\\"UTC\\\";}}\"}}', 0, NULL, 1747358369, 1747271969),
(6, 'default', '{\"uuid\":\"e905e898-d6e9-4de0-8f56-c1dbdbb57079\",\"displayName\":\"App\\\\Jobs\\\\CancelUnpaidReservation\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\CancelUnpaidReservation\",\"command\":\"O:32:\\\"App\\\\Jobs\\\\CancelUnpaidReservation\\\":2:{s:14:\\\"\\u0000*\\u0000reservation\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\Reservation\\\";s:2:\\\"id\\\";i:24;s:9:\\\"relations\\\";a:2:{i:0;s:6:\\\"client\\\";i:1;s:7:\\\"listing\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:5:\\\"delay\\\";O:25:\\\"Illuminate\\\\Support\\\\Carbon\\\":3:{s:4:\\\"date\\\";s:26:\\\"2025-05-16 08:35:50.657307\\\";s:13:\\\"timezone_type\\\";i:3;s:8:\\\"timezone\\\";s:3:\\\"UTC\\\";}}\"}}', 0, NULL, 1747384550, 1747298150),
(7, 'default', '{\"uuid\":\"e54fe1ad-8e83-411b-9bdb-5bbc9cf4a8e3\",\"displayName\":\"App\\\\Jobs\\\\CancelUnpaidReservation\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\CancelUnpaidReservation\",\"command\":\"O:32:\\\"App\\\\Jobs\\\\CancelUnpaidReservation\\\":2:{s:14:\\\"\\u0000*\\u0000reservation\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\Reservation\\\";s:2:\\\"id\\\";i:17;s:9:\\\"relations\\\";a:2:{i:0;s:6:\\\"client\\\";i:1;s:7:\\\"listing\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:5:\\\"delay\\\";O:25:\\\"Illuminate\\\\Support\\\\Carbon\\\":3:{s:4:\\\"date\\\";s:26:\\\"2025-05-16 08:37:11.229864\\\";s:13:\\\"timezone_type\\\";i:3;s:8:\\\"timezone\\\";s:3:\\\"UTC\\\";}}\"}}', 0, NULL, 1747384631, 1747298231),
(8, 'default', '{\"uuid\":\"ac6ddcf4-091a-4a0e-b4f4-c5d361c49971\",\"displayName\":\"App\\\\Jobs\\\\CancelUnpaidReservation\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\CancelUnpaidReservation\",\"command\":\"O:32:\\\"App\\\\Jobs\\\\CancelUnpaidReservation\\\":2:{s:14:\\\"\\u0000*\\u0000reservation\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\Reservation\\\";s:2:\\\"id\\\";i:25;s:9:\\\"relations\\\";a:2:{i:0;s:6:\\\"client\\\";i:1;s:7:\\\"listing\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:5:\\\"delay\\\";O:25:\\\"Illuminate\\\\Support\\\\Carbon\\\":3:{s:4:\\\"date\\\";s:26:\\\"2025-05-16 08:48:56.952555\\\";s:13:\\\"timezone_type\\\";i:3;s:8:\\\"timezone\\\";s:3:\\\"UTC\\\";}}\"}}', 0, NULL, 1747385336, 1747298936);
=======
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
>>>>>>> 5a5fa96c6c50d1325a5f8e1488529e1b2def7ba2

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `liked_listings`
--

DROP TABLE IF EXISTS `liked_listings`;
CREATE TABLE IF NOT EXISTS `liked_listings` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `listing_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_listing` (`user_id`,`listing_id`),
  KEY `listing_id` (`listing_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `liked_listings`
--

INSERT INTO `liked_listings` (`id`, `user_id`, `listing_id`, `created_at`) VALUES
(1, 2, 7, '2025-05-15 03:06:40'),
(4, 4, 1, '2025-05-15 04:05:56'),
(5, 17, 10, '2025-05-15 08:43:21'),
(6, 17, 1, '2025-05-15 08:43:22');

-- --------------------------------------------------------

--
-- Table structure for table `listings`
--

DROP TABLE IF EXISTS `listings`;
CREATE TABLE IF NOT EXISTS `listings` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price_per_day` decimal(10,2) NOT NULL,
  `status` enum('active','archived','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `is_premium` tinyint(1) NOT NULL DEFAULT '0',
  `premium_start_date` timestamp NULL DEFAULT NULL,
  `premium_end_date` timestamp NULL DEFAULT NULL,
  `priority` int NOT NULL DEFAULT '4',
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `avg_rating` decimal(3,2) NOT NULL DEFAULT '0.00',
  `review_count` int NOT NULL DEFAULT '0',
  `delivery_option` tinyint(1) NOT NULL DEFAULT '0',
  `category_id` bigint UNSIGNED DEFAULT NULL,
  `city_id` bigint UNSIGNED DEFAULT NULL,
  `partner_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listings_category_id_foreign` (`category_id`),
  KEY `listings_city_id_foreign` (`city_id`),
  KEY `listings_partner_id_foreign` (`partner_id`)
<<<<<<< HEAD
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
=======
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
>>>>>>> 5a5fa96c6c50d1325a5f8e1488529e1b2def7ba2

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`id`, `title`, `description`, `price_per_day`, `status`, `is_premium`, `premium_start_date`, `premium_end_date`, `priority`, `longitude`, `latitude`, `avg_rating`, `review_count`, `delivery_option`, `category_id`, `city_id`, `partner_id`, `created_at`, `updated_at`) VALUES
(1, 'Tool 0 for Partner 3', 'This is a sample tool created by the seeder', 22.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 1, 10, 3, '2025-05-14 02:00:13', '2025-05-14 02:00:13'),
(2, 'Tool 1 for Partner 3', 'This is a sample tool created by the seeder', 19.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 6, 6, 3, '2025-05-14 02:00:13', '2025-05-14 02:00:13'),
(3, 'Tool 0 for Partner 4', 'This is a sample tool created by the seeder', 47.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 6, 8, 4, '2025-05-14 02:00:13', '2025-05-14 02:00:13'),
(4, 'Tool 1 for Partner 4', 'This is a sample tool created by the seeder', 27.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 6, 7, 4, '2025-05-14 02:00:13', '2025-05-14 02:00:13'),
(5, 'Tool 0 for Partner 5', 'This is a sample tool created by the seeder', 17.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 1, 8, 5, '2025-05-14 02:00:13', '2025-05-14 02:00:13'),
(6, 'Tool 1 for Partner 5', 'This is a sample tool created by the seeder', 29.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 3, 6, 5, '2025-05-14 02:00:13', '2025-05-14 02:00:13'),
(7, 'Listing 1', 'desc 1', 11.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 15, 19, 4, '2025-05-15 01:19:27', '2025-05-15 01:19:27'),
(8, 'Listing 2', 'zz', 1.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 16, 21, 4, '2025-05-15 01:49:53', '2025-05-15 01:49:53'),
(9, 'Listing 4', 'disct', 14.00, 'active', 1, '2025-05-15 03:32:28', '2025-05-29 03:32:28', 4, NULL, NULL, 0.00, 0, 0, 8, 21, 4, '2025-05-15 03:32:27', '2025-05-15 05:40:16'),
(10, 'listing 5', 'ssss', 33.00, 'active', 1, '2025-05-15 03:34:58', '2025-05-22 03:34:58', 4, NULL, NULL, 0.00, 0, 0, 2, 40, 5, '2025-05-15 03:34:58', '2025-05-15 04:15:42'),
(11, 'listing 6', 'rrr', 2.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 18, 7, 5, '2025-05-15 03:36:13', '2025-05-15 03:36:13'),
(12, 'listing 7', 'ddd', 11.00, 'active', 1, '2025-05-15 03:54:08', '2025-06-15 03:54:08', 4, NULL, NULL, 0.00, 0, 0, 6, 29, 5, '2025-05-15 03:54:08', '2025-05-15 04:15:42'),
(13, 'listing 66', 'ee', 11.00, 'active', 0, '2025-05-15 04:17:30', '2025-05-29 04:17:30', 4, NULL, NULL, 0.00, 0, 0, 9, 37, 2, '2025-05-15 04:17:30', '2025-05-15 04:17:31'),
(14, 'haa', 'eee', 22.00, 'active', 0, '2025-05-15 05:01:06', '2025-06-15 05:01:06', 4, NULL, NULL, 0.00, 0, 0, 15, 9, 4, '2025-05-15 05:01:06', '2025-05-15 05:01:07'),
(15, 'listing 99', 'desccc', 9.98, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 14, 37, 4, '2025-05-15 05:36:46', '2025-05-15 05:36:46'),
(16, 'listi', 'dee', 10.00, 'active', 0, '2025-05-15 05:40:50', '2025-05-29 05:40:50', 4, NULL, NULL, 0.00, 0, 0, 17, 17, 4, '2025-05-15 05:40:50', '2025-05-15 05:40:51'),
(17, 'fff', 'ddd', 22.00, 'active', 1, '2025-05-15 05:46:34', '2025-05-29 05:46:34', 4, NULL, NULL, 0.00, 0, 0, 14, 20, 4, '2025-05-15 05:46:34', '2025-05-15 05:46:35'),
(18, 'lisitng 55', 'eee', 49.99, 'active', 1, '2025-05-15 05:53:41', '2025-05-29 05:53:41', 4, NULL, NULL, 0.00, 0, 0, 14, 17, 4, '2025-05-15 05:53:41', '2025-05-15 05:53:42'),
(19, 'Test Tool for Review cZ9muU', 'A tool to test the review system', 25.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 1, 1, 13, '2025-05-15 06:47:19', '2025-05-15 06:47:19'),
(20, 'lisss', 'sss', 11.00, 'active', 1, '2025-05-15 07:00:05', '2025-05-29 07:00:05', 4, NULL, NULL, 0.00, 0, 0, 16, 20, 4, '2025-05-15 07:00:05', '2025-05-15 07:00:06'),
(21, 'Test Tool for Review Aqltxh', 'A tool to test the review system', 25.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 1, 1, 15, '2025-05-15 07:07:16', '2025-05-15 07:07:16'),
(22, 'kjhgf', 'fdfdf', 100.00, 'active', 1, '2025-05-15 07:18:51', '2025-05-29 07:18:51', 4, NULL, NULL, 0.00, 0, 0, 14, 17, 4, '2025-05-15 07:18:51', '2025-05-15 07:18:52'),
(23, 'tool test', 'descri^ption', 10.00, 'active', 1, '2025-05-15 07:45:36', '2025-05-29 07:45:36', 4, NULL, NULL, 0.00, 0, 0, 4, 19, 17, '2025-05-15 07:45:36', '2025-05-15 07:45:37'),
(24, 'Test Tool for Review LmQnVB', 'A tool to test the review system', 25.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 1, 1, 18, '2025-05-15 07:51:25', '2025-05-15 07:51:25');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000001_create_cache_table', 1),
(2, '0001_01_01_000002_create_jobs_table', 1),
(3, '2024_04_24_000001_create_cities_table', 1),
(4, '2024_04_24_000002_create_categories_table', 1),
(5, '2024_04_24_000003_create_users_table', 1),
(6, '2024_04_24_000004_create_admins_table', 1),
(7, '2024_04_24_000005_create_listings_table', 1),
(8, '2024_04_24_000006_create_reservations_table', 1),
(9, '2024_04_24_000007_create_availabilities_table', 1),
(10, '2024_04_24_000008_create_images_table', 1),
(11, '2024_04_24_000009_create_reviews_table', 1),
(12, '2024_04_24_000010_create_notifications_table', 1),
(13, '2024_04_24_000011_create_payments_table', 1),
(14, '2025_04_24_210428_create_personal_access_tokens_table', 1),
(15, '2025_04_24_214820_create_sessions_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `type` enum('reservation','review','reminder','system') COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_user_id_foreign` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `partner_signalees`
--

DROP TABLE IF EXISTS `partner_signalees`;
CREATE TABLE IF NOT EXISTS `partner_signalees` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `reporter_id` bigint UNSIGNED NOT NULL,
  `partner_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_report` (`reporter_id`,`partner_id`),
  KEY `partner_id` (`partner_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `partner_signalees`
--

INSERT INTO `partner_signalees` (`id`, `reporter_id`, `partner_id`, `created_at`) VALUES
(1, 4, 5, '2025-05-15 06:59:00'),
(2, 2, 5, '2025-05-15 07:50:42');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
CREATE TABLE IF NOT EXISTS `payments` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('pending','completed','failed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `client_id` bigint UNSIGNED NOT NULL,
  `reservation_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payments_client_id_foreign` (`client_id`),
  KEY `payments_reservation_id_foreign` (`reservation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
<<<<<<< HEAD
) ENGINE=MyISAM AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
=======
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
>>>>>>> 5a5fa96c6c50d1325a5f8e1488529e1b2def7ba2

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 1, 'auth_token', 'a65ed7230b93ba5d714b557c4c5b8bc8f6c30a07266ea4f4cfc80aae122a7553', '[\"*\"]', NULL, NULL, '2025-05-14 00:47:27', '2025-05-14 00:47:27'),
(3, 'App\\Models\\User', 1, 'auth_token', 'f581af12ddc9bcc2fe10bbbf0ad1d48a706c6484095530cdd5e4868ab60b2f39', '[\"*\"]', NULL, NULL, '2025-05-14 00:55:20', '2025-05-14 00:55:20'),
(4, 'App\\Models\\User', 1, 'auth_token', '003400b02bc8fef71eeec554738ced5407f99081d9b0f9eb818eea2db6a33454', '[\"*\"]', NULL, NULL, '2025-05-14 01:19:54', '2025-05-14 01:19:54'),
(5, 'App\\Models\\User', 1, 'auth_token', '043ae9ab1849df98c0a902e899c7e88815a8fc538f2181017966862fe7cf2c80', '[\"*\"]', NULL, NULL, '2025-05-14 01:37:03', '2025-05-14 01:37:03'),
(6, 'App\\Models\\User', 1, 'auth_token', '6086216eaacacc1f69a36c026b4522ce2331e5e974ea214c919c1c0713f1c0f3', '[\"*\"]', NULL, NULL, '2025-05-14 02:02:45', '2025-05-14 02:02:45'),
(7, 'App\\Models\\User', 2, 'auth_token', '900990ea7fd9bd0e95766f9a4b40e12dca502f8609dc144cfb560b3dad6d9a88', '[\"*\"]', NULL, NULL, '2025-05-14 02:04:29', '2025-05-14 02:04:29'),
(8, 'App\\Models\\User', 2, 'auth_token', 'dc5bd9ada910ab66ac16fcc292c485dd42782f47d9dfe1a2939969a2b7e2be1c', '[\"*\"]', NULL, NULL, '2025-05-14 02:07:52', '2025-05-14 02:07:52'),
(9, 'App\\Models\\User', 2, 'auth_token', '3013f517da4592a7f726caf48e3ee3e382f6c1ca2431e707e1871cb09e3c7bdb', '[\"*\"]', NULL, NULL, '2025-05-14 02:19:02', '2025-05-14 02:19:02'),
(10, 'App\\Models\\User', 2, 'auth_token', '2050cc7069c394783fbf11c2a727e1655cee9ffeffc71e4e0eece40779f39093', '[\"*\"]', NULL, NULL, '2025-05-14 13:21:03', '2025-05-14 13:21:03'),
(11, 'App\\Models\\User', 2, 'auth_token', '66e702eedf758095aef8ebe1bac58032574f0792090f01533b296944c04629d8', '[\"*\"]', NULL, NULL, '2025-05-14 13:33:33', '2025-05-14 13:33:33'),
(12, 'App\\Models\\User', 2, 'auth_token', 'ab1e71788783dd40db906e554be9aada6204f2f416bcd17332654922591d5629', '[\"*\"]', '2025-05-14 13:55:24', NULL, '2025-05-14 13:55:03', '2025-05-14 13:55:24'),
(13, 'App\\Models\\User', 2, 'auth_token', 'dafff592b34b7174ae484463bab196b091c1eda1d097a34b268715dbbd8233a9', '[\"*\"]', '2025-05-14 13:56:26', NULL, '2025-05-14 13:55:35', '2025-05-14 13:56:26'),
(14, 'App\\Models\\User', 2, 'auth_token', 'b54e267a0a1ac93e58d57cf0e692a78fd22f019d2fa0b94c578cbebab027ef4b', '[\"*\"]', '2025-05-14 13:59:33', NULL, '2025-05-14 13:56:36', '2025-05-14 13:59:33'),
(15, 'App\\Models\\User', 2, 'auth_token', 'b52732f9bcaa1c1669174613f367ca62869ba0ba0174d36baa1b85727ef77a17', '[\"*\"]', '2025-05-14 14:51:18', NULL, '2025-05-14 14:00:03', '2025-05-14 14:51:18'),
(16, 'App\\Models\\User', 2, 'auth_token', 'b16a88588dbc6c60c02c891b2ba1484cc79e8ad8dcde329c681f3a00ef2f8ade', '[\"*\"]', '2025-05-14 15:04:10', NULL, '2025-05-14 14:51:37', '2025-05-14 15:04:10'),
(17, 'App\\Models\\User', 2, 'auth_token', 'e1ea124e1b8e67f024371f64684be33ac09c6972e028f76855b920b228213e10', '[\"*\"]', '2025-05-14 15:14:23', NULL, '2025-05-14 15:04:25', '2025-05-14 15:14:23'),
(18, 'App\\Models\\User', 1, 'auth_token', '4a40415669783caf85ee79e7ede1b0fa2e103d6269cafce5d85a69e9b8ee79da', '[\"*\"]', '2025-05-14 15:14:40', NULL, '2025-05-14 15:14:37', '2025-05-14 15:14:40'),
(19, 'App\\Models\\User', 2, 'auth_token', 'c2db8d78486a799ae06f94d6b8a8fcd96e00041bdc4d0e045d21f7a91c786721', '[\"*\"]', '2025-05-14 16:16:09', NULL, '2025-05-14 16:00:46', '2025-05-14 16:16:09'),
(20, 'App\\Models\\User', 2, 'auth_token', 'dac3769964187048ca5e77c7b7435db507db51b45ce21b26c3d8c48c0bc8a73e', '[\"*\"]', '2025-05-14 16:16:43', NULL, '2025-05-14 16:16:18', '2025-05-14 16:16:43'),
(21, 'App\\Models\\User', 2, 'auth_token', 'ffff6ce8ce02a61fff2c93e16b992dabea95a15a8bfd5adf8a2abb7ca16fffde', '[\"*\"]', '2025-05-14 16:36:57', NULL, '2025-05-14 16:16:56', '2025-05-14 16:36:57'),
(22, 'App\\Models\\User', 2, 'auth_token', '0911f8c966d641785729c4b511c08875afef4ea3af69c619ede3c205fa9bf925', '[\"*\"]', '2025-05-14 17:13:14', NULL, '2025-05-14 16:37:04', '2025-05-14 17:13:14'),
(23, 'App\\Models\\User', 2, 'auth_token', '583339249c8eabc356fc36225c6148f7b94ba5b277ed82eec5d9f382c62977df', '[\"*\"]', '2025-05-14 17:22:45', NULL, '2025-05-14 17:13:22', '2025-05-14 17:22:45'),
(24, 'App\\Models\\User', 6, 'auth_token', 'c577a0ddbd71f857c0b09637a580220411050bfe080b16b264242ec79b79e225', '[\"*\"]', '2025-05-14 17:26:21', NULL, '2025-05-14 17:23:48', '2025-05-14 17:26:21'),
(25, 'App\\Models\\User', 7, 'auth_token', '8781a1d43562468186466f71e2dcef08311f2bc060b467a85bfb17d2a2debb5f', '[\"*\"]', '2025-05-14 17:34:33', NULL, '2025-05-14 17:28:02', '2025-05-14 17:34:33'),
(26, 'App\\Models\\User', 2, 'auth_token', '4fa8cad790ed81a2b394461b4739f1dd281a3a1b64853db9855b34d2fde3dcf6', '[\"*\"]', '2025-05-14 17:41:48', NULL, '2025-05-14 17:34:45', '2025-05-14 17:41:48'),
(27, 'App\\Models\\User', 2, 'auth_token', 'f22bcfd69fb17a250db2cd46602193cda9756790c2ac16d7239adbcb4cdf6d3e', '[\"*\"]', '2025-05-14 17:44:48', NULL, '2025-05-14 17:41:57', '2025-05-14 17:44:48'),
(28, 'App\\Models\\User', 2, 'auth_token', '78a43bad3ce6196d669bb3004c4408f0f50e768bae7e809df145f49841a2eb17', '[\"*\"]', '2025-05-14 17:50:50', NULL, '2025-05-14 17:44:58', '2025-05-14 17:50:50'),
(32, 'App\\Models\\User', 9, 'auth_token', '06960be16709a9484ef0995bc8da201bbf0eca9d4ccff8fabdcc182c28e9ff23', '[\"*\"]', '2025-05-14 22:08:27', NULL, '2025-05-14 17:55:37', '2025-05-14 22:08:27'),
(33, 'App\\Models\\User', 2, 'auth_token', '271bca24a9052867a55e20802035a506daaa990eb9c8f6a717469f75d05d2a9c', '[\"*\"]', '2025-05-14 22:23:23', NULL, '2025-05-14 22:08:35', '2025-05-14 22:23:23'),
(34, 'App\\Models\\User', 2, 'auth_token', '91a08da01f73a514d39a3425a895c179d986f82ee5fa440a107ca97291add2bb', '[\"*\"]', '2025-05-14 22:55:01', NULL, '2025-05-14 22:23:31', '2025-05-14 22:55:01'),
(35, 'App\\Models\\User', 2, 'auth_token', 'ec4841c94fc399ffc007056410ce5de5c4bb6c173a45385ec8b2a42ad2ad3183', '[\"*\"]', '2025-05-14 22:56:15', NULL, '2025-05-14 22:55:24', '2025-05-14 22:56:15'),
(36, 'App\\Models\\User', 2, 'auth_token', 'acdf6acee28d06c60d155786ccb4c3532dcdb8e6e4c7722e39e66f4aa97fc36c', '[\"*\"]', '2025-05-14 23:06:35', NULL, '2025-05-14 22:56:23', '2025-05-14 23:06:35'),
(37, 'App\\Models\\User', 2, 'auth_token', 'f1b010744bc99c49a7503ac883633a9e991a90ce53bacaf4a61a4c0dce035bc1', '[\"*\"]', '2025-05-14 23:27:04', NULL, '2025-05-14 23:06:41', '2025-05-14 23:27:04'),
(39, 'App\\Models\\User', 4, 'auth_token', '508a8307ee538f2ac5c1842cda7eb2422a400049be17ad83512f09da535c40e4', '[\"*\"]', '2025-05-14 23:44:49', NULL, '2025-05-14 23:28:59', '2025-05-14 23:44:49'),
(42, 'App\\Models\\User', 3, 'auth_token', '123562ddc60df3e695dc3a7bcca350bd96981a5658fa59cbb2eca23e7bbb25f3', '[\"*\"]', '2025-05-14 23:53:34', NULL, '2025-05-14 23:48:33', '2025-05-14 23:53:34'),
(43, 'App\\Models\\User', 4, 'auth_token', '9f424487da0641491187fe7c8a196a37b5dc60b84e0c5736301f2837e5c14e9d', '[\"*\"]', '2025-05-15 00:01:10', NULL, '2025-05-14 23:53:45', '2025-05-15 00:01:10'),
(46, 'App\\Models\\User', 3, 'auth_token', '12b335df246f355c32d93353df75d1880ee80bdf1458700ba011cae1ee2f73bc', '[\"*\"]', '2025-05-15 00:11:10', NULL, '2025-05-15 00:03:17', '2025-05-15 00:11:10'),
(47, 'App\\Models\\User', 4, 'auth_token', '0e62ea8690c6d59aa416e244379d9b001392c38ab148fb11dae6d56506e2584c', '[\"*\"]', '2025-05-15 00:12:30', NULL, '2025-05-15 00:12:04', '2025-05-15 00:12:30'),
(49, 'App\\Models\\User', 5, 'auth_token', 'a79734de8dfedaa87a3b826a8e61bcce44383e0bd6b8d1b04c33ff8f048d0a16', '[\"*\"]', '2025-05-15 00:20:49', NULL, '2025-05-15 00:19:15', '2025-05-15 00:20:49'),
(50, 'App\\Models\\User', 4, 'auth_token', '22c17ff037ba187a6b67c5998ac981d2acbe2c94ff4815c26ee6d87286cc6968', '[\"*\"]', '2025-05-15 00:22:02', NULL, '2025-05-15 00:21:02', '2025-05-15 00:22:02'),
(51, 'App\\Models\\User', 4, 'auth_token', 'c043589d9ffc7f599889a19a2661220bbe0a275142ad4782cdc19b08e23c3385', '[\"*\"]', '2025-05-15 00:23:21', NULL, '2025-05-15 00:22:25', '2025-05-15 00:23:21'),
(52, 'App\\Models\\User', 4, 'auth_token', 'b3066398ae5d05fa8997ccad777c9443118de1b89f67e6e1f3518f26ef4ec465', '[\"*\"]', '2025-05-15 00:26:05', NULL, '2025-05-15 00:23:28', '2025-05-15 00:26:05'),
(53, 'App\\Models\\User', 4, 'auth_token', '1dd367df7bc6f45f3516044d7378812460e10661a393d857965c0242e3fe99bb', '[\"*\"]', '2025-05-15 00:30:25', NULL, '2025-05-15 00:26:13', '2025-05-15 00:30:25'),
(54, 'App\\Models\\User', 10, 'auth_token', 'ffa52d2f6aecea217c4c91563023e0dac52a65d55e0f7d1fa397c5b0f0cce2b1', '[\"*\"]', '2025-05-15 00:38:37', NULL, '2025-05-15 00:30:54', '2025-05-15 00:38:37'),
(55, 'App\\Models\\User', 4, 'auth_token', 'aa0f6323ad68420c57a0bade8d06a7b54cd8093a0e07099bf29ffd576e9ed719', '[\"*\"]', '2025-05-15 00:42:43', NULL, '2025-05-15 00:38:47', '2025-05-15 00:42:43'),
(56, 'App\\Models\\User', 5, 'auth_token', '06488b9b38a8122359ad91f3a98798d6d0e9cf45febb422834e260e8e20eba3d', '[\"*\"]', '2025-05-15 01:00:17', NULL, '2025-05-15 00:42:55', '2025-05-15 01:00:17'),
(57, 'App\\Models\\User', 4, 'auth_token', '0119810ce24dfa96fd358e0204c4c95085e2403d312bb9e3e5945719495b378c', '[\"*\"]', '2025-05-15 01:14:23', NULL, '2025-05-15 01:01:09', '2025-05-15 01:14:23'),
(58, 'App\\Models\\User', 4, 'auth_token', 'c801f4ce0175411dd63eb6a591d5184ad8c4bdacdd88da277f63f17d9a26fa69', '[\"*\"]', '2025-05-15 01:18:40', NULL, '2025-05-15 01:14:31', '2025-05-15 01:18:40'),
(59, 'App\\Models\\User', 4, 'auth_token', 'b6749efe63bb6bb918e920459ce79ede17677230ea6f8a10dd1290a49ae4ff91', '[\"*\"]', '2025-05-15 01:36:30', NULL, '2025-05-15 01:18:47', '2025-05-15 01:36:30'),
(60, 'App\\Models\\User', 4, 'auth_token', 'd2abf7e64b497688acc23c299e5a681d079f9368c13ecc449cce5cd91ea89f31', '[\"*\"]', '2025-05-15 01:38:08', NULL, '2025-05-15 01:36:38', '2025-05-15 01:38:08'),
(61, 'App\\Models\\User', 4, 'auth_token', '290138f8089a9836e3ac58841f3e781d6f6651b3e476b57e815e39c323d066db', '[\"*\"]', '2025-05-15 01:45:31', NULL, '2025-05-15 01:38:16', '2025-05-15 01:45:31'),
(62, 'App\\Models\\User', 4, 'auth_token', 'e2c352a9a21457e06bc283bcffdda816f1ff8febdeb56215ae93a4f26039d38e', '[\"*\"]', '2025-05-15 01:48:58', NULL, '2025-05-15 01:45:38', '2025-05-15 01:48:58'),
(63, 'App\\Models\\User', 4, 'auth_token', '32fd6e9670d92c34bceddde12718f47d371463d5ad105f4cc52b630eae44012c', '[\"*\"]', '2025-05-15 01:54:01', NULL, '2025-05-15 01:49:07', '2025-05-15 01:54:01'),
(65, 'App\\Models\\User', 2, 'auth_token', '7ac12bf0d7c98f40d1714f14d3434282d3b65062320a7cb8a3d8870433814685', '[\"*\"]', '2025-05-15 02:06:24', NULL, '2025-05-15 01:55:07', '2025-05-15 02:06:24'),
(66, 'App\\Models\\User', 2, 'auth_token', 'fb4bd1581165d0ba3c307ab2a3309f8ed5b2ec9e69dd80a75e5ee8b0f71ebd04', '[\"*\"]', '2025-05-15 02:06:47', NULL, '2025-05-15 02:06:32', '2025-05-15 02:06:47'),
(67, 'App\\Models\\User', 4, 'auth_token', '27134c185d6f7b00fa9a639cc12e9a76fb865f7c0ae46d162a60a98ace34d9ce', '[\"*\"]', '2025-05-15 03:05:35', NULL, '2025-05-15 02:52:55', '2025-05-15 03:05:35'),
(68, 'App\\Models\\User', 4, 'auth_token', 'b099831047a05accaf2570fe6b461f56e7421c232d0b3e92f9e1969e1512c5c9', '[\"*\"]', '2025-05-15 03:31:12', NULL, '2025-05-15 03:05:47', '2025-05-15 03:31:12'),
(70, 'App\\Models\\User', 5, 'auth_token', 'f150ee662dc73f316f6df4f942bc94ebee97ba3e1b5644e1a1129e81f35c6a36', '[\"*\"]', '2025-05-15 03:52:26', NULL, '2025-05-15 03:34:05', '2025-05-15 03:52:26'),
(71, 'App\\Models\\User', 5, 'auth_token', '4942cfe14346472639f90f904f409c55ac3683366b5a80840a00ca266cfba2cb', '[\"*\"]', '2025-05-15 04:06:11', NULL, '2025-05-15 03:52:42', '2025-05-15 04:06:11'),
(73, 'App\\Models\\User', 2, 'auth_token', '577d5286eba234ad5025ae90b7ffbd30e3ef2588c6bfd7efe4f94a50bed4c8f3', '[\"*\"]', '2025-05-15 04:11:29', NULL, '2025-05-15 04:07:40', '2025-05-15 04:11:29'),
(74, 'App\\Models\\User', 2, 'auth_token', '5419aed4fc5fc45f29374d603ac523f603cebc119f017b405a648e53e8f7b10f', '[\"*\"]', NULL, NULL, '2025-05-15 04:11:50', '2025-05-15 04:11:50'),
(75, 'App\\Models\\User', 2, 'auth_token', 'c90b1b7b3794ace834d879eb39b375158c687f4ee723b2803ccb0ead13bc8a2d', '[\"*\"]', '2025-05-15 04:24:20', NULL, '2025-05-15 04:15:40', '2025-05-15 04:24:20'),
(76, 'App\\Models\\User', 2, 'auth_token', 'a89532811263ce0f3bbbc0b5c12ee945912275e6c91086e59d434d9b3da03f14', '[\"*\"]', '2025-05-15 04:32:15', NULL, '2025-05-15 04:24:34', '2025-05-15 04:32:15'),
(77, 'App\\Models\\User', 2, 'auth_token', '0c50c78b9d4b5e645d13d09969d47b533766feadeaab67e8b11fa138038282ba', '[\"*\"]', '2025-05-15 04:47:28', NULL, '2025-05-15 04:32:24', '2025-05-15 04:47:28'),
(81, 'App\\Models\\User', 4, 'auth_token', '7c6b44867078bdaf6c95fe0141c1836a5578d7e0ce927b0aab05d4447ada8750', '[\"*\"]', '2025-05-15 05:08:20', NULL, '2025-05-15 04:55:55', '2025-05-15 05:08:20'),
(82, 'App\\Models\\User', 4, 'auth_token', 'a21404acca4ee71ddae45ba4906c3fcb50af4dad9ee94dc5aa0a7df0fbaad75c', '[\"*\"]', '2025-05-15 05:16:39', NULL, '2025-05-15 05:08:30', '2025-05-15 05:16:39'),
(83, 'App\\Models\\User', 4, 'auth_token', '2a3c67fb709bb2439913e998c4870a88be1091cbfd40f7d839ec113b2ce11473', '[\"*\"]', '2025-05-15 05:22:20', NULL, '2025-05-15 05:16:56', '2025-05-15 05:22:20'),
(84, 'App\\Models\\User', 5, 'auth_token', 'ca9b2ed40fe225849cd31977982dc6e7cbc9085e5e594f88048c17c70521227e', '[\"*\"]', '2025-05-15 05:30:57', NULL, '2025-05-15 05:22:28', '2025-05-15 05:30:57'),
(85, 'App\\Models\\User', 4, 'auth_token', 'e257598f8be5b1c69abad2648c0dbed0a074e448fb827f4d03f7cd412a2cb636', '[\"*\"]', '2025-05-15 05:36:00', NULL, '2025-05-15 05:31:06', '2025-05-15 05:36:00'),
(86, 'App\\Models\\User', 4, 'auth_token', 'c249261b868cbce014ffab84a0493ee836c847dccb2a400dd7ae00c836be5dab', '[\"*\"]', '2025-05-15 05:40:08', NULL, '2025-05-15 05:36:09', '2025-05-15 05:40:08'),
(87, 'App\\Models\\User', 4, 'auth_token', 'd16eb05a58daccc9b4321097f09387e173a8ac5b5755d94b2822028a3a323bb7', '[\"*\"]', '2025-05-15 05:52:54', NULL, '2025-05-15 05:40:15', '2025-05-15 05:52:54'),
(88, 'App\\Models\\User', 4, 'auth_token', '58a24d00d481269bbf1540a1c15e27799441504841eccbc338a68dad6d36a944', '[\"*\"]', '2025-05-15 06:06:36', NULL, '2025-05-15 05:53:01', '2025-05-15 06:06:36'),
(89, 'App\\Models\\User', 4, 'auth_token', '23ee88c5d13e2c7c457b493ac815ab17dc2bd992f9e1aa3ac3a99fab13ecbe86', '[\"*\"]', '2025-05-15 06:08:14', NULL, '2025-05-15 06:06:47', '2025-05-15 06:08:14'),
(90, 'App\\Models\\User', 4, 'auth_token', '74284b7394ea23cca679f76af22754ea971223e4e3fa18ddf99416913a298d80', '[\"*\"]', '2025-05-15 06:30:11', NULL, '2025-05-15 06:08:21', '2025-05-15 06:30:11'),
(91, 'App\\Models\\User', 4, 'auth_token', '654b61e7fe7aac836bc16b6e00ea0efb5db153ea0f025070c234333506c5da89', '[\"*\"]', '2025-05-15 06:30:28', NULL, '2025-05-15 06:30:19', '2025-05-15 06:30:28'),
(93, 'App\\Models\\User', 14, 'auth_token', '6c4ad3fd07d99f1fea380075b8866440a9c306c17d7523af0c523be9f4f545c7', '[\"*\"]', '2025-05-15 06:56:35', NULL, '2025-05-15 06:49:52', '2025-05-15 06:56:35'),
(94, 'App\\Models\\User', 4, 'auth_token', '0e4debd2bfb720a1bb36e20714f0b64e31fc0440c11ae8e3e17c48714a901f49', '[\"*\"]', '2025-05-15 07:04:47', NULL, '2025-05-15 06:58:05', '2025-05-15 07:04:47'),
(95, 'App\\Models\\User', 4, 'auth_token', '29faecdbbe33f83b6d4d5a26a6f67772634f0a4e6948471bc2eb653bf39ba037', '[\"*\"]', '2025-05-15 07:05:19', NULL, '2025-05-15 07:04:54', '2025-05-15 07:05:19'),
(97, 'App\\Models\\User', 16, 'auth_token', '94af924fb1f9ba3d872c1371f11f3f889c16c3a6313abb3868b2161804740cb9', '[\"*\"]', '2025-05-15 07:18:04', NULL, '2025-05-15 07:08:51', '2025-05-15 07:18:04'),
(98, 'App\\Models\\User', 4, 'auth_token', 'a529dcffba14770dcabeb6ce44942e3c440da31ebf3034ba757078905afd32c9', '[\"*\"]', '2025-05-15 07:19:22', NULL, '2025-05-15 07:18:11', '2025-05-15 07:19:22'),
(99, 'App\\Models\\User', 4, 'auth_token', '1c7878a6f0b7e06a739569dee986d4f434de06076f1217b4c6b59a7dd767ff20', '[\"*\"]', '2025-05-15 07:33:00', NULL, '2025-05-15 07:19:31', '2025-05-15 07:33:00'),
(107, 'App\\Models\\User', 19, 'auth_token', '8af399ea5a41c8784f2b5464a2c37caf3b58a7e0b753ddebb098973e3abd2aca', '[\"*\"]', '2025-05-15 07:55:20', NULL, '2025-05-15 07:53:43', '2025-05-15 07:55:20'),
(108, 'App\\Models\\User', 2, 'auth_token', 'fdc0ee651518fe71b4f9593e988f7ba5588403e874bf9256e7348c219dfb1901', '[\"*\"]', '2025-05-15 07:57:56', NULL, '2025-05-15 07:55:32', '2025-05-15 07:57:56');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE IF NOT EXISTS `reservations` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `status` enum('pending','confirmed','ongoing','canceled','completed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `contract_url` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delivery_option` tinyint(1) NOT NULL DEFAULT '0',
  `client_id` bigint UNSIGNED NOT NULL,
  `partner_id` bigint UNSIGNED NOT NULL,
  `listing_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reservations_client_id_foreign` (`client_id`),
  KEY `reservations_partner_id_foreign` (`partner_id`),
  KEY `reservations_listing_id_foreign` (`listing_id`)
<<<<<<< HEAD
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
=======
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
>>>>>>> 5a5fa96c6c50d1325a5f8e1488529e1b2def7ba2

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `start_date`, `end_date`, `status`, `contract_url`, `delivery_option`, `client_id`, `partner_id`, `listing_id`, `created_at`, `updated_at`) VALUES
(10, '2025-05-29 02:16:56', '2025-06-02 02:16:56', 'canceled', NULL, 0, 2, 5, 5, '2025-05-14 02:16:56', '2025-05-14 02:16:56'),
(9, '2025-04-30 02:16:56', '2025-05-05 02:16:56', 'completed', NULL, 0, 2, 4, 4, '2025-05-14 02:16:56', '2025-05-14 02:16:56'),
(8, '2025-05-12 02:16:56', '2025-05-19 02:16:56', 'ongoing', NULL, 0, 2, 4, 3, '2025-05-14 02:16:56', '2025-05-14 02:16:56'),
(7, '2025-05-24 02:16:56', '2025-05-25 02:16:56', 'confirmed', NULL, 0, 2, 3, 2, '2025-05-14 02:16:56', '2025-05-14 02:16:56'),
(6, '2025-05-24 02:16:56', '2025-05-27 02:16:56', 'canceled', NULL, 1, 2, 3, 1, '2025-05-14 02:16:56', '2025-05-14 23:52:53'),
(11, '2025-05-13 23:00:00', '2025-05-16 23:00:00', 'confirmed', NULL, 0, 2, 3, 2, '2025-05-14 17:14:59', '2025-05-14 23:49:59'),
(12, '2025-05-14 23:00:00', '2025-05-22 23:00:00', 'confirmed', NULL, 0, 7, 4, 3, '2025-05-14 17:28:25', '2025-05-14 23:45:35'),
(13, '2025-05-14 23:00:00', '2025-05-16 23:00:00', 'confirmed', NULL, 0, 2, 4, 3, '2025-05-14 17:45:22', '2025-05-14 23:45:23'),
(14, '2025-05-14 23:00:00', '2025-05-16 23:00:00', 'confirmed', NULL, 0, 2, 3, 2, '2025-05-14 17:54:53', '2025-05-14 23:49:03'),
(15, '2025-05-15 23:00:00', '2025-05-23 23:00:00', 'canceled', NULL, 0, 4, 3, 1, '2025-05-15 00:02:05', '2025-05-15 00:03:31'),
(16, '2025-05-15 23:00:00', '2025-05-23 23:00:00', 'confirmed', NULL, 0, 4, 5, 6, '2025-05-15 00:19:00', '2025-05-15 00:19:26'),
(17, '2025-06-10 23:00:00', '2025-06-27 23:00:00', 'confirmed', NULL, 0, 10, 5, 6, '2025-05-15 00:32:41', '2025-05-15 07:37:09'),
(18, '2025-05-17 23:00:00', '2025-05-22 23:00:00', 'pending', NULL, 0, 2, 4, 8, '2025-05-15 01:56:33', '2025-05-15 01:56:33'),
(19, '2025-05-17 23:00:00', '2025-05-18 23:00:00', 'pending', NULL, 0, 2, 5, 11, '2025-05-15 04:18:16', '2025-05-15 04:18:16'),
(20, '2025-05-05 06:37:26', '2025-05-10 06:37:26', 'completed', NULL, 0, 1, 2, 13, '2025-04-30 06:37:26', '2025-05-10 06:37:26'),
(21, '2025-05-05 06:47:19', '2025-05-10 06:47:19', 'completed', NULL, 0, 14, 13, 19, '2025-05-15 06:47:19', '2025-05-15 06:47:19'),
(22, '2025-05-16 23:00:00', '2025-05-17 23:00:00', 'canceled', NULL, 0, 4, 5, 12, '2025-05-15 07:05:19', '2025-05-15 07:35:55'),
(23, '2025-05-05 07:07:16', '2025-05-10 07:07:16', 'completed', NULL, 0, 16, 15, 21, '2025-05-15 07:07:16', '2025-05-15 07:07:16'),
(24, '2025-05-14 23:00:00', '2025-06-05 23:00:00', 'confirmed', NULL, 0, 4, 5, 12, '2025-05-15 07:33:55', '2025-05-15 07:35:47'),
(25, '2025-05-23 23:00:00', '2025-05-27 23:00:00', 'confirmed', NULL, 0, 2, 17, 23, '2025-05-15 07:47:55', '2025-05-15 07:48:54'),
(26, '2025-05-05 07:51:25', '2025-05-10 07:51:25', 'completed', NULL, 0, 19, 18, 24, '2025-05-15 07:51:25', '2025-05-15 07:51:25');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `rating` int NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `is_visible` tinyint(1) NOT NULL DEFAULT '1',
  `type` enum('forObject','forClient','forPartner') COLLATE utf8mb4_unicode_ci NOT NULL,
  `reviewer_id` bigint UNSIGNED NOT NULL,
  `reviewee_id` bigint UNSIGNED NOT NULL,
  `reservation_id` bigint UNSIGNED DEFAULT NULL,
  `listing_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reviews_reviewer_id_foreign` (`reviewer_id`),
  KEY `reviews_reviewee_id_foreign` (`reviewee_id`),
  KEY `reviews_reservation_id_foreign` (`reservation_id`),
  KEY `reviews_listing_id_foreign` (`listing_id`)
<<<<<<< HEAD
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `rating`, `comment`, `is_visible`, `type`, `reviewer_id`, `reviewee_id`, `reservation_id`, `listing_id`, `created_at`, `updated_at`) VALUES
(1, 4, NULL, 1, 'forClient', 13, 14, 21, NULL, '2025-05-15 06:48:47', '2025-05-15 06:48:47'),
(2, 5, NULL, 1, 'forClient', 15, 16, 23, NULL, '2025-05-15 07:08:28', '2025-05-15 07:08:28'),
(3, 3, NULL, 1, 'forClient', 18, 19, 26, NULL, '2025-05-15 07:52:47', '2025-05-15 07:52:47');
=======
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
>>>>>>> 5a5fa96c6c50d1325a5f8e1488529e1b2def7ba2

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `role` enum('client','partner') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','archived') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `avatar_url` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `join_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `avg_rating_as_client` decimal(3,2) NOT NULL DEFAULT '0.00',
  `avg_rating_as_partner` decimal(3,2) NOT NULL DEFAULT '0.00',
  `review_count_as_client` int NOT NULL DEFAULT '0',
  `review_count_as_partner` int NOT NULL DEFAULT '0',
  `report_count` int NOT NULL DEFAULT '0',
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `city_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `signalee_count` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_city_id_foreign` (`city_id`)
<<<<<<< HEAD
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
=======
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
>>>>>>> 5a5fa96c6c50d1325a5f8e1488529e1b2def7ba2

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `email`, `phone_number`, `address`, `role`, `status`, `avatar_url`, `join_date`, `avg_rating_as_client`, `avg_rating_as_partner`, `review_count_as_client`, `review_count_as_partner`, `report_count`, `longitude`, `latitude`, `city_id`, `created_at`, `updated_at`, `signalee_count`) VALUES
(1, 'issam', 'dixter', '$2y$12$H5wuwm/NXQvYbi1JghP6p.rSpckTBWHNaJkjMRrwoLpTMK2aPI5hS', 'issam@gmail.com', '05555555555', 'sssssssssss', 'client', 'active', NULL, '2025-05-14 01:46:43', 0.00, 0.00, 0, 0, 0, NULL, NULL, 5, '2025-05-14 00:46:43', '2025-05-14 00:46:43', 0),
(2, 'issamee', 'issam', '$2y$12$T8w62tYSV/CI8mPsIFvYMeDkXxjlfLOVG3/dGW96netfxp0pY8tjm', 'issam@example.com', NULL, NULL, 'partner', 'active', NULL, '2025-05-14 02:57:33', 0.00, 0.00, 0, 0, 0, NULL, NULL, 5, '2025-05-14 01:57:33', '2025-05-14 22:55:28', 0),
(3, 'Partner 1', 'partner1', '$2y$12$kmtSgIoAqKmW4pi/u.txIe7hUJOmCsu/CwaA9iYa6Kp4FjiGta4ei', 'partner1@example.com', NULL, NULL, 'partner', 'active', NULL, '2025-05-14 03:00:13', 0.00, 0.00, 0, 0, 0, NULL, NULL, 2, '2025-05-14 02:00:13', '2025-05-14 02:00:13', 0),
(4, 'Partner 22', 'partner2', '$2y$12$ZUUlpNL6b99FHTP3EZOLTe9WhvI3KVmpllva8konqp3P7SnkTaP7y', 'partner2@example.com', NULL, NULL, 'partner', 'active', NULL, '2025-05-14 03:00:13', 0.00, 0.00, 0, 0, 0, NULL, NULL, 1, '2025-05-14 02:00:13', '2025-05-15 01:54:20', 0),
(5, 'Partner 3', 'partner3', '$2y$12$qyZ31Enm2JrAoFjN3IwQzOx79Mbug39DdxVejIzlsfiM.6X/tRV22', 'partner3@example.com', NULL, NULL, 'partner', 'active', NULL, '2025-05-14 03:00:13', 0.00, 0.00, 0, 0, 0, NULL, NULL, 7, '2025-05-14 02:00:13', '2025-05-15 07:50:42', 2),
(6, 'Nassimee', 'elkaddaoui2800', '$2y$12$tueqfjFF1gLfM1lKnSrIFO/QhXJ1BAE4mZhvQxzlbEI.tXxRDMHIa', 'nassimelkaddaoui188@gmail.com', '0688010342', 'Rue Rue abdellah chefchaouni Bp 324 Tetouan', 'client', 'active', NULL, '2025-05-14 18:23:48', 0.00, 0.00, 0, 0, 0, NULL, NULL, 30, '2025-05-14 17:23:48', '2025-05-14 17:23:48', 0),
(7, 'Nassimaa', 'aaaaaaaa', '$2y$12$yFWKz1wP/2ojbWT/PcpjJ.ybycqYrZkZSC4nGZmycj3aS/AnoLqwy', 'nassimelkaddaoui18a@gmail.com', '0688010342', 'Rue Rue abdellah chefchaouni Bp 324 Tetouan', 'client', 'active', NULL, '2025-05-14 18:28:02', 0.00, 0.00, 0, 0, 0, NULL, NULL, 30, '2025-05-14 17:28:02', '2025-05-14 17:28:02', 0),
(8, 'kkkk', 'kkkk', '$2y$12$d26sZ9s7Kg9C6ukqGEN0FuiOzftFTdHjF3vhUr8eq.2z/HEUgmqbu', 'kkkk@gmail.com', '000000000', 'ddd', 'client', 'active', NULL, '2025-05-14 18:52:10', 0.00, 0.00, 0, 0, 0, NULL, NULL, 3, '2025-05-14 17:52:10', '2025-05-14 17:52:10', 0),
(9, 'aaaaa', 'aaaaa', '$2y$12$YkL9PN9gsCt.aCcfIVIkdu8IjG75VunEIUBdcwMBBs1Zaq9cUqzde', 'aaaaa@g.com', '00000000', 'aaaa', 'client', 'active', NULL, '2025-05-14 18:55:36', 0.00, 0.00, 0, 0, 0, NULL, NULL, 19, '2025-05-14 17:55:36', '2025-05-14 17:55:36', 0),
(10, 'hero', 'hero', '$2y$12$JTLIoUAJmHI/yNqXpukcS.KpbCzTvIvHMMe9qNm4j7Q7RjGTmcfSi', 'hero@gmail.com', '66666666666', '555555', 'partner', 'active', NULL, '2025-05-15 01:30:54', 0.00, 0.00, 0, 0, 0, NULL, NULL, 9, '2025-05-15 00:30:54', '2025-05-15 00:32:51', 0),
(11, 'Test Partner', 'testpartneryhA6PU', '$2y$12$foDXV.qV8.rwgh8ZijcStelL0FhyIlQ1CECstfGoGMgonilF8GXwe', 'partner.yhA6PU@test.com', NULL, NULL, 'partner', 'active', NULL, '2025-05-15 07:44:55', 0.00, 0.00, 0, 0, 0, NULL, NULL, 1, '2025-05-15 06:44:55', '2025-05-15 06:44:55', 0),
(12, 'Test Client', 'testclientyhA6PU', '$2y$12$4Sg2s.se2n.aqtLU45QQCO1nCmoG2q9pbyC6xfNt8qqbrUj2YQdum', 'client.yhA6PU@test.com', NULL, NULL, 'client', 'active', NULL, '2025-05-15 07:44:55', 0.00, 0.00, 0, 0, 0, NULL, NULL, 1, '2025-05-15 06:44:55', '2025-05-15 06:44:55', 0),
(13, 'Test Partner', 'testpartnercZ9muU', '$2y$12$5LC/khdqFZ.G4T6XG0fzIufbYwpX5XbOfAPfaoV.x13bxsmzcZCFe', 'partner.cZ9muU@test.com', NULL, NULL, 'partner', 'active', NULL, '2025-05-15 07:47:18', 0.00, 0.00, 0, 0, 0, NULL, NULL, 1, '2025-05-15 06:47:18', '2025-05-15 06:47:18', 0),
(14, 'Test Client', 'testclientcZ9muU', '$2y$12$9Ocd4LAB1iEKsqa.D6goS.uN/aYtfM0uvzweoTQtw4Ac68xKiJv2y', 'client.cZ9muU@test.com', NULL, NULL, 'partner', 'active', NULL, '2025-05-15 07:47:19', 4.00, 0.00, 1, 0, 0, NULL, NULL, 1, '2025-05-15 06:47:19', '2025-05-15 06:51:01', 0),
(15, 'Test Partner', 'testpartnerAqltxh', '$2y$12$6jcTBhHBJ4nXR5Vw5OdSCuRL.qPnlFw7SKjulQLbEpRgCMlBRX4GC', 'partner.Aqltxh@test.com', NULL, NULL, 'partner', 'active', NULL, '2025-05-15 08:07:15', 0.00, 0.00, 0, 0, 0, NULL, NULL, 1, '2025-05-15 07:07:15', '2025-05-15 07:07:15', 0),
(16, 'Test Client', 'testclientAqltxh', '$2y$12$L1HyLQk/REi2uanWXpgU6ejc9icnRpkQjl0QTBs2k4G.ATuef/H2y', 'client.Aqltxh@test.com', NULL, NULL, 'client', 'active', NULL, '2025-05-15 08:07:16', 5.00, 0.00, 1, 0, 0, NULL, NULL, 1, '2025-05-15 07:07:16', '2025-05-15 07:08:28', 0),
(17, 'text', 'test', '$2y$12$HNo9.bfh03K3Wh21DJHQBeuwbwnCaBAGCJDzNuedImE1xbCd2kQ9a', 'test@gmail.com', '0666666666', 'Rue Rue abdellah chefchaouni Bp 324 Tetouan', 'partner', 'active', NULL, '2025-05-15 08:41:30', 0.00, 0.00, 0, 0, 0, NULL, NULL, 8, '2025-05-15 07:41:30', '2025-05-15 07:43:55', 0),
(18, 'Test Partner', 'testpartnerLmQnVB', '$2y$12$JatV7OLQj2LrgN5KcoXZ3O8LHNx7MReiLBkQJrHPOIdbXZJQXtbiu', 'partner.LmQnVB@test.com', NULL, NULL, 'partner', 'active', NULL, '2025-05-15 08:51:25', 0.00, 0.00, 0, 0, 0, NULL, NULL, 1, '2025-05-15 07:51:25', '2025-05-15 07:51:25', 0),
(19, 'Test Client', 'testclientLmQnVB', '$2y$12$DUl8zDq8Twd4FPlsSjVa7eR4rrm7OzmnZ1tw8VG6yHawjtl1Pyz8K', 'client.LmQnVB@test.com', NULL, NULL, 'client', 'active', NULL, '2025-05-15 08:51:25', 3.00, 0.00, 1, 0, 0, NULL, NULL, 1, '2025-05-15 07:51:25', '2025-05-15 07:52:47', 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `liked_listings`
--
ALTER TABLE `liked_listings`
  ADD CONSTRAINT `liked_listings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `liked_listings_ibfk_2` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
<<<<<<< HEAD
=======
-- Cities Table
CREATE TABLE cities (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(191) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);


-- Categories Table
CREATE TABLE categories (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(191) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);

-- Users Table
CREATE TABLE users (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(191) NOT NULL,
    username VARCHAR(191) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(191) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NULL,
    address TEXT NULL,
    role ENUM('client', 'partner') NOT NULL,
    avatar_url VARCHAR(512) NULL,
    join_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    avg_rating_as_client DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    avg_rating_as_partner DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    review_count_as_client INT NOT NULL DEFAULT 0,
    review_count_as_partner INT NOT NULL DEFAULT 0,
    report_count INT NOT NULL DEFAULT 0,
    longitude DOUBLE NULL,
    latitude DOUBLE NULL,
    city_id BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (city_id) REFERENCES cities(id)
);

-- Admins Table
CREATE TABLE admins (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(191) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(191) UNIQUE NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);

-- Listings Table
CREATE TABLE listings (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    price_per_day DECIMAL(10,2) NOT NULL,
    status ENUM('active', 'archived', 'inactive') NOT NULL DEFAULT 'active',
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    premium_start_date TIMESTAMP NULL,
    premium_end_date TIMESTAMP NULL,
    longitude DOUBLE NULL,
    latitude DOUBLE NULL,
    avg_rating DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    review_count INT NOT NULL DEFAULT 0,
    delivery_option BOOLEAN NOT NULL DEFAULT FALSE, 
    priority INT NOT NULL DEFAULT 4,
    category_id BIGINT UNSIGNED NULL,
    city_id BIGINT UNSIGNED NULL,
    partner_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (city_id) REFERENCES cities(id),
    FOREIGN KEY (partner_id) REFERENCES users(id)
);

-- Reservations Table
CREATE TABLE reservations (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NULL DEFAULT NULL,
    status ENUM('pending', 'confirmed', 'ongoing', 'canceled', 'completed') NOT NULL DEFAULT 'pending',
    contract_url VARCHAR(512) NULL,
    delivery_option BOOLEAN NOT NULL DEFAULT FALSE,
    client_id BIGINT UNSIGNED NOT NULL,
    partner_id BIGINT UNSIGNED NOT NULL,
    listing_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (client_id) REFERENCES users(id),
    FOREIGN KEY (partner_id) REFERENCES users(id),
    FOREIGN KEY (listing_id) REFERENCES listings(id)
);

-- Availabilities Table
CREATE TABLE availabilities (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    listing_id BIGINT UNSIGNED NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    UNIQUE KEY (listing_id, start_date, end_date),
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

-- Images Table
CREATE TABLE images (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(512) NOT NULL,
    listing_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

-- Reviews Table
CREATE TABLE reviews (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NULL,
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    type ENUM('forObject', 'forClient', 'forPartner') NOT NULL,
    reviewer_id BIGINT UNSIGNED NOT NULL,
    reviewee_id BIGINT UNSIGNED NULL,
    reservation_id BIGINT UNSIGNED NULL,
    listing_id BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (reviewer_id) REFERENCES users(id),
    FOREIGN KEY (reviewee_id) REFERENCES users(id),
    FOREIGN KEY (reservation_id) REFERENCES reservations(id),
    FOREIGN KEY (listing_id) REFERENCES listings(id)
);

-- Notifications Table
CREATE TABLE notifications (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    type ENUM('reservation', 'review', 'reminder', 'system') NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Payments Table
CREATE TABLE payments (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    amount DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
    partner_id BIGINT UNSIGNED NOT NULL,
    listing_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (partner_id) REFERENCES users(id),
    FOREIGN KEY (listing_id) REFERENCES listings(id)
);
>>>>>>> 5a5fa96c6c50d1325a5f8e1488529e1b2def7ba2
