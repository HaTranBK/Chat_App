import axios from "axios";
const token = JSON.parse(localStorage.getItem("UserToken"));
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8080/api"
      : "/api",
  withCredentials: true,
  timeout: 30000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
