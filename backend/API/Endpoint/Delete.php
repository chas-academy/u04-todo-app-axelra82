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
		!empty($data->ids)
	){
		// Set object variables
		$crud->connection 		= $connection;
		$crud->table			= $data->table;
		$crud->ids				= is_array($data->ids) ? implode(',', $data->ids) : $data->ids;

		// Create
		$stmt 					= $crud->delete();
		if($stmt){
			echo $helpers->returnObject(
				true,
				"Deleted $crud->ids from $crud->table",
			);
		}else{
		
			echo $helpers->returnObject(
				false,
				"Could not delete $id from $crud->table",
			);
		}
	}else{
		
		echo $helpers->returnObject(
			false,
			"Missing data could not delete $crud->id from $crud->table",
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