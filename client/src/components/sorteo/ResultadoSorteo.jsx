import React from 'react';
import { FaTrophy, FaTicketAlt, FaEnvelope, FaStar, FaFileAlt, FaBell, FaDownload } from 'react-icons/fa';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ResultadoSorteo = ({ resultado, onClose }) => {
  const { ganador, rifa, timestamp, seed } = resultado || {};
  const fechaSorteo = timestamp ? format(new Date(timestamp), "d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es }) : '';

  const enviarNotificacion = () => {
    alert(`Se ha enviado una notificación a ${ganador?.email || 'el ganador'}`);
  };


  const descargarCertificado = () => {
    alert('Descargando certificado del sorteo');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Cabecera */}
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mt-10 -mr-10"></div>
        <div className="relative z-10 flex items-center">
          <div className="bg-yellow-100 p-3 rounded-full mr-4">
            <FaTrophy className="text-yellow-500 text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">¡Sorteo Completado!</h2>
            <p className="text-yellow-100">Rifa: {rifa?.title || 'Rifa'}</p>
          </div>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="p-6">
        {/* Información del ganador */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FaStar className="text-yellow-500 mr-2" /> 
            Información del Ganador
          </h3>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="relative">
                <div className="absolute -inset-2">
                  <div className="w-full h-full mx-auto rotate-0 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 blur-lg opacity-75 animate-pulse rounded-full"></div>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg p-4 text-white text-center mb-4 md:mb-0 md:mr-6 shadow-md flex flex-col relative z-10">
                  <FaTicketAlt className="text-3xl text-white opacity-80 mb-1 mx-auto" />
                  {/* Destacamos el número de boleto ganador */}
                  <div className="font-bold text-2xl">{ganador?.ticketNumber || '#0000'}</div>
                  <div className="text-xs text-yellow-100">Número de boleto ganador</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-800 text-lg">
                  {ganador?.nombre || 'Usuario'}
                </h4>
                <p className="text-gray-600 mb-3 flex items-center">
                  <FaEnvelope className="mr-2 text-gray-400" />
                  {ganador?.email || 'email@ejemplo.com'}
                </p>
                <div className="text-sm text-gray-500">
                  ID de ticket: {ganador?.ticketId || '000000'}
                </div>
                <div className="text-sm text-gray-500">
                  ID de usuario: {ganador?.userId || '000000'}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Detalles del sorteo */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FaFileAlt className="text-blue-500 mr-2" /> 
            Detalles del Sorteo
          </h3>
          
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="text-gray-500 mr-2">Fecha y hora:</div>
                <div className="font-medium">{fechaSorteo}</div>
              </div>
              
              <div className="flex items-center">
                <div className="text-gray-500 mr-2">Premio:</div>
                <div className="font-medium">{rifa?.prize || 'Premio'}</div>
              </div>
              
              <div className="flex items-center">
                <div className="text-gray-500 mr-2">Total boletos:</div>
                <div className="font-medium">{resultado?.totalTickets || '0'}</div>
              </div>
              
              <div className="flex items-center">
                <div className="text-gray-500 mr-2">ID de la rifa:</div>
                <div className="font-medium">{rifa?.id || '000'}</div>
              </div>
              
              <div className="flex items-center col-span-2">
                <div className="text-gray-500 mr-2">Código de verificación:</div>
                <div className="font-medium text-xs text-gray-600 truncate max-w-full">{seed || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Acciones */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
          <button 
            onClick={enviarNotificacion}
            className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
          >
            <FaBell className="mr-2" />
            Notificar al ganador
          </button>
          
          <button 
            onClick={descargarCertificado}
            className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors"
          >
            <FaDownload className="mr-2" />
            Certificado del sorteo
          </button>
          
          <button 
            onClick={onClose}
            className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultadoSorteo;
