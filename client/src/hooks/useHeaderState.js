import { useState, useEffect, useRef, useCallback } from "react";
import useAuthStore from "@storage/auth-store/use-auth-store";
import { useNavigate } from "react-router-dom";

/**
 * useHeaderState - Hook para manejar el estado del header (scroll, menú, hover, mobile)
 * 
 * Extrae toda la lógica de estado de Header.jsx para mantenerlo como presentational.
 */
const useHeaderState = () => {
  const { useLooged, logout } = useAuthStore();
  const navigate = useNavigate();
  
  // Estados
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Referencia para controlar el delay del hover
  const menuTimeoutRef = useRef(null);
  
  // Effect para scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Effect para resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      clearTimeout(menuTimeoutRef.current);
    };
  }, []);
  
  // Handler: entrar al menú (hover)
  const handleMenuEnter = useCallback((menu) => {
    clearTimeout(menuTimeoutRef.current);
    setHoveredMenu(menu);
  }, []);
  
  // Handler: salir del menú (hover con delay)
  const handleMenuLeave = useCallback(() => {
    menuTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 200);
  }, []);
  
  // Handler: toggle menú mobile
  const toggleMobileMenu = useCallback((menu) => {
    if (isMobile) {
      setHoveredMenu(hoveredMenu === menu ? null : menu);
    }
  }, [isMobile, hoveredMenu]);
  
  // Handler: login (logout + navigate)
  const handleLogin = useCallback(() => {
    logout()
      .then(() => navigate("/login"))
      .catch(() => { /* logout error handled */ });
  }, [logout, navigate]);
  
  // Handler: cerrar menú mobile
  const closeMobileMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);
  
  return {
    // Estados
    menuOpen,
    scrolled,
    hoveredMenu,
    isMobile,
    useLooged,
    
    // Setters
    setMenuOpen,
    
    // Handlers
    handleMenuEnter,
    handleMenuLeave,
    toggleMobileMenu,
    handleLogin,
    closeMobileMenu,
  };
};

export default useHeaderState;