import axios from "axios"


export const paymentIntent = async (cartTotal, rifaId) => {
    try {
        const response = await axios.post(import.meta.env.VITE_API_PAYMENT_INTENT, {
            amount: cartTotal*100,
            rifaId: rifaId
         });

        if (response.status !== 200) {
            throw new Error("Failed to create payment intent");
        }

        console.log("Respuesta recibida:", response.data);
        const { client_secret : clientSecret } = response.data;
        return clientSecret;

    } catch (error) {
        console.error("Error creating payment intent:", error);
        throw error;
    }
}

