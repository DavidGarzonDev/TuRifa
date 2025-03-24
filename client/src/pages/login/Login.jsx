import useAuthStore from "../../store/use-auth-store";
import { useNavigate } from "react-router";
import { use, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import LoginComponent from "../../components/LoginComponent";
import RegisterComponent from "../../components/RegisterComponent";

const Login = () => {
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

  const [registerVal, setRegisterVal] = useState(false);

  return (
    <>
      {!registerVal ? (<LoginComponent/>) : (<RegisterComponent/>)}
      <div>
        {!registerVal ? <p>Si aun no tienes cuenta, puedes registrarte</p> : <p>Si ya tienes una cuenta puedes iniciar sesion</p>}
        {!registerVal ? <button onClick={() => setRegisterVal(true)}>Registrarse</button> : <button onClick={()=> setRegisterVal(false)} >Logearse</button>}
      </div>
      <br />
      <button
        type="button"
        title="Iniciar sesión con Google"
        onClick={haldleLogin}>
        Login con google
      </button>
      <p>{error}</p>
    </>
  );
};

export default Login;
