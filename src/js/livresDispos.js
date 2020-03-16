class LivresDispos {
	
	constructor() {
		let listeLivresDispos = document.getElementById("listeLivresDisponibles");
		while (listeLivresDispos.children.length > 0) {
			listeLivresDispos.removeChild(listeLivresDispos.children[0]);
		}
		this.requeteAJAX(this.callback);
	}

	static afficheLivresDispos(tableau) {
		let listeLivresDispos = document.getElementById("listeLivresDisponibles");

		let liste = document.createElement("ul");
		for (var i = 0; i < tableau.length; i++) {
			let livresDispos = document.createElement("li");
			livresDispos.innerHTML = tableau[i];
			liste.appendChild(livresDispos);
		}
		listeLivresDispos.appendChild(liste);
	}

	requeteAJAX(callback) {
		let url = "php/requeteLivresDispos.php";
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
			tab.push(xhrJSON[i].idLivre + "-" + xhrJSON[i].titreLivre);
		}
		LivresDispos.afficheLivresDispos(tab);
	}

}

