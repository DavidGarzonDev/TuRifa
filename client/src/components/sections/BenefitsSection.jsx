import React from "react";
import { FaRegLightbulb, FaLock, FaStar } from "react-icons/fa";

const BenefitsSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="bg-blue-100 text-blue-700 text-sm font-medium py-1 px-3 rounded-full">Ventajas</span>
          <h3 className="font-bold text-3xl mb-3 mt-3 text-gray-900">
            ¿Por qué elegir TuRifa?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestra plataforma ofrece múltiples beneficios para crear y participar en rifas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="bg-blue-100 rounded-lg p-4 inline-block mb-4">
              <FaRegLightbulb className="text-blue-600 text-2xl" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Fácil de usar</h4>
            <p className="text-gray-600">Participa desde tu celular o computadora. Interfaz intuitiva y amigable.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="bg-green-100 rounded-lg p-4 inline-block mb-4">
              <FaLock className="text-green-600 text-2xl" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Pagos seguros</h4>
            <p className="text-gray-600">Todas las transacciones son seguras y transparentes. Pagos garantizados.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="bg-purple-100 rounded-lg p-4 inline-block mb-4">
              <FaStar className="text-purple-600 text-2xl" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Sorteos verificables</h4>
            <p className="text-gray-600">Todos los sorteos son transparentes y verificables para mayor confianza.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;