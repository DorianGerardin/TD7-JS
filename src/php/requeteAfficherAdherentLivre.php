<?php

require_once('Model.php');

// A COMPLETER

$idLivre = $_GET["idLivre"];

// lancement de la requête SQL avec insertAdherents et
// récupération du résultat de la requête SQL
$tab = Model::selectAdherentByLivre($idLivre);

// affichage en format JSON du résultat précédent
echo json_encode($tab);

?>