import React, { useState, useEffect } from 'react';
import { FaTrophy, FaUser, FaTicketAlt, FaEnvelope } from 'react-icons/fa';
import { getRifaById } from '../../../api/rifa.js';
import axios from 'axios';
import useAuthStore from '../../../store/auth-store/use-auth-store';

const ViewWinUser = ({ rifaId }) => {
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { useLooged } = useAuthStore();
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchWinnerInfo = async () => {
      // No hacer nada si no hay rifaId o no está autenticado
      if (!rifaId || !useLooged) {
        setLoading(false);
        return;
      }
      
      try {
        // Obtener información de la rifa
        const { data: rifaResponse } = await getRifaById(rifaId);
        const rifa = rifaResponse.rifa;
        
        if (!rifa || !rifa.winner_user_id || !rifa.winner_ticket_id) {
          console.error("No hay información del ganador en esta rifa");
          if (isMounted) {
            setError('No hay información del ganador disponible');
            setLoading(false);
          }
          return;
        }
        
        // Variables para almacenar la información
        let winnerTicket = { numero_boleto: `#${String(rifa.winner_ticket_id).padStart(4, '0')}` };
        let userData = { name: 'Usuario Ganador', email: 'No disponible' };
        
        // Intentar obtener información del ticket
        try {
          const ticketResponse = await axios.get(
            `${import.meta.env.VITE_API_BACKEND_URL}/tickets/${rifa.winner_ticket_id}`
          );
          if (ticketResponse.data && ticketResponse.data.ticket) {
            winnerTicket = ticketResponse.data.ticket;
          }
        } catch (ticketError) {
          console.error("Error al obtener ticket:", ticketError);
        }
        
        // Intentar obtener información del usuario
        try {
          const token = useLooged?.accessToken;
          if (token) {
            const userResponse = await axios.post(
              `${import.meta.env.VITE_API_BACKEND_URL}/get/user`,
              { token, uid: rifa.winner_user_id }
            );
            if (userResponse.data && userResponse.data.data) {
              userData = userResponse.data.data;
            }
          }
        } catch (userError) {
          console.error("Error al obtener usuario:", userError);
        }
        
        // Actualizar estado solo si el componente sigue montado
        if (isMounted) {
          setWinnerInfo({
            rifa: {
              title: rifa.title,
              prize: rifa.prize,
              drawDate: rifa.draw_date ? new Date(rifa.draw_date).toLocaleDateString() : 'No disponible'
            },
            user: userData,
            ticket: winnerTicket
          });
          setLoading(false);
        }
        
      } catch (error) {
        console.error("Error principal:", error);
        if (isMounted) {
          setError('Error al cargar información del ganador');
          setLoading(false);
        }
      }
    };
    
    fetchWinnerInfo();
    
    // Limpieza al desmontar
    return () => {
      isMounted = false;
    };
  }, [rifaId, useLooged]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-2">
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-amber-500 mr-3"></div>
        <span className="text-sm text-gray-600">Cargando información del ganador...</span>
      </div>
    );
  }

  if (error && !winnerInfo) {
    return (
      <div className="text-center py-2 text-gray-500 text-sm">
        <FaTrophy className="text-gray-400 mx-auto mb-1" />
        {error}
      </div>
    );
  }

  if (!winnerInfo) return null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        <div className="bg-amber-100 p-1.5 rounded-full mr-2">
          <FaTrophy className="text-amber-500" />
        </div>
        <h4 className="font-medium text-gray-800 text-sm">Información del ganador</h4>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-gray-700">
          <FaUser className="text-blue-500" /> 
          <span className="font-medium">Ganador:</span> {winnerInfo.user.name}
        </div>
        <div className="flex items-center gap-1.5 text-gray-700">
          <FaTicketAlt className="text-green-500" /> 
          <span className="font-medium">Boleto:</span> {winnerInfo.ticket.numero_boleto}
        </div>
        <div className="flex items-center gap-1.5 text-gray-700">
          <FaEnvelope className="text-purple-500" /> 
          <span className="font-medium">Email:</span> {winnerInfo.user.email}
        </div>
      </div>
      
      <div className="mt-1 text-xs text-gray-500">
        Sorteo realizado el: {winnerInfo.rifa.drawDate}
      </div>
    </div>
  );
};

export default ViewWinUser;
