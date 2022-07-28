let bouton = document.querySelector("button");

const urlProduit = window.location.search;
console.log(urlProduit);

const urlParams = new URLSearchParams(urlProduit);
console.log(urlParams);

const choisirLeId = urlParams.get("id");
console.log(choisirLeId);

let listeProduit = [];
let idCouleur = document.getElementById("colors");

fetch(`http://localhost:3000/api/products/${choisirLeId}`)
    .then(function(response) {
        if(response.ok) {
            return response.json();
        }
    })
    .then(function(produit) {
        listeProduit = produit;
        console.log(listeProduit);
        let classProduit = document.getElementsByClassName("item__img")[0];
        let imageProduit = document.createElement("img");
        imageProduit.src = listeProduit.imageUrl;
        imageProduit.alt = listeProduit.altTxt;
        classProduit.appendChild(imageProduit);
        console.log(classProduit);
        
        
        let idTitre = document.getElementById("title");
        idTitre.textContent = listeProduit.name;
        let idPrix = document.getElementById("price");
        idPrix.textContent = listeProduit.price;
        let idDescription = document.getElementById("description");
        idDescription.textContent = listeProduit.description;
        
        for(color of listeProduit.colors) {
            let option = document.createElement('option');
            option.value = color;
            option.textContent = color;
            idCouleur.appendChild(option);
        }
    })
    .catch(function(error) {
        alert(error);
    });

let quantity = document.getElementById("quantity");
quantity.value = 1;

bouton.addEventListener("click", function() {
    let quantite = parseInt(quantity.value);
    if(quantite <= 0 || quantite > 100) {
        alert("Erreur, veuillez renter le nombre de canapés voulue entre 1 et 100");
        return false;
    }

    if(idCouleur.value === "") {
        alert("Erreur, veuillez sélectionner une couleur");
        return false;
    }

    let listePanier = {
        id: listeProduit._id,
        couleur: idCouleur.value,
        quantite: quantite
    }
    
    let identifiantDeLigne = listeProduit._id + "_" + idCouleur.value;
    if(localStorage.getItem(identifiantDeLigne) === null) {
        localStorage.setItem(identifiantDeLigne, JSON.stringify(listePanier));
    } else {
        listePanier = JSON.parse(localStorage.getItem(identifiantDeLigne));
        listePanier.quantite += quantite;
        localStorage.setItem(identifiantDeLigne, JSON.stringify(listePanier));
    }
});