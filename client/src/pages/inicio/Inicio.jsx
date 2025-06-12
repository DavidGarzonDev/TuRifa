
import { FaTicketAlt, FaGift, FaCoins, FaDollarSign, FaTrophy } from "react-icons/fa";
import CardRifa from "./components/CardRifa";
import { useState, useEffect } from "react";
import { getAllRifas } from "../../api/rifa";

const Inicio = () => {
  const [rifas, setRifas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
    <div className="font-sans bg-gray-100 min-h-screen px-4 md:px-0">
      
      <section className="bg-radial from-blue-600 from-40% to-blue-800 text-white shadow-lg mb-10 flex flex-col md:flex-row items-stretch min-h-[200px] overflow-hidden relative">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 md:px-0 h-full" style={{ width: "1000px" }}>
          <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-8 py-8">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4 text-center md:text-left">
              ¡Gana increibles
              <br />
              premios con solo
              <br />
              un click!
            </h1>
            <p className="mt-2 text-base md:text-lg text-blue-100 font-normal text-center md:text-left">
              Crea o participa en rifas de manera <br /> segura, rápida y
              transparente.
            </p>        
            </div>            
            <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-8 my-8 md:my-0 h-full">            
            <img
              className="absolute h-auto w-auto object-contain mx-auto"
              src="/image/gift.png"
              alt="Premio de rifa"
            />
          </div>
        </div>
      </section>
      

      {/* How it works */}
      <section className="max-w-4xl mx-auto mb-10 px-4 md:px-0">
        <h2 className="text-center font-bold text-2xl mb-8 text-gray-900">
          ¿Como funciona?
        </h2>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1 text-center">
            <div className="bg-blue-100 rounded-full w-40 h-40 mx-auto flex relative items-center justify-center">
              <FaTicketAlt className="ms-6 rotate-160 mt-2 text-blue-900 text-2xl size-15" />
              <FaTicketAlt className="absolute mb-2 rotate-130 text-blue-700 text-2xl size-15" />
            </div>
            <div className="font-semibold mt-3 text-base">
              Crea o únete a una rifa
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="bg-blue-100 rounded-full w-40 h-40 mx-auto flex items-center justify-center">
              <FaTicketAlt className="text-blue-700 text-2xl size-15" />
            </div>
            <div className="font-semibold mt-3 text-base">Compra tus rifas</div>
          </div>
          <div className="flex-1 text-center">
            <div className="bg-blue-100 rounded-full w-40 h-40 mx-auto flex items-center justify-center">
              <FaGift className="text-blue-700 text-2xl size-15" />
            </div>
            <div className="font-semibold mt-3 text-base">
              Espera el sorteo y gana
            </div>
          </div>
        </div>
      </section>      {/* Rifas Section */}
      <section className="max-w-5xl mx-auto mb-10 px-4 md:px-0">
        <h3 className="font-bold text-2xl mb-5 text-gray-900 text-center">
          Rifas Disponibles
        </h3>
        
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 text-center">
            {error}
          </div>
        ) : rifas.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <FaTicketAlt className="text-4xl mx-auto mb-3 text-blue-400" />
            <p>No hay rifas disponibles en este momento.</p>
            <p className="mt-2">¡Vuelve pronto para ver nuevas rifas!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rifas.map((rifa, index) => (
              <CardRifa 
                key={rifa.id || index}
                rifa={rifa} 
                icon={icons[index % icons.length]} 
              />
            ))}
          </div>
        )}
      </section>

      {/* Footer-like info */}
      <section className="max-w-4xl mx-auto mb-8 px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 ms-4 text-base font-medium">
            ¡Muy Fácil de usar y ganar!
            <br />
            Participa desde tu celular o computadora.
          </div>
          <div className="font-bold me-4 text-base text-gray-900 text-right">
            Pagos garantizados
            <br />y Sorteos verificables
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
