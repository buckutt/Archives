<?php

require 'orchestra.class.php';

	//Accesseur du webservice FADMIN

class orchestraFADMIN extends orchestra {

protected $FADMIN;

	public function __construct() {
		global $config;
		if (isset($_SESSION['nusoap']['FADMIN'])) {
			$this->FADMIN = unserialize($_SESSION['nusoap']['FADMIN']);
			//en attendant
			$this->FADMIN->setIdFundation(2);
		} else {
			header('Location: index.php');
		//A supprimer pour les tests. Enlever les // si on veut pas utiliser la connexion standard
		//	$this->FADMIN = new nusoap_client($config['FADMIN'], true);
		//	$this->FADMIN->login("rosatber", 1, "5546", "21.21.21.1");
		//	$this->FADMIN->setIdFundation(2);
		//	$_SESSION['nusoap']['FADMIN'] = serialize($this->FADMIN);
		}

parent::__construct();
$this->principalOrchestraWS = &$this->FADMIN;


	}



}

?>
