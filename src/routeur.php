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
				switch($page[4]){
					case 'titre':
						switch($method){
							case 'GET':
								affChansonsParTitre($page[5]);
								break;
							
							default:
								http_response_code('404');
								echo 'OOPS';	
						}break;
											
					case 'artiste':
						switch($method){
							case 'GET':
								affChansonsParArtiste($page[5]);
								break;
							
							default:
								http_response_code('404');
								echo 'OOPS';	
						}break;
					
					default:
						switch($method) {			
							case 'GET':
								affChansons();
								break;
							
							case 'POST':
								$json = file_get_contents('php://input');
								newChanson($json);
								break;
									
							default:
								http_response_code('404');
								echo 'OOPS';
								
								
						} break;
			} break;

			case 'user' : 
				switch($method) {			
					case 'GET':
						affInfoUti($page[4]);
						break;
						
					default:
						http_response_code('404');
						echo 'OOPS';
						
				} break;

			case 'photo':
				switch($method) {			
					case 'GET':
						$subpage = explode(',',$page[4]);
						changePdp($subpage[1],$subpage[0]);
						break;
							
					default:
						http_response_code('404');
						echo 'OOPS';
							
				} break;

			case 'fav' : 
				switch($method) {			
					case 'GET':
						$subpage = explode(',',$page[4]);
						compareFav($subpage[0],$subpage[1]);
						break;
						
					case 'POST':
						$json = file_get_contents('php://input');
						newFav($json);
						break;

					case 'DELETE':
						$json = file_get_contents('php://input');
						delFav($json);
						break;

						
					default:
						http_response_code('404');
						echo 'OOPS';
						
				} break;
					
		case 'triParFav':
			switch($method) {			
				case 'GET':
					affChansonsTriParFav();
					break;
						
				default:
					http_response_code('404');
					echo 'OOPS';
						
			} break;

		case 'MesFavs':
			switch($method) {			
				case 'GET':
					affMesFavs($page[4]);
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