const urlProduit = window.location.search;
console.log(urlProduit);

const urlParams = new URLSearchParams(urlProduit);
console.log(urlParams);

const choisirLeId = urlParams.get("id");
console.log(choisirLeId);

fetch(`http://localhost:3000/api/products/${choisirLeId}`)
    .then(function(response) {
        if(response.ok) {
            return response.json();
        }
    })
    .then(function(produit) {
        console.log(produit);
        let divProduit = document.getElementsByTagName("div")[5];
        let imageProduit = document.createElement("img");
        imageProduit.src = produit.imageUrl;
        imageProduit.alt = produit.altTxt;
        divProduit.appendChild(imageProduit);
        console.log(divProduit);
        
        
        let idTitre = document.getElementById("title");
        idTitre.textContent = produit.name;
        let idPrix = document.getElementById("price");
        idPrix.textContent = produit.price;
        let idDescription = document.getElementById("description");
        idDescription.textContent = produit.description;
        
        let idCouleur = document.getElementById("colors");
        idCouleur.innerHTML = `<option value="${produit.colors[0]}">${produit.colors[0]}</option>
        <option value="${produit.colors[1]}">${produit.colors[1]}</option>
        <option value="${produit.colors[2]}">${produit.colors[2]}</option>`;
    })
    .catch(function(error) {
        alert(error);
    });