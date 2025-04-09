
import React, { useState } from "react";
import LoginComponent from "../../components/LoginComponent";
import RegisterComponent from "../../components/RegisterComponent";
import LoginWhitGoogleComponent from "../../components/LoginWhitGoogleComponent";

const Login = () => {

  const [registerVal, setRegisterVal] = useState(false);

  return (
    <>
      {!registerVal ? (<LoginComponent/>) : (<RegisterComponent/>)}
      <div>
        {!registerVal ? <p>Si aun no tienes cuenta, puedes registrarte</p> : <p>Si ya tienes una cuenta puedes iniciar sesion</p>}
        {!registerVal ? <button onClick={() => setRegisterVal(true)}>Registrarse</button> : <button onClick={()=> setRegisterVal(false)} >Logearse</button>}
      </div>
      <br />
      <LoginWhitGoogleComponent/>
    </>
  );
};

export default Login;
