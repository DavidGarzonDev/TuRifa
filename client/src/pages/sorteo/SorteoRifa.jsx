import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTrophy, FaArrowLeft, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import useAuthStore from '../../store/auth-store/use-auth-store';
import { getRifaById, checkRifaForDraw, realizarSorteo } from '../../api/rifa';
import AnimacionSorteo from '../../components/sorteo/AnimacionSorteo';
import ResultadoSorteo from '../../components/sorteo/ResultadoSorteo';

const SorteoRifa = () => {
  const { rifaId } = useParams();
  const navigate = useNavigate();
  const { useLooged } = useAuthStore();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rifa, setRifa] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [reason, setReason] = useState(null);
  const [stage, setStage] = useState('check'); // check, animation, results
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    if (!useLooged || !rifaId) {
      navigate('/mis/rifas');
      return;
    }

    const loadRifa = async () => {
      setLoading(true);
      try {
        // Obtener información de la rifa
        const rifaResponse = await getRifaById(rifaId);
        setRifa(rifaResponse.data.rifa);

        // Verificar si está lista para sorteo
        const token = useAuthStore.getState().useLooged?.accessToken;
        const checkResponse = await checkRifaForDraw(rifaId, token);
        setIsReady(checkResponse.data.isReady);
        setReason(checkResponse.data.reason);

      } catch (err) {
        console.error('Error cargando rifa para sorteo:', err);
        setError('No se pudo cargar la información de la rifa. Por favor, inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    loadRifa();
  }, [rifaId, useLooged, navigate]);

  // Función para iniciar el sorteo
  const iniciarSorteo = () => {
    setStage('animation');
  };

  // Función para cuando se completa la animación de sorteo
  const handleSorteoComplete = async () => {
    try {
      const token = useAuthStore.getState().useLooged?.accessToken;
      const response = await realizarSorteo(rifaId, token);
      
      if (response.data.success) {
        setResultado(response.data);
        setStage('results');
      } else {
        setError('Ocurrió un error al realizar el sorteo. Por favor, inténtalo de nuevo.');
        setStage('check');
      }
    } catch (err) {
      console.error('Error al realizar sorteo:', err);
      setError('Ocurrió un error al realizar el sorteo. Por favor, inténtalo de nuevo.');
      setStage('check');
    }
  };

  // Función para cancelar el sorteo
  const handleCancel = () => {
    navigate('/mis/rifas');
  };

  // Función para cerrar los resultados
  const handleCloseResults = () => {
    navigate('/mis/rifas');
  };

  if (!useLooged) {
    return null; // El navigate en el useEffect redirigirá al usuario
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8 flex items-center">
          <button 
            onClick={() => navigate('/mis/rifas')}
            className="bg-white p-2 rounded-full shadow-sm mr-4 hover:bg-gray-100 transition-colors"
          >
            <FaArrowLeft className="text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {stage === 'results' ? 'Resultado del Sorteo' : 'Sorteo de Rifa'}
          </h1>
        </div>
        
        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-16 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Cargando información de la rifa...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <div className="bg-red-100 p-3 rounded-full inline-flex mb-4">
                <FaExclamationCircle className="text-2xl text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button 
                onClick={() => navigate('/mis/rifas')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Volver a Mis Rifas
              </button>
            </div>
          </div>
        ) : stage === 'check' ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
              <h2 className="text-xl font-bold">Verificación de Sorteo</h2>
              <p className="text-blue-100">Rifa: {rifa?.title}</p>
            </div>
              <div className="p-6">
              {!isReady ? (
                <div className="text-center py-6">
                  <div className="bg-amber-100 p-4 rounded-full inline-flex mb-6">
                    <FaInfoCircle className="text-3xl text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Esta rifa no está lista para sorteo
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                    {reason || 'Asegúrate de que la rifa haya finalizado y tenga al menos un boleto vendido.'}
                  </p>
                  <button 
                    onClick={() => navigate('/mis/rifas')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Volver a Mis Rifas
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="bg-green-100 p-4 rounded-full inline-flex mb-6">
                    <FaTrophy className="text-3xl text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    ¡Esta rifa está lista para sorteo!
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                    Puedes proceder a realizar el sorteo para seleccionar un ganador entre todos los
                    boletos vendidos. Este proceso es irreversible y generará un certificado del sorteo.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={handleCancel}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={iniciarSorteo}
                      className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-colors shadow-md"
                    >
                      Realizar Sorteo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : stage === 'animation' ? (
          <AnimacionSorteo 
            rifaInfo={rifa} 
            onComplete={handleSorteoComplete} 
            onCancel={handleCancel} 
          />
        ) : (
          <ResultadoSorteo 
            resultado={resultado} 
            onClose={handleCloseResults} 
          />
        )}
      </div>
    </div>
  );
};

export default SorteoRifa;
