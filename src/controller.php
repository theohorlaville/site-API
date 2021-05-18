<?php
    require('model.php');

    function affArtistes(){
        print json_encode(getArtiste($link));
    }

    function affGenres(){
        print json_encode(getGenre($link));
    }

    function newFav($form){
        $fav= json_decode($form, true);
        addFav($fav['numCh'],$fav['user']);
        echo json_encode(getChanson());
    }

    function compareFav($idCh,$user){
        echo json_encode(favVerif($idCh,$user));
    }

    function delFav($form){
        $fav= json_decode($form, true);
        supprFav($fav['numCh'],$fav['user']);
        echo json_encode(getChanson());
    }
 

    function affMesFavs($idUti){
        print json_encode(getLikeUtilisateur($idUti));
    }

    function newChanson($form){
        $song = json_decode($form, true);
        addArtiste($song['artiste']);
        addMusic($song['titre'],$song['artiste'],$song['genre']);
        echo json_encode(getChanson());
    }
 
    function affChansonsParArtiste($nom){
        echo json_encode(getChansonParArtiste($nom));
    }

    function affChansonsParTitre($titre){
        echo json_encode(getChansonParTitre($titre));
    }

    function affChansons(){
        echo json_encode(getChanson());
    }


    function affChansonsTriParFav(){
        echo json_encode(getChansonTriParFav());
    }

    function affCom($idCh){
        print json_encode(getCom($idCh));
    }

    function newCom($form){
        $com = json_decode($form, true);
        addCom($com['com'],$com['idChanson'],$com['id_utilisateur']);
        print json_encode(getCom($com['idChanson']));
    }


    function changePdp($form){
        $pdp=json_decode($form,true);
        echo json_encode(changePhoto($pdp['photo'],$pdp['utilisateur']));
    }
    


    function affInfoUti($id){
        echo json_encode(getInfoUti($id));
    }

    function compareInscription($email){

        if(addUserVerif($email)==NULL)
        {
            echo json_encode('1');
        }

        else
        {
            echo json_encode('0');
        }
    }

    function newUser($form){
        $user = json_decode($form, true);
        addUser($user['pseudo'],$user['email'], password_hash($user['mdp'], PASSWORD_DEFAULT),$user['photo']);
    }

    function compareConnexion($pseudo,$mdp){

        if(connexionUser($pseudo,$mdp)==FALSE)
        {
            echo json_encode('0');
        }

        else
        {
            echo json_encode(connexionUser($pseudo,$mdp));
        }

    }

?>