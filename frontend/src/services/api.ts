import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL?.trim() ||
  "http://localhost:8080";

export const api = axios.create({
  baseURL,
  timeout: 5_000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});