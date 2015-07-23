<?php

require_once "include/Page.class.php";
require_once "include/tools.php";


// DEBUT du contenu specifique
require_once "orchestra/groupManager.class.php";
$gm = new groupManager();
$page = new Page("Management de groupe pour " . $gm->getNameFundation());
$page->topMenu();



$editGroup = array();
$availableGroups = $gm->getAvailableGroups();

foreach ($availableGroups as $group) {
    $edit = array("Editer " . $group[1], "?action=edit&grp_id=" . $group[0]);
    $suppr = array("Supprimer " . $group[1], "?action=del&grp_id=" . $group[0]);
    $editGroup[] = $edit;
    $editGroup[] = $suppr;
}
$sideMenu = Array(
    array("Groupes", array(array("Ajouter un nouveau groupe", "?action=add"))),
    array("Groupes existants", $editGroup),
);


$page->sideMenu($sideMenu);



if (isset($_GET["action"])) {
    if (!empty($_GET["action"])) {
        $action = $_GET["action"];
        switch ($action) {
            case "add":
                echo (Page_addGroup($gm));
                break;
            case "edit":
                echo (Page_editGroup($gm, $_GET["grp_id"]));
                break;
            case "del":
                echo (Page_delGroup($gm, $_GET["grp_id"]));
                break;
            default:
                break;
        }
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
                <input type='submit' value='Valider' />
            </p>
            </form>
        ";
    } else {
        // faudrait rajouter des tests sur la completitude des champs remplis
        $gm->setName($grp_id, $_POST["grp_name"]);
        return "New name c'est " . $_POST["grp_name"] . " et id c'est " . $grp_id . " et old name c " . $gm->getGroup($grp_id);
    }
}

function Page_delGroup($gm, $grp_id) {
    if (empty($_POST)) {
        return "<form class 'buckutt_form' method='POST' action='?action=del&grp_id=" . $grp_id . "'>
            <p class='description'>
                Etes vous vraiment sûr de supprimer? " . $gm->getGroup($grp_id) . "
            </p><input type='hidden' value='true' name='supprimer' />
            <p class='submit'>
                <input type='submit' value='Valider' />
            </p>
            </form>
        ";
    } else {
        $gm->delGroup($grp_id);
        return "On vient de supprimer " . $gm->getGroup($grp_id);
    }
}
?>

