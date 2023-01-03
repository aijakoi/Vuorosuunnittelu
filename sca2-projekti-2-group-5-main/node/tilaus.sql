SELECT * FROM asiakas.asiakas;CREATE TABLE `asiakas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nimi` varchar(45) DEFAULT NULL,
  `kayntiosoite` varchar(45) DEFAULT NULL,
  `postinumero` varchar(45) DEFAULT NULL,
  `postitoimipaikka` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

CREATE TABLE `tilaus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tilausnumero` varchar(45) DEFAULT NULL,
  `tilauspvm` datetime DEFAULT NULL,
  `toimituspvm` datetime DEFAULT NULL,
  `asiakasid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tilaus_asiakas_idx` (`asiakasid`),
  CONSTRAINT `fk_tilaus_asiakas` FOREIGN KEY (`asiakasid`) REFERENCES `asiakas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

CREATE TABLE `tilausrivi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tilausid` int(11) DEFAULT NULL,
  `tuote` varchar(45) DEFAULT NULL,
  `maara` int(11) DEFAULT NULL,
  `yksikko` varchar(45) DEFAULT NULL,
  `huomautus` varchar(500) DEFAULT NULL,
  `yksikkohinta` double DEFAULT NULL,
  `veroprosentti` double DEFAULT NULL,
  `toimitettu` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tilaus_tilausrivi_idx` (`tilausid`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
