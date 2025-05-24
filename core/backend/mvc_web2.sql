-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 14, 2025 at 03:55 PM
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `availabilities`
--

INSERT INTO `availabilities` (`id`, `listing_id`, `start_date`, `end_date`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-04-14', '2025-07-13', NULL, NULL),
(2, 2, '2025-04-14', '2025-07-13', NULL, NULL),
(3, 3, '2025-04-14', '2025-07-13', NULL, NULL),
(4, 4, '2025-04-14', '2025-07-13', NULL, NULL),
(5, 5, '2025-04-14', '2025-07-13', NULL, NULL),
(6, 6, '2025-04-14', '2025-07-13', NULL, NULL);

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
('laravel_cache_cities', 'O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:40:{i:0;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:6;s:4:\"name\";s:6:\"Agadir\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:6;s:4:\"name\";s:6:\"Agadir\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:1;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:26;s:4:\"name\";s:6:\"Agadir\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:26;s:4:\"name\";s:6:\"Agadir\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:2;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:15;s:4:\"name\";s:11:\"Beni Mellal\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:15;s:4:\"name\";s:11:\"Beni Mellal\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:3;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:35;s:4:\"name\";s:11:\"Beni Mellal\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:35;s:4:\"name\";s:11:\"Beni Mellal\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:4;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:1;s:4:\"name\";s:10:\"Casablanca\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:1;s:4:\"name\";s:10:\"Casablanca\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:5;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:21;s:4:\"name\";s:10:\"Casablanca\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:21;s:4:\"name\";s:10:\"Casablanca\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:6;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:34;s:4:\"name\";s:9:\"El Jadida\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:34;s:4:\"name\";s:9:\"El Jadida\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:7;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:14;s:4:\"name\";s:9:\"El Jadida\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:14;s:4:\"name\";s:9:\"El Jadida\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:8;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:24;s:4:\"name\";s:3:\"Fes\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:24;s:4:\"name\";s:3:\"Fes\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:9;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:4;s:4:\"name\";s:3:\"Fes\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:4;s:4:\"name\";s:3:\"Fes\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:10;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:9;s:4:\"name\";s:7:\"Kenitra\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:9;s:4:\"name\";s:7:\"Kenitra\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:11;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:29;s:4:\"name\";s:7:\"Kenitra\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:29;s:4:\"name\";s:7:\"Kenitra\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:12;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:17;s:4:\"name\";s:9:\"Khouribga\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:17;s:4:\"name\";s:9:\"Khouribga\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:13;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:37;s:4:\"name\";s:9:\"Khouribga\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:37;s:4:\"name\";s:9:\"Khouribga\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:14;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:20;s:4:\"name\";s:13:\"Ksar El Kebir\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:20;s:4:\"name\";s:13:\"Ksar El Kebir\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:15;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:40;s:4:\"name\";s:13:\"Ksar El Kebir\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:40;s:4:\"name\";s:13:\"Ksar El Kebir\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:16;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:19;s:4:\"name\";s:7:\"Larache\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:19;s:4:\"name\";s:7:\"Larache\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:17;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:39;s:4:\"name\";s:7:\"Larache\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:39;s:4:\"name\";s:7:\"Larache\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:18;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:3;s:4:\"name\";s:9:\"Marrakech\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:3;s:4:\"name\";s:9:\"Marrakech\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:19;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:23;s:4:\"name\";s:9:\"Marrakech\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:23;s:4:\"name\";s:9:\"Marrakech\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:20;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:7;s:4:\"name\";s:6:\"Meknes\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:7;s:4:\"name\";s:6:\"Meknes\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:21;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:27;s:4:\"name\";s:6:\"Meknes\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:27;s:4:\"name\";s:6:\"Meknes\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:22;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:13;s:4:\"name\";s:10:\"Mohammedia\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:13;s:4:\"name\";s:10:\"Mohammedia\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:23;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:33;s:4:\"name\";s:10:\"Mohammedia\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:33;s:4:\"name\";s:10:\"Mohammedia\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:24;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:12;s:4:\"name\";s:5:\"Nador\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:12;s:4:\"name\";s:5:\"Nador\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:25;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:32;s:4:\"name\";s:5:\"Nador\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:32;s:4:\"name\";s:5:\"Nador\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:26;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:8;s:4:\"name\";s:5:\"Oujda\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:8;s:4:\"name\";s:5:\"Oujda\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:27;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:28;s:4:\"name\";s:5:\"Oujda\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:28;s:4:\"name\";s:5:\"Oujda\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:28;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:22;s:4:\"name\";s:5:\"Rabat\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:22;s:4:\"name\";s:5:\"Rabat\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:29;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:2;s:4:\"name\";s:5:\"Rabat\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:2;s:4:\"name\";s:5:\"Rabat\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:30;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:11;s:4:\"name\";s:5:\"Salé\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:11;s:4:\"name\";s:5:\"Salé\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:31;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:31;s:4:\"name\";s:5:\"Salé\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:31;s:4:\"name\";s:5:\"Salé\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:32;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:18;s:4:\"name\";s:6:\"Settat\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:18;s:4:\"name\";s:6:\"Settat\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:33;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:38;s:4:\"name\";s:6:\"Settat\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:38;s:4:\"name\";s:6:\"Settat\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:34;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:5;s:4:\"name\";s:7:\"Tangier\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:5;s:4:\"name\";s:7:\"Tangier\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:35;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:25;s:4:\"name\";s:7:\"Tangier\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:25;s:4:\"name\";s:7:\"Tangier\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:36;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:16;s:4:\"name\";s:4:\"Taza\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:16;s:4:\"name\";s:4:\"Taza\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:37;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:36;s:4:\"name\";s:4:\"Taza\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:36;s:4:\"name\";s:4:\"Taza\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:38;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:10;s:4:\"name\";s:7:\"Tetouan\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:10;s:4:\"name\";s:7:\"Tetouan\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:39;O:15:\"App\\Models\\City\":31:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:6:\"cities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:2:{s:2:\"id\";i:30;s:4:\"name\";s:7:\"Tetouan\";}s:11:\"\0*\0original\";a:2:{s:2:\"id\";i:30;s:4:\"name\";s:7:\"Tetouan\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:2:{s:9:\"longitude\";s:6:\"double\";s:8:\"latitude\";s:6:\"double\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:5:{i:0;s:4:\"name\";i:1;s:5:\"state\";i:2;s:7:\"country\";i:3;s:9:\"longitude\";i:4;s:8:\"latitude\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}', 1747239345);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`id`, `title`, `description`, `price_per_day`, `status`, `is_premium`, `premium_start_date`, `premium_end_date`, `priority`, `longitude`, `latitude`, `avg_rating`, `review_count`, `delivery_option`, `category_id`, `city_id`, `partner_id`, `created_at`, `updated_at`) VALUES
(1, 'Tool 0 for Partner 3', 'This is a sample tool created by the seeder', 22.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 1, 10, 3, '2025-05-14 02:00:13', '2025-05-14 02:00:13'),
(2, 'Tool 1 for Partner 3', 'This is a sample tool created by the seeder', 19.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 6, 6, 3, '2025-05-14 02:00:13', '2025-05-14 02:00:13'),
(3, 'Tool 0 for Partner 4', 'This is a sample tool created by the seeder', 47.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 6, 8, 4, '2025-05-14 02:00:13', '2025-05-14 02:00:13'),
(4, 'Tool 1 for Partner 4', 'This is a sample tool created by the seeder', 27.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 6, 7, 4, '2025-05-14 02:00:13', '2025-05-14 02:00:13'),
(5, 'Tool 0 for Partner 5', 'This is a sample tool created by the seeder', 17.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 1, 8, 5, '2025-05-14 02:00:13', '2025-05-14 02:00:13'),
(6, 'Tool 1 for Partner 5', 'This is a sample tool created by the seeder', 29.00, 'active', 0, NULL, NULL, 4, NULL, NULL, 0.00, 0, 0, 3, 6, 5, '2025-05-14 02:00:13', '2025-05-14 02:00:13');

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(16, 'App\\Models\\User', 2, 'auth_token', 'b16a88588dbc6c60c02c891b2ba1484cc79e8ad8dcde329c681f3a00ef2f8ade', '[\"*\"]', '2025-05-14 14:51:41', NULL, '2025-05-14 14:51:37', '2025-05-14 14:51:41');

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `start_date`, `end_date`, `status`, `contract_url`, `delivery_option`, `client_id`, `partner_id`, `listing_id`, `created_at`, `updated_at`) VALUES
(10, '2025-05-29 02:16:56', '2025-06-02 02:16:56', 'canceled', NULL, 0, 2, 5, 5, '2025-05-14 02:16:56', '2025-05-14 02:16:56'),
(9, '2025-04-30 02:16:56', '2025-05-05 02:16:56', 'completed', NULL, 0, 2, 4, 4, '2025-05-14 02:16:56', '2025-05-14 02:16:56'),
(8, '2025-05-12 02:16:56', '2025-05-19 02:16:56', 'ongoing', NULL, 0, 2, 4, 3, '2025-05-14 02:16:56', '2025-05-14 02:16:56'),
(7, '2025-05-24 02:16:56', '2025-05-25 02:16:56', 'confirmed', NULL, 0, 2, 3, 2, '2025-05-14 02:16:56', '2025-05-14 02:16:56'),
(6, '2025-05-24 02:16:56', '2025-05-27 02:16:56', 'pending', NULL, 1, 2, 3, 1, '2025-05-14 02:16:56', '2025-05-14 02:16:56');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_city_id_foreign` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `email`, `phone_number`, `address`, `role`, `avatar_url`, `join_date`, `avg_rating_as_client`, `avg_rating_as_partner`, `review_count_as_client`, `review_count_as_partner`, `report_count`, `longitude`, `latitude`, `city_id`, `created_at`, `updated_at`) VALUES
(1, 'issam', 'dixter', '$2y$12$H5wuwm/NXQvYbi1JghP6p.rSpckTBWHNaJkjMRrwoLpTMK2aPI5hS', 'issam@gmail.com', '05555555555', 'sssssssssss', 'client', NULL, '2025-05-14 01:46:43', 0.00, 0.00, 0, 0, 0, NULL, NULL, 5, '2025-05-14 00:46:43', '2025-05-14 00:46:43'),
(2, 'issam', 'issam', '$2y$12$T8w62tYSV/CI8mPsIFvYMeDkXxjlfLOVG3/dGW96netfxp0pY8tjm', 'issam@example.com', NULL, NULL, 'client', NULL, '2025-05-14 02:57:33', 0.00, 0.00, 0, 0, 0, NULL, NULL, 5, '2025-05-14 01:57:33', '2025-05-14 01:57:33'),
(3, 'Partner 1', 'partner1', '$2y$12$kmtSgIoAqKmW4pi/u.txIe7hUJOmCsu/CwaA9iYa6Kp4FjiGta4ei', 'partner1@example.com', NULL, NULL, 'partner', NULL, '2025-05-14 03:00:13', 0.00, 0.00, 0, 0, 0, NULL, NULL, 2, '2025-05-14 02:00:13', '2025-05-14 02:00:13'),
(4, 'Partner 2', 'partner2', '$2y$12$ZUUlpNL6b99FHTP3EZOLTe9WhvI3KVmpllva8konqp3P7SnkTaP7y', 'partner2@example.com', NULL, NULL, 'partner', NULL, '2025-05-14 03:00:13', 0.00, 0.00, 0, 0, 0, NULL, NULL, 1, '2025-05-14 02:00:13', '2025-05-14 02:00:13'),
(5, 'Partner 3', 'partner3', '$2y$12$qyZ31Enm2JrAoFjN3IwQzOx79Mbug39DdxVejIzlsfiM.6X/tRV22', 'partner3@example.com', NULL, NULL, 'partner', NULL, '2025-05-14 03:00:13', 0.00, 0.00, 0, 0, 0, NULL, NULL, 7, '2025-05-14 02:00:13', '2025-05-14 02:00:13');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
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
