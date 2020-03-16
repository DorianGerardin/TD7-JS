class LivresEmpruntes {
	
	constructor() {
		let listeLivresEmpruntes = document.getElementById("listeLivresEmpruntes");
		while (listeLivresEmpruntes.children.length > 0) {
			listeLivresEmpruntes.removeChild(listeLivresEmpruntes.children[0]);
		}
		this.requeteAJAX(this.callback);
	}

	static afficheLivresEmpruntes(tableau) {
		let listeLivresEmpruntes = document.getElementById("listeLivresEmpruntes");

		let liste = document.createElement("ul");
		for (var i = 0; i < tableau.length; i++) {
			let livresEmpruntes = document.createElement("li");
			livresEmpruntes.innerHTML = tableau[i];
			liste.appendChild(livresEmpruntes);
		}
		listeLivresEmpruntes.appendChild(liste);
	}

	requeteAJAX(callback) {
		let url = "php/requeteLivresEmpruntes.php";
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
		LivresEmpruntes.afficheLivresEmpruntes(tab);
	}

}

