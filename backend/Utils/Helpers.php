<?php
namespace NS\Utils;

// Helper class for globally recurring functions

class Helpers{
    
    public function sanitize($string){
        return htmlspecialchars(strip_tags($string));
    }

    public function returnObject(
        $success = false,
        $message = "Return object default message.",
        $payload = ""
    ){
        return json_encode(
            array(
                "success"	=> $success,
                "message"	=> $message,
                "payload"	=> $payload,
            )
        );
    }
}
?>