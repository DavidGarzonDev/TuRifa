import { FaTicketAlt, FaGift, FaCoins, FaDollarSign, FaTrophy, FaChevronRight, FaLock, FaRegLightbulb, FaStar } from "react-icons/fa";
import CardRifa from "./components/CardRifa";
import { useState, useEffect } from "react";
import { getAllRifas } from "../../api/rifa";
import { useNavigate } from "react-router";

const Inicio = () => {
  const [rifas, setRifas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchRifas = async () => {
      try {
        setLoading(true);
        const response = await getAllRifas();
        setRifas(response.data.rifas || []);
      } catch (err) {
        console.error("Error al obtener rifas:", err);
        setError("No se pudieron cargar las rifas. Intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchRifas();
  }, []);
  
  // Array de iconos para variar entre las rifas
  const icons = [
    <FaCoins className="text-yellow-400 text-4xl mb-2 mx-auto" />,
    <FaTrophy className="text-blue-400 text-4xl mb-2 mx-auto" />,
    <FaGift className="text-purple-400 text-4xl mb-2 mx-auto" />,
    <FaDollarSign className="text-green-500 text-4xl mb-2 mx-auto" />
  ];
  
  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      
      {/* Hero Section - Mejorado con gradientes y animaciones */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl mb-16 overflow-hidden relative py-12">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-300 opacity-20 rounded-full translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-10 max-w-6xl relative z-10">
          <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-0 py-8 md:py-16">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-center md:text-left">
              ¡Gana <span className="text-yellow-300">increíbles</span>
              <br />
              premios con solo
              <br />
              un <span className="text-yellow-300">click</span>!
            </h1>
            <p className="mt-2 text-lg md:text-xl text-blue-100 font-medium text-center md:text-left leading-relaxed mb-8">
              Crea o participa en rifas de manera
              <br />
              <span className="font-bold text-white">segura, rápida y transparente</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-white text-indigo-700 hover:bg-yellow-300 py-3 px-8 rounded-full font-bold text-lg shadow-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center">
                Explorar Rifas
                <FaChevronRight className="ml-2" />
              </button>
              <button 
               onClick={()=> navigate("/crear/rifa")}
               className="bg-transparent hover:bg-blue-700 border-2 border-white py-3 px-8 rounded-full font-bold text-lg transition-colors duration-300 flex items-center justify-center">

                Crear Rifa
              </button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-0 mt-8 md:mt-0 relative">
            <div className="absolute w-64 h-64 bg-yellow-300 rounded-full filter blur-3xl opacity-30"></div>
            <img
              className="relative z-10 h-auto max-h-80 w-auto object-contain mx-auto transform hover:scale-105 transition-transform duration-700 bounce-slow"
              src="/image/gift.png"
              alt="Premio de rifa"
            />
          </div>
        </div>
      </section>
      

      {/* How it works - Mejorado con tarjetas y transiciones */}
      <section className="max-w-5xl mx-auto mb-20 px-6">
        <div className="text-center mb-12">
          <span className="bg-blue-100 text-blue-700 text-sm font-medium py-1 px-3 rounded-full">Proceso Sencillo</span>
          <h2 className="text-center font-bold text-3xl mt-3 mb-4 text-gray-900">
            ¿Cómo funciona TuRifa?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sigue estos sencillos pasos para comenzar a participar y ganar increíbles premios en nuestra plataforma.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-8 relative">
          {/* Line connector for desktop */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-200 hidden md:block" style={{transform: 'translateY(-50%)'}}></div>
          
          {/* Step 1 */}
          <div className="flex-1 text-center relative bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group z-10">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-full w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-blue-300 transition-shadow">
                <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-xl">1</span>
                </div>
              </div>
            </div>
            <div className="mt-10 mb-6">
              <div className="bg-blue-100 rounded-full w-32 h-32 mx-auto flex relative items-center justify-center overflow-hidden group-hover:bg-blue-200 transition-colors">
                <FaTicketAlt className="ms-6 rotate-160 mt-2 text-blue-700 text-2xl size-15 animate-pulse" />
                <FaTicketAlt className="absolute mb-2 rotate-130 text-blue-500 text-2xl size-15" />
              </div>
            </div>
            <h3 className="font-bold mt-3 text-lg text-gray-800">
              Crea o únete a una rifa
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              Explora las rifas disponibles o crea la tuya propia para compartir con amigos.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="flex-1 text-center relative bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group z-10 mt-16 md:mt-0">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-indigo-300 transition-shadow">
                <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
                  <span className="text-indigo-700 font-bold text-xl">2</span>
                </div>
              </div>
            </div>
            <div className="mt-10 mb-6">
              <div className="bg-indigo-100 rounded-full w-32 h-32 mx-auto flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                <FaDollarSign className="text-indigo-700 text-4xl size-15" />
              </div>
            </div>
            <h3 className="font-bold mt-3 text-lg text-gray-800">
              Compra tus boletos
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              Selecciona y paga de manera segura los boletos para las rifas que te interesan.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="flex-1 text-center relative bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group z-10 mt-16 md:mt-0">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-full w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-purple-300 transition-shadow">
                <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
                  <span className="text-purple-700 font-bold text-xl">3</span>
                </div>
              </div>
            </div>
            <div className="mt-10 mb-6">
              <div className="bg-purple-100 rounded-full w-32 h-32 mx-auto flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <FaGift className="text-purple-700 text-4xl size-15" />
              </div>
            </div>
            <h3 className="font-bold mt-3 text-lg text-gray-800">
              ¡Espera y gana!
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              Recibe notificaciones sobre el sorteo y prepárate para ganar increíbles premios.
            </p>
          </div>
        </div>
      </section>
      
      {/* Rifas Section - Mejorado con encabezado y animaciones */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto mb-10 px-6">
          <div className="text-center mb-12">
            <span className="bg-yellow-100 text-yellow-700 text-sm font-medium py-1 px-3 rounded-full">Oportunidades</span>
            <h3 className="font-bold text-3xl mb-3 mt-3 text-gray-900">
              Rifas Disponibles
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explora las rifas activas y encuentra la que más te guste. ¡No pierdas la oportunidad de ganar!
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-5 rounded-lg shadow-md mb-8 max-w-xl mx-auto">
              <div className="flex items-center">
                <div className="py-1 mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-bold">No se pudieron cargar las rifas</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          ) : rifas.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl shadow-inner max-w-3xl mx-auto">
              <FaTicketAlt className="text-5xl mx-auto mb-4 text-blue-300 opacity-70" />
              <h4 className="text-xl font-semibold text-gray-700 mb-2">No hay rifas disponibles</h4>
              <p className="text-gray-500">Actualmente no hay rifas disponibles en la plataforma.</p>
              <p className="mt-2 text-gray-500">¡Vuelve pronto para ver nuevas rifas o crea la tuya!</p>
              <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Crear una rifa
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rifas.slice(0,3).map((rifa, index) => (
                <CardRifa 
                  key={rifa.id || index}
                  rifa={rifa} 
                  icon={icons[index % icons.length]} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits section - New */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="bg-blue-100 text-blue-700 text-sm font-medium py-1 px-3 rounded-full">Ventajas</span>
            <h3 className="font-bold text-3xl mb-3 mt-3 text-gray-900">
              ¿Por qué elegir TuRifa?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nuestra plataforma ofrece múltiples beneficios para crear y participar en rifas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="bg-blue-100 rounded-lg p-4 inline-block mb-4">
                <FaRegLightbulb className="text-blue-600 text-2xl" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Fácil de usar</h4>
              <p className="text-gray-600">Participa desde tu celular o computadora. Interfaz intuitiva y amigable.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="bg-green-100 rounded-lg p-4 inline-block mb-4">
                <FaLock className="text-green-600 text-2xl" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Pagos seguros</h4>
              <p className="text-gray-600">Todas las transacciones son seguras y transparentes. Pagos garantizados.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="bg-purple-100 rounded-lg p-4 inline-block mb-4">
                <FaStar className="text-purple-600 text-2xl" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Sorteos verificables</h4>
              <p className="text-gray-600">Todos los sorteos son transparentes y verificables para mayor confianza.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer-like info - Improved */}
      <section className="max-w-5xl mx-auto my-12 px-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center p-8 md:p-10">
            <div className="text-white mb-6 md:mb-0">
              <h4 className="font-bold text-2xl mb-3">¡Muy Fácil de usar y ganar!</h4>
              <p className="text-blue-100">
                Participa desde tu celular o computadora.<br/>
                En cualquier lugar, en cualquier momento.
              </p>
              <button className="mt-4 bg-white text-indigo-700 hover:bg-blue-100 px-6 py-2 rounded-lg font-medium transition-colors inline-flex items-center">
                Comenzar ahora
                <FaChevronRight className="ml-2" />
              </button>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white border border-white/30">
              <h4 className="font-bold text-xl mb-2 text-white">Pagos garantizados</h4>
              <p className="text-blue-50">y Sorteos verificables</p>
              <div className="flex mt-4 space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <FaLock className="text-white" />
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <FaTicketAlt className="text-white" />
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <FaTrophy className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
