import axios from "axios";

const api = axios.create({
  baseURL: "https://habittracker-8kse.onrender.com/habits",
  withCredentials: true,
});

export const register = (user) => {
  return api.post("/auth/register", user);
};

export const login = (credentials) => {
  return api.post("/auth/login", credentials);
};
