import React from "react";
import { FaChevronRight, FaLock, FaTicketAlt, FaTrophy } from "react-icons/fa";

const FooterSection = () => {
  return (
    <section className="max-w-5xl mx-auto my-12 px-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center p-8 md:p-10">
          <div className="text-white mb-6 md:mb-0">
            <h4 className="font-bold text-2xl mb-3">¡Muy Fácil de usar y ganar!</h4>
            <p className="text-blue-100">
              Participa desde tu celular o computadora.<br/>
              En cualquier lugar, en cualquier momento.
            </p>
            <button className="mt-4 bg-white text-indigo-700 hover:bg-blue-100 px-6 py-2 rounded-lg font-medium transition-colors inline-flex items-center">
              Comenzar ahora
              <FaChevronRight className="ml-2" />
            </button>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white border border-white/30">
            <h4 className="font-bold text-xl mb-2 text-white">Pagos garantizados</h4>
            <p className="text-blue-50">y Sorteos verificables</p>
            <div className="flex mt-4 space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaLock className="text-white" />
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaTicketAlt className="text-white" />
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaTrophy className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;