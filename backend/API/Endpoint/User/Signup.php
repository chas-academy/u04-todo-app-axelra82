<?php
// namespace NS\API\Endpoint\User;
use NS\Utils\Database;
use NS\Utils\Helpers;
use NS\Utils\Jwt;
use NS\Object\User;

// Include required files
include_once( dirname(__DIR__ , 3) .'/Utils/headers.php');
include_once( dirname(__DIR__ , 3) .'/Utils/Autoloader.php');

// Get POST data
$data			= json_decode(file_get_contents("php://input"));
// echo $helpers->returnObject(
// 	true,
// 	"Connection ok",
// 	json_encode($data)
// );
// return;

// Instantiate object(s)
$db				= new Database();
$user			= new User();
$helpers		= new Helpers();
$connection		= $db->connection();

if($connection){

	if(
		!empty($data->username) &&
		!empty($data->password)
	){
		$user->connection 		= $connection;
		$user->helpers 			= $helpers;
		$user->username		    = $data->username;
		$user->password 	    = password_hash($data->password, PASSWORD_DEFAULT);
		
		$stmt					= $user->signup();
		if($stmt){
			$userId             = $connection->lastInsertId();
			// Instantiate JWT
			$newJWT             = new Jwt($userId, $user->username);
			$jwt                = $newJWT->create();
			
			if($jwt){
				echo $helpers->returnObject(
					true,
					"User created.",
					json_encode([
						'token'     => $jwt,
						'expires'   => $exp,
						'userId'    => $userId,
						'username'  => $user->username,
					]),
				);
			}else{
				echo $helpers->returnObject(
					false,
					"Unable to create user token.",
				);
			}
		}else{
			echo $helpers->returnObject(
				false,
				"Unable to create user.",
			);
		}
	}
}else{
	
	// Return connection error
	echo $helpers->returnObject(
		false,
		"Connection error",
	);

}
return;
?>