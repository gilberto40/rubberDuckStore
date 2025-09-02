CREATE TABLE `ducks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `color` varchar(10) NOT NULL,
  `size` varchar(10) NOT NULL,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `deleted` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;