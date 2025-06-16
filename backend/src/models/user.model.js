import { supabase } from "../db.js";


export async function createUser(user){
    const { data, error } = await supabase
    .from('users')
    .insert([
        {
            uid: user.uid,
            name: user.name,
            email: user.email,
        }
    ])
    return {data,error}
}


export async function getUserByUid(uid){
    const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('uid', uid)
    .single()
    if (error) throw error;
    return {data,error}
}


export async function getUserByEmail(email){
    const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()
    if (error) throw error;
    return {data,error}
}