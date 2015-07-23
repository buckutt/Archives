<?php

error_reporting('none'); // sinon le moindre warning pourrit le json
define('ARGUMENT_ERROR', 'ARGUMENT_ERROR');// TODO virer ça autre part
require_once 'orchestra/pointManager.class.php';
$pointManager = new pointManager(); //

switch($_POST['action']){
    case 'add':
        if(!isset($_POST['name'])){
            $rtn = array('state' => false, 'error' => ARGUMENT_ERROR);
            break;
        }
        $rtn = array('state' => $pointManager->addPoint($_POST['name']));
        break;
    
    case 'edit':
        if(!isset($_POST['id']) OR !isset($_POST['name'])){
            $rtn = array('state' => false, 'error' => ARGUMENT_ERROR);
            break;
        }
        $rtn = array('state' => $pointManager->editPointName($_POST['id'], $_POST['name']));
        break;
    
    case 'delete':
        if(!isset($_POST['id'])){
            $rtn = array('state' => false, 'error' => ARGUMENT_ERROR);
            break;
        }
        $rtn = array('state' => $pointManager->deletePoint($_POST['id']));
        break;
    
    default:
		$points = $pointManager->getAllPoints();
		$rtn = array('state' => true,
					 'points' => array());
		foreach ($points as $value) {
			array_push($rtn['points'], array('id' => $value[0], 'name' => $value[1], 'can_edit' => true, 'can_del' => true));
		}
}

if($rtn['state'] == false && !isset($rtn['error']))
    $rtn['error'] = $pointManager->getError();//erreur renvoyé par le serveur buckutt

// $rtn['no_session'] = true;
echo json_encode($rtn);
?>