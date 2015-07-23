<?php
include_once('OrchestraException.class.php');
/**
 * ça permet de passer outre le fait que un soap client ne se serialise pas en session et que
 * nusoap c'est buggé 
 */
class soap {

    private $client;
    private $wsdl;
    private $firstUse;

    /**
     * on donne l'url du wsdl, la classe se debrouille pour recuperer la session courante
     * si elle existe, sinon il en crée une
     * => on serialise quedal, on fait juste une bonne utilisation de la session
     * @param string $wsdl 
     */
    public function __construct($wsdl) {
        $this->wsdl = $wsdl;
    }

    /**
     * on initialise la premiere fois qu'on l'utilise, on fait du lazy init 
     */
    private function initialize() {
        if (!isset($_SESSION)) {
            session_start();
        }
        // on stock dans soap->"http://truc/wsdl"
        if (!isset($_SESSION['SOAP'][$this->wsdl])) {
            $this->create();
        } else {
            $this->cookie = $_SESSION['SOAP'][$this->wsdl];
            $this->wakeup();
        }
    }

    /**
     * methode pour initier une session 
     */
    private function create() {
		// sans cache
        $this->client = new SoapClient($this->wsdl, array("cache_wsdl" => WSDL_CACHE_NONE));
        $this->firstUse = true;
    }

    /**
     * methode pour reveiller une session 
     */
    private function wakeup() {
		// on mets du cache vu qu'on reutilise le cookie d'un client qui s'est resseté (via cache none) donc c'est bon
		$this->client = @new SoapClient($this->wsdl, array("cache_wsdl" => WSDL_CACHE_BOTH));
		// on mets le cookie qui va bien, pareil, pas generique
		$this->client->__setCookie("PHPSESSID", $this->cookie);
    }

    /**
     * là c'est pour pouvoir s'en servir comme soapclient, avec du $soap->methode($arg1, $arg2) de maniere 
     * transparente
     * on y fait des eventuels traitements => si on a killé entre temps, on reconstruit
     * => si on a du csv qui arrive, on convertit en array php
     * @param type $name
     * @param type $arguments
     * @return type 
     */
    public function __call($name, $arguments) {
		// On desactive xDebug car c'est lui qui bug comme expliqué dans ces threads:
		// http://stackoverflow.com/questions/1406632/checking-a-url-is-valid-from-php-soap-client
		// http://bugs.xdebug.org/view.php?id=249
		xdebug_disable();
		try{
			// si killé entre temps ou jamais initialisé, on recrée
			if (!isset($this->client) && isset($this->wsdl)) {
				$this->initialize();
			}
		}
		catch(SoapFault $e){
			throw new OrchestraException('Impossible de joindre le serveur centrale.', $e);
		}
		
		try{
			// on applique sur notre soap client
			$rtn = call_user_func_array(array($this->client, $name), $arguments);
		}
		catch(SoapFault $e){
			throw new OrchestraException('Erreur d\'exécution sur la fonction '.$name.' au niveau du serveur centrale.', $e);
		}
		xdebug_enable();
        // on est obligé de faire une requete pour chopper un cookie, donc on attends la premiere
        
		if ($this->firstUse) {
            // le "PHPSESSID" c'est pas generique, vaudrait mieux chopper tout les cookies
            $this->cookie = $this->client->_cookies["PHPSESSID"][0];
            $_SESSION['SOAP'][$this->wsdl] = $this->cookie;
            $this->firstUse = false;
        }

        // si on detecte du csv (check si ","), on decode
        if (strpos($rtn, '","') != false) {
            $rtn = $this->str_getcsv_lines($rtn);
            if (count($rtn) == 1) {
                $rtn = array_pop($rtn);
            }
        }
        return $rtn;
    }

    /**
     * decode un csv venant de chez buckutt en array à 2D (comme un tableur)
     * @param string $string_csv
     * @return array 
     */
    private function str_getcsv_lines($string_csv) {
        $array0 = explode(";\n", $string_csv, -1);
        $array2 = array();
        foreach ($array0 as $array1) {
            $array2[] = str_getcsv($array1, ',', '"');
        }
        return $array2;
    }

    /**
     * si on veut tuer notre soap, on le kill
     * ça n'est pas dans le destructeur car si on le dit pas expressement, on veut garder notre
     * soap pour plus tard ! 
     */
    public function kill() {
        unset($_SESSION['SOAP'][$this->wsdl]);
        unset($this->client);
    }

}

?>
