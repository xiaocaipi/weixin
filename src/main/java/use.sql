CREATE TABLE `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `media_id` varchar(255) DEFAULT NULL,
  `parent_media_id` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `local_path` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `updated_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

