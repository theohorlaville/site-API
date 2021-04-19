<?php
	require_once('controller.php');
	
	$page = explode('/',$_SERVER['REQUEST_URI']);

	$method = $_SERVER['REQUEST_METHOD'];
	
    switch($page[3]) {
		case 'inscription' : 
			switch($method) {
				case 'POST':
                    $json = file_get_contents('php://input');
                    newUser($json);
                    break;
				
				case 'GET':
					compareInscription($page[4]);
					break;
					
				default:
					http_response_code('404');
					echo 'OOPS';
					
			} break;

		
			case 'connexion' : 
				switch($method) {			
					case 'GET':
						$subpage = explode(',',$page[4]);
						compareConnexion($subpage[0],$subpage[1]);
						break;
						
					default:
						http_response_code('404');
						echo 'OOPS';
						
				} break;
			
			case 'chansons' : 
				switch($method) {			
					case 'GET':
						affChansons();
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