import axios from "axios";

console.log(import.meta.env);
const http = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});

http.interceptors.request.use((request) => {
  const jwt = localStorage.getItem("jwt");
  request.headers["authorization"] = jwt;
  return request;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) location.href = "/admin";
    else return error;
  }
);

export default http;
