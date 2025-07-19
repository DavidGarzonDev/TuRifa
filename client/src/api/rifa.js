import axios from "axios";

export const getRifas = (token) => 
    axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/create/rifa`, {token} );
export const createRifa = (rifa) => 
    axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/create/rifa`, rifa);
export const getAllRifas = () => 
    axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/get/all/rifas`);
export const getRifaById = (rifaId) => 
    axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/get/rifa`, {params : {rifaId}});
export const updatePartialRifa = (id, fieldsToUpdate) => 
    axios.patch(`${import.meta.env.VITE_API_BACKEND_URL}/update/rifa`, fieldsToUpdate, {params : {id}});
export const decrementRifaTicket = (rifaId, amount) => 
    axios.patch(`${import.meta.env.VITE_API_BACKEND_URL}/decrement/ticket`, {rifaId, amount});
export const checkRifaForDraw = (rifaId, token) => 
    axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/rifas/${rifaId}/check-draw`, { token });
export const realizarSorteo = (rifaId, token) => 
    axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/rifas/${rifaId}/sorteo`, { token });
