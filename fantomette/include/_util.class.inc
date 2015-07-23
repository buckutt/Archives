<?php
  /******************* util.class ***************************************
     Plein de fonctions qui peuvent être utiles à tout le monde






  **********************************************************************/

class Util {
   var $jour = array ();
   var $mois = array ();

   function Util() {
      $this->jour = array ( 0 => 'Dimanche', 1 => 'Lundi', 2 => 'Mardi', 3 => 'Mercredi', 4 => 'Jeudi', 5 => 'Vendredi', 6 => 'Samedi');
      $this->mois = array ( 1 => 'Janvier', 2 => 'Février', 3 => 'Mars', 4 => 'Avril', 5 => 'Mai' , 6 => 'Juin', 7 => 'Juillet', 8 => 'Août', 9 => 'Septembre', 10 => 'Octobre', 11 => 'Novembre', 12 => 'Décembre');

   }

   //Formatte une date : on lui donne YYYY-MM-DD et on ressort un truc comme on veut
   function formatDate ($date, $format = 'd/m/Y') {
      if (ereg( "^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$", $date, $regs )) {
         return (date($format,mktime (0,0,0,$regs[2],$regs[3],$regs[1])));
     } else if (preg_match("/^([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})$/",$date, $regs) ) {
         return (date($format,
                           mktime ($regs[4],$regs[5],$regs[6],
                                   $regs[2],$regs[3],$regs[1])));
      } elseif (preg_match("/^([0-9]{4})\-([0-9]{2})\-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})/",$date,$regs)){
              return (date($format,
                        mktime ($regs[4],$regs[5],$regs[6],
                                $regs[2],$regs[3],$regs[1])));

      } else {
         return $date;
      }
   }

   //Charge une class (permet d'éviter de la charger deux fois)
   function loadClass($className) {
      global $curPage, $config;

      $file = $curPage['relativePath'] . $config['includeDir'] . '/' . strtolower($className) . '.class.inc';
      if (is_file($file)) {
         if (!class_exists ( $className)) {
            include_once ($file);
         }
      }
   }

   function securedloadClass($className) {
      global $curPage, $session, $config;

        if( $session->verif_droits($className) ) {

             $file = $curPage['relativePath'] . $config['includeDir'] . '/' . strtolower($className) . '.class';
             if (is_file($file)) {
                if (!class_exists ( $className)) {
                   include_once ($file);
                }
             }
        }
   }

   //makeUrl on fournit une url relative à la racine, et fournit une url absolue
   function makeUrl ($relativePath = '') {
      global $config,$session;
      //Vérifie si le client accepete les cookies
         if (ereg("^/", $relativePath)) {
             $base = $config['baseUrl'];
         } else {
             $base = $config['baseUrl'] . '/';
         }

         $url = $base . $relativePath;

         //Vérifie si l'utilisateur accepte les cookies
         //et si il a bien recu la variable de session en cookie
        return($url);
   }

   //Affiche la définition et les valeurs d'un objet (type inconnu)
   function objetDescription ($objet) {
      ?>
<table width="200" border="0" cellspacing="1" cellpadding="0" bgcolor="#000000" align="center">
	<tr>
		<td align="center">
			<font color="#FFFFFF"><b>Description ('.gettype($objet).')</b></font>
		</td>
        </tr>
        <tr>
		<td valign="middle" height="110" bgcolor="#FFFFFF">
<?
      		if (is_array($objet)) {
?>
			<table border="1" cellspacing="0">
				<tr>
					<th colspan="3">'.count($objet) . ' éléments</th>
				</tr>
        			<tr>
					<th>Clé</th><th>Type</th><th>Valeur</th>
				</tr>
<?
         		foreach ($objet as $name => $value) {
            			echo '<tr><td>' . $name . '</td><td>' . gettype ($objet[$name]) . '</td><td>' . $objet[$name] . '</td></tr>';
         		}
?>
			</table>
<?
      		} elseif (is_object($objet)) {
?>
			<table border="1" cellspacing="0">
				<tr>
					<th>Clé</th><th>Type</th><th>Valeur</th>
				</tr>
<?
         		$class_vars = get_class_vars(get_class($objet));
         		foreach ($class_vars as $name => $value) {
            			echo '<tr><td>' . $name . '</td><td>' . gettype ($objet->$name) . '</td><td>' . $objet->$name . '</td></tr>';
         		}
?>
			</table>
<?
 		} else {
?>
		type non-analysé
<?
      		}
?>
      		</td>
	</tr>
</table>
<?
   }


//fonction que je garde pour faire un lien avec le site etu si possible !
   function mail ($email) {
	return "javascript:open_compose_win('popup=1&amp;to=".urlencode($email)."&amp;cc=&amp;bcc=&amp;msg=&amp;subject=&amp;thismailbox=INBOX');";
         //return $this->makeUrl('mail/imp/compose.php?popup=1&to='.$email.'&cc=&bcc=&msg=&subject=&thismailbox=INBOX');

   }

