let produits = [];
let keyname
let listeAffichage


for(let i=0; i < localStorage.length; i++) {
    keyname = localStorage.key(i);

    console.log(keyname);
    produits += localStorage.getItem(keyname);
}

console.log(produits);

// let prenom = document.getElementById("firstName").value;
// let nom = document.getElementById("lastName").value;
// let adresse = document.getElementById("address").value;
// let ville = document.getElementById("city").value;
// let mail = document.getElementById("email").value;

// contact = {
//     prenom: prenom,
//     nom: nom,
//     adresse: adresse,
//     ville: ville,  
//     mail: mail
// };

// console.log(contact);

const contact = {
    firstName: "test",
    lastName: "test",
    address: "test",
    city: "test",
    email: "test"
};

const products = ["034707184e8e4eefb46400b5a3774b5f"];

let aEnvoyer = {
    products,
    contact
};

fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(aEnvoyer),
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
        listeAffichage = affichage;
        console.log(listeAffichage);
    })
    .catch(function(error) {
        alert(error);
    })


let section = document.getElementById("cart__items");
let article = document.createElement("article");
article.className = "cart__item";
section.appendChild(article);

let divPanier1 = document.createElement("div");
divPanier1.className = "cart__item__img";
article.appendChild(divPanier1);

let imgPanier = document.createElement("img");
imgPanier.src = "";
imgPanier.alt = "";
divPanier1.appendChild(imgPanier);

let divPanier2 = document.createElement("div");
divPanier2.className = "cart__item__content";
article.appendChild(divPanier2);

let divDescription = document.createElement("div");
divDescription.className = "cart__item__content__description";
divPanier2.appendChild(divDescription);



// let test = {
//     nom: "Morvan",
//     prenom: "Yann"
// };

// fetch("https://jsonplaceholder.typicode.com/users", {
//     method: "POST",
//     body: JSON.stringify(test),
//     headers: {
//         "Content-Type": "application/json",
//     },
// })
//     .then(function(response) {
//         if(response.ok) {
//             return response.json();
//         }
//     })
//     .then(function(essai) {
//         let listeEssai = essai;
//         console.log(listeEssai);

//         let cart = document.getElementById("cart__items");
//         let nom = document.createElement("p");
//         let prenom = document.createElement("p");
//         nom.textContent = listeEssai.nom;
//         prenom.textContent = listeEssai.prenom;
//         cart.appendChild(nom);
//         cart.appendChild(prenom);
//     })
