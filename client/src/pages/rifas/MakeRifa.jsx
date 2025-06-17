import React, { useState } from 'react'
import useAuthStore from '../../store/auth-store/use-auth-store';
import { useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaGift, FaCoins, FaCalendarAlt, FaClock, FaInfoCircle, FaArrowLeft, FaTrophy } from 'react-icons/fa';
import { createRifa } from '../../api/rifa.js'

const MakeRifa = () => {
  const [rifaData, setRifaData] = useState({
    title: '',
    description: '',
    prize: '',
    ticketPrice: '',
    totalTickets: '',
    startDate: '',
    endDate: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { useLooged } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRifaData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = useAuthStore.getState().useLooged?.accessToken;
    const uid = useAuthStore.getState().useLooged?.uid;

    const data = {
      token,
      rifa: {
        ...rifaData,
        userId: uid,
      }
    }

    try {
      const response = await createRifa(data);
      if (response.error) {
        console.error('Error al crear la rifa:', response.error);
        alert('Ocurrió un error al crear la rifa. Intenta nuevamente.');
      }
      else {
        alert('Rifa creada exitosamente!');
        navigate('/mis/rifas');
      }

    } catch (error) {
      console.error('Error al crear la rifa:', error);
      alert('Ocurrió un error al crear la rifa. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!useLooged) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-800 to-indigo-900 px-4 py-12 text-center">
        <div className="bg-white/10 p-6 rounded-full mb-6">
          <FaTicketAlt className="text-white text-4xl" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Acceso restringido</h2>
        <p className="text-blue-200 max-w-md mb-8">Por favor, inicia sesión para crear y administrar tus rifas</p>
        <button 
          onClick={() => navigate('/login')}
          className="px-8 py-3 bg-white text-blue-800 rounded-lg font-bold shadow-lg hover:bg-blue-50 transition-all duration-300"
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gradient-to-b from-blue-50 to-white min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Barra de navegación superior */}
        <div className="mb-8 flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-blue-700 hover:text-blue-900 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span>Volver al inicio</span>
          </button>
        </div>

        {/* Encabezado */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg mb-8">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-0 left-0 right-0" style={{
              height: '50%',
              background: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 10px, transparent 10px, transparent 20px)'
            }}></div>
          </div>
          
          <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center">
            <div className="bg-white/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
              <FaTrophy className="text-yellow-300 text-4xl" />
            </div>
            <div>
              <span className="bg-blue-500/60 text-xs font-medium px-2.5 py-1 rounded-full mb-2 inline-block">Nueva Rifa</span>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Crear tu Rifa</h1>
              <p className="text-blue-100 max-w-2xl">Completa todos los campos a continuación para crear una nueva rifa. Podrás ver y gestionar todas tus rifas desde tu panel de control.</p>
            </div>
          </div>
        </section>

        {/* Resumen de información */}
        <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="bg-blue-100 p-3 rounded-full mb-3">
              <FaTicketAlt className="text-blue-600 text-xl" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Personaliza tu rifa</h3>
            <p className="text-gray-500 text-sm">Define el título, descripción y el premio que ofrecerás</p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="bg-green-100 p-3 rounded-full mb-3">
              <FaCoins className="text-green-600 text-xl" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Establece los precios</h3>
            <p className="text-gray-500 text-sm">Define el precio por boleto y la cantidad total disponible</p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="bg-purple-100 p-3 rounded-full mb-3">
              <FaCalendarAlt className="text-purple-600 text-xl" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Programa las fechas</h3>
            <p className="text-gray-500 text-sm">Configura las fechas de inicio y finalización de tu rifa</p>
          </div>
        </section>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">Detalles de la Rifa</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Columna 1 */}
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="flex items-center text-gray-700 font-medium mb-2">
                  Título de la Rifa <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={rifaData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Ej: Sorteo de iPhone 15 Pro"
                />
              </div>

              <div>
                <label htmlFor="description" className="flex items-center text-gray-700 font-medium mb-2">
                  Descripción <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={rifaData.description}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Describe los detalles de tu rifa..."
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Incluye toda la información relevante sobre la rifa, cómo se realizará el sorteo y cualquier condición importante.
                </p>
              </div>

              <div>
                <label htmlFor="prize" className="flex items-center text-gray-700 font-medium mb-2">
                  Premio <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaGift className="text-blue-400" />
                  </div>
                  <input
                    type="text"
                    id="prize"
                    name="prize"
                    value={rifaData.prize}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Ej: iPhone 15 Pro Max 256GB"
                  />
                </div>
              </div>
            </div>

            {/* Columna 2 */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ticketPrice" className="flex items-center text-gray-700 font-medium mb-2">
                    Precio por Boleto <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaCoins className="text-green-500" />
                    </div>
                    <input
                      type="number"
                      id="ticketPrice"
                      name="ticketPrice"
                      value={rifaData.ticketPrice}
                      onChange={handleChange}
                      required
                      min="1"
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Ej: 10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="totalTickets" className="flex items-center text-gray-700 font-medium mb-2">
                    Total Boletos <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaTicketAlt className="text-indigo-500" />
                    </div>
                    <input
                      type="number"
                      id="totalTickets"
                      name="totalTickets"
                      value={rifaData.totalTickets}
                      onChange={handleChange}
                      required
                      min="1"
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Ej: 100"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-medium mb-4">Valor total de la rifa</label>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100 text-center">
                  <div className="text-2xl font-bold text-green-700">
                    ${rifaData.ticketPrice && rifaData.totalTickets 
                      ? (parseFloat(rifaData.ticketPrice) * parseInt(rifaData.totalTickets)).toFixed(2) 
                      : '0.00'}
                  </div>
                  <div className="text-sm text-green-600">Valor potencial total</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="flex items-center text-gray-700 font-medium mb-2">
                    Fecha de Inicio <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaCalendarAlt className="text-blue-500" />
                    </div>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={rifaData.startDate}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="endDate" className="flex items-center text-gray-700 font-medium mb-2">
                    Fecha Final <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaClock className="text-purple-500" />
                    </div>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={rifaData.endDate}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nota informativa */}
          <div className="mt-8 p-5 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <FaInfoCircle className="text-blue-700 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-blue-800 font-medium mb-1">Información importante</h4>
                <p className="text-blue-800 text-sm">
                  Al crear una rifa, aceptas nuestros términos y condiciones. Asegúrate de que toda la información proporcionada sea correcta.
                  El sistema verificará automáticamente la validez de los datos antes de publicar tu rifa.
                </p>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creando...
                </>
              ) : 'Crear Rifa'}
            </button>
          </div>
        </form>

        {/* Footer ayuda */}
        <div className="text-center text-gray-500 text-sm">
          <p>¿Tienes dudas sobre cómo crear una rifa? <a href="#" className="text-blue-600 hover:underline">Consulta nuestra guía</a></p>
        </div>
      </div>
    </div>
  );
};

export default MakeRifa;