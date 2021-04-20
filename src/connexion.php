<?php
function connexion(){
$link = new PDO('mysql:host=localhost;dbname=web','root','');

if(!$link) {
	die('Connection failed');
}
return $link;

}
