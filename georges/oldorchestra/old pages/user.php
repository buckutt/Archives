<?php

require_once "include/Page.class.php";
require_once "include/tools.php";


// DEBUT du contenu specifique
require_once "orchestra/userManager.class.php";
$um = new userManager();
$page = new Page("Management de l'utilisateur ");
$page->topMenu();



$sideMenu = Array(
    array("User", array(
	array("Ajouter Un Utilisateur", "?action=add"),
	array("Lister les Utilisateurs blocker", "?action=listBlocked"),
)),
	array("Users existants", array(
	array("Editer User", "?action=edit"),
)),);


$page->sideMenu($sideMenu);



if (isset($_GET["action"])) {
    if (!empty($_GET["action"])) {
        $action = $_GET["action"];
        switch ($action) {
            case "add":
                echo (Page_addUser($um));
                break;
            case "listBlocked":
		if (!empty($_GET["id"])){
			$um->deblockUser($_GET["id"]);
		}
                echo (Page_listBlockedUser($um));
                break;
            case "del":
//                echo (Page_delGroup($gm, $_GET["grp_id"]));
                break;
            default:
                break;
        }
    }
}

function Page_addUser($um) {
    if (empty($_POST)) {
        return "<form class 'buckutt_form' method='POST' action='?action=add'>
            <p class='input'>
                <label for='grp_name'>Groupe nom</label>
                <input type='text' name='grp_name' id='grp_name' />
            </p>
            <p class='submit'>
                <input type='submit' value='Ajouter' />
            </p>
            </form>
        ";
    } else {
        return "ajoutons " . $_POST["grp_name"];
    }
}

function Page_listBlockedUser($um) {
	$content = "<table border=1 ><caption> Liste des utilisateur Blocké </caption><tr><th>Id</th><th>Nom</th><th>Prenom</th></tr>";
	$table = $um->getAllBlockedUsers();
	foreach ( $table as &$value) {
    		$content .= "<tr>
				<td>".$value[0]."</td>
				<td>".$value[1]."</td>
				<td>".$value[2]."</td>
				<td><a href=?action=listBlocked&id=".$value[0]."><img src='css/images/b_props.png' /></a></td>
			     </tr>";
	}
	$content .= "</table>";
	return $content;
}

function Page_delGroup($gm, $grp_id) {
    if (empty($_POST)) {
        return "<form class 'buckutt_form' method='POST' action='?action=del&grp_id='>
            <p class='description'>
            </p><input type='hidden' value='true' name='supprimer' />
            <p class='submit'>
                <input type='submit' value='Valider' />
            </p>
            </form>";
    } else {
        return "On vient de supprimer";
    }
}
?>

