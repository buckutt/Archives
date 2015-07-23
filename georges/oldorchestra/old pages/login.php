<?php
require_once "include/Page.class.php";
require_once "include/tools.php";

// DEBUT du contenu specifique
require_once "orchestra/loginManager.class.php";
$loginManager = new loginManager();


$page = new Page("Connexion");
$page->topMenu();

$sideMenu = Array(
    array("Groupes", array(array("Ajouter un nouveau groupe", "?action=add")))
);
$page->sideMenu($sideMenu);

if (isset($_POST["submit"])) {
	
	if (isset($_POST['login']) AND isset($_POST['pwd'])) {
		$retourLogin = $loginManager->login($_POST['login'], $_POST['pwd']);
		
		//si OK
		if($retourLogin == 1) {
			$page->showInfo("Te voila connecte !");
		} else {
			//le hic, c'est qu'on n'a pas d'erreur format incorrect dans la BDD
			if ($retourLogin == 0)
				$page->showError("Le code PIN, c'est en chiffres !");
			else
				$page->showError($loginManager->getErrorDetail($retourLogin));
			showFormulaire();
		}
	}
	
} else {
	showFormulaire();
}

/*
foreach ($availableGroups as $group) {
    $edit = array("Editer " . $group[1], "?action=edit&grp_id=" . $group[0]);
    $suppr = array("Supprimer " . $group[1], "?action=del&grp_id=" . $group[0]);
    $editGroup[] = $edit;
    $editGroup[] = $suppr;
}

*/






function showFormulaire() {
?>
	<h2>Connexion</h2>

	<form class="cssform" method="POST" action="">

            <p class="input">
                <label for="login">Login</label>
                <input type="text" name="login" id="login" value ="" />
	
                <label for="pwd">Code PIN</label>
                <input type="password" name="pwd" id="pwd" value ="" />
            </p>

	<p class="submit"><input type="submit" name="submit" value="connexion" /></p>

	</form>

<?php
}
/*


    }
}

function Page_addGroup($gm) {
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

function Page_editGroup($gm, $grp_id) {

    if (empty($_POST)) {
        return "<form class 'buckutt_form' method='POST' action='?action=edit&grp_id=" . $grp_id . "'>
            <p class='input'>
                <label for='grp_name'>Groupe nom</label>
                <input type='text' name='grp_name' id='grp_name' value ='" . $gm->getGroup($grp_id) . "' />
            </p>
            <p class='submit'>

*/

?>
