<?php
	require_once('controller.php');
	
	$page = explode('/',$_SERVER['REQUEST_URI']);

	$method = $_SERVER['REQUEST_METHOD'];
	
    switch($page[3]) {
		case 'users' : 
			switch($method) {
				case 'POST':
                    $json = file_get_contents('php://input');
                    newUser($json);
                    break;
				
				case 'GET':
					compareUser($page[4]);
					break;
					
				default:
					http_response_code('404');
					echo 'OOPS';
					
			} break;

        default : 
			http_response_code('500');
			echo 'unknown endpoint';
			break;
            
    }