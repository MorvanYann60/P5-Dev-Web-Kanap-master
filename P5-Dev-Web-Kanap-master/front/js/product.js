//Variable contenant la balise bouton
let bouton = document.querySelector("button");

//Récupération de l'id du produit pour l'afficher dans l'URL
const urlProduit = window.location.search;
console.log(urlProduit);

const urlParams = new URLSearchParams(urlProduit);
console.log(urlParams);

const choisirLeId = urlParams.get("id");
console.log(choisirLeId);

let listeProduit = [];
let idCouleur = document.getElementById("colors");

//Méthode fetch pour accéder au contenue de l'API du canapé choisi dans la page d'accueil
fetch(`http://localhost:3000/api/products/${choisirLeId}`)
    .then(function(response) {
        if(response.ok) {
            return response.json();
        }
    })
    .then(function(produit) {
        listeProduit = produit;
        console.log(listeProduit);
        //Modification du DOM pour afficher les contenues correspondant au canapé choisi
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

//Variable contenant l'id quantity et en mettant par défaut la quantité à 1
let quantity = document.getElementById("quantity");
quantity.value = 1;

//Evénement sur la variable bouton 
bouton.addEventListener("click", function() {
    let quantite = parseInt(quantity.value);
    //Condition qui renvoie une erreur en cas de mauvaise manipulation 
    if(quantite <= 0 || quantite > 100) {
        alert("Erreur, veuillez renter le nombre de canapés voulue entre 1 et 100");
        return false;
    }

    if(idCouleur.value === "") {
        alert("Erreur, veuillez sélectionner une couleur");
        return false;
    }

    //Objet contenant les infos rentrées par le visiteur
    let listePanier = {
        id: listeProduit._id,
        couleur: idCouleur.value,
        quantite: quantite
    }
    
    //Mise en place du locale storage
    let identifiantDeLigne = listeProduit._id + "_" + idCouleur.value;
    if(localStorage.getItem(identifiantDeLigne) === null) {
        localStorage.setItem(identifiantDeLigne, JSON.stringify(listePanier));
    } else {
        listePanier = JSON.parse(localStorage.getItem(identifiantDeLigne));
        listePanier.quantite += quantite;
        localStorage.setItem(identifiantDeLigne, JSON.stringify(listePanier));
    }
});