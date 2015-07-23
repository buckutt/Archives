<?php

require_once 'lib/nusoap.php';
require_once 'config.inc.php';
//require_once "include/tools.php";
require_once 'orchestra.class.php';

class loginManager extends orchestra {

    //Accesseur du webservice FADMIN
    private $FADMIN;

    public function __construct() {
        
    }

    //TODO chopper IP
    public function login($login, $pwd) {
        global $config;

        if (!is_numeric($pwd))
            return 0;

        $this->FADMIN = new nusoap_client($config['FADMIN'], true);
        $result = $this->FADMIN->login($login, 1, $pwd, "21.21.21.1");
        $_SESSION['nusoap']['FADMIN'] = serialize($this->FADMIN);


        return $result;
    }

    public function getErrorDetail($id_error) {

        function str_getcsv_lines($string_csv) {

            $array0 = explode(";\n", $string_csv, -1);
            $array2 = array();
            foreach ($array0 as $array1) {
                $array2[] = str_getcsv($array1, ',', '"');
            }
            return $array2;
        }

         $arr = str_getcsv_buckutt($this->FADMIN->getErrorDetail($id_error) , ',');

        return $arr;
    }

}

?>
