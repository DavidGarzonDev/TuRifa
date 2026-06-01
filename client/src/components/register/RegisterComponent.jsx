import { useForm } from "react-hook-form";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase.config";
import { registerRequest } from "@api/auth";
import useAuthStore from "@storage/auth-store/use-auth-store";

const RegisterComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { loginGoogleWithPopup } = useAuthStore();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      // 1. Crear usuario en Firebase con email/password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // 2. Actualizar el perfil con el nombre
      await updateProfile(user, { displayName: data.name });

      // 3. Obtener el token de Firebase
      const token = await user.getIdToken();
      localStorage.setItem("firebase-token", token);

      // 4. Registrar en el backend (crear usuario en Prisma/PostgreSQL)
      const res = await registerRequest({ token, name: data.name });

      // 5. Hacer login con Google para sincronizar el estado de auth
      // (reuse existing login flow que already stores token y actualiza store)
      if (res.status === 200 || res.status === 201) {
        await loginGoogleWithPopup();
      }
    } catch (error) {
      
      // Manejar errores de Firebase Auth
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Este correo ya está registrado.");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("El correo no es válido.");
      } else if (error.code === "auth/network-request-failed") {
        setErrorMessage("Error de red. Verifica tu conexión.");
      } else if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Error al registrarse. Intenta de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <input
          type="text"
          placeholder="Nombre"
          {...register("name", { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <span className="text-red-600 text-sm mt-1 block">
            El nombre es requerido
          </span>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Correo"
          {...register("email", { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <span className="text-red-600 text-sm mt-1 block">
            El correo es requerido
          </span>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <span className="text-red-600 text-sm mt-1 block">
            La contraseña es requerida
          </span>
        )}
      </div>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full font-semibold py-2 px-4 rounded-md transform transition duration-300 ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-500 hover:scale-105"
        } text-white`}
      >
        {isLoading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
};

export default RegisterComponent;