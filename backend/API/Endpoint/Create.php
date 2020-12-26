<?php
namespace NS\API\Endpoint;
use NS\Utils\Database;
use NS\Utils\Helpers;
use NS\Object\Crud;

// Include required files
include_once( dirname(__DIR__ , 2) .'/Utils/headers.php');
include_once( dirname(__DIR__ , 2) .'/Utils/Autoloader.php');

// Get POST data
$data			= json_decode(file_get_contents("php://input"));

// Instantiate object(s)
$db				= new Database();
$crud			= new Crud();
$helpers		= new Helpers();
$connection		= $db->connection();

if($connection){

	// Set object variables
	$crud->connection 		= $connection;
	$crud->helpers			= $helpers;
	$crud->table 			= $data->table;
	$crud->title			= $data->title;
	$crud->description		= $data->description;
	$crud->id 				= empty($data->id) ? null : $data->id;
	
	// Create
	$stmt 						= $crud->create();
	if($stmt){
		
		echo $helpers->returnObject(
			true,
			"Added $crud->title ($crud->description) in $crud->table",
		);

	}else{
		
		echo $helpers->returnObject(
			false,
			"Could not create $crud->title ($crud->description) in $crud->table",
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