<?php
namespace NS\Object;
use NS\Utils\Jwt;
// Keep NS for core PHP classes
use PDO;
use PDOException;

include_once( dirname(__DIR__ , 1) .'/Utils/Autoloader.php');

class User{

	private $table      = "users";
	private $user		= null;
	private $query;
  
	// Get user
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

			$this->user			= $this->get();
			$newJWT				= new Jwt($this->user["id"], $this->username);
			$jwt				= $newJWT->create();
			
			if($jwt){
				return json_encode(
					array(
						"token"		=> $jwt,
						"username"	=> $this->username,
						"userId"	=> $this->user["id"],
					)
				);
			}else{
				$this->delete();
				return false;
			}

		}catch(PDOException $e){

			echo "Signup error: {$e->getMessage()}";
			return false;
		}
	}

	// Delete user
	public function delete(){

		try{

			$this->query	= "DELETE FROM `{$this->table}` WHERE `id` = ?";
			
			// Prepare query
			$stmt = $this->connection->prepare($this->query);

			// Bind value
			$stmt->bindValue(1, $this->user["id"]);

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