const products = [
  {id: 1,name: 'Big Mac&#8482;',priceCents: 660,thumbnail:'../pictures/big_mac.png'},
  {id: 2,name: 'Moyenne Frite',priceCents: 390,thumbnail:'../pictures/frite_moyenne.png'},
  {id: 3,name: 'Coca-Cola&#174; 40CL - Taxe boisson sucrée',priceCents: 369,thumbnail:'../pictures/coca-cola.png'},
];

const cart = [];

function init() {
  renderProducts();
  renderCart();
  startButtons();
}

function renderProducts() {
  let html = '';
  products.forEach(value => {
    html += 
    `
    <button class="button-product js-button-product" data-product-id="${value.id}">
      <img class="product-thumbnail" src="${value.thumbnail}">
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

function startButtons() {
  document.querySelectorAll('.js-button-product').forEach(button => {
    button.addEventListener('click',() => {
      const productId = Number(button.dataset.productId);
      let isInCart = false;
      cart.forEach(value => {
        if (value.id === productId) {
          isInCart = true;
          value.quantity += 1;
        }
      })
      if (!isInCart) {
        cart.push({id:productId,quantity:1});
      }
      renderCart();
    });
  });

  document.querySelector('.js-cancel-button').addEventListener('click',() => {
    cart.length = 0;
    renderCart();
  });

  document.querySelector('.js-confirm-button').addEventListener('click',() => {
    cart.length = 0;
    renderCart();
  });
}

function renderCart() {
  let html = ''; 
  cart.forEach(value => {
    const product = findProduct(value.id);
    html += 
    `
      <p class="product-cart">
        ${value.quantity}&#215; ${product.name} - ${((product.priceCents*value.quantity)/100).toFixed(2)} &#8364;
      </p>
    `;
  });
  document.querySelector('.js-cart').innerHTML = html;
  updateTotal();
}

function updateTotal() {
  let totalCents = 0;
  let html = '';
  cart.forEach(value => {
    const product = findProduct(value.id);
    totalCents += value.quantity*product.priceCents;
  });
  html = 
  `
    <strong>Total ${(totalCents/100).toFixed(2)} &#8364;</strong>
  `;
  document.querySelector('.js-total').innerHTML = html;
}

function findProduct(id) {
  return products.find(element => element.id === id);
}

document.addEventListener("DOMContentLoaded",init);