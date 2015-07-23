<?php
  /******************* page.class ***************************************
     Définition d'une page






  **********************************************************************/

class Mysql {
   var $connexion;

   
   function Mysql () {

   }


   function connect ($db) {

      if (!$this->connexion = mysql_connect($db->host,$db->user, $db->pass)) {
         $this->error();
         exit;
      }
      if (!$result = mysql_select_db($db->base, $this->connexion)) {
         $this->error();
         exit;
      }

      return ($result);

   }

   /**
     Execute une requete
     debug == 1 => on affiche la requete

   */
   function query($query, $debug = 0) {
      if ($debug) {
         echo $query;
      }
      if (!$result = mysql_query($query, $this->connexion)) {
         $this->error();
      }
      return ($result);
   }

   //Retourne un champ de résultat
   function result($result, $column) {
      $result = mysql_result($result,$column);
      return $result;
   }

   //Retourne l'id du dernier INSERT
   function insertId() {
      $result = mysql_insert_id();
      return $result;
   }

   //Retourne  le nombre de lignes d'un SELECT
   function numRows($result) {
      if ($result) {
         $result = mysql_num_rows($result);
         return $result;
      } else {
         return 0;
      }
   }

   //décompose un resultSet dans un tableau
   function fetchArray($result) {
      $result = mysql_fetch_array($result);
      return $result;
   }

   //retourne le nombre de lignes affectées par un UPDATE ou un DELETE
   function affectedRows() {
      $result = mysql_affected_rows($this->connexion);
      return $result;
   }

   //Ferme une connexion
   function close() {
      $result = mysql_close($this->connexion);
      return $result;
   }


   //Affiche l'erreur sql
   function error() {
      echo '<table border="0" cellspacing="1" cellpadding="2" bgcolor="#DD0000" align="center">
             <tr>
              <td><font color="#FFFFFF"><b>Erreur SQL (n°'.mysql_errno().')</b></font></td>
             </tr>
             <tr>
              <td bgcolor="#FFFFFF">'.mysql_error().'</td>
             </tr>
           </table>';
   }
}

?>
