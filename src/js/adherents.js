class Adherents {
	
	constructor() {
		this.requeteAJAX(this.callback);
	}

	static afficheAdherents(tableau) {
		let listeAdh = document.getElementById("listeAdherents");
		while (listeAdh.children.length > 0) {
			listeAdh.removeChild(listeAdh.children[0]);
		}

		let liste = document.createElement("ul");
		for (var i = 0; i < tableau.length; i++) {
			let adherent = document.createElement("li");
			adherent.innerHTML = tableau[i];
			liste.appendChild(adherent);
		}
		listeAdh.appendChild(liste);
		liste.addEventListener("click", function() {
			Adherents.afficherLivresEmpruntes();
		});
	}

	static afficherLivresEmpruntes() { 
		let target = event.target;
		let tiret = target.innerHTML.indexOf('-');
		let idAdherent = target.innerHTML.substring(0, tiret);
		let url = "php/requeteAfficheLivresAdherent.php?idAdherent=" + idAdherent;
		let requete = new XMLHttpRequest();
		requete.open("GET", url, true);
		requete.addEventListener("load", function() {
			let xhrJSON = JSON.parse(requete.responseText);

			let contenu;
			if (xhrJSON[0].titreLivre === null) {
				contenu = xhrJSON[0].nomAdherent + " a 0 emprunt en ce moment";
			}
			else {
				let emprunt;
				xhrJSON.length > 1 ? emprunt = "emprunts" : emprunt =  "emprunt";
				contenu = xhrJSON[0].nomAdherent + " a " + xhrJSON.length + " " + emprunt + " en ce moment : \n\n";
				for (let i = 0; i < xhrJSON.length; i++) {
					contenu += "- " + xhrJSON[i].titreLivre + "\n"; 
				} 
			}
			alert(contenu);
		});
		requete.send(null);
	}

	ajouterAdherent(callback) {
		let adherent = document.getElementById("nomAdherent").value
		let url = "php/requeteAjoutAdherent.php?adherent=" + adherent;
		document.getElementsByName("txtAdh")[0].value = "";
		let requete = new XMLHttpRequest();
		requete.open("GET", url, true);
		requete.addEventListener("load", function() {
			callback(requete);
		});
		requete.send(null);
	}

	requeteAJAX(callback) {
		let url = "php/requeteAdherent.php";
		let requete = new XMLHttpRequest();
		requete.open("GET", url, true);
		requete.addEventListener("load", function() {
			callback(requete);
		});
		requete.send(null);
	}

	callback(req) {
		let xhrJSON = JSON.parse(req.responseText);
		let tab = new Array;
		for (var i = 0; i < xhrJSON.length; i++) {
			let emprunt;
			xhrJSON[i].nbEmprunts > 1 ? emprunt = " (" + xhrJSON[i].nbEmprunts + " emprunts)" : emprunt = " (" + xhrJSON[i].nbEmprunts + " emprunt)";
			if (xhrJSON[i].nbEmprunts == 0) {
				emprunt = "";
			}
			tab.push(xhrJSON[i].idAdherent + "-" + xhrJSON[i].nomAdherent + emprunt);
		}
		Adherents.afficheAdherents(tab);
	}

}

