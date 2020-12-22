<?php
namespace NS\API\Endpoint\Configure;
use NS\Utils\Database;
use NS\Utils\Helpers;

// Include required files
include_once( dirname(__DIR__ , 3) .'/Utils/headers.php');
include_once( dirname(__DIR__ , 3) .'/Utils/Autoloader.php');

// Get POST data
$data			= json_decode(file_get_contents("php://input"));

// Instantiate object(s)
$db				= new Database($data);
$helpers		= new Helpers();
$configure		= $db->configure();

if($configure){
	echo $helpers->returnObject(
		true,
		"Database created and connection established",
	);

}else{
	// Return nothing found
	echo $helpers->returnObject(
		false,
		"Connection error",
	);

}

// Update configured state in react public folder
// Changing configured file triggers update in react
// Do this after echoing config state back to app
$configFile 			= dirname(__DIR__, 4).'/public/configured.json';
$config 				= json_decode(file_get_contents($configFile), true);
$config['configured']	= true;
$config 				= json_encode($config, JSON_PRETTY_PRINT);
file_put_contents($configFile, $config);

return;
?>