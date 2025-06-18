import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTicketAlt, FaEdit, FaTrashAlt, FaEye, FaPlus, FaUsers, FaCalendarAlt, FaCoins, 
         FaFilter, FaGift, FaChartLine, FaArrowUp, FaStar, FaTrophy, FaExclamationCircle } from 'react-icons/fa';
import useAuthStore from '../../store/auth-store/use-auth-store';
import { getRifas } from '../../api/rifa.js';

const UserRifas = () => {
  const { useLooged } = useAuthStore();
  const [rifasData, setRifas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (!useLooged) return;
    const load = async () => {
      setIsLoading(true);
      try {
        const token = useAuthStore.getState().useLooged?.accessToken;
        const { data } = await getRifas(token);
        setRifas(data.rifas);
      } catch (err) {
        console.error('Error cargando rifas:', err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [useLooged]);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredRifas = filterStatus === 'all' 
    ? rifasData 
    : rifasData.filter(rifa => {
        if (filterStatus === 'active') {
          return new Date(rifa.start_date) <= new Date() && new Date(rifa.end_date) >= new Date();
        } else if (filterStatus === 'completed') {
          return new Date(rifa.end_date) < new Date();
        } else if (filterStatus === 'scheduled') {
          return new Date(rifa.start_date) > new Date();
        }
        return true;
      });

  // Estadísticas para el dashboard
  const activeRifasCount = rifasData.filter(rifa => 
    new Date(rifa.start_date) <= new Date() && new Date(rifa.end_date) >= new Date()
  ).length;
  
  const totalParticipants = rifasData.reduce((acc, rifa) => acc + (rifa.total_tickets_sold || 0), 0);
  
  const totalEarnings = rifasData.reduce((acc, rifa) => 
    acc + ((rifa.total_tickets_sold || 0) * rifa.ticket_price), 0
  );
  
  const getBestPerformingRifa = () => {
    if (rifasData.length === 0) return null;
    
    return rifasData.reduce((best, current) => {
      const bestPercentage = (best.sold_tickets || 0) / (best.total_tickets || 1);
      const currentPercentage = (current.sold_tickets || 0) / (current.total_tickets || 1);
      
      return currentPercentage > bestPercentage ? current : best;
    }, rifasData[0]);
  };
  
  const bestRifa = getBestPerformingRifa();

  if (!useLooged) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-indigo-900 px-4 py-12 text-center">
        <div className="bg-white/10 p-6 rounded-full mb-6">
          <FaTicketAlt className="text-white text-4xl" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Acceso restringido</h2>
        <p className="text-blue-200 max-w-md mb-8">Por favor, inicia sesión para ver y gestionar tus rifas</p>
        <Link 
          to="/login"
          className="px-8 py-3 bg-white text-blue-800 rounded-lg font-bold shadow-lg hover:bg-blue-50 transition-all duration-300"
        >
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gradient-to-b from-blue-50 to-white min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado con Hero */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg mb-8">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-0 left-0 right-0" style={{
              height: '60%',
              background: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 10px, transparent 10px, transparent 20px)'
            }}></div>
          </div>
          
          <div className="relative p-8 flex flex-col md:flex-row justify-between items-center">
            <div>
              <div className="flex items-center">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <FaTrophy className="text-yellow-300 text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">Mis Rifas</h1>
              </div>
              <p className="text-blue-100 mt-2 max-w-xl">
                Administra todas tus rifas, realiza seguimiento de ventas y gestiona participantes.
              </p>
            </div>
            
            <Link 
              to="/crear/rifa" 
              className="mt-4 md:mt-0 flex items-center bg-white text-blue-700 hover:bg-blue-50 py-2 px-5 rounded-lg transition-all duration-300 shadow-md font-medium hover:shadow-lg transform hover:-translate-y-1"
            >
              <FaPlus className="mr-2" /> Crear Nueva Rifa
            </Link>
          </div>
        </section>

        {/* Dashboard estadístico */}
        <section className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Tarjeta total rifas */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Rifas</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{rifasData.length}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaTicketAlt className="text-blue-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs">
              <span className="text-blue-600 font-medium">{activeRifasCount} activas actualmente</span>
            </div>
          </div>
          
          {/* Tarjeta participantes */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Participantes</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalParticipants}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaUsers className="text-green-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs">
              <span className="text-green-600 font-medium">Boletos vendidos en todas tus rifas</span>
            </div>
          </div>
          
          {/* Tarjeta ingresos */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Ingresos Totales</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">${totalEarnings.toFixed(2)}</h3>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <FaChartLine className="text-amber-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs">
              <span className="text-amber-600 font-medium">Valor de todos los boletos vendidos</span>
            </div>
          </div>
          
          {/* Tarjeta mejor rendimiento */}
          
        </section>

        {/* Sección de filtrado y control */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto">
              <label htmlFor="filter" className="mr-3 font-medium text-gray-700">Mostrar:</label>
              <div className="relative w-full md:w-auto">
                <select
                  id="filter"
                  value={filterStatus}
                  onChange={handleFilterChange}
                  className="pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white w-full md:w-auto"
                >
                  <option value="all">Todas las rifas</option>
                  <option value="active">Rifas activas</option>
                  <option value="completed">Rifas finalizadas</option>
                  <option value="scheduled">Rifas programadas</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">Mostrando {filteredRifas.length} de {rifasData.length} rifas</div>
          </div>
        </section>

        {/* Lista de rifas */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-64 bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-500">Cargando tus rifas...</p>
          </div>
        ) : filteredRifas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRifas.map((rifa) => {
              // Determinar estado de la rifa
              const isActive = new Date(rifa.start_date) <= new Date() && new Date(rifa.end_date) >= new Date();
              const isCompleted = new Date(rifa.end_date) < new Date();
              const isScheduled = new Date(rifa.start_date) > new Date();
              
              const soldPercentage = ((rifa.total_tickets_sold || 0) / (rifa.total_tickets + rifa.total_tickets_sold || 1)) * 100;
              
              return (
                <div key={rifa.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col border border-gray-100 hover:shadow-md transition-all duration-300">
                  {/* Banner superior colorizado por estado */}
                  <div className="relative">
                    <div 
                      className={`h-3 w-full ${
                        isCompleted ? 'bg-blue-500' : 
                        isActive ? 'bg-green-500' : 'bg-amber-400'
                      }`}
                    ></div>
                    
                    {/* Estado como badge */}
                    <div className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full ${
                      isCompleted ? 'bg-blue-100 text-blue-700' : 
                      isActive ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {isCompleted ? 'Finalizada' : isActive ? 'Activa' : 'Programada'}
                    </div>
                  </div>
                  
                  {/* Contenido de la rifa */}
                  <div className="p-6 flex-grow">
                    <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-1">{rifa.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{rifa.description}</p>
                    
                    {/* Premio destacado */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100 mb-4 flex items-center">
                      <div className="bg-white p-2 rounded-full mr-3 shadow-sm">
                        <FaGift className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-600 font-medium">Premio</p>
                        <p className="text-sm font-semibold text-gray-800 line-clamp-1">{rifa.prize}</p>
                      </div>
                    </div>
                    
                    {/* Detalles en grid */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <div className="flex items-center">
                          <FaCoins className="mr-2 text-amber-500" />
                          <div>
                            <p className="text-xs text-gray-500">Precio</p>
                            <p className="text-sm font-medium">${rifa.ticket_price}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <div className="flex items-center">
                          <FaTicketAlt className="mr-2 text-indigo-500" />
                          <div>
                            <p className="text-xs text-gray-500">Boletos</p>
                            <p className="text-sm font-medium">{rifa.total_tickets_sold || 0}/{rifa.total_tickets+rifa.total_tickets_sold}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-2 rounded-lg col-span-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-2 text-red-500" />
                            <div>
                              <p className="text-xs text-gray-500">Periodo</p>
                              <p className="text-sm font-medium">
                                {new Date(rifa.start_date).toLocaleDateString()} - {new Date(rifa.end_date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Barra de progreso mejorada */}
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-gray-700">Progreso de ventas</span>
                        <span className="font-bold text-blue-600">{Math.round(soldPercentage)}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            soldPercentage >= 75 ? 'bg-green-500' :
                            soldPercentage >= 25 ? 'bg-blue-500' : 'bg-amber-500'
                          }`}
                          style={{width: `${Math.min(soldPercentage, 100)}%`}}
                        ></div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      {rifa.sold_tickets || 0} de {rifa.total_tickets} boletos vendidos
                    </p>
                  </div>
                  
                  {/* Acciones */}
                  <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center">
                    {/* Días restantes o estado final */}
                    {isCompleted ? (
                      <span className="text-sm font-medium text-blue-600 flex items-center">
                        <FaExclamationCircle className="mr-1" /> Requiere sorteo
                      </span>
                    ) : isActive ? (
                      <span className="text-sm font-medium text-green-600">
                        {Math.ceil((new Date(rifa.end_date) - new Date()) / (1000 * 60 * 60 * 24))} días restantes
                      </span>
                    ) : (
                      <span className="text-sm font-medium text-amber-600">
                        Inicia en {Math.ceil((new Date(rifa.start_date) - new Date()) / (1000 * 60 * 60 * 24))} días
                      </span>
                    )}
                    
                    {/* Botones de acción */}
                    <div className="flex space-x-1">
                      <button 
                        className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors" 
                        title="Ver detalles"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="p-2 rounded-full text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 transition-colors" 
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors" 
                        title="Eliminar"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center border border-gray-100">
            <div className="bg-blue-50 inline-block rounded-full p-6 mb-4">
              <FaTicketAlt className="text-blue-400 text-5xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No tienes rifas {
                filterStatus === 'active' ? 'activas' : 
                filterStatus === 'completed' ? 'finalizadas' :
                filterStatus === 'scheduled' ? 'programadas' : ''
              }
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              ¡Comienza creando una nueva rifa y empieza a vender boletos para tu sorteo!
            </p>
            <Link 
              to="/crear/rifa" 
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-lg transition duration-300 shadow-md font-medium"
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