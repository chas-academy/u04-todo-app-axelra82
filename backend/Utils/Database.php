<?php
namespace NS\Utils;
use NS\Utils\DotEnv;
// Keep NS for core PHP classes
use PDO;
use PDOException;

include_once(__DIR__ .'/Autoloader.php');

class Database{
	private $host;
	private $port;
	private $database;
	private $username;
	private $password;
	private $options;
	private $connect = null;
	
	public function __construct(
		$data = null
	){
		$this->env			= new DotEnv();
		$this->env->read();

		$this->installed	= getenv('REACT_APP_INSTALLED');
		$this->database		= getenv('REACT_APP_DATABASE');
		$this->charset		= getenv('REACT_APP_CHARSET');

		$this->host			= empty($data) ? getenv('REACT_APP_HOST') : $data->host;
		$this->port			= empty($data) ? getenv('REACT_APP_PORT') : $data->port;
		$this->username		= empty($data) ? getenv('REACT_APP_USERNAME') : $data->username;
		$this->password		= empty($data) ? getenv('REACT_APP_PASSWORD') : $data->password;
		
		$this->options = [
			PDO::ATTR_DEFAULT_FETCH_MODE	=> PDO::FETCH_ASSOC,
			PDO::ATTR_ERRMODE				=> PDO::ERRMODE_EXCEPTION,
		];
	}

	public function configure() {
		
		// Update non-default env values
		if($this->host !== getenv('REACT_APP_HOST')){
			$this->env->update('REACT_APP_HOST', $this->host);
		}
		if($this->port !== getenv('REACT_APP_PORT')){
			$this->env->update('REACT_APP_PORT', $this->port);
		}
		if($this->username !== getenv('REACT_APP_USERNAME')){
			$this->env->update('REACT_APP_USERNAME', $this->username);
		}
		if($this->password !== getenv('REACT_APP_PASSWORD')){
			$this->env->update('REACT_APP_PASSWORD', $this->password);
		}

		// Test connection
		$this->connect = new PDO(
			"mysql:host={$this->host};",
			$this->username,
			$this->password,
			$this->options
		);
		
		if($this->connect){

			// Connection is good
			// Create database
			$sql		= file_get_contents( dirname(__DIR__, 1) .'/API/Endpoint/Configure/create.sql');
			// Prepare statement
			$stmt		= $this->connect->prepare($sql);
			// Execute statment
			$stmt->execute();
			
			return true;
		}

		// Something isn't working
		return false;
	}
	
	public function connection(){

		try{
			$this->connect = new PDO(
				"mysql:host={$this->host};dbname={$this->database};charset={$this->charset}",
				$this->username,
				$this->password,
				$this->options
			);

			return $this->connect;

		}catch(PDOException $e){
			
			// Can't continue without connection
			echo $e;
			return false;
		}
	}
}
?>