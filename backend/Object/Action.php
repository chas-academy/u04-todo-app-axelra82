<?php
namespace NS\Object;
// Keep NS for core PHP classes
use PDOException;

include_once( dirname(__DIR__ , 1) .'/Utils/Autoloader.php');

class Action {
	
	private $query;

	public function create(){

		try{
			if(empty($this->id)){
				$this->query		= "INSERT INTO 
					`{$this->table}`
				SET
					`title`			= :title,
					`description`	= :description,
					`done`			= 0
				";
			}else{
				$this->query		= "INSERT INTO 
					`{$this->table}`
				SET
					`title`			= :title,
					`description`	= :description,
					`done`			= 0,
					`:object`		= :id
				";
			}

			// Prepare query statement
			$stmt					= $this->connection->prepare($this->query);
			// Sanitize
			$this->title			= $this->helpers->sanitize($this->title);
			$this->description		= $this->helpers->sanitize($this->description);

			// Bind values
			$stmt->bindValue(":title", $this->title);
			$stmt->bindValue(":description", $this->description);
			if(!empty($this->id)){
				$stmt->bindValue(":object", $this->idObject);
				$stmt->bindValue(":id", $this->id);
			}

			// Execute query statement
			$stmt->execute();
			return true;
			
		}catch(PDOException $e){

			echo "Connection error: {$e->getMessage()}";
			return false;
		}
	}
}
?>