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
            idCouleur.innerHTML += `<option value="${color}">${color}</option>`;
        }
    })
    .catch(function(error) {
        alert(error);
    });

let quantity = document.getElementById("quantity");
quantity.value = 1;

bouton.addEventListener("click", function() {
    if(quantity.value == 0 || quantity.value > 100) {
        alert("Erreur, veuillez renter le nombre de canapés voulue entre 1 et 100");
        return false;
    }
    let listePanier = {
        id: listeProduit._id,
        couleur: idCouleur.value,
        quantite: quantity.value
    }
    if(listePanier.id == listeProduit._id && listeProduit.colors == listePanier.couleur) {
        listePanier.quantite += quantity.value;
    }
    let collection = localStorage.setItem("test", JSON.stringify(listePanier));
    JSON.parse(localStorage.getItem(collection));
    alert("C'est cliqué");
});