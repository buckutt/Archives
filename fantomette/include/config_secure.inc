<?php


//configurations
  $config['site']= "Buckutt Client Fantomette";
  //Gestion des erreurs
  $config['errorReporting'] = E_ALL ;                     //Sélection des erreurs affichées
  $config['errorView'] = true ;                           //Visibilité des erreurs (pas encore fait)

  //Pour tous les chemins, un slash au début, rien à la fin
  $config['includeDir'] = '/include';                     //Définition de tout
  $config['css'] = '/include/css-js';                     //Lieu des feuilles de style
  $config['adminDir'] = '';                         //lieu vers l'admin du site
  $config['baseUrl'] = 'http://buckutt.boriszanetti.com/fantomette_standalone';       //Url de base du site
  $config['baseUrls'] = $config['baseUrl'];
   $config['local'] = '';                            //suffixe désignant les dns locales
  $config['mailWebmaster'] = 'buckutt@googlegroups.com';           //Mail du webmaster du site
  $config['mailAsso'] = 'buckutt@googlegroups.com';                 //Mail de l'asso

//base de donnée  
  $database['type'] = 'mysql';
  $database['host'] = '172.16.1.2';
  $database['base'] = '';
  $database['user'] = '';
  $database['pass'] = 'pas regarder ici';
  
//Infos sur la page en cours
  $curPage['relativePath'] = dirname(__FILE__)."/..";
  //$curPage['niveauSecu'] = $niveauSecu;
  //$curPage['idPage'] = $idPage;
  //$curPage['groupUser'] = isset($groupUser)?$groupUser:'defaut';
  
  
include_once (dirname(__FILE__) . '/_db.class.inc');
//include_once (dirname(__FILE__) . '/_session.class.inc');
include_once (dirname(__FILE__) . '/_util.class.inc');
$util = new Util();
  
  
  

//SITE sans mysql ! et oui ca existe ;)
//$db = new Db_site ($database['type']);
//$db->connect($database['host'],$database['base'],$database['user'],$database['pass']);



  
  
?>
