import React from "react";
import { FaCoins, FaTicketAlt, FaCalendarAlt, FaDollarSign, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import  useAuthStore from "../../../store/auth-store/use-auth-store.js"

const CardRifa = ({ rifa, icon }) => {
  const navigate = useNavigate();
  const { useLooged, logout } = useAuthStore();

  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };
  
  const rifaIcon = icon || <FaCoins className="text-yellow-400 text-4xl mb-2 mx-auto" />;
  const name = useLooged?.displayName

  return (
    <div className="flex gap-8 justify-center mb-8">
      <div className="bg-gradient-to-b from-white to-blue-50 rounded-2xl shadow-lg overflow-hidden border border-blue-100 min-w-[220px] flex-1 max-w-xs transform hover:scale-105 transition-all duration-300 hover:shadow-xl relative flex flex-col">
        {/* Top ribbon/banner */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-xs font-bold text-white px-3 py-1 rounded-full shadow-md">
          ¡Popular!
        </div>
        
        {/* Icon section with gradient background */}
        <div className="pt-8 pb-6 px-6 flex justify-center items-center bg-gradient-to-r from-blue-600/10 to-purple-600/10">
          <div className="bg-white p-4 rounded-full shadow-md">
            {rifaIcon}
          </div>
        </div>
        
        {/* Content section */}
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="font-bold text-xl mb-3 text-gray-800 text-center">
            {rifa.title || "Premio en efectivo"}
          </h3>
          
          <p className="mb-4 text-gray-600 text-sm text-center">
            {rifa.description || "Participa y gana increíbles premios"}
          </p>
          
          <div className="space-y-3 mt-2">
            <div className="flex items-center gap-3 bg-green-50 p-2 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full">
                <FaDollarSign className="text-green-600" />
              </div>
              <div className="flex-grow">
                <p className="text-xs text-green-700 font-medium">Premio</p>
                <p className="font-semibold text-sm text-gray-700">{rifa.prize || "Gran premio"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-blue-50 p-2 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <FaTicketAlt className="text-blue-600" />
              </div>
              <div className="flex-grow">
                <p className="text-xs text-blue-700 font-medium">Boletos</p>
                <p className="font-semibold text-sm text-gray-700">{rifa.total_tickets || 0} disponibles</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-amber-50 p-2 rounded-lg">
              <div className="bg-amber-100 p-2 rounded-full">
                <FaCalendarAlt className="text-amber-600" />
              </div>
              <div className="flex-grow">
                <p className="text-xs text-amber-700 font-medium">Fecha de sorteo</p>
                <p className="font-semibold text-sm text-gray-700">{rifa.end_date ? formatDate(rifa.end_date) : "Fecha pendiente"}</p>
              </div>
            </div>
          </div>
          
          {/* Price tag */}
          <div className="my-5 flex justify-center">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-full font-bold text-lg shadow-md">
              ${rifa.ticket_price || 0} <span className="text-sm opacity-90">por boleto</span>
            </div>
          </div>
        </div>
        
        {/* Button section */}
        <div className="px-6 pb-6">
          { name === rifa.organizer ? ( 
            <button 
              disabled
              className="bg-gray-300 text-gray-500 rounded-lg py-3 w-full font-bold text-base transition-all duration-300 shadow-md flex items-center justify-center cursor-not-allowed" >
              <span>Esta rifa es tuya, no puedes participar!</span>
            </button>
          ) : rifa.state === "Cerrada" ? (
            <button 
              disabled
              className="bg-gray-300 text-gray-500 rounded-lg py-3 w-full font-bold text-base transition-all duration-300 shadow-md flex items-center justify-center cursor-not-allowed" >
              <span>Rifa Finalizada</span>
            </button>
          ) :
          rifa.total_tickets > 0 ?  (
            <>
            <button 
            onClick={!useLooged ? () => navigate(`/login`) : () => navigate(`/comprar/rifa/${rifa.id}`)} 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg py-3 w-full font-bold text-base transition-all duration-300 shadow-md flex items-center justify-center"
          >
            <span>Participar ahora</span>
            <FaArrowRight className="ml-2"/>
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-3">
            ¡No esperes más, los boletos se agotan rápido!
          </p> 
            </>
          ): (
            <button 
              disabled
              className="bg-gray-300 text-gray-500 rounded-lg py-3 w-full font-bold text-base transition-all duration-300 shadow-md flex items-center justify-center cursor-not-allowed" >
              <span>Boletos agotados</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardRifa;
