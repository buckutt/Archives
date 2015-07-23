<?php

require_once 'lib/nusoap.php';
require_once 'config.inc.php';
require_once "include/tools.php";

class dashboardManager {

	//Accesseur du webservice FADMIN
	private $FADMIN;

	public function __construct() {
		global $config;
		if (isset($_SESSION['nusoap']['FADMIN'])) {
			$this->FADMIN = unserialize($_SESSION['nusoap']['FADMIN']);
		} else {
			$this->FADMIN = new nusoap_client($config['FADMIN'], true);
			$this->FADMIN->login("rosatber", 1, "5546", "21.21.21.1");
			$this->FADMIN->setIdFundation(2);
			$_SESSION['nusoap']['FADMIN'] = serialize($this->FADMIN);
		}
	}

	/*
	 * l'idée c'est de ne redonner que du truc exploitable easy en php = array php et pas un csv foireux
	 */

	public function getAvailableGroups() {

		return str_getcsv_lines($this->FADMIN->getAvailableGroups());
	}

	public function getNameFundation() {
		return $this->FADMIN->getNameFundation();
	}

	public function getGroup($grp_id) {
		$arr = str_getcsv_lines($this->FADMIN->getAvailableGroups());

		foreach ($arr as $grp) {
			if ($grp[0] == $grp_id) {
				$grp_name = $grp[1];
			}
		}
		if (isset($grp_name)) {
			return $grp_name;
		} else {
			return "not found à bricoler";
		}
	}

	public function setName($grp_id, $newName) {
		//si pb, on returne array(false,stringducodeerreur)
		return array(true);
	}

	public function delGroup($grp_id) {

		//si pb, on returne false et on se doute que l'id il existe pas !
		return true;
	}

	public function addGroup($name) {
		$id = 450;
		//si pb, on returne array(false,stringducodeerreur)
		return array(true, $id);
	}

	//En commentaire du faux code pour le principe
	/*

	   public function set($a,$b){

	   switch ($a){
	   case 'name':
	   $FADMIN->setTheName($b);
	   }
	   }


	   public function addPoints($array){

	   foreach ($array){

	   $FADMIN->addPoint($array['name']);
	   }

	   }
	 */
}

?>
