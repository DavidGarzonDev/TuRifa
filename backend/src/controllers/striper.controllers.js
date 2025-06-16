import dotenv from 'dotenv';
import  stripe from 'stripe';
import { getRifa } from '../models/rifa.model.js';

dotenv.config();

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

export const requestPaymentIntent = async (req, res) => {
    const  { amount, rifaId }  = req.body;

    if (!amount || !rifaId) {
        return res.status(400).json({ error: 'Amount and rifaId are required' });
    }

    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    const rifa = await getRifa(rifaId);

    if (!rifa || !rifa.data) {
        return res.status(404).json({ error: 'Rifa not found' });
    }    
    
    try {
      const intent = await stripeClient.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        automatic_payment_methods: {enabled: true},
      })

      res.json({ client_secret: intent.client_secret });
    } catch (error) {
      console.log(error);
      // Enviar respuesta de error al cliente para que no se quede esperando
      res.status(500).json({ error: 'Error creating payment intent', message: error.message });
    }

}