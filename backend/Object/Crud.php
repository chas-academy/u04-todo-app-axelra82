<?php
namespace NS\Object;
// Keep NS for core PHP classes
use PDOException;

include_once( dirname(__DIR__ , 1) .'/Utils/Autoloader.php');

class Crud {
	
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
	
    public function update(){
		
		try{
			$this->query          = "UPDATE 
				`{$this->table}`
			SET
				`title`           = :title,
				`description`     = :description,
				`done`            = :done,
				`updatedAt`       = NOW()
			WHERE
				`id`              = :id
			";

			// Prepare query statement
			$stmt               = $this->connection->prepare($this->query);

			// Sanitize
			$this->title        = $this->helpers->sanitize($this->title);
			$this->description  = $this->helpers->sanitize($this->description);
			
			// Bind values
			$stmt->bindValue(":title", $this->title);
			$stmt->bindValue(":description", $this->description);
			$stmt->bindValue(":done", $this->done);
			$stmt->bindValue(":id", $this->id);
        
        	// Execute query statement
        	$stmt->execute();
			return true;
			
        }catch(PDOException $e){

			echo "Connection error: {$e->getMessage()}";
			return false;
		}
	}
	
	public function delete(){

		try{

			$this->query	= "DELETE FROM `{$this->table}` WHERE `id` IN ($this->ids)";
			
			// Prepare query
			$stmt = $this->connection->prepare($this->query);

			// Execute query
			$stmt->execute();
			return true;

		}catch(PDOException $e){

			echo "Connection error: {$e->getMessage()}";
			return false;
		}
	}
}
?>