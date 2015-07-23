<?php
$t=time();
session_start();
include 'config.inc.php';
include 'lib/nusoap.php';

$_SESSION['login'] = Array("rosatber", 1, "5546", "21.21.21.1");


            $SADMIN = new nusoap_client($config['SADMIN'], true);
$SADMIN->login($_SESSION['login'][0],$_SESSION['login'][1],$_SESSION['login'][2],$_SESSION['login'][3]);
var_dump($SADMIN->getHistoriqueAchats(mktime(1, 2, 3, 4, 5, 2006),mktime(1, 2, 3, 4, 5, 2012)));

$_SESSION['SADMIN'] = serialize($SADMIN);
echo (time()-$t);
?>
