import { supabase } from "../db.js";

/**
 * Inserta un nuevo usuario en la tabla "users"
 * @param {{uid:string,name:string,email:string}} user
 */

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

/**
 * Busca un usuario por su uid
 * @param {string} uid
 */

export async function getUserByUid(uid){
    const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('uid', uid)
    .single()
    if (error) throw error;
    return {data,error}
}

/**
 * Busca un usuario por su email
 * @param {string} email
 */

export async function getUserByEmail(email){
    const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()
    if (error) throw error;
    return {data,error}
}