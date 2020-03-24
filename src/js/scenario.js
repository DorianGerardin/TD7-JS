let adherent = new Adherents();
let livresDispos = new LivresDispos();
let livresEmpruntes = new LivresEmpruntes();

let ajoutAdherent = document.getElementById("ajouterAdherent");
ajoutAdherent.addEventListener("click", function() {
    let adh = document.getElementById("nomAdherent").value;
    if (adh.length > 0) {
        adherent.ajouterAdherent(adherent.callback);
    }
})