<?php

require_once('Model.php');

// A COMPLETER

$livre = $_GET["livre"];

// lancement de la requête SQL avec insertAdherents et
// récupération du résultat de la requête SQL
$tab = Model::insertLivre($livre);

// affichage en format JSON du résultat précédent
echo json_encode($tab);

?>