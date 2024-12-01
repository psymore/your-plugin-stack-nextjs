// utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await api.post("/users", user);
  return response.data;
};

export const getPlugins = async () => {
  const response = await api.get("/plugins");
  return response.data;
};

export const createPlugin = async (plugin: any) => {
  const response = await api.post("/plugins", plugin);
  return response.data;
};
