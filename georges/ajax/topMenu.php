<?php
session_start();

$topMenu = array(
	'login' => (isset($_SESSION['user']['login']) ? $_SESSION['user']['login'] : null),
	'items' => array(
        array("displayText" => "Accueil", "address" => "#main"),
        array("displayText" => "Se deconnecter", "address" => "#login")
    )
);
echo json_encode($topMenu);
?>
