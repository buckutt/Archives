<?php

error_reporting('none');

$rtn = array('state' => true,
             'products' => array(),
             'groups' => array(),
             'periods' => array(),
             'points' => array());

for($i = 0; $i < 30; ++$i) {
    array_push($rtn['products'], array(
		'id' => $i, 
		'name' => 'product '.$i,
		'unique' => 'oui',
		'image_id' => 1,
		'stock' => -1,
		'type' => 'product',
		'prices' => array(
						array('group' => array('id' => 1, 'name' => 'users'), 'price' => 200),
						array('group' => array('id' => 2, 'name' => 'admins'), 'price' => 150)
					),
		'periods' => array(
						array('id' => 1, 'name' => 'A11', 'date_begin' => '2012-12-12 00:00:00', 'date_end' => '2012-12-12 00:00:00')
					),
		'points' => array(
						array('point' => array('id' => 1, 'name' => 'point 1'), 'priority' => 100),
						array('point' => array('id' => 2, 'name' => 'point 2'), 'priority' => 100)
					)
	));
}
array_push($rtn['groups'], array(
		'id' => 1, 
		'name' => 'users'
	));
for($i = 0; $i < 10; ++$i) {
    array_push($rtn['groups'], array(
		'id' => $i+2, 
		'name' => 'group'.$i
	));
}

for($i = 0; $i < 10; ++$i) {
    array_push($rtn['periods'], array(
		'id' => $i, 
		'name' => 'periode'.$i,
		'date_begin' => '2012-12-12 00:00:00', 
		'date_end' => '2012-12-12 00:00:00'
	));
}

for($i = 0; $i < 10; ++$i) {
    array_push($rtn['points'], array(
		'id' => $i, 
		'name' => 'point'.$i
	));
}

echo json_encode($rtn);
?>