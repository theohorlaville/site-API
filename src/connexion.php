<?php
function connexion(){
$link = new PDO('mysql:host=localhost;dbname=web','root','');
if(!$link) {
	die('Connection failed');
}
$link->query("SET NAMES utf8");
return $link;

}
