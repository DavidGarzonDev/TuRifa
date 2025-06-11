import { NavLink } from "react-router-dom";
import useAuthStore from "../../store/auth-store/use-auth-store";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/icon-turifa.svg"; // Importa el logo si es necesario

const Header = () => {
  const { useLooged, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const haldleLogin = useCallback(() => {
    logout()
      .then(() => navigate("/login"))
      .catch((error) => {
        console.error("No se pudo cerrar sesión", error);
      });
  }, [logout, navigate]);

  return (
    <header className="bg-blue-800 text-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <img
                src={logo}
                alt="TuRifa logo"
                className="w-8 h-8 inline-block mr-2"
              />
          <NavLink to="/" end className="hover:text-blue-300">
            
            TuRifa
          </NavLink>
        </h1>
        {/* botón hamburguesa móvil */}
        {!menuOpen && (
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        )}
        {/* enlaces de navegación */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:w-auto mt-4 md:mt-0`}
        >
          {/* cerrar menú (X) dentro del menú en móvil */}
          {menuOpen && (
            <div className="flex justify-end md:hidden mb-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-2xl"
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>
          )}
          <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `transition hover:text-blue-300 ${
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
                  `transition hover:text-blue-300 ${
                    isActive ? "underline text-blue-200" : ""
                  }`
                }
              >
                Iniciar Sesión
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/crear/rifa"
                  className={({ isActive }) =>
                    `transition hover:text-blue-300 ${
                      isActive ? "underline text-blue-200" : ""
                    }`
                  }
                >
                  Crear Rifa
                </NavLink>
                <NavLink
                  to="/mis/rifas"
                  className={({ isActive }) =>
                    `transition hover:text-blue-300 ${
                      isActive ? "underline text-blue-200" : ""
                    }`
                  }
                >
                  Mis Rifas
                </NavLink>
              </>
            )}
            {useLooged && (
              <button
                type="button"
                title="Cerrar sesión"
                onClick={haldleLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
