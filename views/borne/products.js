export async function fetchProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();
  return products;
}