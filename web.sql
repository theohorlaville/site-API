-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : Dim 18 avr. 2021 à 19:17
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `web`
--

-- --------------------------------------------------------

--
-- Structure de la table `artistes`
--

DROP TABLE IF EXISTS `artistes`;
CREATE TABLE IF NOT EXISTS `artistes` (
  `id_Art` int(11) NOT NULL AUTO_INCREMENT,
  `artiste` varchar(40) NOT NULL,
  PRIMARY KEY (`id_Art`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `artistes`
--

INSERT INTO `artistes` (`id_Art`, `artiste`) VALUES
(1, 'Jul'),
(2, 'Metallica'),
(3, 'ibrahim maalouf'),
(4, 'Red hot chili peppers'),
(5, 'David Guetta'),
(6, 'Michael Jackson'),
(7, 'Dua lipa'),
(8, 'Stromae'),
(9, 'Sia');

-- --------------------------------------------------------

--
-- Structure de la table `chansons`
--

DROP TABLE IF EXISTS `chansons`;
CREATE TABLE IF NOT EXISTS `chansons` (
  `id_Ch` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `art_id` int(11) NOT NULL,
  `gen_id` int(11) NOT NULL,
  PRIMARY KEY (`id_Ch`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `chansons`
--

INSERT INTO `chansons` (`id_Ch`, `titre`, `art_id`, `gen_id`) VALUES
(1, 'Under the bridge', 4, 1),
(2, 'Ma jolie', 1, 4),
(3, 'Nothing Else Matters', 2, 7),
(4, 'Papaoutai', 8, 5),
(5, '40 Melodies', 3, 2),
(6, 'Titanium', 5, 3),
(7, 'Smooth Criminal', 6, 5),
(8, 'Billie Jean', 6, 5),
(9, 'Physical', 7, 5),
(10, 'Chandelier', 9, 5);

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

DROP TABLE IF EXISTS `commentaires`;
CREATE TABLE IF NOT EXISTS `commentaires` (
  `id_Com` int(11) NOT NULL AUTO_INCREMENT,
  `com` varchar(255) NOT NULL,
  `ch_id` int(11) NOT NULL,
  `uti_id` int(11) NOT NULL,
  PRIMARY KEY (`id_Com`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commentaires`
--

INSERT INTO `commentaires` (`id_Com`, `com`, `ch_id`, `uti_id`) VALUES
(1, 'c la plus belle chanson ke g jamais écouter ! <3', 2, 2),
(2, 'J\'aime pas...\r\n\r\nCordon bleu\r\nTotosh', 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `favoris`
--

DROP TABLE IF EXISTS `favoris`;
CREATE TABLE IF NOT EXISTS `favoris` (
  `uti_id` int(11) NOT NULL,
  `ch_id` int(11) NOT NULL,
  PRIMARY KEY (`uti_id`,`ch_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `favoris`
--

INSERT INTO `favoris` (`uti_id`, `ch_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 4),
(3, 1),
(3, 7);

-- --------------------------------------------------------

--
-- Structure de la table `genres`
--

DROP TABLE IF EXISTS `genres`;
CREATE TABLE IF NOT EXISTS `genres` (
  `id_G` int(11) NOT NULL AUTO_INCREMENT,
  `nom_Gen` varchar(50) NOT NULL,
  PRIMARY KEY (`id_G`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `genres`
--

INSERT INTO `genres` (`id_G`, `nom_Gen`) VALUES
(1, 'Rock'),
(2, 'Jazz'),
(3, 'Electro'),
(4, 'Rap'),
(5, 'Pop'),
(6, 'Punk'),
(7, 'Metal'),
(8, 'Classique');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id_Uti` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(25) NOT NULL,
  `mail` varchar(40) NOT NULL,
  `mdp` text NOT NULL,
  `photo_num` int(11) NOT NULL,
  PRIMARY KEY (`id_Uti`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id_Uti`, `pseudo`, `mail`, `mdp`, `photo_num`) VALUES
(1, 'totosh', 'theo.horlaville76@orange.fr', 'totosh76', 4),
(2, 'JoLeClodo', 'jordan.roberty@outlook.fr', 'jojolerigolo', 1),
(3, 'LisaDu06', 'lisa@pottier.eu', 'HehoLa', 2),
(4, 'FranckyLeRestaurant', 'frankylebest@gmail.com', 'avecsonpersoneldemerde', 3);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
