import React from "react";
import useAuthStore from "../store/use-auth-store";
import { useNavigate } from "react-router";
import { useCallback, useState } from "react";


const LoginWhitGoogleComponent = () => {
  const { loginGoogleWithPopup } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const haldleLogin = useCallback(async () => {
    setError(null);
    try {
      const res = await loginGoogleWithPopup();
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error);
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
      <p>{error}</p>
    </>
  );
};

export default LoginWhitGoogleComponent;
