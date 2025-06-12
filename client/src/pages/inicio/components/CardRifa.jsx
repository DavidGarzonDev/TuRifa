import React from "react";
import { FaCoins, FaTicketAlt, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CardRifa = ({ rifa, icon }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };
  
  // Use default icon if none provided
  const rifaIcon = icon || <FaCoins className="text-yellow-400 text-4xl mb-2 mx-auto" />;
  
  return (
    <div className="flex gap-8 justify-center mb-8">
      <div className="bg-white rounded-xl shadow-md p-6 min-w-[180px] text-center flex-1 max-w-xs transform hover:scale-105 transition-transform duration-300">
        {rifaIcon}
        
        <div className="font-bold text-xl mb-3 text-gray-800">
          {rifa.title || "Premio en efectivo"}
        </div>
        
        <div className="mb-4 text-gray-600 text-sm">
          <p className="mb-2">{rifa.description || "Participa y gana increíbles premios"}</p>
          
          <div className="flex items-center justify-center gap-1 mt-2">
            <FaDollarSign className="text-green-600" />
            <span>{rifa.prize || "Gran premio"}</span>
          </div>
          
          <div className="flex items-center justify-center gap-1 mt-1">
            <FaTicketAlt className="text-blue-600" /> 
            <span>{rifa.total_tickets || 0} boletos</span>
          </div>
          
          <div className="flex items-center justify-center gap-1 mt-1">
            <FaCalendarAlt className="text-orange-500" />
            <span>{rifa.end_date ? formatDate(rifa.end_date) : "Fecha pendiente"}</span>
          </div>
          
          <div className="flex items-center justify-center gap-1 mt-1 font-semibold">
            <FaDollarSign className="text-green-700" />
            <span>${rifa.ticket_price || 0}</span>
          </div>
        </div>
        
        <button 
          onClick={() => navigate(`/rifa/${rifa.id}`)} 
          className="bg-blue-700 hover:bg-blue-800 text-white rounded-md py-2 w-full font-bold text-base mt-2 transition-colors duration-300 shadow-md"
        >
          Participar
        </button>
      </div>
    </div>
  );
};

export default CardRifa;