   function verifForm ($value, $fieldType) {
      switch ($fieldType) {

         //Email
         case 'email':
            $result = ereg("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)+$",$value);
            return $result;
         break;

		 //Telephone, n'importe quel standard
		 case 'tel':
			$result = ereg("^[0-9_.()+-]+$",$value);
			return $result;
         break;

         //Texte restreint
         case 'login':
            $result = ereg("^[a-z0-9]{4,8}$",$value);
            return $result;
         break;

         //Texte mais sans balise
         case 'txtBrut':

         break;

         //Avec plein de trucs
         case 'txtRich':

         break;
      }
   }

   /**
    * Fonction show_object
    *
    * @param $serialized_object Object sous la forme sérialisée
    * @param $object_name Nom de l'objet
    * @return Variable à afficher
    */
   function show_object($serialized_obj,$object_name) {
      $ret="";
      //echo "<i>".$serialized_obj."</i><br>";
      //Tentative pour retrouver les valeurs d'un objet
      ereg("^.*{(.*)}\$",$serialized_obj, $serialized_obj_tab );
      $serialized_obj=$serialized_obj_tab[1];
      while (ereg("[^:]*:[^:]*:?\"([^;]*)\";([^:]*):([^:;]*):?([^;]*);(.*)",$serialized_obj,$serialized_obj_tab)) {
           $ret.="<b>\$".$object_name."->".$serialized_obj_tab[1]."</b>= ";
           if ($serialized_obj_tab[1]=="pass") {
               $serialized_obj_tab[4]="********";
           }
           if ($serialized_obj_tab[2]=='s') {
                $ret.=$serialized_obj_tab[4]."<br>\n";
           } elseif ($serialized_obj_tab[2]=='b') {
                $ret.="false<br>\n";
           } elseif ($serialized_obj_tab[2]=='i') {
                 $ret.="true<br>\n";
           }
           $serialized_obj=$serialized_obj_tab[5];
      }
      return $ret;
  }

  /**
   * Fonction show_table affiche le contenu d'un tableau
   *
   * @param $table tableau à afficher
   * @param $table_name Nom du tableau à afficher
   * @return variable à afficher
   */
  function show_table($table,$table_name) {
      //Affichage d'un tableau
      $ret="";
      foreach (array_keys($table) as $var_name) {
           $ret.="<b>\$".$table_name."[".$var_name."]</b>= ".$table[$var_name]."<br>\n";
      }
      return $ret;
  }

	function input($name,$texte){
		echo '<input type="text" name="'.$name.'"   value="'.$texte.'" onFocus="if(this.form.'.$name.'.value == \''.$texte.'\'){this.form.'.$name.'.value = \'\';}" onBlur="if(this.form.'.$name.'.value == \'\'){this.form.'.$name.'.value = \''.$texte.'\';}"';
	}

	function inputc($name,$texte){
		echo '<input type="text" name="'.$name.'"   value="'.$texte.'" onFocus="if(this.form.'.$name.'.value == \''.$texte.'\'){this.form.'.$name.'.value = \'\';}" onBlur="if(this.form.'.$name.'.value == \'\'){this.form.'.$name.'.value = \''.$texte.'\';}" /><br />';
	}



