import axios from "axios";

export const getRifas = (token) => axios.post(import.meta.env.VITE_API_BACKEND_GET_RIFAS, {token} );
export const createRifa = (rifa) => axios.post(import.meta.env.VITE_API_BACKEND_CREATE_RIFA, rifa);