<?php
namespace NS\Object;
use NS\Utils\Jwt;
// Keep NS for core PHP classes
use PDO;
use PDOException;

include_once( dirname(__DIR__ , 1) .'/Utils/Autoloader.php');

class User{

	private $table      = "users";
	private $query;
  
	// Test user
	public function get(){

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
			
			return $stmt->fetch(PDO::FETCH_ASSOC);

		}catch(PDOException $e){

			echo "Get user error: {$e->getMessage()}";
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

			$user				= $this->get();
			$newJWT				= new Jwt($user["id"], $this->username);
			$jwt				= $newJWT->create();
			
			if($jwt){
				return true;
			}else{
				return false;
			}

		}catch(PDOException $e){

			echo "Signup error: {$e->getMessage()}";
			return false;
		}
	}
}
?>