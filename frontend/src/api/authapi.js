import axios from "axios";

const api = axios.create({
  baseURL: "https://habit-tracker958.netlify.app/" || "http://localhost:3001",
  withCredentials: true,
});

export const register = (user) => {
  return api.post("/auth/register", user);
};

export const login = (credentials) => {
  return api.post("/auth/login", credentials);
};