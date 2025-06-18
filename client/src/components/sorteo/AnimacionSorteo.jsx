import React, { useState, useEffect, useRef } from 'react';
import { FaTrophy, FaTicketAlt, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { getTicketsByRifaId } from '../../api/ticket';

const AnimacionSorteo = ({ rifaInfo, onComplete, onCancel }) => {
  const [animationStage, setAnimationStage] = useState('initial'); // initial, selecting, result
  const [ticketNumbers, setTicketNumbers] = useState([]);
  const [realTickets, setRealTickets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState(null);
  const [animationSpeed, setAnimationSpeed] = useState(80); // ms entre cambios
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);

  // Cargar los tickets reales para esta rifa
  useEffect(() => {
    if (!rifaInfo || !rifaInfo.id) return;
    
    const loadTickets = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getTicketsByRifaId(rifaInfo.id);
        
        if (response.data && Array.isArray(response.data)) {
          // Guardamos los tickets reales y creamos números de boleto para la animación
          const tickets = response.data;
          setRealTickets(tickets);
          
          // Extraemos los números de boleto reales para la animación
          const ticketNumbers = tickets.map(ticket => {
            return ticket.numero_boleto || `#${String(ticket.id).padStart(4, '0')}`;
          });
          
          // Si hay muy pocos tickets, repetimos algunos para tener una mejor animación
          let animationTickets = [...ticketNumbers];
          while (animationTickets.length < 30) {
            animationTickets = [...animationTickets, ...ticketNumbers];
          }
          
          // Mezclamos los tickets para la animación
          const shuffled = animationTickets.sort(() => 0.5 - Math.random());
          setTicketNumbers(shuffled);
        } else {
          setError('No se encontraron tickets para esta rifa');
          // Fallback a números aleatorios para la animación
          const totalNumbers = 30;
          const randomTickets = Array.from({ length: totalNumbers }, (_, i) => 
            `#${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
          );
          setTicketNumbers(randomTickets);
        }
      } catch (err) {
        console.error('Error al cargar tickets:', err);
        setError('Error al cargar los tickets');
        // Fallback a números aleatorios
        const totalNumbers = 30;
        const randomTickets = Array.from({ length: totalNumbers }, (_, i) => 
          `#${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
        );
        setTicketNumbers(randomTickets);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTickets();
    
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [rifaInfo]);
  // Función para iniciar la animación del sorteo
  const startDrawAnimation = () => {
    // Verificamos si tenemos tickets reales
    if (realTickets.length === 0 && !error) {
      setError('No hay tickets vendidos para esta rifa');
      return;
    }
    
    setAnimationStage('selecting');
    
    // Iniciar la animación
    let speed = 80; // ms inicial
    let counter = 0;
    
    const animate = () => {
      setCurrentIndex((prev) => (prev + 1) % ticketNumbers.length);
      counter++;
      
      // Reducir la velocidad gradualmente
      if (counter > 20 && counter % 5 === 0) {
        speed += 15;
        setAnimationSpeed(speed);
      }
      
      // Detener la animación después de un tiempo
      if (counter < 50) {
        animationRef.current = setTimeout(animate, speed);
      } else {
        // Seleccionar un índice que corresponde a un boleto real
        // La animación solo es visual, el backend es quien realmente seleccionará el ganador
        // Usamos un boleto real para que la experiencia sea más realista
        const winnerTicketIndexForAnimation = counter % ticketNumbers.length;
        setWinnerIndex(winnerTicketIndexForAnimation);
        setCurrentIndex(winnerTicketIndexForAnimation);
        setAnimationStage('result');
        
        // Lanzar confetti
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { 
              x: x / window.innerWidth, 
              y: y / window.innerHeight 
            }
          });
        }
      }
    };
    
    animationRef.current = setTimeout(animate, speed);
  };

  // Manejar la confirmación del sorteo
  const handleConfirm = () => {
    // Ahora solo indicamos que la animación está completa
    // El componente padre se encargará de hacer la llamada al backend
    // y obtener el ganador real
    onComplete();
  };

  return (
    <div ref={containerRef} className="min-h-[400px] flex flex-col items-center justify-center bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Encabezado */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-1">Sorteo de Rifa</h2>
        <p className="text-blue-100">
          {rifaInfo?.title || 'Selección del ganador'}
        </p>
      </div>
      
      {/* Contenido principal */}      <div className="p-6 w-full">
        {/* Etapa inicial: explicación y confirmación */}
        {animationStage === 'initial' && (
          <div className="text-center py-8">
            <div className="bg-blue-100 p-4 rounded-full inline-flex mb-6">
              <FaTrophy className="text-4xl text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              ¿Listo para realizar el sorteo?
            </h3>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center mb-8">
                <FaSpinner className="animate-spin text-3xl text-blue-500 mb-2" />
                <p className="text-gray-600">Cargando boletos vendidos...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-8">
                <p className="font-medium">Error: {error}</p>
                <p className="text-sm mt-1">No se puede realizar el sorteo en este momento.</p>
              </div>
            ) : realTickets.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg mb-8">
                <p className="font-medium">No hay boletos vendidos para esta rifa</p>
                <p className="text-sm mt-1">Es necesario tener al menos un boleto vendido para realizar el sorteo.</p>
              </div>
            ) : (
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Se seleccionará aleatoriamente un ganador entre los {realTickets.length} boletos vendidos.
                Este proceso es irreversible y se notificará al ganador.
              </p>
            )}
            
            <div className="flex justify-center space-x-4">
              <button 
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
              >
                <FaTimes className="mr-2" /> Cancelar
              </button>
              <button 
                onClick={startDrawAnimation}
                disabled={isLoading || error || realTickets.length === 0}
                className={`px-6 py-2 ${
                  isLoading || error || realTickets.length === 0 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                } text-white rounded-lg transition-colors shadow-md flex items-center`}
              >
                {isLoading ? (
                  <><FaSpinner className="animate-spin mr-2" /> Cargando...</>
                ) : (
                  <><FaTicketAlt className="mr-2" /> Iniciar Sorteo</>
                )}
              </button>
            </div>
          </div>
        )}
        
        {/* Etapa de selección: animación de boletos */}
        {animationStage === 'selecting' && (
          <div className="text-center py-8">
            <div className="relative h-32 mb-8 overflow-visible">
              <div className="absolute left-0 right-0 flex flex-col items-center">
                <div className="relative">
                  <div className="bg-gradient-to-b from-white via-transparent to-white absolute inset-0 z-10 pointer-events-none" />
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-4xl font-bold py-4 px-10 rounded-lg shadow-lg transform-gpu animate-pulse">
                    {ticketNumbers[currentIndex]}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-500 animate-pulse">
              Seleccionando ganador...
            </p>
          </div>
        )}
        
        {/* Etapa de resultado: mostrar ganador */}
        {animationStage === 'result' && (
          <div className="text-center py-8">
            <div className="mb-8">
              <div className="inline-block relative">
                <div className="absolute -inset-4">
                  <div className="w-full h-full mx-auto rotate-0 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 blur-lg opacity-75 animate-pulse rounded-full"></div>
                </div>
                <div className="relative bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-4xl font-bold py-4 px-10 rounded-lg shadow-lg">
                  {ticketNumbers[winnerIndex]}
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              ¡Boleto seleccionado!
            </h3>
            <p className="text-gray-600 mb-8">
              Haz clic en "Confirmar" para verificar el ganador real
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={handleConfirm}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-colors shadow-md flex items-center"
              >
                <FaCheck className="mr-2" /> Confirmar Ganador
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimacionSorteo;
