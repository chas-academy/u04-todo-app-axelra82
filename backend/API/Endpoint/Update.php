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

	if(
		!empty($data->table) &&
		!empty($data->id) &&
		!empty($data->title) &&
		!empty($data->description)
	){
		// Set object variables
		$crud->connection 		= $connection;
		$crud->helpers 			= $helpers;
		$crud->table			= $data->table;
		$crud->id				= $data->id;
		$crud->title			= $data->title;
		$crud->description		= $data->description;
		$crud->done				= $data->done;

		// Update
		$stmt 					= $crud->update();
		if($stmt){
			echo $helpers->returnObject(
				true,
				"Updated $crud->title (id: $crud->id) in $crud->table"
			);
		}else{
		
			echo $helpers->returnObject(
				false,
				"Could not update $data->title (id: $crud->id) in $crud->table"
			);
		}
	}else{
		
		echo $helpers->returnObject(
			false,
			"Missing data could not complete update request."
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