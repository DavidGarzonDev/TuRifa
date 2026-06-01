import React from "react";
import { FaTicketAlt, FaDollarSign, FaGift } from "react-icons/fa";

const HowItWorksSection = () => {
  return (
    <section className="max-w-5xl mx-auto mb-20 px-6">
      <div className="text-center mb-12">
        <span className="bg-blue-100 text-blue-700 text-sm font-medium py-1 px-3 rounded-full">Proceso Sencillo</span>
        <h2 className="text-center font-bold text-3xl mt-3 mb-4 text-gray-900">
          ¿Cómo funciona TuRifa?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Sigue estos sencillos pasos para comenzar a participar y ganar increíbles premios en nuestra plataforma.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-8 relative">
        {/* Line connector for desktop */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-200 hidden md:block" style={{transform: 'translateY(-50%)'}}></div>
        
        {/* Step 1 */}
        <div className="flex-1 text-center relative bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group z-10">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-full w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-blue-300 transition-shadow">
              <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
                <span className="text-blue-700 font-bold text-xl">1</span>
              </div>
            </div>
          </div>
          <div className="mt-10 mb-6">
            <div className="bg-blue-100 rounded-full w-32 h-32 mx-auto flex relative items-center justify-center overflow-hidden group-hover:bg-blue-200 transition-colors">
              <FaTicketAlt className="ms-6 rotate-160 mt-2 text-blue-700 text-2xl size-15 animate-pulse" />
              <FaTicketAlt className="absolute mb-2 rotate-130 text-blue-500 text-2xl size-15" />
            </div>
          </div>
          <h3 className="font-bold mt-3 text-lg text-gray-800">
            Crea o únete a una rifa
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Explora las rifas disponibles o crea la tuya propia para compartir con amigos.
          </p>
        </div>
        
        {/* Step 2 */}
        <div className="flex-1 text-center relative bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group z-10 mt-16 md:mt-0">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-indigo-300 transition-shadow">
              <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
                <span className="text-indigo-700 font-bold text-xl">2</span>
              </div>
            </div>
          </div>
          <div className="mt-10 mb-6">
            <div className="bg-indigo-100 rounded-full w-32 h-32 mx-auto flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
              <FaDollarSign className="text-indigo-700 text-4xl size-15" />
            </div>
          </div>
          <h3 className="font-bold mt-3 text-lg text-gray-800">
            Compra tus boletos
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Selecciona y paga de manera segura los boletos para las rifas que te interesan.
          </p>
        </div>
        
        {/* Step 3 */}
        <div className="flex-1 text-center relative bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group z-10 mt-16 md:mt-0">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-full w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-purple-300 transition-shadow">
              <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
                <span className="text-purple-700 font-bold text-xl">3</span>
              </div>
            </div>
          </div>
          <div className="mt-10 mb-6">
            <div className="bg-purple-100 rounded-full w-32 h-32 mx-auto flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <FaGift className="text-purple-700 text-4xl size-15" />
            </div>
          </div>
          <h3 className="font-bold mt-3 text-lg text-gray-800">
            ¡Espera y gana!
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Recibe notificaciones sobre el sorteo y prepárate para ganar increíbles premios.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;