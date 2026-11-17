import api from "./api";

export async function getAllProducts() {
  const response = await api.get("products");

  return response.data.data.products;
}

export async function getProduct(id) {
  const response = await api.get(`products/${id}`);

  return response.data.data.product;
}
