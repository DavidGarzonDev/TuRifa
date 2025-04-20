import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-4 mt-12">
      <div className="max-w-8xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-center md:text-left">&copy; {new Date().getFullYear()} TuRifa. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
