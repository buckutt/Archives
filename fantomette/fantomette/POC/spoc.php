<?php

$t=time();

session_start();
include 'config.inc.php';
include 'lib3/SoapClientConnected.class.php';


$SADMIN = new SoapClientConnected($config['SADMIN'],array('trace' => 1, 'exceptions' => 1));
$SADMIN->loginSession("rosatber", 1, "5546", "21.21.21.1");

var_dump($SADMIN->getHistoriqueAchats(mktime(1, 2, 3, 4, 5, 2006),mktime(1, 2, 3, 4, 5, 2012)));

echo (time() - $t);
?>
