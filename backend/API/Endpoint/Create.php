<?php
namespace NS\API\Endpoint;
use NS\Utils\Database;
use NS\Utils\Helpers;
use NS\Object\Action;

// Include required files
include_once( dirname(__DIR__ , 2) .'/Utils/headers.php');
include_once( dirname(__DIR__ , 2) .'/Utils/Autoloader.php');

// Get POST data
$data			= json_decode(file_get_contents("php://input"));

// Instantiate object(s)
$db				= new Database();
$action			= new Action();
$helpers		= new Helpers();
$connection		= $db->connection();

if($connection){

	
	// Set object variables
	$action->connection 		= $connection;
	$action->helpers			= $helpers;
	$action->table 				= $data->table;
	$action->title				= $data->title;
	$action->description		= $data->description;
	$action->id 				= empty($data->id) ? null : $data->id;
	$action->idObject			= empty($data->idObject) ? null : $data->idObject;
	
	// Create
	$stmt 						= $action->create();
	if($stmt){
		
		echo $helpers->returnObject(
			true,
			"Added $action->title ($action->description) to $action->table",
		);

	}else{
		
		echo $helpers->returnObject(
			false,
			"Could not create $action->title ($action->description) in $action->table",
		);
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