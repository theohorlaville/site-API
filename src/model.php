<?php
// Relier la base de données
include("connexion.php");
$link->query("SET NAMES utf8");
// Requete SQL attibuer à la variable

function getArtiste($dbb){
    $rs = $dbb->query("SELECT * FROM artistes");
    if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rows = array();
    while($r = $rs->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $r;
    }
    print json_encode($rows);
}

function getGenre($dbb){
    $rs = $dbb->query("SELECT * FROM genres");
    if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rows = array();
    while($r = $rs->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $r;
    }
    print json_encode($rows);
}

function getChanson($dbb){
    $rs = $dbb->query("SELECT * FROM chansons, genres, artistes WHERE art_id = id_Art AND gen_id = id_G");
    if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rows = array();
    while($r = $rs->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $r;
    }
    print json_encode($rows);
}

function getCom($dbb){
    $rs = $dbb->query("SELECT id_Com, com, ch_id, uti_id, id_Uti, pseudo, id_Ch FROM commentaires, chansons, utilisateurs WHERE ch_id = id_Ch AND uti_id = id_Uti");
    if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rows = array();
    while($r = $rs->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $r;
    }
    print json_encode($rows);
}

function getUti($dbb,$id){
	$rs = $dbb->prepare("SELECT * FROM utilisateurs WHERE id_Uti = ?");
	if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rs->execute(array($id));
    $userinfo = $rs->fetch();
    print json_encode($userinfo['mail']);
}

function addArtiste($dbb, $artiste){
	$rs=$dbb->prepare("INSERT INTO `artistes` (`id_Art`, `artiste`) VALUES (NULL, ?);");
	if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
	$rs->execute(array($artiste));

	
}

function addMusic($dbb, $titre, $artiste, $genre){
	$rs=$dbb->prepare("INSERT INTO `chansons` (`id_Ch`, `titre`, `art_id`, `gen_id`) VALUES (NULL, ?, ,?,?);");
	if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
	$rs->execute(array($titre,$artiste,$genre));
}


/*getArtiste($link);
echo "<br>";
getGenre($link);
echo "<br>";*/
getChanson($link);
echo "<br>";
getCom($link);
echo "<br>";
getUti($link, 1);

$link = null;
?>