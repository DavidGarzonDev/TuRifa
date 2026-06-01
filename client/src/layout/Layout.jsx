import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import useAuthListener from "../hooks/useAuthListener";

const Layout = () => {
  // Inicializar listener de auth - solo se ejecuta una vez al montar
  useAuthListener();

  return (
  <div className="layout">
    <Header />
    <main className="layout-content"><Outlet /></main>
    <Footer />
  </div> 
  )
}

export default Layout