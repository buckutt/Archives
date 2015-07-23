<?php

include 'lib/nusoap.php';
include 'config.inc.php';

if(isset($_SESSION['nusoap']['PBUY'])){
$PBUY = unserialize($_SESSION['nusoap']['PBUY']); 

}else{

$PBUY = new nusoap_client($config['PBUY'] , true);

}


var_dump($PBUY->login(6362, "5546", 2, 0, 1));
var_dump($PBUY->getSellerIdentity());


?>
