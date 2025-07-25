import { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { decrementRifaTicket } from '../../../api/rifa'
import useAuthStore from '../../../store/auth-store/use-auth-store'
import { createTicket } from '../../../api/ticket'

async function UpdateRifa(rifaid, amount) {
    try {
     const response = await decrementRifaTicket(rifaid, amount);
     if (response.status === 200) {
        console.log("Boleto decrementado con éxito");
        return { success: true, data: response.data };
     }
     return { success: false, error: "Error desconocido" };
    } catch (error) {
        console.error("Error al decrementar el boleto:", error);
        return { success: false, error: error.message };
    }
}

async function CreateTicket(rifaId, userId, price, methodPago, idPago = null) {
    try {
        const buyDate = new Date().toISOString();
        
        const expireDate = new Date();
        expireDate.setFullYear(expireDate.getFullYear() + 1);
        
        const ticketData = {
            rifaId,
            userId,
            buyDate,
            expireDate: expireDate.toISOString(),
            status: 'active',
            idPago: idPago || 'stripe-' + Date.now(),
            price: price,
            methodPago: methodPago
        };
        
        const response = await createTicket(ticketData);
        
        if (response.status === 201 || response.status === 200) {
            return { success: true, data: response.data };
        } else {
            console.error("Error al crear el ticket:", response);
            return { success: false, error: "Error al crear el ticket" };
        }
    } catch (error) {
        console.error("Error en la creación del ticket:", error);
        return { success: false, error: error.message };
    }
}

const CheckoutForm = ({ setShowPaymentForm, ticketPrice, rifaId, amountTickets }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('')
  const { useLooged } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!stripe || !elements) {
      return
    }
    
    setLoading(true)
    setPaymentStatus('Procesando tu pago...')
    
    try {
      const result = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          return_url: window.location.origin + '/pago-exitoso',
        },
      })
      
      if (result.error) {
        setPaymentStatus(`Error: ${result.error.message}`)
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        setPaymentStatus('¡Pago completado con éxito! Tu boleto ha sido registrado.')
        try {
            
            const amount = amountTickets; 
            const updateResult = await UpdateRifa(rifaId, amount);
            
            if (!updateResult.success) {
                setPaymentStatus(`Pago exitoso, pero hubo un problema al actualizar el inventario: ${updateResult.error}`);
                return;
            }

            if (useLooged && useLooged.uid) {
                const ticketResult = await CreateTicket(
                    rifaId,
                    useLooged.uid,
                    ticketPrice,
                    'stripe',
                    result.paymentIntent.id
                );
                
                if (!ticketResult.success) {
                    setPaymentStatus(`Pago exitoso, inventario actualizado, pero hubo un problema al registrar el boleto: ${ticketResult.error}`);
                }
            } else {
                setPaymentStatus('Pago exitoso, pero no se pudo registrar el boleto: usuario no autenticado');
            }
        } catch (error) {
            setPaymentStatus(`Error al finalizar el proceso: ${error.message}`)
        }
      }
    } catch (error) {
      setPaymentStatus(`Error inesperado: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow-lg border border-indigo-100">
      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
        <h3 className="text-lg font-bold text-gray-800">Formulario de pago</h3>
        <button 
          type="button" 
          onClick={() => setShowPaymentForm(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-indigo-50 p-4 rounded-md">
          <p className="text-sm text-indigo-700">
            Vas a comprar un boleto por <span className="font-bold">${ticketPrice}</span>
          </p>
        </div>
        
        <div className="border rounded-md p-4">
          <PaymentElement />
        </div>
        
        {paymentStatus && (
          <div className={`p-3 rounded-md ${
            paymentStatus.includes('Error') 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : paymentStatus.includes('éxito') 
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            {paymentStatus}
          </div>
        )}
        
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full ${
            loading
              ? 'bg-gray-400'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
          } text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <span>Pagar ahora</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default CheckoutForm