import { NavLink } from "react-router-dom";
import useAuthStore from "../../store/auth-store/use-auth-store";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const Header = () => {
  const { useLooged, logout } = useAuthStore();
  const navigate = useNavigate();

  const haldleLogin = useCallback(() => {
    logout()
      .then(() => navigate("/login"))
      .catch((error) => {
        console.error("No se pudo cerrar sesión", error);
      });
  }, [logout, navigate]);

  return (
    <header className="bg-blue-800 text-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <NavLink to="/" end className="hover:text-blue-300">
            TuRifa
          </NavLink>
        </h1>

        <div className="space-x-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `hover:text-blue-300 transition ${
                isActive ? "underline text-blue-200" : ""
              }`
            }
          >
            Inicio
          </NavLink>

          {!useLooged ? (
            <NavLink
              to="/login"
              end
              className={({ isActive }) =>
                `hover:text-blue-300 transition ${
                  isActive ? "underline text-blue-200" : ""
                }`
              }
            >
              Iniciar Sesión
            </NavLink>
          ) :
          (
            <>
              <NavLink
                to="/crear/rifa"
                className={({ isActive }) =>
                  `hover:text-blue-300 transition ${
                    isActive ? "underline text-blue-200" : ""
                  }`
                }
              >
                Crear Rifa
              </NavLink>
              <NavLink
                to="/mis/rifas"
                className={({ isActive }) =>
                  `hover:text-blue-300 transition ${
                    isActive ? "underline text-blue-200" : ""
                  }`
                }
              >
                Mis Rifas
              </NavLink>
            </>
          )}
          {useLooged &&
            (
            <button
              type="button"
              title="Cerrar sesión"
              onClick={haldleLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
            >
              Cerrar Sesión
            </button>
            )
          }
        </div>
      </nav>
    </header>
  );
};

export default Header;
