import React from "react";
import { FaCoins } from "react-icons/fa";


const CardRifa = ({ premio, img, icon }) => {
  return (
    <div className="flex gap-8 justify-center mb-8">
      <div className="bg-white rounded-xl shadow-md p-7 min-w-[180px] text-center flex-1 max-w-xs">
        {icon}
        <div className="font-bold text-lg mb-2 text-gray-800">
          {premio}
        </div>
        <button className="bg-blue-700 hover:bg-blue-800 text-white rounded-md py-2 w-full font-bold text-base mt-2 transition">
          Participar
        </button>
      </div>
    </div>
  );
};

export default CardRifa;
