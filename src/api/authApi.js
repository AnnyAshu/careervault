import api from "../config/axiosConfig";

export const loginApi = (email, password) =>
  api.post("/auth/login", { email, password });

export const registerApi = (data) =>
  api.post("/auth/register", data);
