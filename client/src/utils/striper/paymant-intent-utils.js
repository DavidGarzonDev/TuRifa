import axios from "axios"


export const paymentIntent = async (cartTotal, rifaId) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/pay`, {
            amount: cartTotal*100,
            rifaId: rifaId
         });

        if (response.status !== 200) {
            throw new Error("Failed to create payment intent");
        }

        const { client_secret : clientSecret } = response.data;
        return clientSecret;

    } catch (error) {
        // Error en payment intent se lanza para manejo en el componente llamador
        throw error;
    }
}

