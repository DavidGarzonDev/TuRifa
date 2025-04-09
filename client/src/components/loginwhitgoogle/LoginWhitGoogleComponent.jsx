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
      setErrorMessage(error.message || 'No se encontro al usuario');
      navigate("/login");
    }
  }, [loginGoogleWithPopup, navigate]);

  return (
    <>
      <button
        type="button"
        title="Iniciar sesión con Google"
        onClick={haldleLogin}
      >
        Login con google
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export default LoginWhitGoogleComponent;
