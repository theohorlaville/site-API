<?php
// Relier la base de données
include("connexion.php");


//Recupere la liste de toutes les chansons triées par date d'ajout
function getChanson(){
    $link = connexion();
    $rs = $link->query("SELECT * FROM chansons, genres, artistes 
                        WHERE art_id = id_Art AND gen_id = id_G 
                        ORDER BY id_Ch DESC");
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


//Récupère les chansons triées par nb de fav
function getChansonTriParFav(){
    $link = connexion();
    $rs = $link->query("SELECT * FROM chansons AS c 
                            JOIN favoris AS f ON (c.id_Ch =f.ch_id) 
                            JOIN artistes as a ON(a.id_Art=c.art_id)
                            JOIN genres as g ON (g.id_G=c.gen_id)
                        GROUP BY titre, ch_id ORDER BY (COUNT(*)) DESC");
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


//Recupere la liste de tous les commentaires par chanson
function getCom($idCh){
    $link = connexion();
    $rs = $link->prepare("SELECT utilisateurs.pseudo, commentaires.com, commentaires.ch_id  FROM  utilisateurs 
                            JOIN commentaires ON commentaires.uti_id=utilisateurs.id_Uti 
                        WHERE commentaires.ch_id=?");
    if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rs->execute(array($idCh));
    $rows = array();
    while($r = $rs->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $r;
    }
    return $rows;
}


//Ajoute un commentaire à une musique
function addCom($com,$chanson,$uti) {
    $link = connexion();
    $rs = $link->prepare("INSERT INTO commentaires (id_Com, com, ch_id, uti_id) VALUES (NULL, ?, ?, ?)");
    if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rs->execute(array($com,$chanson,$uti));
}


//Récupere le pseudo de l'utilisateur dont on donne l'id
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


//Ajoute un artiste a la bdd grace à son nom
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

    $rs=$link->prepare("SELECT a.artiste, c.titre FROM chansons AS c JOIN artistes AS a ON (c.art_id=a.id_Art) WHERE a.artiste LIKE ? AND c.titre like ?");
    $rs->execute(array($artiste,$titre));
    $chanson=$rs->fetch();

    if(!$chanson[0]){

        $rs=$link->prepare("SELECT `id_Art` FROM artistes as a WHERE a.artiste=?");
        $rs->execute(array($artiste));
        $idArtiste=$rs->fetch();

    
        $rs=$link->prepare("INSERT INTO `chansons` (`id_Ch`, `titre`, `art_id`, `gen_id`) VALUES (NULL, ?, ?,?);");
        $rs->execute(array($titre,$idArtiste[0],$genre));
        
        return getChanson();
    }

}


//Verifie que l'utilisateur qui tente de se connecter existe si oui connecte si non message d'erreur
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
function getChansonParArtiste($artiste){
    $link = connexion();
    $rs = $link->prepare("SELECT a.artiste, c.titre, g.nom_Gen FROM chansons AS c 
                            JOIN artistes AS a ON (c.art_id=a.id_Art) 
                            JOIN genres AS g ON (g.id_G=c.gen_id)
                        WHERE a.artiste LIKE ?");
    if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }

    $rs->execute(array('%'.$artiste.'%'));  
    while($r = $rs->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $r;
    }
    return $rows;
}


//Recupere la liste des chansons ayant le titre donné
function getChansonParTitre($titre){
    $link = connexion();
    $rs = $link->prepare("SELECT a.artiste, c.titre, g.nom_Gen FROM chansons AS c 
                                JOIN artistes AS a ON (c.art_id=a.id_Art)
                                JOIN genres AS g ON (g.id_G=c.gen_id)
                            WHERE c.titre LIKE ?");
    if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }

    $rs->execute(array('%'.$titre.'%'));
    while($r = $rs->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $r;
    }
    return $rows;
}


//Recupere le nombre de like d'une chanson
function getLikeChanson($bdd, $titre){
    $link = connexion();
    $rs = $link->prepare("SELECT COUNT(*) as count FROM chansons AS c 
	                        JOIN favoris AS f ON (c.id_Ch =f.ch_id)    
                            JOIN artistes as a ON(a.id_Art=c.art_id)
	                    GROUP BY titre, ch_id HAVING (c.titre LIKE %)");
	if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    while($r = $rs->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $r;
    }
    return $rows;
}


// Ajoute un like à une musique
function addFav($numCh, $user){
    $link = connexion();
    $rqt = $link->prepare('INSERT INTO `favoris` (`uti_id`, `ch_id`) VALUES (?,?);');
    if (!$rqt) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rqt->execute(array($user,$numCh));

    return getChanson();
}


// Supprime un like à une musique
function supprFav($numCh, $user){
    $link = connexion();
    $rqt = $link->prepare('DELETE FROM `favoris` WHERE `favoris`.`uti_id` = ? AND `favoris`.`ch_id` = ?');
    if (!$rqt) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rqt->execute(array($user,$numCh));

    return getChanson();
}


// Verifie si un utilisateur a liké cette musique
function favVerif($idCh,$user){
    $link = connexion();
    $rs = $link->prepare('SELECT `uti_id` FROM `favoris` WHERE `favoris`.`uti_id` = ? AND `favoris`.`ch_id` = ?');
    if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rs->execute(array($user,$idCh));
    $result=$rs->fetch();
    return $result;
}


//Récupere les like d'un utilisateur
function getLikeUtilisateur($idUti){
    $link = connexion();
    $rs = $link->prepare("SELECT * FROM chansons AS c 
                            JOIN favoris AS f  ON c.id_Ch=f.ch_id
                            JOIN utilisateurs AS u ON u.id_Uti=f.uti_id
                            JOIN artistes AS a ON a.id_Art=c.art_id
                            JOIN genres as g ON (g.id_G=c.gen_id)
                        WHERE f.uti_id = ?");
    
	if (!$rs) {
        echo "Un problème est arrivé.\n";
        exit;
    }

    $rs->execute(array($idUti));
    while($r = $rs->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $r;
    }
    return $rows;
}


//Ajoute un nouvel utilisateur
function addUser($pseudo, $email, $mdp, $photo) {
    $link = connexion();
    $rqt = $link->prepare('INSERT INTO `utilisateurs` (`id_Uti`, `pseudo`, `mail`, `mdp`,`photo_num`) VALUES (NULL, ?,?,?,?);');
    if (!$rqt) {
        echo "Un problème est arrivé.\n";
        exit;
    }
    $rqt->execute(array($pseudo, $email, $mdp, $photo));
}


//Verifie si l'utilisateur n'existe pas déja
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


//Update la photo de profil d'un utilisateur
function changePhoto($idPhoto, $idUti){
    $link = connexion();
    $rs=$link->prepare('UPDATE utilisateurs SET photo_num = ? WHERE utilisateurs.id_Uti = ? ');
    $rs->execute(array($idPhoto, $idUti));
    return $idPhoto; 
}

?>