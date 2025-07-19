import { createUser, getUserByUid } from "../models/user.model.js";
import admin from "../firebase.js";
import { supabase } from "../db.js";

export const register = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    console.log("El token es requerido");
    return res.status(400).json({ error: "El token es requerido" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const { uid, email, name } = decoded;

    let userFound = null;
    try {
      const { data } = await getUserByUid(uid);
      userFound = data;
    } catch (error) {
      if (err.status !== 406) throw err;
    }
    if (userFound) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    await createUser({
      uid,
      name,
      email,
    });

    res.status(200).send("Usuario guardado exitosamente");
  } catch (error) {
    res.status(400).send("Error al guardar el usuario: " + error.message);
  }
};

export const login = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    console.log("El token es requerido");
    return res.status(400).json({ error: "El token es requerido" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const { uid, email, name } = decoded;

    let userInDb = null;
    let findError = null;

    try {
 
      const { data, error } = await supabase
        .from("users")
        .select("*") 
        .eq("uid", uid)
        .maybeSingle(); 

      if (error) {
      
        throw error;
      }
      userInDb = data;
    } catch (err) {
      console.error("Error al buscar el usuario durante login:", err);

      findError = err;
    }

    if (findError) {
      return res
        .status(500)
        .json({ error: "Error interno al buscar el usuario." });
    }

    if (!userInDb) {
      console.log(`Usuario con uid ${uid} no encontrado, creando...`);
      try {
        const { data: newUser, error: createError } = await createUser({
          uid,
          name,
          email,
        });

        if (createError) {
          console.error("Error al crear usuario durante login:", createError);
          if (createError.code === "23505") {
            return res.status(409).json({
              error:
                "Conflicto al crear usuario (posiblemente email duplicado).",
            });
          }
          return res.status(500).json({
            error: "Error al guardar el nuevo usuario: " + createError.message,
          });
        }

        userInDb = newUser?.[0];
        console.log("Usuario creado exitosamente durante login:", userInDb);
      } catch (creationErr) {
        console.error("Error inesperado en bloque de creación:", creationErr);
        return res
          .status(500)
          .json({ error: "Error interno inesperado al crear usuario." });
      }
    } else {
      console.log(`Usuario encontrado: ${userInDb.email}`);
    }

    if (!userInDb) {
      console.error("Error crítico: userInDb es null después de buscar/crear.");
      return res.status(500).json({
        error: "Error interno: no se pudo obtener la información del usuario.",
      });
    }

    return res.status(200).json({
      message: "Usuario logeado con éxito",
      userId: userInDb.id, // El ID de tu tabla de Supabase
      email: userInDb.email,
    });

  } catch (error) {
    return res.status(400).send("Error en login: " + error.message);
  }
};

export const getUserByUidController = async (req, res) => {
  const { token, uid } = req.body;

  if (!token || !uid) {
    return res.status(400).json({ error: "Token y UID son requeridos" });
  }

  try {
    // Verificar el token primero para asegurar que la solicitud es legítima
    await admin.auth().verifyIdToken(token);

    // Obtener el usuario por UID
    const userData = await getUserByUid(uid);
    
    if (!userData || !userData.data) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Enviamos los datos directamente para evitar anidamientos innecesarios
    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error al obtener usuario por UID:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};


//endpoint para mantener activo supabase
export const dbactiva = async (req, res) => {

  try {

    const {data, error } = await supabase
    .from('users')
    .select('*')
    .limit(1)
    .maybeSingle()

    if(error){
      console.log("no vive")
      return res.status(500).json({error : "error de consulta!"})
      
    }

    console.log("vive")
    return res.status(200).json()

  } catch (error) {
    console.log("noooo", error)
    return res.status(500).json({error: 'Error de envio!'})
  }
}




