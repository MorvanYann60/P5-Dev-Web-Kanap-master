const url = "http://localhost:3000/api/products";

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
        let articleElement = document.createElement("article");
        let imgElement = document.createElement("img");
        let titreElement = document.createElement("h3");
        let descriptionElement = document.createElement("p");

        section.appendChild(aElement);
        aElement.href = './product.html?id=' + produit._id;
        aElement.appendChild(articleElement);
        articleElement.appendChild(imgElement);
        imgElement.src = produit.imageUrl;
        imgElement.alt = produit.altTxt;
        articleElement.appendChild(titreElement);
        titreElement.textContent = produit.name;
        articleElement.appendChild(descriptionElement);
        descriptionElement.textContent = produit.description;
    }
}
