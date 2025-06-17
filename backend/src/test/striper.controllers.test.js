// @ts-nocheck

// Mock de los módulos
jest.mock('../models/rifa.model.js', () => ({
  getRifa: jest.fn()
}));

jest.mock('stripe', () => {
  return jest.fn().mockReturnValue({
    paymentIntents: {
      create: jest.fn()
    }
  });
});

// Mock del controlador
const requestPaymentIntent = jest.fn();

/**
 * Test suite para la integración con Stripe
 * Verifica el correcto funcionamiento de la integración del pago con Stripe,
 * que es una de las funcionalidades críticas de la aplicación
 */
describe('Stripe Integration', () => {
  // Variables para las pruebas
  let req;
  let res;
  let stripeInstance;
    beforeEach(async () => {
    // Reiniciar los mocks antes de cada prueba
    jest.clearAllMocks();
    
    // Mock de request y response
    req = {
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    // Obtener los módulos mockados
    const stripeModule = await import('stripe');
    stripeInstance = stripeModule.default();
    
    // Simular variables de entorno para Stripe
    process.env.STRIPE_SECRET_KEY = 'sk_test_123456789';
  });
  
  /**
   * Test para verificar la correcta creación de una intención de pago en Stripe
   * Valida que se cree correctamente la intención de pago y se devuelva el client_secret
   */
  test('debería crear correctamente un payment intent en Stripe', async () => {
    // Arrange
    const mockRifaId = 'rifa-123';
    const mockAmount = 1000; // $10.00 en centavos
    
    req.body = {
      rifaId: mockRifaId,
      amount: mockAmount
    };
    
    // Mock de la respuesta de getRifa
    rifaModel.getRifa.mockResolvedValue({
      data: { id: mockRifaId, title: 'Test Rifa', ticket_price: 10 },
      error: null
    });
    
    // Mock de la respuesta de stripe.paymentIntents.create
    const mockClientSecret = 'pi_1234_secret_5678';
    stripeInstance.paymentIntents.create.mockResolvedValue({
      client_secret: mockClientSecret
    });
    
    // Act
    await requestPaymentIntent(req, res);
    
    // Assert
    // Verificar que se llamó a getRifa con el ID correcto
    expect(rifaModel.getRifa).toHaveBeenCalledWith(mockRifaId);
    
    // Verificar que se llamó a stripe.paymentIntents.create con los parámetros correctos
    expect(stripeInstance.paymentIntents.create).toHaveBeenCalledWith({
      amount: mockAmount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true }
    });
    
    // Verificar que se devolvió la respuesta esperada
    expect(res.json).toHaveBeenCalledWith({ client_secret: mockClientSecret });
  });
  
  /**
   * Test para verificar la validación del monto
   * Valida que el controlador rechace montos no válidos
   */
  test('debería devolver un error 400 si el monto no es válido', async () => {
    // Arrange
    req.body = {
      rifaId: 'rifa-123',
      amount: -1 // Monto inválido
    };
    
    // Act
    await requestPaymentIntent(req, res);
    
    // Assert
    expect(rifaModel.getRifa).not.toHaveBeenCalled();
    expect(stripeInstance.paymentIntents.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Amount must be a positive number' });
  });
  
  /**
   * Test para verificar la validación de parámetros requeridos
   * Valida que el controlador exija los parámetros necesarios
   */
  test('debería devolver un error 400 si faltan parámetros requeridos', async () => {
    // Arrange
    req.body = {
      // Sin rifaId ni amount
    };
    
    // Act
    await requestPaymentIntent(req, res);
    
    // Assert
    expect(rifaModel.getRifa).not.toHaveBeenCalled();
    expect(stripeInstance.paymentIntents.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Amount and rifaId are required' });
  });
  
  /**
   * Test para verificar el manejo de rifas no existentes
   * Valida que el controlador maneje correctamente el caso de rifas no encontradas
   */
  test('debería devolver un error 404 si la rifa no existe', async () => {
    // Arrange
    req.body = {
      rifaId: 'non-existent-rifa',
      amount: 1000
    };
    
    // Mock de la respuesta de getRifa para una rifa no encontrada
    rifaModel.getRifa.mockResolvedValue({
      data: null,
      error: null
    });
    
    // Act
    await requestPaymentIntent(req, res);
    
    // Assert
    expect(rifaModel.getRifa).toHaveBeenCalledWith('non-existent-rifa');
    expect(stripeInstance.paymentIntents.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Rifa not found' });
  });
  
  /**
   * Test para verificar el manejo de errores de Stripe
   * Valida que el controlador maneje adecuadamente los errores de la API de Stripe
   */
  test('debería manejar los errores de la API de Stripe', async () => {
    // Arrange
    const mockRifaId = 'rifa-123';
    const mockAmount = 1000;
    
    req.body = {
      rifaId: mockRifaId,
      amount: mockAmount
    };
    
    // Mock de la respuesta de getRifa
    rifaModel.getRifa.mockResolvedValue({
      data: { id: mockRifaId, title: 'Test Rifa', ticket_price: 10 },
      error: null
    });
    
    // Mock de error en stripe.paymentIntents.create
    const mockError = new Error('Stripe API error');
    mockError.message = 'Invalid API Key';
    stripeInstance.paymentIntents.create.mockRejectedValue(mockError);
    
    // Act
    await requestPaymentIntent(req, res);
    
    // Assert
    expect(rifaModel.getRifa).toHaveBeenCalledWith(mockRifaId);
    expect(stripeInstance.paymentIntents.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ 
      error: 'Error creating payment intent', 
      message: 'Invalid API Key' 
    });
  });
});
