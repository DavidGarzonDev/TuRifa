import React from 'react';
import useAuthStore from "../../store/auth-store/use-auth-store";

const Home = () => {
  const { useLooged } = useAuthStore();

  return (
    <div className="min-h-screen bg-blue-900 text-white flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenido {useLooged ? useLooged.displayName : ""}
        </h1>
        <p className="text-blue-200 mb-6">
          Gestiona tus rifas o crea una nueva para comenzar.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300">
          Crear Rifa
        </button>
      </div>
    </div>
  );
};

export default Home;
