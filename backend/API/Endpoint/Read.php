<?php
namespace NS\API\Endpoint;
use NS\Utils\Database;
use NS\Utils\Helpers;
use NS\Object\Crud;
// Keep NS for core PHP classes
use PDO;

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
		!empty($data->table)
	){
		// Set object variables
		$crud->connection 	= $connection;
		$crud->table 		= $data->table;
		$crud->listId		= empty($data->listId) ? null : $data->listId;
		
		// Begin extraction
		$stmt 				= $crud->read();
		$rowCount			= $stmt->rowCount();

		// Test row count
		if($rowCount > 0){
			$tasksArr	= [];
			$todoArr 	= [];
			$doneArr 	= [];
		
			// While loop for table row(s)
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
				// Extract row will define $row['name'] as $name
				extract($row);
				
				$task = array(
					'id'			=> $id,
					'title'			=> $title,
					'description'	=> html_entity_decode($description),
					'done'  		=> (int) $done,
					'createdAt'		=> $createdAt,
					'updatedAt'		=> $updatedAt,
					'listId'		=> $listId,
				);
				
				// Switch case for array push based on status
				switch ($task['done']) {
					case 0:
						array_push($todoArr, $task);
						break;
					case 1:
						array_push($doneArr, $task);
						break;
				}
			}

			// Add todo and done arrays to tasks array
			$tasksArr['todo']		= $todoArr;
			$tasksArr['done']		= $doneArr;

			echo $helpers->returnObject(
				true,
				"$rowCount records found",
				json_encode($tasksArr),
			);
		}else{
			echo $helpers->returnObject(
				true,
				"No records found",
			);
		}
	}else{
		echo $helpers->returnObject(
			false,
			"Missing data could not complete read request.",
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