<?php

require_once 'inc/config.inc.php';
require_once 'inc/soap.class.php';
require_once 'orchestra.class.php';

class pointManager extends orchestra {

    public function __construct(){
		parent::__construct('BADMIN');
    }

    public function getAllPoints(){
        return $this->WS->getAllPoints();
    }

    public function addPoint($name){
        $this->ResultCode = $this->WS->addPoint($name);
        return $this->ResultCode == 1;
    }
    
    public function editPointName($id, $name){
        $this->ResultCode = $this->WS->editPointName((int)$id, $name);
        return $this->ResultCode == 1;
    }
    
    public function deletePoint($id){
        $this->ResultCode = $this->WS->deletePoint((int)$id);
        return $this->ResultCode == 1;
    }

}

?>
