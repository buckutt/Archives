<?php

error_reporting('none');

require_once 'orchestra/loginManager.class.php';

$loginManager = new loginManager(); // jamais ça doit arriver en login manager, DEMO PURPOSE ONLY comme on dit
$periods = $loginManager->getAllPeriod();
$rtn = array('state' => true,
             'periods' => array());
foreach ($periods as $value) {
    array_push($rtn['periods'], array(
		'id' => $value[0], 
		'name' => $value[1], 
		'date_begin' => '2012-12-12 00:00:00', 
		'date_end' => '2012-12-12 00:00:00',
		'can_edit' => true,//((bool)rand(0,1)),
		'can_del' => ((bool)rand(0,1)),
		'disable_edit_name' => true,//((bool)rand(0,1)),
		'disable_edit_date_begin' => true,//((bool)rand(0,1)),
		'disable_edit_date_end' => false//((bool)rand(0,1)),

	));
}
echo json_encode($rtn);
?>