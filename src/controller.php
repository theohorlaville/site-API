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
    /*

    $test = [
        "artiste" => "jul",
        "titre" => "bande organisée",
        "genre"=>"1",
    ];
    $test=json_encode($test);
    newChanson($test);
    */
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

    function affUti($id){
        print json_encode(getUti($link,$id));
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


    

    //echo compareUser('totosh');
    
    /*
    $test = [
        "email" => "test@gmail.com",
        "pseudo" => "theo",
        "mdp"=>"123456",
        "photo"=>"1"
    ];
    $test=json_encode($test);
    newUser($test);
    */
?>