import React, { useState, useEffect } from 'react';
import { FaTicketAlt, FaCalendarAlt, FaCheck, FaClock, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';
import { getRifaById } from '../../../api/rifa';

const Ticket = ({ ticket }) => {
  const [rifa, setRifa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRifaDetails = async () => {
      try {
        const response = await getRifaById(ticket.id_rifa);
        setRifa(response.data.rifa);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar detalles de la rifa:', error);
        setLoading(false);
      }
    };

    fetchRifaDetails();
  }, [ticket.id_rifa]);

  // Formato para fechas
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Estado del ticket
  const getStatusBadge = (state) => {
    switch (state?.toLowerCase()) {
      case 'active':
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <FaCheck className="mr-1" /> Activo
          </span>
        );
      case 'expired':
        return (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <FaClock className="mr-1" /> Expirado
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <FaClock className="mr-1" /> Pendiente
          </span>
        );
    }
  };
  
  // Método de pago
  const getPaymentMethod = (method) => {
    switch (method?.toLowerCase()) {
      case 'stripe':
        return (
          <span className="flex items-center text-xs text-gray-600">
            <FaCreditCard className="mr-1" /> Tarjeta de crédito
          </span>
        );
      default:
        return (
          <span className="flex items-center text-xs text-gray-600">
            <FaMoneyBillWave className="mr-1" /> Otro método
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Encabezado de ticket con diseño striped */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          {/* Patrón de rayas diagonal para simular ticket */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px)` 
          }}></div>
        </div>
        
        <div className="relative flex justify-between items-start">
          <div>
            <div className="bg-white rounded-full p-2 inline-block mb-2">
              <FaTicketAlt className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-white font-bold text-lg truncate">
              {loading ? "Cargando..." : rifa?.title || "Ticket #" + ticket.id}
            </h3>
          </div>
          {getStatusBadge(ticket.state)}
        </div>
      </div>

      {/* Contenido del ticket */}
      <div className="p-4 flex-grow">
        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Premio */}
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Premio</p>
              <p className="font-semibold text-gray-800">{rifa?.prize || "Premio no disponible"}</p>
            </div>
            
            {/* ID y número de ticket */}
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">ID del Boleto</p>
              <div className="bg-blue-50 rounded-lg p-2 border border-blue-100 mt-1">
                <p className="font-mono text-sm text-blue-800 break-all">{ticket.id}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer con detalles del ticket */}
      <div className="bg-gray-50 p-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Comprado el</p>
              <p className="text-sm font-medium">{formatDate(ticket.buy_date)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Válido hasta</p>
            <p className="text-sm font-medium">{formatDate(ticket.expire_date)}</p>
          </div>
        </div>

        {/* Separador perforado */}
        <div className="relative py-2 my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 border-dashed"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-white px-3">
              <FaTicketAlt className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Precio y método de pago */}
        <div className="flex justify-between items-center">
          <div>
            {getPaymentMethod(ticket.method_pago)}
          </div>
          <div className="bg-green-100 px-3 py-1 rounded-full">
            <p className="text-green-800 font-bold">${ticket.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
