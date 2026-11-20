import api from "./api";

export async function getMyAccountDetails() {
  const response = await api.get("users/me");

  return response.data.data.user;
}
