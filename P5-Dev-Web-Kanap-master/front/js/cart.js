let keyname
let listeInfos = [];
let calculPrix = [];
//let contact = {};
let test1 = 0;

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
        divSettingsQuantity.appendChild(inputQuantity);

        let divSettingsSupprimer = document.createElement("div");
        divSettingsSupprimer.className = "cart__item__content__settings__delete";
        divSettings.appendChild(divSettingsSupprimer);

        let texteSupprimer = document.createElement("p");
        texteSupprimer.className = "deleteItem";
        texteSupprimer.textContent = "Supprimer";
        divSettingsSupprimer.appendChild(texteSupprimer);

        for(let i = 0; i < ligneDePanier.quantite; i++) {
            test1 ++;
        }

        let affichageArticles = document.getElementById("totalQuantity");
        affichageArticles.textContent = test1;

        for(let i = 0; i < ligneDePanier.quantite; i++) {
            let test2 = listeInfos.price;
            console.log(test2);
            calculPrix.push(test2);
            //console.log(calculPrix);
        }

        let reducer = (accumulator, currentValue) => accumulator + currentValue;
        let prixTotal = calculPrix.reduce(reducer);
        console.log(prixTotal);

        let affichagePrix = document.getElementById("totalPrice");
        affichagePrix.textContent = prixTotal;
    })
    .catch(function(error) {
        alert(error);
    });  
}

// let btnCommander = document.getElementById("order");

// btnCommander.addEventListener("click", (event)=> {
//     event.preventDefault();

//     contact = {
//         firstName: document.getElementById("firstName").value,
//         lastName: document.getElementById("lastName").value,
//         address: document.getElementById("address").value,
//         city: document.getElementById("city").value,
//         email: document.getElementById("email").value
//     }

//     localStorage.setItem("contact", JSON.stringify(contact));
// })

let contact = {
    firstName: "test",
    lastName: "test",
    address: "test",
    city: "test",
    email: "test"
}

let products = ["8906dfda133f4c20a9d0e34f18adcf06"];

let btnCommander = document.getElementById("order");

// btnCommander.addEventListener("click", (event)=> {
//      event.preventDefault();
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
            //localStorage.setItem("confirmationProduit", JSON.stringify(affichage));
            //window.location.href = "confirmation.html";
        })
        .catch(function(error) {
            alert(error);
        })
//})