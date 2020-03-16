class Adherents {
	
	constructor() {
		let listeAdh = document.getElementById("listeAdherents");
		while (listeAdh.children.length > 0) {
			listeAdh.removeChild(listeAdh.children[0]);
		}
		this.requeteAJAX(this.callback);
	}

	static afficheAdherents(tableau) {
		let listeAdh = document.getElementById("listeAdherents");

		let liste = document.createElement("ul");
		for (var i = 0; i < tableau.length; i++) {
			let adherent = document.createElement("li");
			adherent.innerHTML = tableau[i];
			listeAdh.appendChild(adherent);
		}
		listeAdh.appendChild(liste);
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
		let tabName = new Array;
		for (var i = 0; i < xhrJSON.length; i++) {
			let emprunt = "";
			xhrJSON[i].nbEmprunts > 1 ? emprunt = "emprunts" : emprunt = "emprunt"
			tabName.push(xhrJSON[i].idAdherent + "-" + xhrJSON[i].nomAdherent + " (" + xhrJSON[i].nbEmprunts + " " + emprunt + ")");
		}
		Adherents.afficheAdherents(tabName);
	}

}

