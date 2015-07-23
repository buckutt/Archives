<?php

/**
 * on a ici les URL des differents WSDL cible 
 */
session_start();
$config['SERVER']['URL'] = 'http://localhost/buckutt/server/';
$config['WSDL']['SADMIN'] = $config['SERVER']['URL'] . 'SADMIN.class.php?wsdl';
$config['WSDL']['PBUY'] = $config['SERVER']['URL'] . 'PBUY.class.php?wsdl';
$config['WSDL']['SBUY'] = $config['SERVER']['URL'] . 'SBUY.class.php?wsdl';
$config['WSDL']['BADMIN'] = $config['SERVER']['URL'] . 'BADMIN.class.php?wsdl';
$config['WSDL']['FADMIN'] = $config['SERVER']['URL'] . 'FADMIN.class.php?wsdl';
?>
