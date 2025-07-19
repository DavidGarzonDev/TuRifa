import axios  from "axios";

export const createTicket = (ticket) => axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/create/ticket`, ticket);
export const getAllTicketsUser = (userId) => axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/get/all/tickets`, {userId});
export const getTicketsByRifaId = (rifaId) => axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/tickets/rifa/${rifaId}`);