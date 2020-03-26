<?php

require_once('Model.php');

// A COMPLETER

$adherent = $_GET["idAdherent"];
$idLivre = $_GET["idLivre"];

// lancement de la requête SQL avec insertAdherents et
// récupération du résultat de la requête SQL
$tab = Model::rendreLivre($adherent, $idLivre);

// affichage en format JSON du résultat précédent
echo json_encode($tab);

?>