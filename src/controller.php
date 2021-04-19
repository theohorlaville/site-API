<?php
    require('model.php');

    function affArtistes(){
        print json_encode(getArtiste($link));
    }

    function affGenres(){
        print json_encode(getGenre($link));
    }

    function affChansons(){
        print json_encode(getChanson($link));
    }

    function affCom(){
        print json_encode(getCom($link));
    }

    function affUti($id){
        print json_encode(getUti($link,$id));
    }

    function compareUser($email){

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
        addUser($user['pseudo'],$user['email'], $user['mdp'],$user['photo']);
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