<?php
// error_reporting('none');

$sideMenu = array('state' => true, 'items' => array());

require_once 'orchestra/fundationManager.class.php';
define('ARGUMENT_ERROR', 'ARGUMENT_ERROR');// TODO virer ça autre part
require_once 'inc/sideMenu.inc.php';
$fundationManager = new fundationManager();

$fund_list = $fundationManager->getAllFundationsAndRights();
if($fund_list['state']){
	// Menu admin
	$arr = array();
	foreach($fund_list['admin_rights'] as $line)
		addLinkToSubMenu($arr, $line);
	
	sortSubMenu($arr);
	$sideMenu['items'][] = array('title' => 'BuckUTT', 'items' => $arr);
	
	// Menu fundations
	foreach($fund_list['fundations'] as $fund){
		$arr = array();
		foreach($fund['rights'] as $line){
			addLinkToSubMenu($arr, $line);
		}
		sortSubMenu($arr);
		$sideMenu['items'][] = array('title' => $fund['name'], 'items' => $arr);
	}
}

echo json_encode($sideMenu);
?>
