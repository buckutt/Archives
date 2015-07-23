<?php
$t = time();
session_start();


include 'config.inc.php';
$SADMIN = new SoapClient($config['SADMIN'],array('trace' => 1, 'exceptions' => 1));
$SADMIN->login($_SESSION['login'][0],$_SESSION['login'][1],$_SESSION['login'][2],$_SESSION['login'][3]);
var_dump($SADMIN->getHistoriqueAchats(mktime(1, 2, 3, 4, 5, 2006),mktime(1, 2, 3, 4, 5, 2012)));

echo (time() - $t);
?>

