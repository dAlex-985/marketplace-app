import api from "./api";

export async function getAllProducts() {
  const response = await api.get("products");

  return response.data.data.products;
}
