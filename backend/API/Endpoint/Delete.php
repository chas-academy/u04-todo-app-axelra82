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

	if(
		!empty($data->table) &&
		!empty($data->ids)
	){
		// Set object variables
		$action->connection 		= $connection;
		$action->table				= $data->table;
		$action->ids				= $data->ids;

		// Create
		$stmt 						= $action->delete();
		$ids						= implode(',', $action->ids);
		if($stmt){
			echo $helpers->returnObject(
				true,
				"Deleted $ids from $action->table",
			);
		}else{
		
			echo $helpers->returnObject(
				false,
				"Could not delete $id from $action->table",
			);
		}
	}else{
		
		echo $helpers->returnObject(
			false,
			"Missing data could not delete $action->id from $action->table",
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