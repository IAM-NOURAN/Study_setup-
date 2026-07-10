import axios from "axios";

const api = axios.create({
  baseURL: "https://6a516dd3c576c846dcba572c.mockapi.io/users",
});

export default api;