const url = "http://localhost:3000/api/products";

// const section = document.getElementById("items");
// let aElement = document.createElement("a");
// let articleElement = document.createElement("article");
// let imgElement = document.createElement("img");
// let titreElement = document.createElement("h3");
// let descriptionElement = document.createElement("p");

// aElement.href = "./product.html?id=42";

// section.appendChild(aElement);
// aElement.appendChild(articleElement);
// articleElement.appendChild(imgElement);
// articleElement.appendChild(titreElement);
// articleElement.appendChild(descriptionElement);

fetch(url)
    .then(function(response) {
        if(response.ok) {
            return response.json();
        }
    })
    .then(function(canapes) {
        totalInfos(canapes);
        console.log(canapes);
    })
    .catch(function(error) {
        alert(error);
    });

function totalInfos(canapes) {
    for(produit of canapes) {
        const section = document.getElementById("items");
        let aElement = document.createElement("a");
        section.appendChild(aElement);
        aElement.href = '"./product01.html?id=42"';

        //section.innerHTML += '<a href="./product01.html?id=42"></a>';
    }
}

//alert("bonjour le monde");