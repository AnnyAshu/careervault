import api from "../config/axiosConfig";

export const loginApi = (email, password) =>
  api.post("/auth/login", { email, password });

export const registerApi = (username,email, password) =>
  api.post("/auth/register",{username,email, password});
