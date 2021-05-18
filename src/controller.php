<?php
    require('model.php');

    // INSCRIPTION
    //POST
    function newUser($form){
        $user = json_decode($form, true);
        addUser($user['pseudo'],$user['email'], password_hash($user['mdp'], PASSWORD_DEFAULT),$user['photo']);
    }

    //GET
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

    //CONNEXION
    //GET
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

    //CHANSONS
    //TITRE
    //GET
    function affChansonsParTitre($titre){
        echo json_encode(getChansonParTitre($titre));
    }

    //ARTISTE
    //GET
    function affChansonsParArtiste($nom){
        echo json_encode(getChansonParArtiste($nom));
    }

    //MODIF
    //GET
    function affChansons(){
        echo json_encode(getChanson());
    }

    //POST
    function newChanson($form){
        $song = json_decode($form, true);
        addArtiste($song['artiste']);
        addMusic($song['titre'],$song['artiste'],$song['genre']);
        echo json_encode(getChanson());
    }

    //USER
    //GET
    function affInfoUti($id){
        echo json_encode(getInfoUti($id));
    }

    //POST
    function changePdp($form){
        $pdp=json_decode($form,true);
        echo json_encode(changePhoto($pdp['photo'],$pdp['utilisateur']));
    }

    //FAV
    //GET
    function compareFav($idCh,$user){
        echo json_encode(favVerif($idCh,$user));
    }

    //POST
    function newFav($form){
        $fav= json_decode($form, true);
        addFav($fav['numCh'],$fav['user']);
        echo json_encode(getChanson());
    }

    //DELETE
    function delFav($form){
        $fav= json_decode($form, true);
        supprFav($fav['numCh'],$fav['user']);
        echo json_encode(getChanson());
    }
    
    //COMMENTAIRES
    //GET
    function affCom($idCh){
        print json_encode(getCom($idCh));
    }

    //POST
    function newCom($form){
        $com = json_decode($form, true);
        addCom($com['com'],$com['idChanson'],$com['id_utilisateur']);
        print json_encode(getCom($com['idChanson']));
    }
   

    //TRI MES FAV
    //GET
    function affMesFavs($idUti){
        print json_encode(getLikeUtilisateur($idUti));
    }
    
    //TRI NB FAV
    //GET
    function affChansonsTriParFav(){
        echo json_encode(getChansonTriParFav());
    }





    
    


   



?>