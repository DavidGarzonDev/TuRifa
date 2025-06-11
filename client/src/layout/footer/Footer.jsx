import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-center md:text-left">&copy; {new Date().getFullYear()} TuRifa. Todos los derechos reservados.</p>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          <Link to="/" className="hover:text-blue-300 text-sm">Inicio</Link>
          <Link to="/crear/rifa" className="hover:text-blue-300 text-sm">Crear Rifa</Link>
          <Link to="/mis/rifas" className="hover:text-blue-300 text-sm">Mis Rifas</Link>
          <Link to="/login" className="hover:text-blue-300 text-sm">Iniciar Sesión</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
