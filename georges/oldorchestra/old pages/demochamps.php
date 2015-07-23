<?php
require_once "include/Page.class.php";
require_once "include/tools.php";


// DEBUT du contenu specifique
require_once "orchestra/demochamps.class.php";
$gm = new demochamps();
$page = new Page("demo de champs");
$page->topMenu();

$page->sideMenu();
$id_fundation = 3;
?>
<script type="text/javascript" src="js/demo.js"></script>


<?php
$page->showError("ya une erreur !");
$page->showInfo("ya une info !");
?>


<form method="post" name="addProduct">
    <input name="id_fundation" type="hidden" value="<?php echo $id_fundation ?>" />
    <h1>Objet</h1>
    <label>Nom de l'objet
        <input name="obj_name" id="obj_name" type="text" size="20" />
    </label>
    <p>
        Nous voulons créer quoi?<br />
        <label>
            <input type="radio" name="obj_type" value="object" id="obj_type_0" checked="checked" />
            Objet</label>
        <br />
        <label>
            <input type="radio" name="obj_type" value="category" id="obj_type_1" />
            Categorie</label>
        <br />
        <label>
            <input type="radio" name="obj_type" value="promotion" id="obj_type_2"  />
            Promotion</label>
        <br />
    </p>
    <p>
        Ce truc sera situé à quel niveau?<br />
        <label>
            <input type="radio" name="obj_parent_type" value="none" id="obj_parent_type_0" checked="checked" onchange="selectNormal(0)"/>
            A la base, normal quoi</label>
        <br />
        <label>
            <input type="radio" name="obj_parent_type" value="category" id="obj_parent_type_1" onchange="selectCategory(0)"/>
            Dans une categorie</label>
    <div id="detailCategory_0" style="display: none"><label for="parent_category">Categorie mere</label>
        <select name="parent_category" id="parent_category_0">
            <?php
            if ($allcat = $gm->getAvailableCategory()) {
                foreach ($allcat as $category) {
                    echo '<option value ="' . $category[0] . '">' . $category[1] . '</option>';
                }
            }
            ?>

        </select></div>

    <label>
        <input type="radio" name="obj_parent_type" value="promotion" id="obj_parent_type_2" onchange="selectPromo(0)"/>
        Dans une promotion</label>
    <div id="detailPromo_0" style="display: none">
        <label for="parent_promotion">Promotion mere</label>
        <select name="parent_promotion" id="parent_promotion_0" onchange="populateSteps('parent_promotion_step', this.value)">
            <?php
            if ($allpromo = $gm->getAvailablePromotion()) {
                foreach ($allpromo as $promotion) {
                    echo '<option value ="' . $promotion[0] . '">' . $promotion[1] . '</option>';
                }
                ?>
                <script type="text/javascript"> var promo = new Object();
    <?php
    foreach ($allpromo as $promotion) {
        ?>
                promo[<?php echo $promotion[0] ?>] = <?php echo $FADMIN->getExistingPromotionSteps($promotion[0]) ?>;
        <?php
    }
}
?>

    function getPromoSteps(k) {
        return promo[k];
    }</script>
        </select>
        <label for="parent_promotion_step">Promotion mere etape</label>
        <select name="parent_promotion_step" id="parent_promotion_step_0">

            <option value="0" selected="selected">Echec de chargement</option>
        </select></div>
    <br />

    <h1>Vente</h1>
    <label for="sale_per">Periode durant laquelle on va vendre
        <select name="sale_per" id="sale_per_0" onchange="updatePeriod('sale_per_0', 'sale_per_name_0', 'sale_per_start_0', 'sale_per_end_0', 'submit')">
            <option value="0">Nouvelle Periode</option>
            <?php
            if ($allper = $gm->getAvailablePeriods()) {
                $first = true;
                foreach ($allper as $period) {
                    if ($first) {
                        $first = false;
                        echo '<option value ="' . $period[0] . '" selected="selected">' . $period[1] . '</option>';
                    } else {
                        echo '<option value ="' . $period[0] . '">' . $period[1] . '</option>';
                    }
                }
                ?>
                <script type="text/javascript">
                    var period = '{';
    <?php
    $first = true;
    foreach ($allper as $period) {
        if ($first) {
            $first = false;
        } else {
            echo "period += ',';";
        }
        ?>

                period += '"<?php echo $period[0] ?>":{"name":"<?php echo $period[1] ?>", "start":"<?php echo $period[2] ?>", "end":"<?php echo $period[3] ?>"}';

        <?php
    }
}
?>
    period += '}';

    var periods = $.parseJSON(period);
            </script>
        </select></label><br />
    <table><tr><td>
                <label for="sale_per_name">Nom de la periode</label></td><td>
                <input name="sale_per_name" id="sale_per_name_0" type="text" size="17" />
            </td></tr>
        <tr id="sale_per_start_0_legende"><td>
                <label for="inputDate1">Date de debut</label></td><td>
                <input name="inputDate1" id="sale_per_start_0" type="text" size="16"  onBlur="isDateHour_block('sale_per_start_0', 'submit');"/><small>
                    (JJ/MM/AAAA ou JJ/MM/AAAA HH:MM)
                </small>
            </td></tr>
        <tr id="sale_per_end_0_legende"><td>
                <label for="inputDate2">Date de fin</label></td><td>
                <input name="inputDate2" id="sale_per_end_0" type="text" size="16"  onBlur="isDateHour_block('sale_per_end_0', 'submit');"/><small>
                    (JJ/MM/AAAA ou JJ/MM/AAAA HH:MM)
                </small>
            </td></tr></table>
    <h1>Prix</h1>
    <label>Prix de
        <input name="price_credit" id="price_credit_0_0" type="text" value="1" size="20" />
        euros</label>
    <label for="price_grp">Pour les </label>
    <select name="price_grp" id="price_grp_0_0">
        <?php
        if ($allgrp = $gm->getAvailableGroups()) {
            foreach ($allgrp as $group) {
                echo '<option value ="' . $group[0] . '">' . $group[1] . '</option>';
            }
        }
        ?>
    </select>
    <h1>Lieu</h1>
    <label for="jop_point">En vente à cet endroit : </label>
    <select name="jop_point" id="jop_point_0">
        <?php
        if ($allpoi = $gm->getAvailablePoints()) {
            foreach ($allpoi as $point) {
                echo '<option value ="' . $point[0] . '">' . $point[1] . '</option>';
            }
        }
        ?>
    </select>
    <label>Position (+ gros = en dernier)
        <input name="jop_priority" id="jop_priority_0" type="text" value="50" size="20" />
    </label>
    <input name="ok" type="submit" value="Ok" id="submit"/>
    <input name="reset" type="reset" value="Reset" />
</form>


<script type="text/javascript" >
    $(document).ready(function() {
        populateSteps('parent_promotion_step_0', $("#parent_promotion_0").val());
        updatePeriod("sale_per_0", "sale_per_name_0", "sale_per_start_0", "sale_per_end_0", "submit");
    });
</script>
