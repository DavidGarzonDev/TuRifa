import axios from "axios"

export const loginRequest = (user) => axios.post(import.meta.env.VITE_API_BACKEND_LOGIN, user)

export const registerRequest = (user) => axios.post(import.meta.env.VITE_API_BACKEND_REGISTER, user)


