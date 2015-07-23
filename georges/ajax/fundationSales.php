<?php

error_reporting('none');
// en POST on demandera une date_rang mais aussi une fund id si le mec gère plusieurs fondation ou est buckutt_admin
$date_range_begin = '10/09/2011';
$date_range_end = '10/09/2012';

if(isset($_POST['date_range_begin']) AND isset($_POST['date_range_end'])){
    $date_range_begin = $_POST['date_range_begin'];
    $date_range_end = $_POST['date_range_end'];
}

$rtn = array('state' => true,
             'fundation' => array('id' => 15, 'name' => 'toto'),
             'date_range' => array('begin' => $date_range_begin, 'end' => $date_range_end),
             'sales' => array());
for($i=0; $i<100; ++$i) {
    array_push($rtn['sales'], array('object_name' => 'objet '.$i, 'point_name' => 'point '.$i, 'sold_qty' => $i, 'profits' => $i*100));
}
echo json_encode($rtn);
?>