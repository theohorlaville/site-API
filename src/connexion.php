<?php
function connexion(){
$link = new PDO('mysql:host=localhost;dbname=lyrimacs','root','');
//echo 'test';
//echo '<br>';
if(!$link) {
	die('Connection failed');
}
return $link;

}
