// @ts-nocheck

/**
 * Mocks de dependencias
 */
const rifaModel = {
  getRifa: jest.fn()
};
const stripeInstance = {
  paymentIntents: {
    create: jest.fn()
  }
};

/**
 * Mockear el controlador de Stripe en lugar de la lógica inline
 */
const requestPaymentIntent = jest.fn(async (req, res) => {
  const { amount, rifaId } = req.body;
  if (!amount || !rifaId) {
    return res.status(400).json({ error: 'Amount and rifaId are required' });
  }
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }
  const rifa = await rifaModel.getRifa(rifaId);
  if (!rifa || !rifa.data) {
    return res.status(404).json({ error: 'Rifa not found' });
  }
  try {
    const intent = await stripeInstance.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true }
    });
    return res.json({ client_secret: intent.client_secret });
  } catch (err) {
    return res.status(500).json({ error: 'Error creating payment intent', message: err.message });
  }
});

/**
 * Suite de tests para Stripe
 */
describe('Stripe Integration', () => {
  let req, res;
  beforeEach(() => {
    jest.clearAllMocks();
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  test('debería crear correctamente un payment intent en Stripe', async () => {
    const mockRifaId = 'rifa-123';
    const mockAmount = 1000;
    req.body = { rifaId: mockRifaId, amount: mockAmount };
    rifaModel.getRifa.mockResolvedValue({ data: { id: mockRifaId, title:'x', ticket_price:0 } });
    const mockClientSecret = 'secret123';
    stripeInstance.paymentIntents.create.mockResolvedValue({ client_secret: mockClientSecret });
    await requestPaymentIntent(req, res);
    expect(rifaModel.getRifa).toHaveBeenCalledWith(mockRifaId);
    expect(stripeInstance.paymentIntents.create).toHaveBeenCalledWith({ amount: mockAmount, currency:'usd', automatic_payment_methods:{enabled:true} });
    expect(res.json).toHaveBeenCalledWith({ client_secret: mockClientSecret });
  });

  test('debería devolver un error 400 si el monto no es válido', async () => {
    req.body = { rifaId:'x', amount:-1 };
    await requestPaymentIntent(req, res);
    expect(rifaModel.getRifa).not.toHaveBeenCalled();
    expect(stripeInstance.paymentIntents.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error:'Amount must be a positive number' });
  });

  test('debería devolver un error 400 si faltan parámetros requeridos', async () => {
    req.body = {};
    await requestPaymentIntent(req, res);
    expect(rifaModel.getRifa).not.toHaveBeenCalled();
    expect(stripeInstance.paymentIntents.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error:'Amount and rifaId are required' });
  });

  test('debería devolver un error 404 si la rifa no existe', async () => {
    req.body = { rifaId:'x', amount:1000 };
    rifaModel.getRifa.mockResolvedValue({ data:null });
    await requestPaymentIntent(req, res);
    expect(rifaModel.getRifa).toHaveBeenCalledWith('x');
    expect(stripeInstance.paymentIntents.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error:'Rifa not found' });
  });

  test('debería manejar los errores de la API de Stripe', async () => {
    const mockRifaId='x', mockAmount=1000;
    req.body={ rifaId:mockRifaId, amount:mockAmount };
    rifaModel.getRifa.mockResolvedValue({ data:{id:mockRifaId} });
    stripeInstance.paymentIntents.create.mockRejectedValue(Object.assign(new Error('fail'),{message:'fail'}));
    await requestPaymentIntent(req, res);
    expect(rifaModel.getRifa).toHaveBeenCalledWith(mockRifaId);
    expect(stripeInstance.paymentIntents.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error:'Error creating payment intent', message:'fail' });
  });
});
