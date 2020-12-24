<?php
namespace NS\Object;
// Keep NS for core PHP classes
use PDOException;

class User{

	private $table      = "users";
	private $query;
  
	// Test user
	public function test(){

		try{
			$this->query		= "SELECT * 
			FROM
				`{$this->table}`
			WHERE
				`userName`		= :username
			";

			// Prepare query statement
			$stmt       		= $this->connection->prepare($this->query);

			// Sanitize
			$this->username		= $this->helpers->sanitize($this->username);

			// Bind values
			$stmt->bindValue(":username", $this->username);

			// Execute query statement
			$stmt->execute();
			
			// Test for existing user
			$rowCount 			= $stmt->rowCount();
			if($rowCount > 0){
				return false;
			}
			return true;

		}catch(PDOException $e){

			echo "Signup error: {$e->getMessage()}";
			return false;
		}
	}

	// Create user
	public function signup(){

		try{
			// Insert with set in table
			$this->query		= "INSERT INTO 
				`{$this->table}`
			SET
				`userName`		= :username,
				`userPass` 		= :password
			";

			// Prepare query statement
			$stmt       		= $this->connection->prepare($this->query);

			// Sanitize
			$this->username		= $this->helpers->sanitize($this->username);
			$this->password  	= $this->helpers->sanitize($this->password);

			// Bind values
			$stmt->bindValue(":username", $this->username);
			$stmt->bindValue(":password", $this->password);

			// Execute query statement
			$stmt->execute();
			return true;

		}catch(PDOException $e){

			echo "Signup error: {$e->getMessage()}";
			return false;
		}
	}
}
?>