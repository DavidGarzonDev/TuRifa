import { NavLink } from "react-router";
import useAuthStore from "../../store/auth-store/use-auth-store";
import { useNavigate } from "react-router";
import { useCallback } from "react";


const Header = () => {
  const { useLooged, logout } = useAuthStore();

  const navigate = useNavigate();

  const haldleLogin = useCallback(() => {
    logout()
      .then(() => navigate("/login"))
      .catch((error) => {
        console.error("No se pudo cerrar sesion", error);
      });
  }, [logout, navigate]);


  
  return (
    <header>
      <nav>
        <NavLink to="/" end>
          Inicio
        </NavLink>

        {!useLooged ? (
          <NavLink to="/login" end>
            Iniciar Sesion
          </NavLink>
        ) : (
          <button type="button" title="Cerrar sesion" onClick={haldleLogin}>
            Cerrar Sesion
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
