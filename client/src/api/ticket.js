import axios  from "axios";

export const createTicket = (ticket) => axios.post(import.meta.env.VITE_CREATE_TICKET, ticket);