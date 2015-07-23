<?php
$right2links = array(
	'bloqueur' => array('links' => array(
			array('menu_text' => 'Bloquer', 'menu_link' => 'bloque'))
	),
	'fund_trezo' => array('links' => array(
			array('menu_text' => 'Trésorerie', 'menu_link' => 'fundationSales'))
	),
	'droit_admin' => array('children' => array('buckutt_trezo', 'point_admin', 'resp_fundations')),
	'fund_chef' => array('children' => array('fund_trezo', 'vente_admin', 'group_editor')
	),
	'buckutt_trezo' => array('links' => array()
	),
	'point_admin' => array('links' => array(
			array('menu_text' => 'Points', 'menu_link' => 'point'))
	),
	'vente_admin' => array('links' => array(
			array('menu_text' => 'Periodes', 'menu_link' => 'period'),
			array('menu_text' => 'Produits', 'menu_link' => 'product'))
	),
	'resp_fundations' => array('links' => array()
	),
	'group_editor' => array('links' => array(
			array('menu_text' => 'Groupes', 'menu_link' => 'groups'))
	)
);

function addLinkToSubMenu(&$ssmenu, &$droit){
	global $right2links;
	
	if(!array_key_exists($droit['rig_name'], $right2links))
		return;

	if(isset($right2links[$droit['rig_name']]['links'])){
		foreach($right2links[$droit['rig_name']]['links'] as $link){
			// On vérifie que cette entrée est pas déjà dans le menu
			$found = false;
			foreach($ssmenu as $ln)
				if(strcasecmp($link['menu_text'], $ln['menu_text']) == 0)
					$found = true;
			
			if($found)
				continue;
			
			$link['menu_link'] = '#'.$link['menu_link'];
			if(((int)$droit['fun_id']) != 0)// si la page doit comporter un num de fondation dans le GET
				$link['menu_link'] .= '/'.$droit['fun_id'];
			
			$ssmenu[] = $link;
		}
	}
	
	if(isset($right2links[$droit['rig_name']]['children'])){
		foreach($right2links[$droit['rig_name']]['children'] as $child_name){
			$droit_copy = $droit;
			$droit_copy['rig_name'] = $child_name;
			addLinkToSubMenu($ssmenu, $droit_copy);
		}
	}
}

function sortSubMenu(&$ssmenu){
	for($i = 0; $i < count($ssmenu); ++$i){
		for($j = 0; $j < count($ssmenu); ++$j){
			if(strcasecmp($ssmenu[$i]['menu_text'], $ssmenu[$j]['menu_text']) < 0){
				$tmp = $ssmenu[$i];
				$ssmenu[$i] = $ssmenu[$j];
				$ssmenu[$j] = $tmp;
			}
		}
	}
}
?>
