import axios from "axios";

const api = axios.create({
  baseURL: "https://habit-tracker958.netlify.app/" || "http://localhost:3001",
  withCredentials: true,
});

const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getHabits = () => {
  return api.get("/habits");
};

export const addHabit = (habit) => {
  return api.post("/habits", habit, getConfig());
};

export const updateHabit = (id, habit) => {
  return api.put(`/habits/${id}`, habit, getConfig());
};

export const deleteHabit = (id) => {
  return api.delete(`/habits/${id}`, getConfig());
};