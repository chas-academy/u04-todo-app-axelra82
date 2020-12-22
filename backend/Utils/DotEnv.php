<?php
namespace NS\Utils;

class DotEnv
{
	private $path;
	private $name;
	private $value;
	
	private function isReadable()
	{
		$this->path = dirname(__DIR__, 2) . '/.env';
		
		if(!file_exists($this->path)) {
			throw new \InvalidArgumentException(sprintf('%s does not exist', $this->path));
		}

		if (!is_readable($this->path)) {
			throw new \RuntimeException(sprintf('%s file is not readable', $this->path));
		}
	}
	
	private function setEnv()
	{
		if (!array_key_exists($this->name, $_SERVER) && !array_key_exists($this->name, $_ENV)) {
			putenv(sprintf('%s=%s', $this->name, $this->value));
			$_ENV[$this->name] = $this->value;
			$_SERVER[$this->name] = $this->value;
		}
	}

	public function read()
	{
		$this->isReadable();

		$lines = file($this->path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
		foreach ($lines as $line) {

			// Skip comment line(s)
			if (strpos(trim($line), '#') === 0) {
				continue;
			}

			list($name, $value) = explode('=', $line, 2);
			$this->name = trim($name);
			$this->value = trim($value);
			
			$this->setEnv();
		}
	}
	
	public function update($name, $value)
	{
		$this->isReadable();

		$this->name = trim($name);
		$this->value = trim($value);

		file_put_contents(
			$this->path,
			str_replace(
				$this->name .'='. getenv($this->name),
				$this->name .'='. $this->value,
				file_get_contents($this->path)
			)
		);

		$this->setEnv();
	}
}
?>