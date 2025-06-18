import { supabase } from "../db.js";


export async function createTicket(ticket){
   
    const { data, error } = await supabase
    .from('tickets')
    .insert([
        {
            id_rifa: ticket.rifaId,
            id_user: ticket.userId,
            buy_date: ticket.buyDate,
            expire_date : ticket.expireDate,
            state: ticket.status,
            id_pago: ticket.idPago,
            price: ticket.price,
            method_pago: ticket.methodPago,
            
            
        }
    ]);

    return { data, error };
}


export async function getTicketsByRifaId(rifaId) {
  
    const { data, error } = await supabase
    .from('tickets')
    .select("*")
    .eq('id_rifa', rifaId);
    
    if (error) throw error;

    const processedData = data.map(ticket => {
        if (!ticket.numero_boleto) {
            ticket.numero_boleto = `#${String(ticket.id).padStart(4, '0')}`;
        }
        return ticket;
    });
    
    return processedData; // Retornamos los datos procesados
}

export async function getAllTicketsModel(userId) {
    const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('id_user', userId);

    if (error) throw error;
    return { data, error };
}

export async function getTicketById(ticketId) {
    const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('id', ticketId)
    .single();
    
    if (error) throw error;
    
    // Procesamos el número de boleto si no existe
    if (data && !data.numero_boleto) {
        data.numero_boleto = `#${String(data.id).padStart(4, '0')}`;
    }
    
    return { data, error };
}

// Exportamos las funciones en un objeto
export const ticketModel = {
    createTicket,
    getTicketsByRifaId,
    getAllTicketsModel,
    getTicketById
};