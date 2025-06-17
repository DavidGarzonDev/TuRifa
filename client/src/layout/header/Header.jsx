import { NavLink } from "react-router-dom";
import useAuthStore from "../../store/auth-store/use-auth-store";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";
import { FaBars, FaTimes, FaUser, FaTicketAlt, FaHome, FaSignOutAlt } from "react-icons/fa";
import logo from "../../assets/icon-turifa.svg";
import { IoTicket } from "react-icons/io5";

const Header = () => {
  const { useLooged, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  
  
  useEffect(() => {
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const haldleLogin = useCallback(() => {
    logout()
      .then(() => navigate("/login"))
      .catch((error) => {
        console.error("No se pudo cerrar sesión", error);
      });
  }, [logout, navigate]);
  
  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-gradient-to-r from-blue-900 to-blue-700 shadow-xl" 
          : "bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between relative">
        <div className="flex items-center">
          <NavLink to="/" end className="flex items-center group">
            <div className={`bg-white p-2 rounded-full shadow-md transform group-hover:scale-105 transition-transform duration-300 ${
              scrolled ? "ring-2 ring-blue-300/30" : ""
            }`}>
              <img
                src={logo}
                alt="TuRifa logo"
                className="w-8 h-8"
              />
            </div>
            <h1 className="text-2xl font-bold ml-3 text-white group-hover:text-blue-200 transition-colors duration-300">
              Tu<span className="text-blue-300">Rifa</span>
            </h1>
          </NavLink>
        </div>
        
        {/* Botón hamburguesa móvil */}
        <button
          className={`md:hidden text-2xl p-2 rounded-lg transition-colors duration-300 ${
            menuOpen ? "hidden" : "block text-white hover:bg-blue-700/60"
          }`}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <FaBars />
        </button>
        
        {/* Enlaces de navegación */}
        <div
          className={`${
            menuOpen 
              ? "absolute top-full right-0 left-0 bg-gradient-to-b from-blue-800 to-blue-900 shadow-2xl rounded-b-lg p-5 border-t border-blue-600/50 animate-fade-in-down" 
              : "hidden"
          } md:relative md:flex md:items-center md:bg-transparent md:shadow-none md:border-0 md:p-0 transition-all duration-300 ease-in-out`}
        >
          {/* Cerrar menú (X) dentro del menú en móvil */}
          {menuOpen && (
            <div className="flex justify-end md:hidden mb-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-2xl text-white hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-blue-700/30"
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-3 md:space-y-0">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium px-3 py-2 rounded-lg transition-all duration-300 
                ${isActive 
                  ? "bg-blue-600/70 text-white font-semibold shadow-inner shadow-blue-800" 
                  : "text-white hover:bg-blue-700/40 hover:text-blue-100"}
                `
              }
              onClick={() => setMenuOpen(false)}
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
                    ? "bg-blue-600/70 text-white font-semibold shadow-inner shadow-blue-800" 
                    : "text-white hover:bg-blue-700/40 hover:text-blue-100"}
                  `
                }
                onClick={() => setMenuOpen(false)}
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
                      ? "bg-blue-600/70 text-white font-semibold shadow-inner shadow-blue-800" 
                      : "text-white hover:bg-blue-700/40 hover:text-blue-100"}
                    `
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <FaTicketAlt className="text-lg" />
                  <span>Crear Rifa</span>
                </NavLink>
                <NavLink
                  to="/mis/rifas"
                  className={({ isActive }) =>
                    `flex items-center gap-2 font-medium px-3 py-2 rounded-lg transition-all duration-300 
                    ${isActive 
                      ? "bg-blue-600/70 text-white font-semibold shadow-inner shadow-blue-800" 
                      : "text-white hover:bg-blue-700/40 hover:text-blue-100"}
                    `
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <FaTicketAlt className="text-lg" />
                  <span>Mis Rifas</span>
                </NavLink>
                <NavLink
                   to={`/boletos`}
                   className={({ isActive }) =>
                    `flex items-center gap-2 font-medium px-3 py-2 rounded-lg transition-all duration-300 
                    ${isActive 
                      ? "bg-blue-600/70 text-white font-semibold shadow-inner shadow-blue-800" 
                      : "text-white hover:bg-blue-700/40 hover:text-blue-100"}
                    `
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <IoTicket className="text-lg" />
                  <span>Mis Boletos</span>
                </NavLink>
                 <NavLink
                  to="/rifas"
                  className={({ isActive }) =>
                    `flex items-center gap-2 font-medium px-3 py-2 rounded-lg transition-all duration-300 
                    ${isActive 
                      ? "bg-blue-600/70 text-white font-semibold shadow-inner shadow-blue-800" 
                      : "text-white hover:bg-blue-700/40 hover:text-blue-100"}
                    `
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <FaTicketAlt className="text-lg" />
                  <span>Todas las Rifas</span>
                </NavLink>
                <button
                  type="button"
                  title="Cerrar sesión"
                  onClick={haldleLogin}
                  className="flex items-center gap-2 font-medium px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
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
