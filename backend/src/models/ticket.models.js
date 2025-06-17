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
    .select('*')
    .eq('rifaId', rifaId);
mor 

    if (error) throw error;
    return { data, error };
}

export async function getAllTickets(userId) {
    const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('id_user', userId)

    if (error) throw error;
    return { data, error };
}