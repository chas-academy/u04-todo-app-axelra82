<?php
namespace NS\Utils;

// Automate require for class file(s)
spl_autoload_register(function($class) {
    $slash		= strpos($class, '\\') + 1;
    $class		= substr($class, $slash);
    $dir		= str_replace('\\', '/', $class);
    $file		= dirname(__DIR__ , 1) . '/' . $dir . '.php';
    require_once($file);
});

?>