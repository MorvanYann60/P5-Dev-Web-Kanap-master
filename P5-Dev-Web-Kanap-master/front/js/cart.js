let keyname
let listeInfos = [];
let calculPrix = [];
//let contact = {};
let quantitePanier = 0;
let prixTotal = 0;
let products = [];

for(let i=0; i < localStorage.length; i++) {
    keyname = localStorage.key(i);

    console.log(keyname);
    let ligneDePanier = JSON.parse(localStorage.getItem(keyname));
    console.log(ligneDePanier);

    fetch(`http://localhost:3000/api/products/${ligneDePanier.id}`)
    .then(function(response) {
        if(response.ok) {
            return response.json();
        }
    })
    .then(function(infos) {
        listeInfos = infos;
        console.log(listeInfos);

        products.push(ligneDePanier.id);

        let section = document.getElementById("cart__items");
        let article = document.createElement("article");
        article.className = "cart__item";
        article.dataset.id = ligneDePanier.id;
        article.dataset.color = ligneDePanier.couleur;
        section.appendChild(article);

        let divPanier1 = document.createElement("div");
        divPanier1.className = "cart__item__img";
        article.appendChild(divPanier1);

        let imgPanier = document.createElement("img");
        imgPanier.src = listeInfos.imageUrl;
        imgPanier.alt = listeInfos.altTxt;
        divPanier1.appendChild(imgPanier);

        let divPanier2 = document.createElement("div");
        divPanier2.className = "cart__item__content";
        article.appendChild(divPanier2);

        let divDescription = document.createElement("div");
        divDescription.className = "cart__item__content__description";
        divPanier2.appendChild(divDescription);

        let titreDescription = document.createElement("h2");
        titreDescription.textContent = listeInfos.name;
        divDescription.appendChild(titreDescription);

        let texteDescription = document.createElement("p");
        texteDescription.textContent = ligneDePanier.couleur;
        divDescription.appendChild(texteDescription);

        let prixDescription = document.createElement("p");
        prixDescription.textContent = listeInfos.price + "€";
        divDescription.appendChild(prixDescription);
        
        let divSettings = document.createElement("div");
        divSettings.className = "cart__item__content__settings";
        divPanier2.appendChild(divSettings);

        let divSettingsQuantity = document.createElement("div");
        divSettingsQuantity.className = "cart__item__content__settings__quantity";
        divSettings.appendChild(divSettingsQuantity);

        let texteQuantity = document.createElement("p");
        texteQuantity.textContent = "Qté : ";
        divSettingsQuantity.appendChild(texteQuantity);

        let inputQuantity = document.createElement("input");
        inputQuantity.type = "number";
        inputQuantity.className = "itemQuantity";
        inputQuantity.name = "itemQuantity";
        inputQuantity.min = "1";
        inputQuantity.max = "100";
        inputQuantity.value = ligneDePanier.quantite;
        //inputQuantity.addEventListener('change', changerQuantite);
        divSettingsQuantity.appendChild(inputQuantity);

        let divSettingsSupprimer = document.createElement("div");
        divSettingsSupprimer.className = "cart__item__content__settings__delete";
        divSettings.appendChild(divSettingsSupprimer);

        let texteSupprimer = document.createElement("p");
        texteSupprimer.className = "deleteItem";
        texteSupprimer.textContent = "Supprimer";
        texteSupprimer.addEventListener('click', supprimerLigne);
        divSettingsSupprimer.appendChild(texteSupprimer);

        quantitePanier += ligneDePanier.quantite;

        let affichageArticles = document.getElementById("totalQuantity");
        affichageArticles.textContent = quantitePanier;

        prixTotal += ligneDePanier.quantite * listeInfos.price;

        let affichagePrix = document.getElementById("totalPrice");
        affichagePrix.textContent = prixTotal;
    })
    .catch(function(error) {
        alert(error);
    });  
}

let btnCommander = document.getElementById("order");

btnCommander.addEventListener("click", (event)=> {
    event.preventDefault();

    let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    }

    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify( {
            contact: contact,
            products: products
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            }
        })
        .then(function(affichage) {
            console.log(affichage);
            localStorage.setItem("confirmationProduit", JSON.stringify(affichage));
            window.location.href = "confirmation.html";
        })
        .catch(function(error) {
            alert(error);
        })
})

function supprimerLigne(event) {
    let article = event.target.closest("article");
    let id = article.dataset.id;
    let color = article.dataset.color;
    let ligneDePanier = JSON.parse(localStorage.getItem(id + "_" + color));
    localStorage.removeItem(keyname);
    let section = document.getElementById("cart__items");
    section.removeChild(article);
    let affichagePrix = document.getElementById("totalPrice");
    affichagePrix.textContent = prixTotal;
    window.history.go(0);

    console.log(ligneDePanier);
}