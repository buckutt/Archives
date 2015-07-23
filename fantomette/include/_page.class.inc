<?php
/******************* page.class ***************************************
Définition d'une page



**********************************************************************/

class Page {   
   var $titre = "";


   function Page() {
    global $config;           //constructeur pour instancier
    $this->titre = $config['site'];
   }

  /**
   * Fonction header
   * Affiche l'entete HTML du document
   *
   * @param $titre Titre affiché
   * @return empty
   */  
   
   function header($titre = '') {
      global $util,$session,$config;
      $this->headerHTML($titre);
   }


function yui(){

}

   /**
   * Fonction footer
   * Affiche le pied de page d'un document
   *
   * @return empty
   */  
   
  /**********************************************************/
   function footer () {
      global $util,$config;

      ?>
<hr /><i><?=$config['site']?></i>
	      <?php
      $this->footerHTML();
   }


  /**
   * Fonction headerHTML
   * Affiche l'entete HTML de 1er niveau : balise head...
   *
   * @param $titre Titre du document
   */  
   

   function headerHTML ($titre = '') {
      global $util, $horde, $registry, $turba;
      if (!empty($titre)) {
         $this->titre = '[site] ' . $titre;
      }

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
      <html>
       <head>
        <title><?=$this->titre?></title>
	<meta name="description" content="Site">
	<meta name="author" content="mateo">
	<meta name="robots" content="follow">
        <meta http-equiv="Window-target" content="_top">
	<meta content="text/html; charset=utf-8; http-equiv="Content-Type">
        <META HTTP-EQUIV="imagetoolbar" CONTENT="no">
	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
       <!-- <link rel="stylesheet" type="text/css" href="<?=$util->makeUrl('include/css-js/style.css')?>">-->
        <link rel="stylesheet" type="text/css" href="<?=$util->makeUrl('include/css-js/style.css')?>">
        <script type="text/javascript" src="<?=$util->makeUrl('include/css-js/javascript.js')?>"></script>
       </head>
      <body>

      <?php
   }

  /**
   * Fonction footerHTML
   * Affiche le pied de page
   *
   * @return empty
   */  
   

   function footerHTML () {
	echo '</body></html>';
   }


  /**
   * Fonction msgInfo
   * Affiche un texte d'information
   *
   * @param $text Text à afficher
   * @return empty
   */
   function msgInfo ($text) {
       global $util;

        echo '<div align="center">';
	$this->moduleheader("Info", 250);
	echo '<p align="center"><img src="'.$util->makeUrl('images/pics/msgInfo.gif').'" align="left" alt="">'.$text.'</p>';        
	$this->modulefooter();
	echo '</div><br>';
			      
   }


  /**
   * Fonction msgError
   * Affiche un message d'erreur
   *
   * @param $text Texte à afficher
   * @return empty
   */  
   function msgError ($text) {
      global $util;
      
      echo '<div align="center">';             
      $this->moduleheader("Erreur !", 250, '', '#FFCCCC');
      echo '<p align="center"><img src="'.$util->makeUrl('images/pics/msgError.png').'" align="left" alt="">'.$text.'</p>';        
      $this->modulefooter();
      echo '</div><br>';
						 
   }

  /**
   * Fonction moduleHeader
   * Affiche l'entete HTML d'un module
   *
   * @param $moduletitre Titre du module, affiché en tete
   * @param $position ('gauche' |'droite') Position sur la page d'accueil, permet de deduire automatiquement la taille du module
   * @param $tailletitre Taille de la case du titre en %
   * @param $color Couleur de fond du module, code couleur sans #
   * @param $config Boulean qui indique si le module est configurable (bas, haut, del)
   * @param $tablei Position dans la page du module configurable
   * @return
   */  
   function moduleheader ($moduletitre, $position='gauche', $tailletitre = 50, $color = 'FFFFFF', $config=false, $tablei='') {
      global $util, $widthmodule, $db, $session;

      if ($position=='gauche') {
         $widthmodule='500';
      } elseif ($position=='droite') {
         $widthmodule='240';
      } elseif (is_integer($position)) {
         $widthmodule=$position;
      } else {
         $widthmodule='100%';
      }

      

	$aparence=1;
//$util->get_pref($session->login,"apparence");
	switch($aparence){

	case '1':
?>
<!-- ==================================================== Debut du module <?=$moduletitre?>==================================================== //-->
          <table width="<?=$widthmodule ?>" border="0" cellpadding="0" cellspacing="0">
             <tr><td height="3" colspan="4"><img src="<?=$util->makeUrl('images/spacer.gif')?>" alt="" width="3" height="3"></td></tr>
             <tr class="titre">
              <td height="16" width="10"></td>
              <td class="oldblue" width="<?=$tailletitre?>%" nowrap><span class="moduleTitre">&nbsp;<?=$moduletitre?></span></td>
              <td><img src="<?=$util->makeUrl('images/dsz.png')?>" alt=""></td>
             
                   <td width="100%"><img src="<?=$util->makeUrl('images/spacer.gif')?>" alt="" width="100%" height="9"></td>
	      

              </tr>
            </table>
            <table width="<?=$widthmodule ?>" border="0"  class="oldblue" cellpadding="0" cellspacing="0">
             <tr>
              <td bgcolor="<?=$color?>">
              <div class="contenu">
<?
	break;
	case '2':

?>
<div class="ContentArrondiLEA2" style="background:#e0edf9;border-top:1px solid #6699FF;border-left:1px solid #6699FF;border-right:1px solid #6699FF;">
<img src="images/Coin-blue1-1.gif" class="coinHG" alt="corner"  height=4 width=4/><img src="images/Coin-blue1-2.gif" class="coinHD" alt="corner"  height=4 width=4/></div>
<div class="Content2"  style="background:#e0edf9;border-left:1px solid #6699FF;border-right:1px solid #6699FF;">
<?

	break;
	}
     
   }

  /**
   * Fonction modulefooter
   * Affiche le bas HTML d'un module
   *
   */  
   function modulefooter () {
     	global $util, $db, $session;
	$aparence=1;
//$util->get_pref($session->login,"apparence");
	switch ($aparence) {

		case '1':
?>			</div></td>
             		</tr>
           		</table>

<?
		break;

		case '2':
?>
			</div>
			<div class="ContentArrondiLEA2" style="background:#e0edf9;border-bottom:1px solid #6699FF;border-left:1px solid #6699FF;border-right:1px solid #6699FF;">
			<img src="images/Coin-blue1-4.gif" class="coinBG" alt="corner"  height=4 width=4 /><img src="images/Coin-blue1-3.gif" class="coinBD" alt="corner"  height=4 width=4 /></div></div>
<?
		break;

	}
	
   }

 
  /**
   * Fonction menu
   * Affiche le menu
   *
   */  
   function menu () {
      global $util, $db, $session;
	  	$end = '';
		foreach($session->droits as $droit){
			$end = $end."droit = '".$droit."' OR ";
		} 
		$end = $end.' 0 ';
		$result = $db->query("SELECT nom FROM menu WHERE  lien='' AND (".$end. ')');
		while($parent=$db->fetchArray($result)){
			echo '<H3>'.$parent[0].'</H3>';
			$res = $db->query("SELECT * FROM menu WHERE  parent='$parent[0]' AND lien!='' AND (".$end.')');
			while($liste=$db->fetchArray($res)){
				echo '&nbsp;<a href="'.$util->makeUrl($liste['lien']).'">'.$liste['nom'].'</a><br>';
			}
		}
		echo '<br><br>';
   }
 
}

?>
