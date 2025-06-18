import React, { useState } from 'react';
import { FaQuestion, FaTicketAlt, FaEnvelope, FaPhone, FaComments, FaHeadset, FaFile, FaVideo, FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';

const Help = () => {
  // Estado para los acordeones de FAQ
  const [activeAccordion, setActiveAccordion] = useState(null);
  
  // Estado para el formulario de contacto
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Soporte General',
    message: '',
  });
  
  // Opciones para el selector de tema de ayuda
  const supportTopics = [
    'Soporte General',
    'Problema con mi cuenta',
    'Problema con mis boletos',
    'Problema con pagos',
    'Cómo crear una rifa',
    'Otro'
  ];
  
  // Datos para las FAQs
  const faqData = [
    {
      id: 1,
      question: '¿Cómo puedo comprar un boleto?',
      answer: 'Para comprar un boleto, primero debes crear una cuenta o iniciar sesión. Luego, navega a la sección de rifas disponibles, selecciona la que te interese, elige el número de boleto que prefieras y completa el pago a través de nuestras opciones seguras.'
    },
    {
      id: 2,
      question: '¿Cómo sabré si gané una rifa?',
      answer: 'Recibirás una notificación por correo electrónico si resultas ganador. También puedes verificar el estado de tus boletos en cualquier momento desde tu perfil, en la sección "Mis Boletos". Los resultados de los sorteos también se publican en la página de la rifa correspondiente.'
    },
    {
      id: 3,
      question: '¿Puedo cancelar la compra de un boleto?',
      answer: 'Las compras de boletos pueden cancelarse dentro de las 24 horas posteriores a la compra, siempre y cuando el sorteo no haya finalizado. Para solicitar una cancelación, contacta a nuestro equipo de soporte con el número de tu boleto y el motivo de la cancelación.'
    },
    {
      id: 4,
      question: '¿Cómo puedo crear mi propia rifa?',
      answer: 'Para crear una rifa, dirígete a la sección "Crear Rifa" desde tu perfil. Allí deberás completar un formulario con la información del premio, fechas, precio de los boletos y otros detalles importantes. Nuestro equipo revisará tu solicitud antes de publicarla.'
    },
    {
      id: 5,
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Actualmente aceptamos pagos con tarjetas de crédito/débito (Visa, Mastercard, American Express), PayPal y transferencias bancarias. Todos los pagos se procesan de manera segura a través de Stripe, nuestra plataforma de pagos encriptada.'
    },
    {
      id: 6,
      question: '¿Qué hago si tengo problemas técnicos?',
      answer: 'Si experimentas problemas técnicos, primero intenta actualizar la página o usar un navegador diferente. Si el problema persiste, contacta a nuestro equipo de soporte técnico con detalles específicos sobre el error, incluyendo capturas de pantalla si es posible.'
    },
  ];
  
  // Manejo del acordeón para FAQs
  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };
  
  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert('Mensaje enviado con éxito. Nuestro equipo se pondrá en contacto contigo pronto.');
    // Resetear formulario
    setFormData({
      name: '',
      email: '',
      subject: 'Soporte General',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Header de la página */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl overflow-hidden relative py-20">
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-300 opacity-20 rounded-full translate-y-1/2 -translate-x-1/3"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-block bg-blue-400/30 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-4">
            Estamos aquí para ayudarte
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Centro de <span className="text-yellow-300">Ayuda</span>
          </h1>
          <p className="max-w-2xl mx-auto text-blue-100 text-lg">
            Encuentra respuestas a tus preguntas y obtén el soporte que necesitas para aprovechar al máximo TuRifa.
          </p>
        </div>
      </div>

      {/* Buscador de ayuda */}
      <div className="container mx-auto px-6 pt-10 pb-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full py-4 pl-12 pr-4 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Busca en nuestras preguntas frecuentes..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda: FAQs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaQuestion className="text-blue-600 mr-3" />
                  Preguntas Frecuentes
                </h2>
                
                <div className="space-y-4">
                  {faqData.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 text-left transition"
                        onClick={() => toggleAccordion(faq.id)}
                      >
                        <span className="font-medium text-gray-800">{faq.question}</span>
                        {activeAccordion === faq.id ? (
                          <FaChevronUp className="text-blue-600" />
                        ) : (
                          <FaChevronDown className="text-blue-600" />
                        )}
                      </button>
                      
                      {activeAccordion === faq.id && (
                        <div className="p-4 bg-white border-t border-gray-100">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Recursos adicionales */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recursos Adicionales</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="#" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition group">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <FaFile className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 group-hover:text-blue-700 transition">Guía de Usuario</h3>
                      <p className="text-sm text-gray-500">Manual completo de uso de la plataforma</p>
                    </div>
                    <FaExternalLinkAlt className="ml-auto text-gray-400 group-hover:text-blue-600" />
                  </a>
                  
                  <a href="#" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition group">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <FaVideo className="text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 group-hover:text-blue-700 transition">Tutoriales</h3>
                      <p className="text-sm text-gray-500">Videos paso a paso para usar TuRifa</p>
                    </div>
                    <FaExternalLinkAlt className="ml-auto text-gray-400 group-hover:text-blue-600" />
                  </a>
                  
                  <a href="#" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition group">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <FaTicketAlt className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 group-hover:text-blue-700 transition">Estado de Tickets</h3>
                      <p className="text-sm text-gray-500">Revisa el estado de tus solicitudes</p>
                    </div>
                    <FaExternalLinkAlt className="ml-auto text-gray-400 group-hover:text-blue-600" />
                  </a>
                  
                  <a href="#" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition group">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <FaComments className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 group-hover:text-blue-700 transition">Comunidad</h3>
                      <p className="text-sm text-gray-500">Foro de usuarios y preguntas</p>
                    </div>
                    <FaExternalLinkAlt className="ml-auto text-gray-400 group-hover:text-blue-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Columna derecha: Formulario de contacto */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaHeadset className="text-blue-600 mr-3" />
                  Contáctanos
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="subject">
                      Tema de ayuda
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      {supportTopics.map((topic, index) => (
                        <option key={index} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="message">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe tu problema o pregunta..."
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition"
                  >
                    Enviar mensaje
                  </button>
                </form>
                
                {/* Información de contacto alternativa */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">Otras formas de contacto</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-4">
                        <FaEnvelope className="text-blue-600" />
                      </div>
                      <a href="mailto:soporte@turifa.com" className="text-gray-600 hover:text-blue-700 transition">
                        soporte@turifa.com
                      </a>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-4">
                        <FaPhone className="text-blue-600" />
                      </div>
                      <a href="tel:+1234567890" className="text-gray-600 hover:text-blue-700 transition">
                        +123 456 7890
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Horario de atención */}
            <div className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg overflow-hidden text-white p-6">
              <h3 className="font-bold text-xl mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Horario de atención
              </h3>
              <div className="space-y-2 text-blue-100">
                <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                <p>Sábados: 10:00 AM - 2:00 PM</p>
                <p>Domingos y festivos: Cerrado</p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
