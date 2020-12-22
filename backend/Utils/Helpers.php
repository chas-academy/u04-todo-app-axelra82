<?php
namespace NS\Utils;

// Helper class for global functions

class Helpers{
    
    public function sanitize($string){
        return htmlspecialchars(strip_tags($string));
    }

    public function returnObject(
        $success    = false,
        $message    = "Return object default message.",
        $data       = null
    ){
        return json_encode(
            array(
                "success"	=> $success,
                "message"	=> $message,
                "data"	    => empty($data) ? json_encode(array()) : $data,
            )
        );
    }
}
?>