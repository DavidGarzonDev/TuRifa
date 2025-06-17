import React, { useState } from "react";
import LoginComponent from "../../components/login/LoginComponent";
import RegisterComponent from "../../components/register/RegisterComponent";
import LoginWhitGoogleComponent from "../../components/loginwhitgoogle/LoginWhitGoogleComponent";
import useAuthStore from "../../store/auth-store/use-auth-store";
import { useNavigate } from "react-router";

const Login = () => {
  const { useLooged } = useAuthStore();
  const navigate = useNavigate();
  const [registerVal, setRegisterVal] = useState(false);

  if (useLooged) {
    navigate("/inicio");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          {registerVal ? "Crear Cuenta" : "Iniciar Sesión"}
        </h2>

        {/* Formulario dinámico */}
        <div className="mb-6">
          {registerVal ? <RegisterComponent /> : <LoginComponent />}
        </div>

        {/* Alternar entre login y registro */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-700">
            {registerVal ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
            <button
              onClick={() => setRegisterVal(!registerVal)}
              className="ml-2 text-blue-600 hover:text-blue-400 hover:scale-105 transition font-medium"
            >
              {registerVal ? "Inicia sesión" : "Regístrate"}
            </button>
          </p>
        </div>

        {/* Separador visual */}
        <div className="flex items-center justify-center mb-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">ó</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Login con Google */}
        <LoginWhitGoogleComponent />
      </div>
    </div>
  );
};

export default Login;
