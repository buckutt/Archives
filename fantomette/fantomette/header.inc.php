<?php
//Obligatoire
$niveauSecu = 'log'; //Niveaux de sécurité (voir $session->authPage() )

include ('../include/config.inc');
//TODO: rendre generique les inc.php ou .inc , par cq on prefereras les .inc.php

require_once('config.inc.php');

$page = new Page();
$page->header('Système de paiement', 'buckutt');

?>
<link rel="stylesheet" type="text/css" href="<?php echo $config['baseUrl']?>/fantomette/buckutt.style.css" />
<link type="text/css" href="css/flick/jquery-ui-1.8.4.custom.css" rel="stylesheet" />
<script type="text/javascript" src="js/jquery-1.4.2.min.js">
</script>
<script type="text/javascript" src="js/jquery-ui-1.8.4.custom.min.js">
</script>
<?php 
error_reporting(E_ERROR);

//$url = 'http://buckutt.dyndns.org/server/';
//TODO:rendre plus propre ca :
$url = $config['SERVER']['URL'];

// En fonction des pages, on appel ou non les wsdl utiles
//TODO: revoir avec le fichier de configuration
$wsdlSADMIN = $url.'SADMIN.class.php?wsdl';
if ($needSBUY){
  $wsdlSBUY = $url.'SBUY.class.php?wsdl';
}
if ($needFADMIN){
  $wsdlFADMIN = $url.'FADMIN.class.php?wsdl';
}
if ($needBADMIN){
  $wsdlBADMIN = $url.'BADMIN.class.php?wsdl';
}
// Web Services Client
include_once 'lib/nusoap.php';


/**
 * Implémentation de la fonction str_getcsv_buckutt
 * @return Array $array0
 * @param String $string_csv
 * @param String $pattern
 */
function str_getcsv_buckutt($string_csv, $pattern) {
  if (!empty($string_csv) && is_string($string_csv)) {
    $array0 = explode(";\n", $string_csv, -1);
    foreach ($array0 as $i=>$array1) {
      $array2 = substr($array1, 1, -1);
      $array0[$i] = explode('"'.$pattern.'"', $array2);
      foreach ($array0[$i] as $j=>$array3) {
        $array0[$i][$j] = $array3;
      }
    }
    return $array0;
  } else { return 400; }
}


// La fonction str_getcsv_buckutt n'existe qu'à partir de php 5.3 donc on la crée si php < 5.3
/*
//TODO: rendre propre ca en utilisant la fonction de php5.3 au lieu de la bricole
if (!function_exists('str_getcsv_buckutt')){
  include_once('str_getcsv_buckutt.inc.php');
}
*/

// Affichons ce nombre au format français
function credit_format ($credit) {
  setlocale(LC_MONETARY, 'fr_FR');
  return money_format('%n', $credit / 100);
}

//TODO:enlever ca d'ici !
//Fonction a virer a la fin qui fait un trace pour el debuggage( j'en suis assez fier ;) )
$color = Array("#BBFF00", "#CCFFCC", "#FFFFCC", "#CCAACC", "#FFAA88", "#BBCCFF", "#BBFFBB", "#00FF00");
$atrib = Array();
function trace($info, $level = 10, $line = 0, $file = 0)
{
  global $color, $atrib;

  if (!in_array($file, $atrib))
  {
    $atrib[] = $file;
  }
  if ($level > 0)
  {
    echo '<pre style="background-color:'.$color[array_search($file, $atrib)].'">';
    echo "<b>At line $line on file $file</b> \n";
    print_r($info);
    echo '</pre>';
    $txt = "\n_________________________\n".date('r')."\nAt line $line on file $file\n".print_r($info, true);
    //file_put_contents("/media/gros/share/trace.log",file_get_contents("/media/gros/share/trace.log").$txt);

  }
}

?>
