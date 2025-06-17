import { useEffect } from 'react'
import { getAllRifas } from '../../api/rifa';
import { useState } from 'react';
import  CardRifa  from '../../pages/inicio/components/CardRifa.jsx';


const RifasAll = () => {
    const [rifas, setRifas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRifas = async () => {
            try {
                setLoading(true);
                const response = await getAllRifas();
                setRifas(response.data.rifas || []);
            } catch (err) {
                console.error("Error al obtener rifas:", err);
                setError("No se pudieron cargar las rifas. Intenta de nuevo más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchRifas();
    }, []);


    return (
        <div className="font-sans min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto mb-10 px-6">
                    <div className="text-center mb-12">
                        <span className="bg-yellow-100 text-yellow-700 text-sm font-medium py-1 px-3 rounded-full">Oportunidades</span>
                        <h3 className="font-bold text-3xl mb-3 mt-3 text-gray-900">
                            Rifas Disponibles
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Explora las rifas activas y encuentra la que más te guste. ¡No pierdas la oportunidad de ganar!
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-16">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-5 rounded-lg shadow-md mb-8 max-w-xl mx-auto">
                            <div className="flex items-center">
                                <div className="py-1 mr-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold">No se pudieron cargar las rifas</p>
                                    <p className="text-sm">{error}</p>
                                </div>
                            </div>
                        </div>
                    ) : rifas.length === 0 ? (
                        <div className="text-center py-16 bg-gray-50 rounded-2xl shadow-inner max-w-3xl mx-auto">
                            <FaTicketAlt className="text-5xl mx-auto mb-4 text-blue-300 opacity-70" />
                            <h4 className="text-xl font-semibold text-gray-700 mb-2">No hay rifas disponibles</h4>
                            <p className="text-gray-500">Actualmente no hay rifas disponibles en la plataforma.</p>
                            <p className="mt-2 text-gray-500">¡Vuelve pronto para ver nuevas rifas o crea la tuya!</p>
                            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                Crear una rifa
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {rifas.map((rifa, index) => (
                                <CardRifa
                                    key={rifa.id || index}
                                    rifa={rifa}
                                   
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default RifasAll