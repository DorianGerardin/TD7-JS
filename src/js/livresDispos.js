class LivresDispos {
	
	constructor() {	
		this.requeteAJAX(this.callback);
	}

	static afficheLivresDispos(tableau) {
		let listeLivresDispos = document.getElementById("listeLivresDisponibles");

		while (listeLivresDispos.children.length > 0) {
			listeLivresDispos.removeChild(listeLivresDispos.children[0]);
		}

		let liste = document.createElement("ul");
		for (var i = 0; i < tableau.length; i++) {
			let livresDispos = document.createElement("li");
			livresDispos.innerHTML = tableau[i];
			liste.appendChild(livresDispos);
		}
		listeLivresDispos.appendChild(liste);
		liste.addEventListener("click", function() {
			LivresDispos.messageEmprunterLivre();
		})
	}

	static messageEmprunterLivre() { 
		let target = event.target;
		let tiret = target.innerHTML.indexOf('-');
		let livre = target.innerHTML.substring(tiret + 1, target.innerHTML.length);
		let idLivre = target.innerHTML.substring(0, tiret);
		let idAdherent = prompt("Prêt de \"" + livre + "\". \n\n" + "n° de l'emprunteur ?");
		if (idAdherent != "") {
			LivresDispos.emprunterLivre(LivresDispos.callback, idAdherent, idLivre);
		}
	}

	static emprunterLivre(callback, idAdherent, idLivre) {
		let url = "php/requeteEmprunterLivre.php?idAdherent=" + idAdherent + "&idLivre=" + idLivre;
		let requete = new XMLHttpRequest();
		requete.open("GET", url, true);
		requete.addEventListener("load", function() {
			LivresDispos.callback(requete);
			new Adherents();
			new LivresEmpruntes();
		});
		requete.send(null);
	}

	ajouterLivre(callback) {
		let livre = document.getElementById("titreLivre").value
		let url = "php/requeteAjoutLivre.php?livre=" + livre;
		document.getElementsByName("txtLivre")[0].value = "";
		let requete = new XMLHttpRequest();
		requete.open("GET", url, true);
		requete.addEventListener("load", function() {
			LivresDispos.callback(requete);
		});
		requete.send(null);
	}		

	requeteAJAX(callback) {
		let url = "php/requeteLivresDispos.php";
		let requete = new XMLHttpRequest();
		requete.open("GET", url, true);
		requete.addEventListener("load", function() {
			LivresDispos.callback(requete);
		});
		requete.send(null);
	}

	static callback(req) {
		let xhrJSON = JSON.parse(req.responseText);
		let tab = new Array;
		for (var i = 0; i < xhrJSON.length; i++) {
			tab.push(xhrJSON[i].idLivre + "-" + xhrJSON[i].titreLivre);
		}
		LivresDispos.afficheLivresDispos(tab);
	}

}

