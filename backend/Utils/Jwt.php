<?php
namespace NS\Utils;

class Jwt{
	// Init private variables
	private $userId = null;
	private $userName = null;
	private $header;
	private $payload;
	private $b64Header;
	private $b64Payload;
	private $signature;
	private $secret;
	private $b64Signature;
	private $now;
	private $exp;
	

	// Constructor with id and password
	public function __construct($userId, $username){
		$this->userId		= $userId;
		$this->username		= $username;
		$this->header		= $header;
		$this->payload		= $payload;
		$this->b64Header	= $b64Header;
		$this->b64Payload	= $b64Payload;
		$this->signature	= $signature;
		$this->secret		= "dodoRaphusCucullatus!isVerySecret";
		$this->b64Signature	= $b64Signature;
		// Timestamp
		$this->now			= time();
		// Expiration time 5min (now + 60(seconds) * 5(minutes))
		$this->exp			= $this->now + 60 * 5;
	}
	
	private function cleanb64($string) {
		return str_replace(
			[
				"+", "/", "="
			],[
				"-", "_", ""
			],base64_encode($string)
		);
	}

	public function create(){
		// Validate username and user ID
		if($this->userId === null || $this->username === null){
			return false;
		}
		// Create JWT
		// Token header
		$this->header		= json_encode(
			[
				"typ"       => "JWT",
				"alg"       => "HS256",
			]
		);
		
		// Token payload
		$this->payload = json_encode(
			[
				"userId"	=> $this->userId,
				"username"	=> $this->username,
				"iat"       => $this->now,
				"exp"       => $this->exp,
			]
		);
		
		// Header to Base64
		$this->b64Header	= $this->cleanb64($this->header);

		// Payload to Base64
		$this->b64Payload	= $this->cleanb64($this->payload);

		// Signature Hash
		$this->signature	= hash_hmac(
			'sha256',
			$this->b64Header . "." . $this->b64Payload,
			$this->secret,
			true
		);

		// Base64 signature
		$this->b64Signature	= $this->cleanb64($this->signature);
		
		// Return JWT with data
		return $this->b64Header . "." . $this->b64Payload . "." . $this->b64Signature;
	}
}
?>