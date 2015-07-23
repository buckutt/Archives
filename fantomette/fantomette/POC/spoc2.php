<?php

$t=mktime();

session_start();
include 'config.inc.php';
include 'lib3/SoapClientConnected.class.php';


$i=100;
while($i--){
$SADMIN = new SoapClientConnected($config['SADMIN'],array('trace' => 1, 'exceptions' => 1));
$SADMIN->getHistoriqueAchats(mktime(1, 2, 3, 4, 5, 2006),mktime(1, 2, 3, 4, 5, 2012));

unset($SADMIN);
}
echo (mktime() - $t);
?>
