CREATE TABLE `todo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `todo` varchar(1024) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(30) NOT NULL,
  `isDone` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `email` (`email`),
  CONSTRAINT `todo_ibfk_1` FOREIGN KEY (`email`) REFERENCES `user` (`email`)
);


CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);
