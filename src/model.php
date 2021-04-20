<?php
// Relier la base de données
include("connexion.php");

// Requete SQL attibuer à la variable

//Recupere la liste de tous les artistes
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
    return $rows;
}

//Recupere la liste de tous les genres
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
    return $rows;
}

//Recupere la liste de toutes les chansons 
function getChanson(){
    $link = connexion();
    $rs = $link->query("SELECT * FROM chansons, genres, artistes WHERE art_id = id_Art AND gen_id = id_G ORDER BY id_Ch DESC");
    if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rows = array();
    while($r = $rs->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $r;
    }
    return $rows;
}
/*
$result=getChanson();
foreach($result as $key=>$value){
    foreach($value as $key2=>$value2){
    echo($key2);
    echo('<br>');
    echo($value2);
    echo('<br>');
    }
}
*/

//Recupere la liste de tous les commentaire par chanson
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
    return $rows;
}


//Recupere le pseudo de l'utilisateur dont on donne l'id
function getInfoUti($id){
    $link=connexion();
	$rs = $link->prepare("SELECT pseudo, photo_num FROM utilisateurs AS u WHERE u.id_Uti=? ");
	if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rs->execute(array($id));
    $userinfo = $rs->fetch(PDO::FETCH_ASSOC);
    return $userinfo;
}

/*
$result = getPseudoUti('7');
foreach($result[0] as $value){
    echo $value;
}*/

//Recupere le num de la photo de l'utilisateur dont on donne l'id
/*function getPhotoUti($dbb,$id){
	$rs = $dbb->prepare("SELECT photo_num FROM utilisateurs WHERE id_Uti = ?");
	if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rs->execute(array($id));
    $userinfo = $rs->fetch();
    return $userinfo[0];
}*/

//Ajoute un artiste a la bdd grace a son nom
function addArtiste($artiste){
    $link=connexion();
    $rs=$link->prepare("SELECT `artiste` FROM artistes where artistes.artiste=?");
    $rs->execute(array($artiste));
    $result=$rs->fetch(PDO::FETCH_ASSOC);

    if(!$result){
	$rs=$link->prepare("INSERT INTO `artistes` (`id_Art`, `artiste`) VALUES (NULL, ?);");
	$rs->execute(array($artiste));
    }
}
 

//Ajoute une musique dans la bdd grace a son titre, son artiste associé et son genre
function addMusic($titre, $artiste, $genre){
    $link = connexion(); 

    $rs=$link->prepare("SELECT `id_Art` FROM artistes as a WHERE a.artiste=?");
    $rs->execute(array($artiste));
    $idArtiste=$rs->fetch();

   
	$rs=$link->prepare("INSERT INTO `chansons` (`id_Ch`, `titre`, `art_id`, `gen_id`) VALUES (NULL, ?, ?,?);");
    $rs->execute(array($titre,$idArtiste[0],$genre));
    
    return getChanson();
}


//Trie par nombre de like
function likeSorting($dbb){
    $rs=$dbb->prepare("SELECT titre, artiste , COUNT(*) 
    FROM chansons AS c
    JOIN favoris AS f ON (c.id_Ch =f.ch_id) 
    JOIN artistes as a ON(a.id_Art=c.art_id)
    GROUP BY titre, ch_id
    ORDER BY (COUNT(*)) DESC"); 
    if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rows = array();
    while($r = $rs->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $r;
    }
    return $rows;
}

//Verifie que l'utilisateur qui tente de se connecter existe PAS FINI

function connexionUser($pseudo,$mdp){
    $link = connexion(); 
    $rs=$link->prepare("SELECT mdp FROM utilisateurs AS u WHERE u.pseudo=? ");
    if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }  

    $rs->execute(array($pseudo));
    $result=$rs->fetch();
    
    if(password_verify($mdp,$result[0])==TRUE){
        $rs=$link->prepare("SELECT id_Uti FROM utilisateurs AS u WHERE u.pseudo=? ");
        $rs->execute(array($pseudo));
        $result=$rs->fetch();
        return $result[0];
    }
    return FALSE;
}



//Recupere la liste des chansons d'un artiste donné
function getChansonParArtiste($bdd, $artiste){
    $rs = $dbb->query("SELECT * FROM chansons AS c 
    JOIN artistes AS a ON (c.art_id=a.id_Art) 
        WHERE a.artiste LIKE %?%");
    if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rows = array($artiste);
    while($r = $rs->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $r;
    }
    return $rows;
}

//Recupere la liste des chansons ayant le titre donné
function getChansonParTitre($bdd, $titre){
    $rs = $dbb->query("SELECT a.artiste, c.titre FROM chansons AS c 
    JOIN artistes AS a ON (c.art_id=a.id_Art)
        WHERE c.titre LIKE %?%");
    if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rows = array($titre);
    while($r = $rs->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $r;
    }
    return $rows;
}

//Recupere la liste de chanson par genre. Le genre est defini par son id
function getChansonParGenre($bdd,$idGenre){
    $rs = $dbb->query("SELECT a.artiste, c.titre FROM chansons AS c 
    JOIN artistes AS a ON (c.art_id=a.id_Art)
        WHERE c.gen_id = ?");
    if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rows = array($idGenre);
    while($r = $rs->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $r;
    }
   return $rows;
}

//Recupere le nombre de like d'une chanson
function getLikeChanson($bdd, $titre){
    $rs = $dbb->prepare("SELECT COUNT(*) as count FROM chansons AS c 
	JOIN favoris AS f ON (c.id_Ch =f.ch_id)    
    JOIN artistes as a ON(a.id_Art=c.art_id)
	GROUP BY titre, ch_id HAVING (c.titre LIKE ?)");
	if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rs->execute(array($titre));
    $nbLike = $rs->fetch();
    return $nbLike['count'];
}

//Recupere les like d'un utilisateur
function getLikeUtilisateur($dbb, $idUti){
    $rs = $dbb->prepare("SELECT titre,artiste FROM chansons AS c 
	JOIN favoris AS f 
		ON c.id_Ch=f.ch_id
	JOIN utilisateurs AS u
		ON u.id_Uti=f.uti_id
    JOIN artistes AS a 
    	ON a.id_Art=c.art_id
    WHERE f.uti_id = ?");
    
	if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rows = array($idUti);
    while($r = $rs->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $r;
    }
    return $rows;
}

function addUser($pseudo, $email, $mdp, $photo) {
    $link = connexion();
    $rqt = $link->prepare('INSERT INTO `utilisateurs` (`id_Uti`, `pseudo`, `mail`, `mdp`,`photo_num`) VALUES (NULL, ?,?,?,?);');
    if (!$rqt) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rqt->execute(array($pseudo, $email, $mdp, $photo));
}

function addUserVerif($email){
    $link = connexion();
    $rs=$link->prepare("SELECT mail FROM utilisateurs as u WHERE u.mail=?");
    if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }  
    $rs->execute(array($email));
    $result=$rs->fetch();
    return $result;
}



?>