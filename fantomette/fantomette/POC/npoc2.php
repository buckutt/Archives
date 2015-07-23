<?php
$t = mktime();
session_start();
include 'config.inc.php';
include 'lib/nusoap.php';



//            $SADMIN = new nusoap_client($config['SADMIN'], true);
$i=100;
while($i--){
$SADMIN = unserialize($_SESSION['SADMIN']);

$SADMIN->getHistoriqueAchats(mktime(1, 2, 3, 4, 5, 2006),mktime(1, 2, 3, 4, 5, 2012));

unset($SADMIN);
}

//$_SESSION['SADMIN'] = serialize($SADMIN);
echo (mktime()-$t);
?>
