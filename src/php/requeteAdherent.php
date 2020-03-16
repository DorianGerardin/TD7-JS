<?php

require_once('Model.php');

// A COMPLETER

// lancement de la requête SQL avec selectAllAdherents et
// récupération du résultat de la requête SQL
$tab = Model::selectAllAdherents();

// affichage en format JSON du résultat précédent
echo json_encode($tab);

?>