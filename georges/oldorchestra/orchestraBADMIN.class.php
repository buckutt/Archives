<?php

require 'orchestra.class.php';

	//Accesseur du webservice BADMIN

class orchestraBADMIN extends orchestra {

protected $BADMIN;

	public function __construct() {
		global $config;
		if (isset($_SESSION['nusoap']['BADMIN'])) {
			$this->BADMIN = unserialize($_SESSION['nusoap']['BADMIN']);
		} else {
			$this->BADMIN = new nusoap_client($config['BADMIN'], true);
			$this->BADMIN->login("rosatber", 1, "5546", "21.21.21.1");
			$_SESSION['nusoap']['BADMIN'] = serialize($this->BADMIN);
		}

parent::__construct();
$this->principalOrchestraWS = &$this->BADMIN;


	}



}

?>