  /**
   * Fonction redirect
   * Redirige l'utilisateur vers une autre page
   *
   * @param $url Url relatif de la page
   */

   function redirect($url) {
           //ereg("^(.*)/[^/]*$",$_SERVER['PHP_SELF'],$res_ereg);
          //$absolute_url="http://".$_SERVER['HTTP_HOST'].$res_ereg[1]."/".$url;
           if (!preg_match('/http:/',$url)) {
	   	$absolute_url=$this->makeUrl($url);
           } else {
		$absolute_url=$url;
	   }
	   if (!headers_sent ()) {
                  header("HTTP/1.1 301 Moved Permanently");
                  header("Location: $absolute_url");
                  header("Connection: close");
                  exit();
          } else {
                  echo "\n<meta http-equiv=\"refresh\" content=\"0;URL=$absolute_url\">\n";
          }
   }

  /**
   * Fonction set_pref
   * Change les prÃ©fÃ©rences d'un utilisateur
   *
   * @param $login login de l'utilisateur
   * @param $pref_name Nom de la prÃ©fÃ©rence
   * @param $pref_value Valeur de la prÃ©fÃ©rence
   */
   function set_pref($login,$pref_name,$pref_value) {
          global $db;
          $pref_name=htmlentities($pref_name,ENT_QUOTES);
          $pref_value=htmlentities($pref_value,ENT_QUOTES);
          $login=htmlentities($login,ENT_QUOTES);
          $req1 = $db->query("SELECT COUNT(*) AS nb FROM usersprefs2 WHERE login='$login' AND pref_name='$pref_name'");
          // Si l'utilisateur n'a jamais modifiÃ© la prÃ©fÃ©rence et qu'il s'appuie sur le modele par dÃ©faut
          if ($db->result ($req1, 0) == 0 ) {
              $db->query("INSERT INTO usersprefs2 (login,pref_name,pref_value) VALUES ('$login','$pref_name','$pref_value')");
          } else {
              $db->query("UPDATE usersprefs2 SET pref_value='$pref_value' WHERE login='$login' AND pref_name='$pref_name' ");
          }
   }

  /**
   * Fonction get_pref
   * Extraire les prÃ©fÃ©rences d'un utlisisateur. Si elles ne sont pas dÃ©fini on prend les valeurs par dÃ©faut!
   *
   * @param $login login de l'utilisateur
   * @param $pref_name Nom de la prÃ©fÃ©rence
   * @return valeur de la prÃ©fÃ©rence
   */
   function get_pref($login,$pref_name) {
          global $db;
          $pref_name=htmlentities($pref_name,ENT_QUOTES);
          $login=htmlentities($login,ENT_QUOTES);

          $req1 = $db->query("SELECT pref_value FROM usersprefs2 WHERE login='$login' AND pref_name='$pref_name'");
          $result = $db->fetchArray($req1);
          if (!isset($result['pref_value'])) {
                 $req2 = $db->query("SELECT pref_value FROM prefs_liste WHERE pref_name='$pref_name'");
                 $result = $db->fetchArray($req2);
          }
          return html_entity_decode($result['pref_value'],ENT_QUOTES);
   }

  /**
   * Fonction new_pref
   * Insere une nouvelle prÃ©fÃ©rence dans la table des prÃ©fÃ©rences par dÃ©faut
   *
   * @param $pref_name Nom de la prÃ©fÃ©rence
   * @param $pref_value Valeur de la prÃ©fÃ©rence
   * @return valeur de la prÃ©fÃ©rence
   */
   function new_pref($pref_name,$pref_value) {
          global $db;
          $pref_name=htmlentities($pref_name,ENT_QUOTES);
          $pref_value=htmlentities($pref_value,ENT_QUOTES);
          $query="SELECT count(pref_name) FROM prefs_liste WHERE pref_name='$pref_name'";
          $result=mysql_query($query);
          if ($db->result($result,0)==0) {
                  $db->query("INSERT INTO prefs_liste (pref_name,pref_value) VALUES ('$pref_name','$pref_value')");
             } else {
                $db->query("UPDATE prefs_liste SET pref_value='$pref_value' WHERE pref_name='$pref_name'");
          }
   }

