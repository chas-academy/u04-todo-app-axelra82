<?php
namespace NS\Object;
// Keep NS for core PHP classes
use PDO;
use PDOException;

include_once( dirname(__DIR__ , 1) .'/Utils/Autoloader.php');

class Crud {
	
	private $query;
	private $col;

	public function create(){

		try{
			if(empty($this->id)){
				$this->query		= "INSERT INTO 
					`{$this->table}`
				SET
					`title`			= :title,
					`description`	= :description
				";
			}else{
				switch ($this->table) {
					case 'tasks':
						$this->col = 'listId';
						break;
					case 'lists':
						$this->col = 'userId';
						break;
				}

				$this->query		= "INSERT INTO 
					`{$this->table}`
				SET
					`title`			= :title,
					`description`	= :description,
					`{$this->col}`	= :id
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
			switch ($this->table) {
				case 'tasks':
					$this->col = 'listId';
					break;
				case 'lists':
					$this->col = 'userId';
					break;
			}

			if(empty($this->ids)){
				$this->query		= "SELECT *
				FROM
					`{$this->table}`
				WHERE
					`{$this->col}` IS NULL
				";
			}else{
				$this->query		= "SELECT *
				FROM
					`{$this->table}`
				WHERE
					`{$this->col}` IN (:ids)
				";
			}

			$stmt				= $this->connection->prepare($this->query);
			if(!empty($this->ids)){
				$this->ids = is_array($this->ids) ? implode(',', $this->ids) : $this->ids;
				// Bind :ids from $this->ids to $stmt
				$stmt->bindValue(":ids", $this->ids);
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
			$hasDone				= $this->table !== 'lists' && (!empty($this->done) || $this->done === 0);
			if($hasDone){
				$this->query		= "UPDATE 
					`{$this->table}`
				SET
					`title`			= :title,
					`description`	= :description,
					`done`			= :done,
					`updatedAt`		= NOW()
				WHERE
					`id`			= :id
				";
			}else{
				$this->query		= "UPDATE 
					`{$this->table}`
				SET
					`title`			= :title,
					`description`	= :description,
					`updatedAt`		= NOW()
				WHERE
					`id`			= :id
				";
			}

			// Prepare query statement
			$stmt               = $this->connection->prepare($this->query);

			// Sanitize
			$this->title        = $this->helpers->sanitize($this->title);
			$this->description  = $this->helpers->sanitize($this->description);
			
			// Bind values
			$stmt->bindValue(":title", $this->title);
			$stmt->bindValue(":description", $this->description);
			$stmt->bindValue(":id", $this->id);
			if($hasDone){
				$stmt->bindValue(":done", $this->done, PDO::PARAM_BOOL);
			}
        
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