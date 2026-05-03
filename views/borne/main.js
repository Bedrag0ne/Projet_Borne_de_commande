import {fetchProducts} from "./products.js";
import {getCart,clearCart,addToCart,getTotal,formatCart} from "./cart.js";

const imagesPath = '/images';
const rId = 1;

async function init() {
  const products = await fetchProducts();
  renderProducts(products);
  renderCart(products);
  startButtons(products);
}

function renderProducts(products) {
  let html = '';
  products.forEach(value => {
    html += 
    `
    <button class="button-product js-button-product" data-product-id="${value.id}">
      <img class="product-thumbnail" src="${imagesPath}/${value.thumbnail}">
      <p class="product-name">
        <strong>${value.name}</strong> 
      </p>
      <p class="product-price">
        ${(value.priceCents/100).toFixed(2)} &#8364;
      </p> 
    </button>
    `;
  })
  document.querySelector('.js-products').innerHTML = html;
}

function startButtons(products) {
  document.querySelectorAll('.js-button-product').forEach(button => {
    button.addEventListener('click',() => {
      addToCart(Number(button.dataset.productId));
      renderCart(products);
    });
  });

  document.querySelector('.js-cancel-button').addEventListener('click',() => {
    clearCart();
    renderCart(products);
  });

  document.querySelector('.js-confirm-button').addEventListener('click',() => {
    createOrder();
    clearCart();
    renderCart(products);
  });
}

function renderCart(products) {
  let html = ''; 
  const formatted = formatCart(products);
  formatted.forEach(item => {
    html += 
      `
        <p class="product-cart">
          ${item.quantity}&#215; ${item.name} - ${(item.totalCents/100).toFixed(2)} &#8364;
        </p>
      `;
  });
  document.querySelector('.js-cart').innerHTML = html;
  updateTotal(products);
}

function updateTotal(products) {
  const totalCents = getTotal(products);
  const html = `<strong>Total ${(totalCents/100).toFixed(2)} &#8364;</strong>`;
  document.querySelector('.js-total').innerHTML = html;
}

async function createOrder() {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      items: getCart(),
      restaurantId:rId
    })
  });

  const data = await res.json();
  console.log("Commande créée :", data);
}

document.addEventListener("DOMContentLoaded",init);