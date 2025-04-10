import React from "react";
import useAuthStore from "../../store/auth-store/use-auth-store";
import { useNavigate } from "react-router";
import { useCallback, useState } from "react";

const LoginWhitGoogleComponent = () => {
  const { loginGoogleWithPopup } = useAuthStore();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const haldleLogin = useCallback(async () => {
    setErrorMessage(null);
    try {
      const res = await loginGoogleWithPopup();
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message || "No se encontró al usuario");
      navigate("/login");
    }
  }, [loginGoogleWithPopup, navigate]);

  return (
    <div className="w-full">
      <button
        type="button"
        title="Iniciar sesión con Google"
        onClick={haldleLogin}
        className="w-full bg-white text-gray-700 border border-gray-300 font-medium py-2 px-4 rounded-md hover:bg-gray-100 hover:scale-105 transition duration-300 shadow-sm"
      >
        Iniciar sesión con Google
      </button>

      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 text-center">{errorMessage}</p>
      )}
    </div>
  );
};

export default LoginWhitGoogleComponent;