  /**
   * Fonction encrypt
   * Crypte une chaine en fonction d'une clé
   *
   * @param $key         cle de cryptage
   * @param $plain_text  texte a crypter
   * @return texte crypté
   */
   function encrypt($key, $plain_text) {
   // returns encrypted text
   // incoming: should be the $key that was encrypt
   // with and the $plain_text that wants to be encrypted

      $plain_text = trim($plain_text);
      /* Quoting Mcrypt:
       "You must (in CFB and OFB mode) or can (in CBC mode)
       supply an initialization vector (IV) to the respective
       cipher function. The IV must be unique and must be the
       same when decrypting/encrypting."
       Meaning, we need a way to generate a _unique_ initialization vector
       but at the same time, be able to know how to gather our IV at both
       encrypt/decrypt stage.  My personal recommendation would be
       (if you are working with files) is to get the md5() of the file.
       In this example, however, I want more of a broader scope, so I chose
       to md5() the key, which should be the same both times. Note that the IV
       needs to be the size of our algorithm, hence us using substr.
     */
      $iv = substr(md5($key), 0,mcrypt_get_iv_size (MCRYPT_CAST_256,MCRYPT_MODE_CFB));
      $c_t = mcrypt_cfb (MCRYPT_CAST_256, $key, $plain_text, MCRYPT_ENCRYPT, $iv);
      return trim(chop(base64_encode($c_t)));
   }


  /**
   * Fonction decrypt
   * Décrypte une chaine en fonction d'une clé
   *
   * @param $key         cle de cryptage
   * @param $crypt_text  texte a decrypter
   * @return texte décrypté
   */
   function decrypt($key, $crypt_text) {
      // incoming: should be the $key that you encrypted
      // with and the $c_t (encrypted text)
      // returns plain text
      // decode it first :)
      $c_t =  trim(chop(base64_decode($crypt_text)));
      $iv = substr(md5($key), 0,mcrypt_get_iv_size (MCRYPT_CAST_256,MCRYPT_MODE_CFB));
      $p_t = mcrypt_cfb (MCRYPT_CAST_256, $key, $c_t, MCRYPT_DECRYPT, $iv);
      return trim(chop($p_t));
   }
   function wordwrap3($str,$cols,$cut="") {

	   $tag_open = '<';
	   $tag_close = '>';
	   $white_space = ' ';
	   $count = 0;
	   $in_tag = 0;
	   $str_len = strlen($str);
	   $segment_width = 0;
	   $last_white_space = 0;
	   $begin_of_line = 0;

	   for ($i=0 ; $i<=$str_len ; $i++){
	       if ((isset($str[$i])) && ($str[$i] == $tag_open)) {
		   $in_tag++;
	       } else {
		   if (isset($str[$i]) && $str[$i] == $tag_close) {
		  
			   if ($in_tag > 0) {
			       $in_tag--;
			   }
			  
		   } else {
		       if ($in_tag == 0) {
		      
			 if(isset($str[$i]) && $str[$i] !=$white_space)
			       $segment_width++;

			  
			   if ($segment_width > $cols) {

			     if (isset($str[$i]) && $str[$i] == " ") {
				   $str = substr($str,0,$i).$cut.substr($str,$i+1,$str_len-1);
				   $i += strlen($cut);
				   $str_len = strlen($str);
				   $segment_width = 0;
				   $begin_of_line = $i;
				   $last_white_space = $i;
							
			     } else {
			    
				   if ($last_white_space != $begin_of_line) {
				       $i = $last_white_space;
				   }                   
	      
				   $str = substr($str,0,$i+1).$cut.substr($str,$i+1,$str_len-1);
				   $i += strlen($cut);
				   $str_len = strlen($str);
				   $segment_width = 0;
				   $begin_of_line = $i;
				   $last_white_space = $i;                               
			       }
			   } else {                     
			       if (isset($str[$i]) && $str[$i] == " ") {
				   $last_white_space = $i;
			       }                     
			   }
		       }
		   }
	       }
	   }
	   return $str;
	}

}
?>
