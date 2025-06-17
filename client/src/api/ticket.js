import axios  from "axios";

export const createTicket = (ticket) => axios.post(import.meta.env.VITE_CREATE_TICKET, ticket);
export const getAllTicketsUser = (userId) => axios.post(import.meta.env.VITE_ALL_TICKETS, {userId});