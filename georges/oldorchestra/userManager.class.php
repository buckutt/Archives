<?php

require_once 'lib/nusoap.php';
require_once 'config.inc.php';
//require_once "include/tools.php";
require_once 'orchestraBADMIN.class.php';

class userManager extends orchestraBADMIN {



	public function __construct(){

		parent::__construct();

	}

	public function getAllBlockedUsers() {

		return str_getcsv_lines($this->BADMIN->getAllBlockedUsers());
	}

	public function deblockUser($id) {

		return str_getcsv_lines($this->BADMIN->deblockUser($id));
	}
}
?>
