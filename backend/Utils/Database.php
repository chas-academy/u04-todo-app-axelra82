<?php
namespace NS\Utils;
// Keep NS for core PHP classes
use PDO;
use PDOException;

class Database{
	private $host;
	private $port;
	private $database;
	private $username;
	private $password;
	private $options;
	private $connect = null;
	private $configFile;
	private $config;
	
	public function __construct(
		$data = null
	){

		$this->configFile 	= dirname(__DIR__, 2).'/public/configured.json';
		$this->config 		= json_decode(file_get_contents($this->configFile), true);

		$this->database		= $this->config['database'];
		$this->charset		= $this->config['charset'];

		$this->host			= empty($data) ? $this->config['host'] : $data->host;
		$this->port			= empty($data) ? $this->config['port'] : $data->port;
		$this->username		= empty($data) ? $this->config['username'] : $data->username;
		$this->password		= empty($data) ? $this->config['password'] : $data->password;
		
		$this->options = [
			PDO::ATTR_DEFAULT_FETCH_MODE	=> PDO::FETCH_ASSOC,
			PDO::ATTR_ERRMODE				=> PDO::ERRMODE_EXCEPTION,
		];
	}

	public function configure() {

		// Test connection
		try{
			
			$this->connect = new PDO(
				"mysql:host={$this->host};",
				$this->username,
				$this->password,
				$this->options
			);

			// Connection is good
			// Create database
			$sql		= file_get_contents( dirname(__DIR__, 1) .'/API/Endpoint/Configure/create.sql');
			// Prepare statement
			$stmt		= $this->connect->prepare($sql);
			// Execute statment
			$stmt->execute();
			
			return true;

		}catch (PDOException $e) {
			
			// Something isn't working
			echo $e->getMessage();
			return false;
		}
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
			echo $e->getMessage();
			return false;
		}
	}
}
?>