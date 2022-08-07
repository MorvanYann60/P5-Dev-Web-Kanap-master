let listeInfos = [];
let calculPrix = [];
//let contact = {};
let quantitePanier = 0;
let prixTotal = 0;
let products = [];

//Boucle pour récupérer les infos du locale storage
for(let i=0; i < localStorage.length; i++) {
    keyname = localStorage.key(i);

    console.log(keyname);
    let ligneDePanier = JSON.parse(localStorage.getItem(keyname));
    console.log(ligneDePanier);

    //Méthode fetch contenant l'API et les id des canapés selectionnés dans la page produits
    fetch(`http://localhost:3000/api/products/${ligneDePanier.id}`)
    .then(function(response) {
        if(response.ok) {
            return response.json();
        }
    })
    .then(function(infos) {
        listeInfos = infos;
        console.log(listeInfos);

        //Ajout des id dans le tableau products
        products.push(ligneDePanier.id);

        //Modification du DOM pour afficher les contenus
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
        inputQuantity.addEventListener('change', changerQuantite);
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

//Evénement sur le bouton commander de la page panier
btnCommander.addEventListener("click", (event)=> {
    event.preventDefault();

    //Récupération des valeurs remplies du formulaire dans des variables 
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;

    //Objet contenant les variables du formulaire
    let contact = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
    }

    //Mise en place des éléments autorisés pour le formulaire
    let nomRegex = /^[A-Za-z\é\è\ê\-]+$/;
    let prenomRegex = /^[A-Za-z\é\è\ê\-]+$/;
    let adresseRegex = /^[A-Za-z0-9\s]{5,50}$/;
    let villeRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    let adresseMailRegex = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

    //Conditions qui renvoie une erreur en cas de mauvaise manipulation
    if(!prenomRegex.test(firstName)) {
        let pQuestionPrenom = document.getElementById("firstNameErrorMsg");
        pQuestionPrenom.textContent = "Erreur, veuillez rentrer un Prénom valide";
        return false;
    } else {
        let pQuestionPrenom = document.getElementById("firstNameErrorMsg");
        pQuestionPrenom.textContent = "";
    }

    if(!nomRegex.test(lastName)) {
        let pQuestionNom = document.getElementById("lastNameErrorMsg");
        pQuestionNom.textContent = "Erreur, veuillez rentrer un Nom valide";
        return false;
    } else {
        let pQuestionNom = document.getElementById("lastNameErrorMsg");
        pQuestionNom.textContent = "";
    }

    if(!adresseRegex.test(address)) {
        let pQuestionAddress = document.getElementById("addressErrorMsg");
        pQuestionAddress.textContent = "Erreur, veuillez rentrer une Adresse valide";
        return false;
    } else {
        let pQuestionAddress = document.getElementById("addressErrorMsg");
        pQuestionAddress.textContent = "";
    }

    if(!villeRegex.test(city)) {
        let pQuestionCity = document.getElementById("cityErrorMsg");
        pQuestionCity.textContent = "Erreur, veuillez rentrer une ville valide";
        return false;
    } else {
        let pQuestionCity = document.getElementById("cityErrorMsg");
        pQuestionCity.textContent = "";
    }

    if(!adresseMailRegex.test(email)) {
        let pQuestionEmail = document.getElementById("emailErrorMsg");
        pQuestionEmail.textContent = "Erreur, veuillez rentrer une adresse mail valide";
        return false;
    } else {
        let pQuestionEmail = document.getElementById("emailErrorMsg");
        pQuestionEmail.textContent = "";
    }

    //Méthode fetch qui réécupère l'APi ainsi que l'objet contact et le tableau products
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
        .then(function(data) {
            console.log(data);
            //Affichage du numéro de commande dans l'URL de la page confirmation
            window.location.href = "confirmation.html?id=" + data.orderId;
        })
        .catch(function(error) {
            alert(error);
        })
})

//Fonction pour supprimer un article du panier 
function supprimerLigne(event) {
    let article = event.target.closest("article");
    let id = article.dataset.id;
    let color = article.dataset.color;
    let ligneDePanier = JSON.parse(localStorage.getItem(id + "_" + color));
    localStorage.removeItem(id + "_" + color);
    let section = document.getElementById("cart__items");
    section.removeChild(article);

    miseAJourTotaux();
}

//Fonction pour modifier la quantité d'un article du panier
function changerQuantite(event) {
    let article = event.target.closest("article");
    let id = article.dataset.id;
    let color = article.dataset.color;
    let ligneDePanier = JSON.parse(localStorage.getItem(id + "_" + color));
    ligneDePanier.quantite = parseInt(event.target.value);
    localStorage.setItem(id + "_" + color, JSON.stringify(ligneDePanier));

    miseAJourTotaux();

}

//Fonction qui modifie le prix total et le nombre total d'articles 
function miseAJourTotaux() {
    let prixTotal = 0;
    let quantitePanier = 0;
    for(let i = 0; i < localStorage.length; i++) {
        let keyname = localStorage.key(i);
        let ligneDePanier = JSON.parse(localStorage.getItem(keyname));

        fetch(`http://localhost:3000/api/products/${ligneDePanier.id}`)
        .then(function(response){
            if(response.ok) {
                return response.json();
            }
        })
        .then(function(infos) {
            quantitePanier += ligneDePanier.quantite;

            let affichageArticles = document.getElementById("totalQuantity");
            affichageArticles.textContent = quantitePanier;

            prixTotal += ligneDePanier.quantite * infos.price;

            let affichagePrix = document.getElementById("totalPrice");
            affichagePrix.textContent = prixTotal;

        })
    }
}
