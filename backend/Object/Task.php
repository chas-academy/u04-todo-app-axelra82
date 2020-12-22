<?php
namespace NS\Object;
use NS\Utils\Database;
// Keep NS for core PHP classes
use PDO;
use PDOException;

include_once( dirname(__DIR__ , 1) .'/Utils/Autoloader.php');

class Task {
	
	private $table = 'tasks';
	private $query;

	public function read(){

		if(!empty($this->listId)){
			 $this->query		= "SELECT *
			FROM
				`{$this->table}`
			WHERE
				`listId`		= :listId
			";
		}else{
			 $this->query		= "SELECT *
			FROM
				`{$this->table}`
			WHERE
				`listId` IS NULL
			";
		}

		try{
			$stmt				= $this->connection->prepare($this->query);
			if(!empty($this->listId)){
				// Bind :listId from $this->listId to $stmt
				$stmt->bindValue(":listId", $this->listId);
			}

			$stmt->execute();
			return $stmt;

		}catch(PDOException $e){

			echo "Connection error: {$e->getMessage()}";
			return false;
		}
	}
}
?>