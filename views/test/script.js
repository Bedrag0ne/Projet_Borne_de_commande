const produits = [
    {nom: "Burger", prix: 3.0 },
    {nom: "Frites", prix: 1.50 },
    {nom: "Coca-cola", prix: 1.0 }
];

const DECIMAL = 2;
const total = 0;
const panier = [];

const ulProduits = document.getElementById("produits");
const ulPanier = document.getElementById("panier");
const h3Total = document.getElementById("total");

function init() {
    afficheProduits();
    afficherTotal(total);
    document.getElementById("valider").addEventListener("click",validerPanier);
}

function validerPanier() {
    /*Réinitialise la liste panier.*/
    panier.length = 0;
    afficherPanier();
}

function afficheProduits() {
    /*Affiche les produits disponibles et ajoute un bouton à chaque produits.*/
    produits.forEach((produit, index) => {
        
        const li = document.createElement("li");
        li.textContent = `${produit.nom} - ${produit.prix.toFixed(DECIMAL)}€`;

        const btn = document.createElement("button");
        btn.textContent = "Ajouter au panier";
        btn.addEventListener("click", () => {
            panier.push(produit);
            afficherPanier();     
        });

        li.appendChild(btn);
        ulProduits.appendChild(li);
    });
}

function afficherPanier() {
    /*Affiche le panier + le total.*/
    ulPanier.innerHTML = "";
    var total = 0;
    panier.forEach(item => {
        total = total + item.prix;

        const li = document.createElement("li");
        li.textContent = `${item.nom} - ${item.prix.toFixed(DECIMAL)}€`;
        
        const btn = document.createElement("button");
        btn.textContent = "Supprimer ce produit";
        btn.addEventListener("click", () => {
            panier.splice(panier.indexOf(item),1);
            total = total - item.prix;
            supprimerProduit(btn);     
        });

        li.appendChild(btn);
        ulPanier.appendChild(li);
    });
    afficherTotal(total);
}

function afficherTotal(total) {
    /*Modifie l'affichage du prix total.*/
    h3Total.textContent = `Total (TTC) - ${total.toFixed(DECIMAL)}€`;
}

function supprimerProduit(btn) {
    /*Enlève le produit du panier.*/
    btn.parentElement.remove();
    afficherPanier()
}

document.addEventListener("DOMContentLoaded",init);