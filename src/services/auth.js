import axios from "axios";
const baseURL = "http://localhost:3000/auth";

const service = axios.create({
  baseURL,
  withCredentials: true
});

export const authService = {
  register(userData) {
    return service.post("/signup", userData);
  },
  login(userData) {
    return service.post("/login", userData);
  },
  logout() {
    return service.get("/logout");
  }
};

export default service;
