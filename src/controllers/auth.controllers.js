import User from "../models/user.model.js";
import admin from "../firebase.js";

export const register = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    console.log("El token es requerido");
    return res.status(400).json({ error: "El token es requerido" });
  }

  try {
    const decodeToken = await admin.auth().verifyIdToken(token);
    const uid = decodeToken.uid;
    const email = decodeToken.email;
    const name = req.body.name;

    const userFound = await User.findOne({ uid });

    if (userFound) {
      console.log("El usuario ya existe");
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const newUser = new User({
      uid,
      name,
      email,
    });

    await newUser.save();
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
    const decodeToken = await admin.auth().verifyIdToken(token);
    const uid = decodeToken.uid;

    const userFound = await User.findOne({ uid });

    if (!userFound) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).send("Usuario logeado con exito");

  } catch (error) {
    return res.status(400).send("Error al guardar el usuario: " + error.message);
  }
};
