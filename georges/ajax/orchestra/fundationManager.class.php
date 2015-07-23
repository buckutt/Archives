<?php

require_once 'inc/config.inc.php';
require_once 'inc/soap.class.php';
require_once 'orchestra.class.php';


class fundationManager extends orchestra {

    public function __construct() {
		parent::__construct('BADMIN');
    }

    public function getAllFundationsAndRights(){
		$rtn = array('state' => false, 'admin_rights' => array(), 'fundations' => array());
		
		/*
			0	rig_id
			1	rig_name
			2	fun_id
			3	fun_name
			4	poi_id
			5	rig_admin
		*/
		$liste_droits = $this->WS->getDroitsParFundations();
		if(!is_array($liste_droits))
			return $rtn;
			
		foreach($liste_droits as $droit_csv){
			$droit = array(
				'rig_id' => $droit_csv[0],
				'rig_name' => $droit_csv[1],
				'fun_id' => $droit_csv[2],
				'fun_name' => $droit_csv[3],
				'poi_id' => $droit_csv[4],
				'rig_admin' => $droit_csv[5]
			);
			// On sépare les droits admin des droits de fondations
			// On évite également les doublons
			if($droit['fun_id'] == 0 || empty($droit['fun_id'])){// droit admin
				if(!array_key_exists($droit['rig_id'], $rtn['admin_rights']))
					$rtn['admin_rights'][$droit['rig_id']] = $droit;
				continue;
			}
			
			// droit de fondation, si la fondation existe puis si le droit existe
			if(!array_key_exists($droit['fun_id'], $rtn['fundations']))
				$rtn['fundations'][$droit['fun_id']] = array('id' => $droit['fun_id'], 'name' => $droit['fun_name'], 'rights' => array());
			
			if(!array_key_exists($droit['rig_id'], $rtn['fundations'][$droit['fun_id']]))
				$rtn['fundations'][$droit['fun_id']]['rights'][$droit['rig_id']] = $droit;
		}
		
		$rtn['state'] = true;
		return $rtn;
    }

}

?>
