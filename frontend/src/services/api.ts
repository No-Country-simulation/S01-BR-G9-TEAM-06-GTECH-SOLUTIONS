import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL?.trim() ||
  "/api";

export const api = axios.create({
  baseURL,
  timeout: 5_000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});