import api from "./api";

export async function signup({ name, email, password, passwordConfirm }) {
  const response = await api.post("users/signup", {
    name,
    email,
    password,
    passwordConfirm,
  });

  localStorage.setItem("token", response.data.token);

  return response.data.data.user;
}

export async function login({ email, password }) {
  const response = await api.post("users/login", {
    email,
    password,
  });

  localStorage.setItem("token", response.data.token);

  return response.data.data.user;
}

export async function updatePassword({
  passwordCurrent,
  password,
  passwordConfirm,
}) {
  const response = await api.patch("users/updatePassword", {
    passwordCurrent,
    password,
    passwordConfirm,
  });

  localStorage.setItem("token", response.data.token);

  return null;
}
