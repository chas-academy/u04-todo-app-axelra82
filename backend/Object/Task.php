<?php
namespace NS\Object;
// Keep NS for core PHP classes
use PDOException;

include_once( dirname(__DIR__ , 1) .'/Utils/Autoloader.php');

class Task {
	
	private $table = 'tasks';
	private $query;

	public function read(){

		try{
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