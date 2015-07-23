<?php
  /******************* db.class ***************************************
     Définition d'une interface générique vers les bases de données






  **********************************************************************/

class Db_site {
   var $dbType;
   var $host = '';
   var $pass = '';
   var $user = '';
   var $base = '';

   function Db_site ($type) {
      global $util;
      switch ($type) {
        case 'mysql':
           $util->loadClass('Mysql') ;
           $this->dbType = new Mysql ();
        break;

        default:
           return false;
        break;
      }

   }

   //Se connecte à la base
   function connect ($hostIn, $baseIn, $userIn, $passIn) {
      $this->host = $hostIn;
      $this->user = $userIn;
      $this->pass = $passIn;
      $this->base = $baseIn;

      //$bs=$this->dbType;

      //$bs->connect($this);
      $this->dbType->connect($this);

   }
/*
   //Sélectionne une nouvelle base
   function selectDb ($query) {
      $result = $this->dbType->query($query);
      return $result;
   }
*/

   //Execute une requete SQL
   function query ($query, $debug = 0) {
      $result = $this->dbType->query($query, $debug);
      return $result;
   }

   //Retourne un champ de résultat
   function result($result, $column) {
      $result = $this->dbType->result($result, $column);
      return $result;
   }

   //Retourne l'id du dernier INSERT
   function insertId() {
      $result = $this->dbType->insertId();
      return $result;
   }

   //Retourne  le nombre de lignes d'un SELECT
   function numRows($result) {
      $result = $this->dbType->numRows($result);
      return $result;
   }

   //décompose un resultSet dns un tableau
   function fetchArray($result) {
      $result = $this->dbType->fetchArray($result);
      return $result;
   }
   
   //compose un resultSet dns un tableau
   function table($result) {
      $table = Array();
      while($result = $this->dbType->fetchArray($result)){
      	$table[] = $result;
      }
      
      return $result;
   }

   //retourne le nombre de lignes affectées par un UPDATE ou un DELETE
   function affectedRows() {
      $result = $this->dbType->affectedRows();
      return $result;
   }

   //Ferme une connexion
   function close() {
      $result = $this->dbType->close();
      return $result;
   }
      
}

?>
