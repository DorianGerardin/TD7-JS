class LivresEmpruntes {
	
	constructor() {
		this.requeteAJAX(this.callback);
	}

	static afficheLivresEmpruntes(tableau) {
		let listeLivresEmpruntes = document.getElementById("listeLivresEmpruntes");
		
		while (listeLivresEmpruntes.children.length > 0) {
			listeLivresEmpruntes.removeChild(listeLivresEmpruntes.children[0]);
		}

		let liste = document.createElement("ul");
		for (var i = 0; i < tableau.length; i++) {
			let livresEmpruntes = document.createElement("li");
			livresEmpruntes.innerHTML = tableau[i];
			liste.appendChild(livresEmpruntes);
		}
		listeLivresEmpruntes.appendChild(liste);
		liste.addEventListener('click', function() {
			LivresEmpruntes.messageRendreLivre();
		})
	}

	static messageRendreLivre() { 
		let target = event.target;
		let tiret = target.innerHTML.indexOf('-');
		let idLivre = target.innerHTML.substring(0, tiret);

		let url = "php/requeteAfficherAdherentLivre.php?idLivre=" + idLivre;
		let requete = new XMLHttpRequest();
		requete.open("GET", url, true);
		requete.addEventListener("load", function() {
			LivresEmpruntes.adherentsDuLivre(requete);
		});
		requete.send(null);
	}

	static adherentsDuLivre(req) {
		let xhrJSON = JSON.parse(req.responseText);
		if ( confirm( "Livre prêté à " + xhrJSON[0].nomAdherent + ".\nRetour de ce livre ?" ) ) {
			let idAdherent = xhrJSON[0].idAdherent;
			let idLivre = xhrJSON[0].idLivre;
			LivresEmpruntes.rendreLivre(idAdherent, idLivre);
		} 
	}

	static rendreLivre(idAdherent, idLivre) {
		let url = "php/requeteRendreLivre.php?idLivre=" + idLivre + "&idAdherent=" + idAdherent;
		let requete = new XMLHttpRequest();
		requete.open("GET", url, true);
		requete.addEventListener("load", function() {
			LivresEmpruntes.callback(requete);
			new Adherents();
			new LivresDispos();
		});
		requete.send(null);
	}

	requeteAJAX(callback) {
		let url = "php/requeteLivresEmpruntes.php";
		let requete = new XMLHttpRequest();
		requete.open("GET", url, true);
		requete.addEventListener("load", function() {
			LivresEmpruntes.callback(requete);
		});
		requete.send(null);
	}

	static callback(req) {
		let xhrJSON = JSON.parse(req.responseText);
		let tab = new Array;
		for (var i = 0; i < xhrJSON.length; i++) {
			tab.push(xhrJSON[i].idLivre + "-" + xhrJSON[i].titreLivre);
		}
		LivresEmpruntes.afficheLivresEmpruntes(tab);
	}

}

