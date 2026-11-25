import api from "./api";

export async function getMyAccountDetails() {
  const response = await api.get("users/me");

  return response.data.data.user;
}

export async function updateMe({ name, email, phone }) {
  const response = await api.patch("users/updateMe", { name, email, phone });

  return response.data.data.updatedUser;
}
