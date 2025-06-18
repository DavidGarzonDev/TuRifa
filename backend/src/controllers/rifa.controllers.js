import { createRifa, getRifasUser, getRifa, updateRifa, decrementRifaTickets, rifaModel} from "../models/rifa.model.js";
import { ticketModel } from "../models/ticket.models.js";
import admin from "../firebase.js";
import { supabase } from "../db.js";
import { getUserByUid } from "../models/user.model.js";


export const createRifas = async (req, res) => {
    try {
        console.log("Datos recibidos:", req.body);
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ error: "El token es requerido" });
        }

        const decoded = await admin.auth().verifyIdToken(token);
        const { uid, name } = decoded;

        const rifaData = req.body.rifa;
        rifaData.userId = uid;
        rifaData.organizer = name;

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


export const updatePartialRifa = async (req, res) => {
    try{
        const { id } = req.params;
        const fieldsToUpdate = req.body;


        const rifa = await getRifaById(id)
        if (!rifa || !rifa.data) {
            return res.status(404).json({ error: "Rifa no encontrada" });
        }

        console.log("Campos a actualizar:", fieldsToUpdate);

        await updateRifa(id, fieldsToUpdate);
        
        res.status(200).json({ message: "Rifa actualizada correctamente" });

    } catch (error) {
        console.error("Error al actualizar la rifa:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const decrementRifaTicket = async (req, res) => {
    const { rifaId, amount } = req.body;
    try {
        if (!rifaId || !amount) {
            return res.status(400).json({ error: "rifaId y amount son requeridos" });
        }

        const rifa = await getRifa(rifaId);
        if (!rifa || !rifa.data) {
            return res.status(404).json({ error: "Rifa no encontrada" });
        }

        const { data, error} = await decrementRifaTickets(rifaId, amount);
        if (error) {
            console.error("Error al decrementar los tickets de la rifa:", error);
            return res.status(500).json({ error: "Error al decrementar los tickets de la rifa" });
        }
        res.status(200).json({ message: "Tickets de la rifa decrementar correctamente", data });

    } catch (error) {
        console.error("Error al decrementar los tickets de la rifa:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }

}

// Función para generar un número aleatorio verificable
function generateVerifiableRandom(seed, max) {
    // Usamos un algoritmo simple pero verificable
    // En producción se puede usar un algoritmo más robusto
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash |= 0; // Convertir a entero de 32 bits
    }
    
    // Convertimos a positivo y tomamos el módulo para el rango requerido
    const positiveHash = Math.abs(hash);
    return positiveHash % max;
}

// Controlador para verificar si una rifa está lista para sorteo
export const checkRifaForDraw = async (req, res) => {
    try {
        const { rifaId } = req.params;
        const { token } = req.body;
        
        if (!token) {
            return res.status(401).json({ error: "Autenticación requerida" });
        }
        
        // Verificar que el usuario sea el creador de la rifa
        const decoded = await admin.auth().verifyIdToken(token);
        const { uid } = decoded;
        
        const { data: rifa } = await rifaModel.getRifa(rifaId);
        if (!rifa || rifa.userID !== uid) {
            return res.status(403).json({ error: "No tienes permiso para realizar el sorteo de esta rifa" });
        }
        
        const { isReady, reason } = await rifaModel.isRifaReadyForDraw(rifaId);
        
        return res.status(200).json({ 
            isReady,
            reason: !isReady ? reason : null,
            message: isReady ? "La rifa está lista para sorteo" : "La rifa no está lista para sorteo"
        });
        
    } catch (error) {
        console.error("Error al verificar rifa para sorteo:", error);
        return res.status(500).json({ error: "Error interno al verificar la rifa" });
    }
};

// Controlador para realizar el sorteo
export const realizarSorteo = async (req, res) => {
    try {
        const { rifaId } = req.params;
        const { token } = req.body;
        
        if (!token) {
            return res.status(401).json({ error: "Autenticación requerida" });
        }
        
        // Verificar que el usuario sea el creador de la rifa
        const decoded = await admin.auth().verifyIdToken(token);
        const { uid } = decoded;
        
        const { data: rifa } = await rifaModel.getRifa(rifaId);
        if (!rifa || rifa.userID !== uid) {
            return res.status(403).json({ error: "No tienes permiso para realizar el sorteo de esta rifa" });
        }
        
        // Verificar si la rifa está lista para sorteo
        const { isReady, reason } = await rifaModel.isRifaReadyForDraw(rifaId);
        if (!isReady) {
            return res.status(400).json({ error: reason || "Esta rifa no está lista para sorteo" });
        }
        
        // Obtener todos los tickets vendidos
        const tickets = await ticketModel.getTicketsByRifaId(rifaId);
        
        if (!tickets || tickets.length === 0) {
            return res.status(400).json({ error: "No hay tickets vendidos para esta rifa" });
        }
        
        // Generar número aleatorio usando un seed verificable
        const timestamp = Date.now();
        const seed = `${timestamp}-${rifaId}-${uid}`;
        
        // Seleccionar un índice aleatorio entre todos los boletos vendidos
        const randomIndex = generateVerifiableRandom(seed, tickets.length);
        
        // Seleccionar ganador
        const ganador = tickets[randomIndex];
        
        // Verificamos que el ticket tenga un número de boleto válido
        if (!ganador.numero_boleto) {
            // Si no tiene número de boleto, generamos uno con formato correcto
            ganador.numero_boleto = `#${String(ganador.id).padStart(4, '0')}`;
            
            // En un entorno real, podríamos actualizar el boleto en la base de datos
            // pero para esta implementación solo lo usaremos para mostrar
        }
        
        // Actualizar estado de la rifa y guardar ganador
        await rifaModel.updateRifaStatus(rifaId, 'Cerrada');
        await rifaModel.setRifaWinner(rifaId, ganador.id_user, ganador.id);
        

        const user = await getUserByUid(ganador.id_user);

        if (!user) {
            return res.status(404).json({ error: "Usuario del ganador no encontrado" });
        }

        const ganadorInfo = {
            ticketId: ganador.id,
            ticketNumber: ganador.numero_boleto,
            userId: user.data.uid,
            nombre: user.data.name ? user.data.name : 'Usuario',
            email: user.data.email ? user.data.email : '',
        };
        
        return res.status(200).json({ 
            success: true,
            message: 'Sorteo realizado con éxito',
            timestamp,
            seed,
            randomIndex,
            totalTickets: tickets.length,
            ganador: ganadorInfo,
            rifa: {
                id: rifa.id,
                title: rifa.title,
                prize: rifa.prize
            }
        });
        
    } catch (error) {
        console.error("Error al realizar sorteo:", error);
        return res.status(500).json({ error: "Error interno al realizar el sorteo" });
    }
};