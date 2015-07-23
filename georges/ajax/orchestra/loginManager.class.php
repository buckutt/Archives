<?php

require_once 'inc/config.inc.php';
require_once 'inc/soap.class.php';
require_once 'orchestra.class.php';

class loginManager extends orchestra{
	
    public function __construct($wsdl_name) {
		parent::__construct($wsdl_name);
    }

    //TODO chopper IP
    public function login($login, $pwd) {
		$rtn = array('state' => false);
		
		if (!is_numeric($pwd)) {
			$rtn['error'] = '"' . $pwd . '" n\'est pas un pin';
			return $rtn;
		}
		
		$this->WS->kill();// Pour être sur
        $result = $this->WS->login($login, 1, $pwd, "21.21.21.1");
		if ($result != 1) {
			$rtn['error'] = implode($this->WS->getErrorDetail($result),', ');
		} else {
			$_SESSION['user'] = array(
				'login' => $login
			);
			$rtn['login'] = $login;
			$rtn['state'] = true;
		}
		return $rtn;
    }
}

?>
