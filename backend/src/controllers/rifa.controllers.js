import { createRifa, getRifasUser} from "../models/rifa.model.js";
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


export const getRifas = async (req, res) => {
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