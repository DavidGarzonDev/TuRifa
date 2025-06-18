import { NavLink } from "react-router-dom";
import useAuthStore from "../../store/auth-store/use-auth-store";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaUser, FaTicketAlt, FaHome, FaSignOutAlt, FaInfoCircle, FaChevronDown } from "react-icons/fa";
import logo from "../../assets/icon-turifa.svg";
import { IoTicket } from "react-icons/io5";

const Header = () => {
  const { useLooged, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Referencias para controlar el hover
  const menuTimeoutRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Comprobar el tamaño inicial
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(menuTimeoutRef.current);
    };
  }, []);
  
  const handleMenuEnter = (menu) => {
    clearTimeout(menuTimeoutRef.current);
    setHoveredMenu(menu);
  };
  
  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 200); // Pequeño retraso para una mejor experiencia de usuario
  };

  const haldleLogin = useCallback(() => {
    logout()
      .then(() => navigate("/login"))
      .catch((error) => {
        console.error("No se pudo cerrar sesión", error);
      });
  }, [logout, navigate]);
  
  // Función para manejar clics en móvil
  const toggleMobileMenu = (menu) => {
    if (isMobile) {
      setHoveredMenu(hoveredMenu === menu ? null : menu);
    }
  };
  
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
          
          {/* Mega menú estilo desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Menú Inicio */}
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

            {/* Menú Rifas con dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => handleMenuEnter('rifas')}
              onMouseLeave={handleMenuLeave}
              onClick={() => toggleMobileMenu('rifas')}
            >
              <div className={`flex items-center gap-2 font-medium px-3 py-2 rounded-lg cursor-pointer transition-all duration-300
                ${hoveredMenu === 'rifas'
                  ? "bg-blue-600/70 text-white font-semibold shadow-inner shadow-blue-800" 
                  : "text-white hover:bg-blue-700/40 hover:text-blue-100"}`}
              >
                <FaTicketAlt className="text-lg" />
                <span>Rifas</span>
                <FaChevronDown className={`ml-1 transform transition-transform ${hoveredMenu === 'rifas' ? 'rotate-180' : ''}`} />
              </div>
              
              {/* Mega dropdown de Rifas */}
              <div 
                className={`absolute left-0 mt-1 p-4 min-w-[280px] rounded-lg shadow-lg bg-gradient-to-b from-blue-700 to-blue-800 
                border border-blue-600/20 transition-all duration-200 origin-top-left ${hoveredMenu === 'rifas' 
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                  : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}
              >
                <div className="grid grid-cols-1 gap-2">
                  <h3 className="text-white font-semibold text-sm mb-2 border-b border-blue-600/50 pb-2">
                    RIFAS
                  </h3>
                  {useLooged && (
                    <>
                      <NavLink
                        to="/crear/rifa"
                        className={({ isActive }) =>
                          `flex items-center px-3 py-2 rounded-md hover:bg-blue-600/40 transition-colors ${isActive ? 'bg-blue-600/70 font-semibold' : 'text-white'}`
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaTicketAlt className="mr-2" />
                        Crear Rifa
                      </NavLink>
                      <NavLink
                        to="/mis/rifas"
                        className={({ isActive }) =>
                          `flex items-center px-3 py-2 rounded-md hover:bg-blue-600/40 transition-colors ${isActive ? 'bg-blue-600/70 font-semibold' : 'text-white'}`
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaTicketAlt className="mr-2" />
                        Mis Rifas
                      </NavLink>
                    </>
                  )}
                  <NavLink
                    to="/rifas"
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-md hover:bg-blue-600/40 transition-colors ${isActive ? 'bg-blue-600/70 font-semibold' : 'text-white'}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaTicketAlt className="mr-2" />
                    Todas las Rifas
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Menú Boletos con dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => handleMenuEnter('boletos')}
              onMouseLeave={handleMenuLeave}
              onClick={() => toggleMobileMenu('boletos')}
            >
              <div className={`flex items-center gap-2 font-medium px-3 py-2 rounded-lg cursor-pointer transition-all duration-300
                ${hoveredMenu === 'boletos'
                  ? "bg-blue-600/70 text-white font-semibold shadow-inner shadow-blue-800" 
                  : "text-white hover:bg-blue-700/40 hover:text-blue-100"}`}
              >
                <IoTicket className="text-lg" />
                <span>Boletos</span>
                <FaChevronDown className={`ml-1 transform transition-transform ${hoveredMenu === 'boletos' ? 'rotate-180' : ''}`} />
              </div>
              
              {/* Mega dropdown de Boletos */}
              <div 
                className={`absolute left-0 mt-1 p-4 min-w-[280px] rounded-lg shadow-lg bg-gradient-to-b from-blue-700 to-blue-800 
                border border-blue-600/20 transition-all duration-200 origin-top-left ${hoveredMenu === 'boletos' 
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                  : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}
              >
                <div className="grid grid-cols-1 gap-2">
                  <h3 className="text-white font-semibold text-sm mb-2 border-b border-blue-600/50 pb-2">
                    BOLETOS
                  </h3>
                  <NavLink
                    to="/boletos"
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-md hover:bg-blue-600/40 transition-colors ${isActive ? 'bg-blue-600/70 font-semibold' : 'text-white'}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <IoTicket className="mr-2" />
                    Mis Boletos
                  </NavLink>
                  
                </div>
              </div>
            </div>

            {/* Menú Nosotros con dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => handleMenuEnter('nosotros')}
              onMouseLeave={handleMenuLeave}
              onClick={() => toggleMobileMenu('nosotros')}
            >
              <div className={`flex items-center gap-2 font-medium px-3 py-2 rounded-lg cursor-pointer transition-all duration-300
                ${hoveredMenu === 'nosotros'
                  ? "bg-blue-600/70 text-white font-semibold shadow-inner shadow-blue-800" 
                  : "text-white hover:bg-blue-700/40 hover:text-blue-100"}`}
              >
                <FaInfoCircle className="text-lg" />
                <span>Nosotros</span>
                <FaChevronDown className={`ml-1 transform transition-transform ${hoveredMenu === 'nosotros' ? 'rotate-180' : ''}`} />
              </div>
              
              {/* Mega dropdown de Nosotros */}
              <div 
                className={`absolute left-0 mt-1 p-4 min-w-[280px] rounded-lg shadow-lg bg-gradient-to-b from-blue-700 to-blue-800 
                border border-blue-600/20 transition-all duration-200 origin-top-left ${hoveredMenu === 'nosotros' 
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                  : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}
              >
                <div className="grid grid-cols-1 gap-2">
                  <h3 className="text-white font-semibold text-sm mb-2 border-b border-blue-600/50 pb-2">
                    NOSOTROS
                  </h3>
                  <NavLink
                    to="/sobre-nosotros"
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-md hover:bg-blue-600/40 transition-colors ${isActive ? 'bg-blue-600/70 font-semibold' : 'text-white'}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaInfoCircle className="mr-2" />
                    Acerca de Nosotros
                  </NavLink>
                  
                  <NavLink
                    to="/ayuda"
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-md hover:bg-blue-600/40 transition-colors ${isActive ? 'bg-blue-600/70 font-semibold' : 'text-white'}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaInfoCircle className="mr-2" />
                    Ayuda
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Botón de inicio de sesión o cerrar sesión */}
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
              <button
                type="button"
                title="Cerrar sesión"
                onClick={haldleLogin}
                className="flex items-center gap-2 font-medium px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Cerrar Sesión</span>
              </button>
            )}
          </div>

          {/* Versión móvil del menú */}
          <div className="flex flex-col md:hidden items-center space-y-3">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium px-3 py-2 w-full rounded-lg transition-all duration-300 
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

            {/* Menú móvil: Rifas */}
            <div className="w-full">
              <button
                onClick={() => toggleMobileMenu('rifas')}
                className={`flex items-center gap-2 font-medium px-3 py-2 w-full rounded-lg transition-all duration-300
                ${hoveredMenu === 'rifas'
                  ? "bg-blue-600/70 text-white font-semibold shadow-inner shadow-blue-800" 
                  : "text-white hover:bg-blue-700/40 hover:text-blue-100"}`}
              >
                <FaTicketAlt className="text-lg" />
                <span>Rifas</span>
                <FaChevronDown className={`ml-auto transform transition-transform ${hoveredMenu === 'rifas' ? 'rotate-180' : ''}`} />
              </button>
              
              {hoveredMenu === 'rifas' && (
                <div className="bg-blue-800/50 rounded-lg mt-1 p-2">
                  {useLooged && (
                    <>
                      <NavLink
                        to="/crear/rifa"
                        className={({ isActive }) =>
                          `flex items-center px-3 py-2 rounded-md hover:bg-blue-600/40 transition-colors ${isActive ? 'bg-blue-600/70 font-semibold' : 'text-white'}`
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaTicketAlt className="mr-2" />
                        Crear Rifa
                      </NavLink>
                      <NavLink
                        to="/mis/rifas"
                        className={({ isActive }) =>
                          `flex items-center px-3 py-2 rounded-md hover:bg-blue-600/40 transition-colors ${isActive ? 'bg-blue-600/70 font-semibold' : 'text-white'}`
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaTicketAlt className="mr-2" />
                        Mis Rifas
                      </NavLink>
                    </>
                  )}
                  <NavLink
                    to="/rifas"
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-md hover:bg-blue-600/40 transition-colors ${isActive ? 'bg-blue-600/70 font-semibold' : 'text-white'}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaTicketAlt className="mr-2" />
                    Todas las Rifas
                  </NavLink>
                </div>
              )}
            </div>

            {/* Menú móvil: Boletos */}
            {useLooged && (
              <div className="w-full">
                <button
                  onClick={() => toggleMobileMenu('boletos')}
                  className={`flex items-center gap-2 font-medium px-3 py-2 w-full rounded-lg transition-all duration-300
                  ${hoveredMenu === 'boletos'
                    ? "bg-blue-600/70 text-white font-semibold shadow-inner shadow-blue-800" 
                    : "text-white hover:bg-blue-700/40 hover:text-blue-100"}`}
                >
                  <IoTicket className="text-lg" />
                  <span>Boletos</span>
                  <FaChevronDown className={`ml-auto transform transition-transform ${hoveredMenu === 'boletos' ? 'rotate-180' : ''}`} />
                </button>
                
                {hoveredMenu === 'boletos' && (
                  <div className="bg-blue-800/50 rounded-lg mt-1 p-2">
                    <NavLink
                      to="/boletos"
                      className={({ isActive }) =>
                        `flex items-center px-3 py-2 rounded-md hover:bg-blue-600/40 transition-colors ${isActive ? 'bg-blue-600/70 font-semibold' : 'text-white'}`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      <IoTicket className="mr-2" />
                      Mis Boletos
                    </NavLink>
                    
                  </div>
                )}
              </div>
            )}

            {/* Menú móvil: Nosotros */}
            <div className="w-full">
              <button
                onClick={() => toggleMobileMenu('nosotros')}
                className={`flex items-center gap-2 font-medium px-3 py-2 w-full rounded-lg transition-all duration-300
                ${hoveredMenu === 'nosotros'
                  ? "bg-blue-600/70 text-white font-semibold shadow-inner shadow-blue-800" 
                  : "text-white hover:bg-blue-700/40 hover:text-blue-100"}`}
              >
                <FaInfoCircle className="text-lg" />
                <span>Nosotros</span>
                <FaChevronDown className={`ml-auto transform transition-transform ${hoveredMenu === 'nosotros' ? 'rotate-180' : ''}`} />
              </button>
              
              {hoveredMenu === 'nosotros' && (
                <div className="bg-blue-800/50 rounded-lg mt-1 p-2">
                  <NavLink
                    to="/sobre-nosotros"
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-md hover:bg-blue-600/40 transition-colors ${isActive ? 'bg-blue-600/70 font-semibold' : 'text-white'}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaInfoCircle className="mr-2" />
                    Acerca de Nosotros
                  </NavLink>
                  
                  <NavLink
                    to="/ayuda"
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-md hover:bg-blue-600/40 transition-colors ${isActive ? 'bg-blue-600/70 font-semibold' : 'text-white'}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaInfoCircle className="mr-2" />
                    Ayuda
                  </NavLink>
                </div>
              )}
            </div>

            {/* Botón móvil: Iniciar sesión/Cerrar sesión */}
            {!useLooged ? (
              <NavLink
                to="/login"
                end
                className="flex items-center gap-2 font-medium px-3 py-2 w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                <FaUser className="text-lg" />
                <span>Iniciar Sesión</span>
              </NavLink>
            ) : (
              <button
                type="button"
                title="Cerrar sesión"
                onClick={() => {
                  haldleLogin();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full font-medium px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md transition-all duration-300"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Cerrar Sesión</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
