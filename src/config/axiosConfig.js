import axios from "axios";
import { getToken } from "../utils/tokenHelper";

const api = axios.create({
  baseURL: "https://localhost:7152/api",
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
