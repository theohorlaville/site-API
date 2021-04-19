<?php
function connexion(){
$link = new PDO('mysql:host=localhost;dbname=web','root','');
//echo 'test';
//echo '<br>';
if(!$link) {
	die('Connection failed');
}
return $link;

}
