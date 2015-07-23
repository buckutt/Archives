<?php

require_once 'lib/nusoap.php';
require_once 'config.inc.php';
require_once "include/tools.php";
require_once 'orchestraFADMIN.class.php';

class demochamps extends orchestraFADMIN {

    public function __construct() {

        parent::__construct();
    }

    /*
     * l'idée c'est de ne redonner que du truc exploitable easy en php = array php et pas un csv foireux
     */

    public function getAvailableCategory() {
        return str_getcsv_lines($this->FADMIN->getAvailableCategory());
    }

    public function getAvailablePromotion() {
        return str_getcsv_lines($this->FADMIN->getAvailablePromotion());
    }

    public function getExistingPromotionSteps($promo_id) {
        return $this->FADMIN->getExistingPromotionSteps($promo_id);
    }

    public function getAvailablePeriods() {
        return str_getcsv_lines($this->FADMIN->getAvailablePeriods());
    }

    public function getAvailableGroups() {
        return str_getcsv_lines($this->FADMIN->getAvailableGroups());
    }

    public function getAvailablePoints() {
        return str_getcsv_lines($this->FADMIN->getAvailablePoints());
    }
    
}

?>
