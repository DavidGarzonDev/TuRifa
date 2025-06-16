import { createRifa, getRifasUser, getRifa} from "../models/rifa.model.js";
import admin from "../firebase.js";
import { supabase } from "../db.js";


export const createRifas = async (req, res) => {
    try {
        console.log("Datos recibidos:", req.body);
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ error: "El token es requerido" });
        }

        const decoded = await admin.auth().verifyIdToken(token);
        const { uid } = decoded;

        const rifaData = req.body.rifa;
        rifaData.userId = uid;

        const { rifa, error } = await createRifa(rifaData);
        if (error) {
            console.log("Error details:", error);
            return res.status(500).json({ error: "Error al crear la rifa" });
        }

        res.status(201).json({ rifa });
    } catch (error) {
        console.error("Error al crear la rifa:", error);
        
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


export const getRifasUsers = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ error: "El token es requerido" });
        }

        const decoded = await admin.auth().verifyIdToken(token);
        const { uid } = decoded;

        const { data, error } = await getRifasUser(uid);
        if (error) {
            return res.status(500).json({ error: "Error al obtener las rifas" });
        }

        res.status(200).json({ rifas: data });
        
    } catch (error) {
        console.error("Error al obtener las rifas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
        
    }
}


export const getAllRifas = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('rifas')
            .select('*')
            .order('start_date', { ascending: false });

        if (error) {
            return res.status(500).json({ error: "Error al obtener las rifas" });
        }

        res.status(200).json({ rifas: data });
    } catch (error) {
        console.error("Error al obtener todas las rifas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}


export const getRifaById = async (req, res ) =>{
    try {
        const { rifaId } = req.query;
        const rifa = await getRifa(rifaId);
        if (!rifa || !rifa.data) {
            return res.status(404).json({ error: "Rifa no encontrada" });
        }
        
        res.status(200).json({ rifa: rifa.data });
        
    } catch (error) {
        console.error("Error al obtener la rifa por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}