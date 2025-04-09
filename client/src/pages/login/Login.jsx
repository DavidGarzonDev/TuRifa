
import React, { useState } from "react";
import LoginComponent from "../../components/login/LoginComponent";
import RegisterComponent from "../../components/register/RegisterComponent";
import LoginWhitGoogleComponent from "../../components/loginwhitgoogle/LoginWhitGoogleComponent";
import useAuthStore from "../../store/auth-store/use-auth-store";
import { useNavigate } from "react-router";

const Login = () => {

  const { useLooged } = useAuthStore()
  const navigete = useNavigate()

  const [registerVal, setRegisterVal] = useState(false);

  return (
    <>
      {!useLooged ? <div>{!registerVal ? (<LoginComponent/>) : (<RegisterComponent/>)}
      <div>
        {!registerVal ? <p>Si aun no tienes cuenta, puedes registrarte</p> : <p>Si ya tienes una cuenta puedes iniciar sesion</p>}
        {!registerVal ? <button onClick={() => setRegisterVal(true)}>Registrarse</button> : <button onClick={()=> setRegisterVal(false)} >Logearse</button>}
      </div>
      <br />
      <LoginWhitGoogleComponent/></div> : navigete("/")}
    </>
  );
};

export default Login;
