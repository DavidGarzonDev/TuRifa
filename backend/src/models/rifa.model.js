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