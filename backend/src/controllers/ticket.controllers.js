import { createTicket } from "../models/ticket.models.js";


export const createTicketController = async (req, res) => {
    try {
        const ticketData = req.body;
        if (!ticketData || !ticketData.rifaId || !ticketData.userId) {
            return res.status(400).json({ error: "Datos de ticket incompletos" });
        }

        const { data, error } = await createTicket(ticketData);
        if (error) {
            console.error("Error al crear el ticket:", error);
            return res.status(500).json({ error: "Error al crear el ticket" });
        }

        res.status(201).json({ ticket: data });
    } catch (error) {
        console.error("Error en el controlador de creación de ticket:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const getAllTickets = async (req, res) => {
    try {
        const { userId } = req.body

        if (!userId) {
            return res.status(404).json{{error:"No existe el usuario"}}
        }

        const {data, errors} = getAllTickets(userId)
        if (error) {
            return res.status(500).json({ error: "Error al obtener las rifas" });
        }
        
        res.status(200).json({ tickets: data });
    } catch (error) {
        console.error("Error en la peticion de tdoas las rifas", error)
        res.status(500).json({errror : "Error interno del servidor"})
    }
    
}