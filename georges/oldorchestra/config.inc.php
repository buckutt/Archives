<?php
session_start();

//$config['SERVER']['URL'] = 'http://buckutt.boriszanetti.com/server/';
$config['SERVER']['URL'] = 'http://localhost/buckutt/server/';
$config['SADMIN'] = $config['SERVER']['URL'].'SADMIN.class.php?wsdl';
$config['PBUY'] = $config['SERVER']['URL'].'PBUY.class.php?wsdl';
$config['SBUY'] = $config['SERVER']['URL'].'SBUY.class.php?wsdl';
$config['BADMIN'] = $config['SERVER']['URL'].'BADMIN.class.php?wsdl';
$config['FADMIN'] = $config['SERVER']['URL'].'FADMIN.class.php?wsdl';


?>
