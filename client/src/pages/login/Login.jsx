import useAuthStore from "../../store/use-auth-store";
import { useNavigate } from "react-router";
import { useCallback } from "react";

const Login = () => {
    const { loginGoogleWithPopup } = useAuthStore();
    const navigate = useNavigate();
  
    const haldleLogin = useCallback(async () => {
      try {
        await loginGoogleWithPopup();
        navigate("/home"); 
      } catch (error) {
        if (error.message === "backend-error") {
          navigate("/login"); 
        } else if (error.message === "unexpected-error") {
          navigate("/login"); 
        } 
      }
    }, [loginGoogleWithPopup, navigate]);
  
    return (
      <>
        <h2>Login con google</h2>
        <button
          type="button"
          title="Iniciar sesión con Google"
          onClick={haldleLogin}
        >
          Login con google
        </button>
      </>
    );
}

export default Login
