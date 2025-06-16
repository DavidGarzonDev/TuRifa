import React from 'react'
import { useParams } from 'react-router-dom'

const BuyTicket = () => {
  const { rifaId } = useParams()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Detalles de la rifa - 3 columnas */}
          <section className="lg:col-span-3 bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-100">
            <div className="relative h-48 bg-indigo-600">
              <div className="absolute inset-0 bg-opacity-70 bg-indigo-800 flex items-center justify-center">
                <img src="/public/image/gift.png" alt="Premio" className="h-32 object-contain opacity-90" />
              </div>
              <div className="absolute top-4 right-4 bg-yellow-400 text-indigo-900 font-bold py-1 px-3 rounded-full text-sm">
                ¡Gran Premio!
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
                Detalles de la Rifa
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="prose prose-indigo">
                  <p className="text-gray-700 text-lg">
                    ¡Participa y gana increíbles premios! Esta rifa te brinda la oportunidad de ganar mientras apoyas una gran causa.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-indigo-50 p-4 rounded-xl">
                    <p className="text-sm text-indigo-600 font-medium">Boletos disponibles</p>
                    <p className="text-2xl font-bold text-indigo-800">100</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="text-sm text-green-600 font-medium">Precio por boleto</p>
                    <p className="text-2xl font-bold text-green-800">$10</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-xl">
                    <p className="text-sm text-amber-600 font-medium">Fecha del sorteo</p>
                    <p className="text-xl font-bold text-amber-800">31/12/2025</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <p className="text-sm text-purple-600 font-medium">Organizador</p>
                    <p className="text-xl font-bold text-purple-800">TuRifa</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      El ganador será notificado a través de correo electrónico y tendrá 5 días para reclamar su premio.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Formulario de pago - 2 columnas */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-100">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-4 px-6">
              <h2 className="text-xl font-bold text-white">Tu Compra</h2>
            </div>
            
            <form className="p-6 space-y-6">
              <div>
                <label htmlFor="quantity" className="block font-medium text-gray-700 mb-2">
                  Cantidad de boletos
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
                    </svg>
                  </span>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 py-3"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Máximo 10 boletos por persona</p>
              </div>

              <div className="space-y-3">
                <p className="font-medium text-gray-700">Método de pago</p>
                <div className="grid grid-cols-2 gap-3">
                  <label className="relative bg-white border rounded-lg border-gray-300 p-4 flex cursor-pointer focus:outline-none hover:bg-gray-50 transition-colors">
                    <input type="radio" name="paymentMethod" value="card" className="sr-only" defaultChecked />
                    <div className="flex items-center justify-center">
                      <span className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-600">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </span>
                      <span className="ml-2 font-medium text-gray-700">Tarjeta</span>
                    </div>
                    <div className="absolute -inset-px rounded-lg border-2 border-indigo-500 pointer-events-none" aria-hidden="true"></div>
                  </label>

                  <label className="relative bg-white border rounded-lg border-gray-300 p-4 flex cursor-pointer focus:outline-none hover:bg-gray-50 transition-colors">
                    <input type="radio" name="paymentMethod" value="paypal" className="sr-only" />
                    <div className="flex items-center justify-center">
                      <span className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <span className="ml-2 font-medium text-gray-700">PayPal</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>$10.00</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                  <span>Impuesto</span>
                  <span>$0.50</span>
                </div>
                <div className="flex justify-between items-center font-medium text-lg text-indigo-900 mt-4">
                  <span>Total a pagar</span>
                  <span>$10.50</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-lg shadow-md transition-all duration-200 transform hover:translate-y-0.5 flex items-center justify-center"
              >
                <span>Pagar ahora</span>
                <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="flex items-center justify-center space-x-2 mt-4 text-xs text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Pago 100% seguro</span>
              </div>
            </form>
          </section>
        </div>
        
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>¿Tienes alguna pregunta? Contáctanos en <span className="text-indigo-600">soporte@turifa.com</span></p>
        </div>
      </div>
    </div>
  )
}

export default BuyTicket
