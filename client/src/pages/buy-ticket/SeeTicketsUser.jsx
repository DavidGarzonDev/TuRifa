import React from 'react'
import { useEffect, useState } from 'react'
import { getAllTicketsUser } from '../../api/ticket';
import useAuthStore from '../../store/auth-store/use-auth-store';
import Ticket from './components/Ticket';
import { FaTicketAlt, FaSpinner } from 'react-icons/fa';

const SeeTicketsUser = () => {
  const { useLooged } = useAuthStore();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!useLooged) {
      window.location.href = '/login'; 
      return;
    }

    const fetchTickets = async () => {
      try {
        setLoading(true);
        const request = {
          token: useLooged.accessToken
        };
        const response = await getAllTicketsUser(request);
        const data = response.data.tickets;
        setTickets(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError('No pudimos cargar tus tickets. Por favor intenta más tarde.');
        setLoading(false);
      }
    };

    fetchTickets();
  }, [useLooged]); // Agregando dependencia para evitar loop infinito
    
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <FaTicketAlt className="text-blue-600 text-3xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Tus Boletos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Aquí encontrarás todos los boletos que has comprado para diferentes rifas. ¡Buena suerte!
          </p>
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin mb-1 rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            <p className="text-gray-600">Cargando tus boletos...</p>
          </div>
        )}
        
        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md my-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {/* No Tickets State */}
        {!loading && !error && tickets.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="mb-4 bg-blue-50 inline-block p-4 rounded-full">
              <FaTicketAlt className="text-blue-400 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Aún no tienes boletos</h3>
            <p className="text-gray-600 mb-6">
              Participa en alguna de nuestras rifas para ver tus boletos aquí.
            </p>
            <a 
              href="/" 
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver rifas disponibles
            </a>
          </div>
        )}
        
        {/* Tickets Grid */}
        {!loading && !error && tickets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <Ticket key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SeeTicketsUser