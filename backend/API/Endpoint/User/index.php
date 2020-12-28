<?php
namespace NS\API\Endpoint\User;
use NS\Utils\Database;
use NS\Utils\Helpers;
use NS\Utils\Jwt;
use NS\Object\User;
// Keep NS for core PHP classes
use PDO;

// Include required files
include_once( dirname(__DIR__ , 3) .'/Utils/headers.php');
include_once( dirname(__DIR__ , 3) .'/Utils/Autoloader.php');

// Get POST data
$data			= json_decode(file_get_contents("php://input"));

// Instantiate object(s)
$db				= new Database();
$user			= new User();
$helpers		= new Helpers();
$connection		= $db->connection();

if($connection){
	
	if(
		!empty($data->case) &&
		!empty($data->username) &&
		!empty($data->password)
	){
		
		$user->connection 				= $connection;
		$user->helpers 					= $helpers;
		$user->username		    		= $data->username;
		$getUser						= $user->get();

		if($data->case === 'signup'){
			if($getUser["userName"] === $user->username){
				
				echo $helpers->returnObject(
					false,
					"Username '$user->username' already exists."
				);

			}else{
				
				$user->password 	    = password_hash($data->password, PASSWORD_DEFAULT);
				$signup					= $user->signup();
				
				if($signup){
					echo $helpers->returnObject(
						true,
						"User created.",
						$signup
					);

				}else{
					
					echo $helpers->returnObject(
						false,
						"Unable to create user."
					);
				}
			}
		}

		if($data->case === 'login'){
			
			if($getUser["userName"] === $user->username){

					// Check if the password matches using password_verify()
					if (password_verify($data->password, $getUser["userPass"])){
						$newJWT		= new Jwt($getUser["id"], $user->username);
						$jwt		= $newJWT->create();
						
						if($jwt){
							echo $helpers->returnObject(
								true,
								"User logged in.",
								json_encode($jwt)
							);
						}else{
							echo $helpers->returnObject(
								true,
								"Could not create toke. User logged in."
							);
						}
					}else{
						echo $helpers->returnObject(
							false,
							"Incorrect password"
						);
					}
			}else{
				echo $helpers->returnObject(
					false,
					"Username not found."
				);
			}
		}

	}else{
		
		switch (empty($data->username) || empty($data->password)) {
			case empty($data->username) && empty($data->password):
				$missing = 'username and password';
				break;
			case empty($data->username):
				$missing = 'username';
				break;
			case empty($data->password):
				$missing = 'password';
				break;
		}

		echo $helpers->returnObject(
			false,
			"Missing $missing"
		);
	}
}else{
	
	// Return connection error
	echo $helpers->returnObject(
		false,
		"Connection error"
	);

}
return;
?>