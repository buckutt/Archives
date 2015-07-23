<?php

set_exception_handler('OrchestraException::exceptionToJSon');
class OrchestraException extends Exception{
	private $messageOrchestre;
	private $messageException;
	
	public static function exceptionToJSon($exception){
        echo json_encode(
			array('state' => false, 
				  'error' => (method_exists($exception, 'getError') ? $exception->getError() : $exception->getMessage())
				  )
			);
    }
	
	function __construct($messageOrchestre, $exception = null) 
    {
        $this->messageOrchestre = (string)$messageOrchestre;
        $this->messageException = $exception->getMessage();
    }
	
	function getError()
	{
        return $this->messageOrchestre."\n".$this->messageException;
    }
	
}

?>
