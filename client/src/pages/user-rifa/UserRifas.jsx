import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTicketAlt, FaEdit, FaTrashAlt, FaEye, FaPlus, FaUsers, FaCalendarAlt, FaCoins, FaFilter, FaGift } from 'react-icons/fa';
import useAuthStore from '../../store/auth-store/use-auth-store';

const UserRifas = () => {
  const { useLooged } = useAuthStore();
  const [rifas, setRifas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');


  useEffect(() => {
   
    setTimeout(() => {
      setRifas;
      setIsLoading(false);
    }, 800);
  }, []);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredRifas = filterStatus === 'all' 
    ? rifas 
    : rifas.filter(rifa => rifa.status === filterStatus);

  if (!useLooged) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-900 px-4 py-12">
        <h2 className="text-3xl font-bold text-white">Por favor, inicia sesión para ver tus rifas.</h2>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
       
        <section className="bg-radial from-blue-600 from-40% to-blue-800 text-white rounded-xl shadow-lg mb-8 p-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Mis Rifas</h1>
              <p className="text-blue-100">Gestiona todas tus rifas en un solo lugar</p>
            </div>
            <Link 
              to="/crear/rifa" 
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 shadow-md"
            >
              <FaPlus className="mr-2" /> Crear Nueva Rifa
            </Link>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex items-center mb-4 md:mb-0">
              <label htmlFor="filter" className="mr-3 font-medium text-gray-700">Filtrar por:</label>
              <div className="relative">
                <select
                  id="filter"
                  value={filterStatus}
                  onChange={handleFilterChange}
                  className="pl-4 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="all">Todas las rifas</option>
                  <option value="active">Activas</option>
                  <option value="completed">Completadas</option>
                  <option value="draft">Borradores</option>
                </select>
                <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <FaTicketAlt className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Rifas</p>
                  <p className="font-bold text-lg">{rifas.length}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <FaUsers className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Participantes</p>
                  <p className="font-bold text-lg">{rifas.reduce((acc, rifa) => acc + rifa.soldTickets, 0)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lista de rifas */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredRifas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRifas.map((rifa) => (
              <div key={rifa.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                <div className={`h-2 w-full ${rifa.status === 'active' ? 'bg-green-500' : rifa.status === 'completed' ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                <div className="p-6 flex-grow">
                  <h3 className="font-bold text-xl text-gray-800 mb-2">{rifa.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{rifa.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <FaGift className="mr-2 text-blue-500" />
                    <span>{rifa.prize}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCoins className="mr-2 text-yellow-500" />
                      <span>${rifa.ticketPrice} / boleto</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaTicketAlt className="mr-2 text-indigo-500" />
                      <span>{rifa.soldTickets}/{rifa.totalTickets}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="mr-2 text-red-500" />
                      <span>Inicio: {new Date(rifa.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="mr-2 text-orange-500" />
                      <span>Fin: {new Date(rifa.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Barra de progreso */}
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{width: `${(rifa.soldTickets / rifa.totalTickets) * 100}%`}}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    {rifa.soldTickets} de {rifa.totalTickets} boletos vendidos 
                    ({Math.round((rifa.soldTickets / rifa.totalTickets) * 100)}%)
                  </p>
                </div>
                
                {/* Acciones */}
                <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between">
                  <span className={`text-sm font-medium ${
                    rifa.status === 'active' ? 'text-green-600' : 
                    rifa.status === 'completed' ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {rifa.status === 'active' ? 'Activa' : 
                     rifa.status === 'completed' ? 'Finalizada' : 'Borrador'}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-500 hover:text-blue-500" title="Ver detalles">
                      <FaEye />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-yellow-500" title="Editar">
                      <FaEdit />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-red-500" title="Eliminar">
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-16 text-center">
            <FaTicketAlt className="mx-auto text-blue-300 text-5xl mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No tienes rifas {filterStatus !== 'all' ? `con estado "${filterStatus}"` : ''}</h3>
            <p className="text-gray-500 mb-6">¡Comienza creando una nueva rifa para que aparezca aquí!</p>
            <Link 
              to="/crear/rifa" 
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition duration-300"
            >
              <FaPlus className="mr-2" /> Crear Nueva Rifa
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRifas;