<?php

require_once('Model.php');

// A COMPLETER

$adherent = $_GET["adherent"];

// lancement de la requête SQL avec insertAdherents et
// récupération du résultat de la requête SQL
$tab = Model::insertAdherent($adherent);

// affichage en format JSON du résultat précédent
echo json_encode($tab);

?>