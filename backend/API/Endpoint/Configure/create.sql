-- SQL for setting up database and required tables
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+01:00";
-- Create database and use it for tables
CREATE DATABASE IF NOT EXISTS `u04todo`;
USE `u04todo`;
--
-- Since we checked if database exists we don't
-- need to do it again for tables, database is empty
--
-- Create tables
--
CREATE TABLE `lists` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Lists with users tasks';
--
CREATE TABLE `tasks` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` longtext NOT NULL,
  `description` longtext NOT NULL,
  `done` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `listId` int(10) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `task_list` (`listId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Store task data';
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `userPass` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Store users data';
--
-- Constraints
--
ALTER TABLE `lists`
  ADD CONSTRAINT `list_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `task_list` FOREIGN KEY (`listId`) REFERENCES `lists` (`id`) ON DELETE CASCADE;
