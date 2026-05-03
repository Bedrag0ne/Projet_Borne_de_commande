let cart = [];

export function getCart(){
  return cart;
}

export function clearCart(){
  cart.length = 0;
}

export function addToCart(productId){
  const item = cart.find(p => p.articleId === productId);

  if (item) item.quantity++;
  else cart.push({ articleId: productId, quantity: 1 });
}

export function getTotal(products){
  let totalCents = 0;
  cart.forEach(item => {
    const product = products.find(p => (p.id === item.articleId));
    if (!product) return;
    totalCents += item.quantity*product.priceCents;
  });
  return totalCents;
}

export function formatCart(products) {
  const formatted = [];
  cart.forEach(item => {
    const product = products.find(p => (p.id === item.articleId));
    if (!product) return;
    formatted.push({
      name: product.name,
      quantity: item.quantity,
      totalCents: product.priceCents*item.quantity
    });
  });
  return formatted;
}