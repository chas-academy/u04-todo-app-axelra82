<?php
namespace NS\API\Endpoint\Task;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
use NS\Utils\Database;
use NS\Utils\Helpers;
use NS\Object\Task;
// Keep NS for core PHP classes
use PDO;

// Include required files
include_once( dirname(__DIR__ , 3) .'/Utils/headers.php');
include_once( dirname(__DIR__ , 3) .'/Utils/Autoloader.php');

// Get POST data
$data			= json_decode(file_get_contents("php://input"));

// Instantiate object(s)
$db				= new Database();
$task			= new Task();
$helpers		= new Helpers();
$connection		= $db->connection();

if($connection){
	// Set object variables
	$task->connection 	= $connection;
	$task->listId		= empty($data->listId) ? null : $data->listId;
	
	// Begin extraction
	$stmt 				= $task->read();
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
	
	// Return connection error
	echo $helpers->returnObject(
		false,
		"Connection error",
	);

}
return;
?>