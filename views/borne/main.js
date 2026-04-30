import { fetchProducts } from "./products.js";

const imagesPath = '/images'

async function init() {
  const products = await fetchProducts();
  renderProducts(products);
  renderCart(products);
  startButtons(products);
}

function renderProducts(products) {
  let html = '';
  products.forEach(value => {
    if (value.sizes === null) {
      html += 
      `
      <button class="button-product js-button-product" data-product-id="${value.id}" data-size-id="-1">
        <img class="product-thumbnail" src="${imagesPath}/${value.productImage}">
        <p class="product-name">
          <strong>${value.name}</strong> 
        </p>
        <p class="product-price">
          ${(value.basePriceCents/100).toFixed(2)} &#8364;
        </p> 
      </button>
      `;
    } else {
      value.sizes.forEach(size => {
        html += 
        `
        <button class="button-product js-button-product" data-product-id="${value.id}" data-size-id="${size.sizeId}">
          <img class="product-thumbnail" src="${imagesPath}/${size.sizeImage}">
          <p class="product-name">
            <strong>${size.sizeName} ${value.name}</strong> 
          </p>
          <p class="product-price">
            ${(size.sizePriceCents/100).toFixed(2)} &#8364;
          </p> 
        </button>
        `;
      });
    }
  })
  document.querySelector('.js-products').innerHTML = html;
}

function startButtons(products) {
  document.querySelectorAll('.js-button-product').forEach(button => {
    button.addEventListener('click',() => {
      const productId = Number(button.dataset.productId);
      const sizeId = Number(button.dataset.sizeId);
      let isInCart = false;
      cart.forEach(value => {
        if ((value.id === productId)&&(value.sId === sizeId)) {
          isInCart = true;
          value.quantity += 1;
        }
      })
      if (!isInCart) {
        cart.push({id:productId,sId:sizeId,quantity:1});
      }
      renderCart(products);
    });
  });

  document.querySelector('.js-cancel-button').addEventListener('click',() => {
    cart.length = 0;
    renderCart(products);
  });

  document.querySelector('.js-confirm-button').addEventListener('click',() => {
    cart.length = 0;
    renderCart(products);
  });
}

function renderCart(products) {
  let html = ''; 
  cart.forEach(value => {
    const product = findProduct(products,value.id);
    if (value.sId === -1) {
      html += 
        `
          <p class="product-cart">
            ${value.quantity}&#215; ${product.name} - ${((product.basePriceCents*value.quantity)/100).toFixed(2)} &#8364;
          </p>
        `;
    } else {
      const size = product.sizes.find(s => (s.sizeId === value.sId));
      html += 
        `
          <p class="product-cart">
            ${value.quantity}&#215; ${size.sizeName} ${product.name} - ${((size.sizePriceCents*value.quantity)/100).toFixed(2)} &#8364;
          </p>
        `;
    }
  });
  document.querySelector('.js-cart').innerHTML = html;
  updateTotal(products);
}

function updateTotal(products) {
  let totalCents = 0;
  let html = '';
  cart.forEach(value => {
    const product = findProduct(products,value.id);
    if (value.sId === -1) {
      totalCents += value.quantity*product.basePriceCents;
    } else {
      totalCents += value.quantity*product.sizes.find(s => (s.sizeId === value.sId)).sizePriceCents;
    }
  });
  html = 
  `
    <strong>Total ${(totalCents/100).toFixed(2)} &#8364;</strong>
  `;
  document.querySelector('.js-total').innerHTML = html;
}

function findProduct(products,id) {
  return products.find(element => (element.id === id));
}

document.addEventListener("DOMContentLoaded",init);