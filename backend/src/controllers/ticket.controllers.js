import { createTicket, getAllTicketsModel, getTicketsByRifaId, ticketModel } from "../models/ticket.models.js";
import admin from "../firebase.js";


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
        const { token } = req.body.userId

        if (!token) {
            return res.status(400).json({ error: "Token de usuario no proporcionado" });
        }

        const decode = await admin.auth().verifyIdToken(token);
        const {uid} = decode;


        if (!uid) {
            return res.status(404).json({error:"No existe el usuario"});
        }

        const {data, error} = await getAllTicketsModel(uid);
        if (error) {
            return res.status(500).json({ error: "Error al obtener las rifas" });
        }
        
        res.status(200).json({ tickets: data });
    } catch (error) {
        console.error("Error en la peticion de todas las rifas", error)
        res.status(400).json({error : "Error interno del servidor"})
    }
}

// Nuevo controlador para obtener tickets por ID de rifa
export const getTicketsByRifaIdController = async (req, res) => {
    try {
        const { rifaId } = req.params;
        
        if (!rifaId) {
            return res.status(400).json({ error: "ID de rifa no proporcionado" });
        }
        
        // Utiliza el modelo para obtener los tickets
        const tickets = await getTicketsByRifaId(rifaId);
        
        res.status(200).json(tickets);
    } catch (error) {
        console.error("Error al obtener tickets por ID de rifa:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

// Controlador para obtener un ticket específico por su ID
export const getTicketByIdController = async (req, res) => {
    try {
        const { ticketId } = req.params;
        
        if (!ticketId) {
            return res.status(400).json({ error: "ID de ticket no proporcionado" });
        }
        
        // Utiliza el modelo para obtener el ticket
        const { data, error } = await ticketModel.getTicketById(ticketId);
        
        if (error) {
            console.error("Error al obtener ticket por ID:", error);
            return res.status(500).json({ error: "Error al obtener ticket" });
        }
        
        if (!data) {
            return res.status(404).json({ error: "Ticket no encontrado" });
        }
        
        res.status(200).json({ ticket: data });
    } catch (error) {
        console.error("Error al obtener ticket por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}