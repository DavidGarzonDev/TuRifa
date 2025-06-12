import { NavLink } from "react-router-dom";
import useAuthStore from "../../store/auth-store/use-auth-store";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";
import { FaBars, FaTimes, FaUser, FaTicketAlt, FaHome, FaSignOutAlt } from "react-icons/fa";
import logo from "../../assets/icon-turifa.svg";

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
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between relative">
        <div className="flex items-center">
          <NavLink to="/" end className="flex items-center group">
            <div className="bg-white p-2 rounded-full shadow-md transform group-hover:scale-105 transition-transform duration-300">
              <img
                src={logo}
                alt="TuRifa logo"
                className="w-8 h-8"
              />
            </div>
            <h1 className="text-2xl font-bold ml-3 group-hover:text-blue-200 transition-colors duration-300">
              TuRifa
            </h1>
          </NavLink>
        </div>
        
        {/* botón hamburguesa móvil */}
        {!menuOpen && (
          <button
            className="md:hidden text-2xl bg-blue-700 hover:bg-blue-600 p-2 rounded-lg transition-colors duration-300"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        )}
        
        {/* enlaces de navegación */}
        <div
          className={`${
            menuOpen 
              ? "absolute top-full right-0 left-0 bg-blue-800 shadow-xl rounded-b-lg p-4 border-t border-blue-700" 
              : "hidden"
          } md:relative md:flex md:items-center md:bg-transparent md:shadow-none md:border-0 md:p-0 md:block transition-all duration-300 ease-in-out`}
        >
          {/* cerrar menú (X) dentro del menú en móvil */}
          {menuOpen && (
            <div className="flex justify-end md:hidden mb-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-2xl hover:text-blue-300 transition-colors"
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-3 md:space-y-0">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium px-3 py-2 rounded-lg transition-all duration-300 
                ${isActive 
                  ? "bg-blue-600/50 text-white font-semibold" 
                  : "hover:bg-blue-700/30"}`
              }
            >
              <FaHome className="text-lg" />
              <span>Inicio</span>
            </NavLink>

            {!useLooged ? (
              <NavLink
                to="/login"
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 font-medium px-3 py-2 rounded-lg transition-all duration-300 
                  ${isActive 
                    ? "bg-blue-600/50 text-white font-semibold" 
                    : "hover:bg-blue-700/30"}`
                }
              >
                <FaUser className="text-lg" />
                <span>Iniciar Sesión</span>
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/crear/rifa"
                  className={({ isActive }) =>
                    `flex items-center gap-2 font-medium px-3 py-2 rounded-lg transition-all duration-300 
                    ${isActive 
                      ? "bg-blue-600/50 text-white font-semibold" 
                      : "hover:bg-blue-700/30"}`
                  }
                >
                  <FaTicketAlt className="text-lg" />
                  <span>Crear Rifa</span>
                </NavLink>
                <NavLink
                  to="/mis/rifas"
                  className={({ isActive }) =>
                    `flex items-center gap-2 font-medium px-3 py-2 rounded-lg transition-all duration-300 
                    ${isActive 
                      ? "bg-blue-600/50 text-white font-semibold" 
                      : "hover:bg-blue-700/30"}`
                  }
                >
                  <FaTicketAlt className="text-lg" />
                  <span>Mis Rifas</span>
                </NavLink>
                <button
                  type="button"
                  title="Cerrar sesión"
                  onClick={haldleLogin}
                  className="flex items-center gap-2 font-medium px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Cerrar Sesión</span>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
