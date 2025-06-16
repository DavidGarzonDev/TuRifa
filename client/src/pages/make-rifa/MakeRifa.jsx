import React, { use, useState } from 'react'
import useAuthStore from '../../store/auth-store/use-auth-store';
import { useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaGift, FaCoins, FaCalendarAlt, FaClock, FaInfoCircle } from 'react-icons/fa';
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
      <div className="min-h-screen flex items-center justify-center bg-blue-900 px-4 py-12">
        <h2 className="text-3xl font-bold text-white">Por favor, inicia sesión para crear una rifa.</h2>
      </div>
    );
  } 

  return (
    <div className="font-sans bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <section className="bg-radial from-blue-600 from-40% to-blue-800 text-white rounded-xl shadow-lg mb-8 p-8">
          <h1 className="text-3xl font-bold mb-2">Crear Nueva Rifa</h1>
          <p className="text-blue-100">Completa el formulario para crear tu rifa y empieza a vender boletos</p>
        </section>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna 1 */}
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                  Título de la Rifa <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={rifaData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Sorteo de iPhone 15 Pro"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Descripción <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={rifaData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe los detalles de tu rifa..."
                ></textarea>
              </div>

              <div>
                <label htmlFor="prize" className="block text-gray-700 font-medium mb-2">
                  Premio <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaGift className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="prize"
                    name="prize"
                    value={rifaData.prize}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: iPhone 15 Pro"
                  />
                </div>
              </div>

              
            </div>

            {/* Columna 2 */}
            <div className="space-y-6">
              <div>
                <label htmlFor="ticketPrice" className="block text-gray-700 font-medium mb-2">
                  Precio del Boleto <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaCoins className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="ticketPrice"
                    name="ticketPrice"
                    value={rifaData.ticketPrice}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: 10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="totalTickets" className="block text-gray-700 font-medium mb-2">
                  Total de Boletos <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaTicketAlt className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="totalTickets"
                    name="totalTickets"
                    value={rifaData.totalTickets}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: 100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="startDate" className="block text-gray-700 font-medium mb-2">
                  Fecha de Inicio <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={rifaData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="endDate" className="block text-gray-700 font-medium mb-2">
                  Fecha de Finalización <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaClock className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={rifaData.endDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Nota informativa */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg flex items-start">
            <FaInfoCircle className="text-blue-700 mt-1 mr-3 flex-shrink-0" />
            <p className="text-blue-800 text-sm">
              Al crear una rifa, aceptas nuestros términos y condiciones. Asegúrate de que toda la información proporcionada sea correcta.
              El sistema verificará automáticamente la validez de los datos antes de publicar tu rifa.
            </p>
          </div>

          {/* Botones */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center"
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
      </div>
    </div>
  );
}

export default MakeRifa