<?php

require_once('Conf.php');

class Model {

    public static $pdo;

    public static function init_pdo() {
        $host   = Conf::getHostname();
        $dbname = Conf::getDatabase();
        $login  = Conf::getLogin();
        $pass   = Conf::getPassword();
        try {
            // connexion à la base de données
            // le dernier argument sert à ce que toutes les chaines de charactères
            // en entrée et sortie de MySql soit dans le codage UTF-8
            self::$pdo = new PDO("mysql:host=$host;dbname=$dbname", $login, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            // on active le mode d'affichage des erreurs, et le lancement d'exception en cas d'erreur
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            die("Problème lors de la connexion à la base de données.");
        }
    }

    public static function selectAllAdherents() {

		$sql = Model::$pdo->query("SELECT A.idAdherent, A.nomAdherent, COUNT(E.idAdherent) nbEmprunts
                                   FROM emprunt E RIGHT OUTER JOIN adherent A ON A.idAdherent = E.idAdherent
                                   GROUP BY A.idAdherent;");

        //donne l'id, le nom et le nombre d'emprunt d'un adherent

        $sql->setFetchMode(PDO::FETCH_OBJ);
        $tabResults = $sql->fetchAll();
        // renvoi du tableau de résultats
        return $tabResults;
    }

    public static function insertAdherent($name) {
        
        try {
            // préparation de la requête
            $sql = "INSERT INTO adherent (nomAdherent) VALUES (:name_tag)";
            $req_prep = self::$pdo->prepare($sql);
            // passage de la valeur de name_tag
            $values = array("name_tag" => $name);
            // exécution de la requête préparée
            $req_prep->execute($values);
            $tabResults = self::selectAllAdherents();
            return $tabResults;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }
    
    public static function selectLivresDispos() {

		$sql = Model::$pdo->query("SELECT idLivre, titreLivre
                                   FROM livre 
                                   WHERE idLivre NOT IN (SELECT idLivre
                                                         FROM emprunt)");

        //donne l'id, le titre des livres qui sont disponibles

        $sql->setFetchMode(PDO::FETCH_OBJ);
        $tabResults = $sql->fetchAll();
        // renvoi du tableau de résultats
        return $tabResults;
    }
    
    public static function selectLivresEmpruntes() {

        $sql = Model::$pdo->query("SELECT L.idLivre, L.titreLivre
                                   FROM emprunt E JOIN livre L ON L.idLivre = E.idLivre");

        //donne l'id, le titre des livres qui sont empruntés

        $sql->setFetchMode(PDO::FETCH_OBJ);
        $tabResults = $sql->fetchAll();
        // renvoi du tableau de résultats
        return $tabResults;
	}

}

// on initialise la connexion $pdo
Model::init_pdo();

?>


