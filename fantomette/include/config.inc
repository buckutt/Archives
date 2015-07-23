<?php
/********************************************************************
  FICHIER D'INITIALISATION, APPELE PAR TOUTES LES PAGES

 ********************************************************************/

session_start();
error_reporting(E_ALL);
include_once (dirname(__FILE__) . '/config_secure.inc');
include_once (dirname(__FILE__) . '/_page.class.inc');
// IDENTIFICATION


function pre($data){

	$rand = 'rand'.rand(0,99999);

	//echo '<pre id="'.$rand.'" onclick="this.style.display=\'none\'"  style="background-color:red;">';
	echo '<pre id="'.$rand.'" style="background-color:#F00;overflow:hidden;">';
	if(is_array($data)){
		print_r($data);
	}else{
		echo ($data);
	}
	echo '</pre>';


//TODO: A revoir ca va planter sans le framework YUI (js de yahoo)
//A revoir
	echo '
		<script type="text/javascript">
		var attributes = {
width: { to: 0 },
       height: { to: 0 },
		};
	var anim'.$rand.' = new YAHOO.util.Anim(\''.$rand.'\', attributes, 1, YAHOO.util.Easing.easeOut);
	YAHOO.util.Event.on(\''.$rand.'\', \'click\', function() {
			anim'.$rand.'.animate();
			});
	</script>


		';
}

function logevent($txt){
	$var = fopen(dirname(__FILE__).'/event.log','a');
	fwrite($var,date('r')."\t".$txt."\n");
}

//Si c moi qui ai fait ca je men souviens pu ! (SID le 27/12/2011)
//include_once('erreur.class.inc');
//$erreur = new Erreur();

//Ca ca me dit qqchose mais je voit pas pk la classe estpas la !
//include_once('yui.class.inc');

//$yui = new Yui('animation data');
//$yui->load();



//fonction pour verifier les rafraichissement de page qui renvoient des post !
function postcheck(){
	$reset = 0;
	if(isset($_POST) && count($_POST) > 0 && isset($_SESSION['md5post'])){
		if(md5(serialize($_POST)) == $_SESSION['md5post']){
			echo '<h1>Vous venez de reposter des informations deja postes , c pas bien !</h1>';
			$reset = 1;
		}

	}
	$_SESSION['md5post'] = md5(serialize($_POST));
	if($reset)
		$_POST = Array();
}
function verif($d){
	return verifDroits($d);
}

function verifDroits($droit){
	if(in_array($droit,$_SESSION['droits'])){
		return true;
	}
}

?>
