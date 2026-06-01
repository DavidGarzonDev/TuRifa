import api from "../utils/api";

export const createTicket = (ticket) => api.post("/create/ticket", ticket);
export const getAllTicketsUser = (userId) => api.post("/get/all/tickets", {userId});
export const getTicketsByRifaId = (rifaId) => api.get(`/tickets/rifa/${rifaId}`);