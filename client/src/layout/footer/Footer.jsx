

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-center md:text-left">&copy; {new Date().getFullYear()} TuRifa. Todos los derechos reservados.</p>
        
      </div>
    </footer>
  );
};

export default Footer;
