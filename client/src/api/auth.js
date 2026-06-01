import api from "../utils/api";

export const loginRequest = (user) => api.post("/login", user);

export const registerRequest = (user) => api.post("/register", user);


