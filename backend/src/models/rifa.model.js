import { supabase } from "../db.js";


export async function createRifa(rifa){
    const { data, error } = await supabase
    .from('rifas')
    .insert([
        {
            description : rifa.description,
            total_tickets : rifa.totalTickets,
            prize : rifa.prize,
            start_date : rifa.startDate,
            end_date : rifa.endDate,
            title : rifa.title,
            userID : rifa.userId,
            ticket_price : rifa.ticketPrice,
            organizer : rifa.organizer,
            total_tickets_sold: rifa.totalTicketsSold || 0,
            revenue: rifa.revenue || 0,
        }
    ])

    return {data, error};
}


export async function getRifasUser(userID) {
    const { data, error } = await supabase
    .from('rifas')
    .select('*')
    .eq('userID', userID)
    if (error) throw error;
    return { data, error };
}


export async function getRifa(rifaId){
    const { data, error } = await supabase
    .from('rifas')
    .select('*')
    .eq('id', rifaId)
    .single();
    if (error) throw error;
    return { data, error };
}


export async function updateRifa(rifaId, fieldsToUpdate) {
    const { data, error } = await supabase
        .from('rifas')
        .update(fieldsToUpdate)
        .eq('id', rifaId);

    if (error) throw error;
    return { data, error };
}

export async function deleteRifa(rifaId) {

    const { data, error } = await supabase
        .from('rifas')
        .delete()
        .eq('id', rifaId);

    if (error) throw error;
    return { data, error };
}

export async function decrementRifaTickets(rifaId, amount){
    const { data: rifa, error: selectError } = await supabase
        .from('rifas')
        .select('total_tickets, total_tickets_sold, revenue, ticket_price')
        .eq('id', rifaId)
        .single();
    
    if (selectError) throw selectError;
  
    if (!rifa || rifa.total_tickets < amount) {
        throw new Error('No hay suficientes tickets disponibles');
    }

    const newTotal = rifa.total_tickets - amount;
    const sold = rifa.total_tickets_sold + amount;
    const newRevenue = rifa.revenue + (rifa.ticket_price * amount);

    const { data, error } = await supabase
        .from('rifas')
        .update({ 
            total_tickets: newTotal,
            total_tickets_sold: sold,
            revenue: newRevenue,
        })
        .eq('id', rifaId);
    
    if (error) throw error;
    return { data, error };
}