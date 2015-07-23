<?php

error_reporting('none');

require_once "orchestra/loginManager.class.php";
define('ARGUMENT_ERROR', 'ARGUMENT_ERROR');// TODO virer ça autre part
$loginManagerB = new loginManager('BADMIN');
$loginManagerF = new loginManager('FADMIN');

switch($_POST['action']){
    case 'add': // connexion
        if(!isset($_POST['login']) OR !isset($_POST['password'])){
            $rtn = array('state' => false, 'error' => ARGUMENT_ERROR);
            break;
        }
        $rtn = $loginManagerB->login($_POST['login'], $_POST['password']);
		if($rtn['state'] == false)
			break;
		
		$rtn = $loginManagerF->login($_POST['login'], $_POST['password']);
        break;
		
	case 'deco':
		$loginManagerB->disconnect();
		$loginManagerF->disconnect();
		$rtn = array('state' => true);
        break;
		
    default:
		$rtn = array('state' => false, 'error' => ARGUMENT_ERROR);
}

if($rtn['state'] == false && !isset($rtn['error']))
    $rtn['error'] = $loginManager->getError();//erreur renvoyé par le serveur buckutt

echo json_encode($rtn);
?>