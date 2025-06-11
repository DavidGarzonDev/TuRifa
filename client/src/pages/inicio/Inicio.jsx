import React from "react";
import { FaTicketAlt, FaGift, FaCoins } from "react-icons/fa";
import CardRifa from "./components/CardRifa";

const Inicio = () => {
  return (
    <div className="font-sans bg-gray-100 min-h-screen px-4 md:px-0">
      
      <section className="bg-radial from-blue-600 from-40% to-blue-800 text-white shadow-lg mb-10 flex flex-col md:flex-row items-stretch min-h-[260px]">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-4 md:px-0">
          <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-8 py-8">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4 text-center md:text-left">
              ¡Gana increibles
              <br />
              premios con solo
              <br />
              un click!
            </h1>
            <p className="mt-2 text-base md:text-lg text-blue-100 font-normal text-center md:text-left">
              Crea o participa en rifas de manera <br /> segura, rápida y
              transparente.
            </p>
          </div>
          
          <div className="relative w-full md:w-1/2 flex items-center justify-center my-8 md:my-0">
            <img
              className="max-w-full h-auto object-contain"
              src="/image/gift.png"
              alt="Premio de rifa"
            />
          </div>
        </div>
      </section>
      

      {/* How it works */}
      <section className="max-w-4xl mx-auto mb-10 px-4 md:px-0">
        <h2 className="text-center font-bold text-2xl mb-8 text-gray-900">
          ¿Como funciona?
        </h2>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1 text-center">
            <div className="bg-blue-100 rounded-full w-40 h-40 mx-auto flex relative items-center justify-center">
              <FaTicketAlt className="ms-6 rotate-160 mt-2 text-blue-900 text-2xl size-15" />
              <FaTicketAlt className="absolute mb-2 rotate-130 text-blue-700 text-2xl size-15" />
            </div>
            <div className="font-semibold mt-3 text-base">
              Crea o únete a una rifa
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="bg-blue-100 rounded-full w-40 h-40 mx-auto flex items-center justify-center">
              <FaTicketAlt className="text-blue-700 text-2xl size-15" />
            </div>
            <div className="font-semibold mt-3 text-base">Compra tus rifas</div>
          </div>
          <div className="flex-1 text-center">
            <div className="bg-blue-100 rounded-full w-40 h-40 mx-auto flex items-center justify-center">
              <FaGift className="text-blue-700 text-2xl size-15" />
            </div>
            <div className="font-semibold mt-3 text-base">
              Espera el sorteo y gana
            </div>
          </div>
        </div>
      </section>

      {/* Rifas Section */}
      <section className="max-w-4xl mx-auto mb-10 px-4 md:px-0">
        <h3 className="font-bold text-xl mb-5 text-gray-900 text-center">
          Rifas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CardRifa
            premio="Premio en efectivo"
            img="image/gift.png"
            icon={<FaCoins className="text-yellow-400 text-4xl mb-2 mx-auto" />}
          />
          <CardRifa
            premio="Premio en efectivo"
            img="image/gift.png"
            icon={<FaCoins className="text-yellow-400 text-4xl mb-2 mx-auto" />}
          />
        </div>
      </section>

      {/* Footer-like info */}
      <section className="max-w-4xl mx-auto mb-8 px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 ms-4 text-base font-medium">
            ¡Muy Fácil de usar y ganar!
            <br />
            Participa desde tu celular o computadora.
          </div>
          <div className="font-bold me-4 text-base text-gray-900 text-right">
            Pagos garantizados
            <br />y Sorteos verificables
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
