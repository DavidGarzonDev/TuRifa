// @ts-nocheck
/**
 * Pruebas simplificadas para la gestión de tickets
 * Estas pruebas verifican las operaciones básicas relacionadas con tickets
 */


// Mock de los módulos
jest.mock('../models/ticket.models.js', () => ({
  createTicket: jest.fn(),
  getAllTicketsModel: jest.fn(),
  getTicketsByRifaId: jest.fn()
}));

jest.mock('../firebase.js', () => ({
  default: {
    auth: jest.fn().mockReturnValue({
      verifyIdToken: jest.fn()
    })
  }
}));

/**
 * Pruebas para la gestión de tickets
 * Estas pruebas verifican el funcionamiento básico de la creación y consulta de tickets
 */
describe('Gestión de Tickets', () => {  /**
   * Prueba para la creación de tickets
   * Verifica la estructura básica del modelo de tickets
   */
  test('debería poder crear un ticket con la estructura correcta', async () => {
    // Datos de ejemplo para un ticket
    const ticketData = {
      rifaId: 1,
      userId: 'user-123',
      buyDate: '2025-06-17',
      expireDate: '2025-07-17',
      status: 'active',
      idPago: 'pi_123456789',
      price: 10,
      methodPago: 'stripe'
    };
    
    // Mock de request y response
    const req = {
      body: ticketData
    };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    // Importamos la función del controlador
    const { createTicket: createTicketController } = await import('../controllers/ticket.controllers.js');
    
    // Mock para createTicket desde el modelo importado
    const ticketModel = await import('../models/ticket.models.js');
    ticketModel.createTicket.mockResolvedValue({ data: { id: 1, ...ticketData }, error: null });
    
    // Llamamos al controlador
    await createTicketController(req, res);
    
    // Verificamos que se llamó a createTicket con los datos correctos
    expect(ticketModel.createTicket).toHaveBeenCalledWith(ticketData);
    
    // Verificamos que se devolvió el estado y los datos correctos
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ ticket: { id: 1, ...ticketData } });
  });
    /**
   * Prueba para el controlador createTicketController con datos incompletos
   * Verifica que el controlador maneje correctamente el caso de datos faltantes
   */
  test('createTicketController debe devolver error 400 si faltan datos', async () => {
    // Configuramos los datos de la solicitud sin rifaId
    const req = {
      body: {
        userId: 'user-123'
      }
    };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    // Importamos la función del controlador
    const { createTicket: createTicketController } = await import('../controllers/ticket.controllers.js');
    
    // Importamos el modelo para verificar que no se haya llamado
    const ticketModel = await import('../models/ticket.models.js');
    
    // Llamamos al controlador
    await createTicketController(req, res);
    
    // Verificamos que se devolvió el estado y mensaje de error correctos
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Datos de ticket incompletos' });
    expect(ticketModel.createTicket).not.toHaveBeenCalled();
  });
  
  /**
   * Prueba para el controlador getAllTickets
   * Verifica que el controlador obtenga los tickets de un usuario correctamente
   */
  test('getAllTickets debe obtener todos los tickets de un usuario específico', async () => {
    // Configuramos los datos de la solicitud
    req.body = {
      userId: {
        token: 'valid-token'
      }
    };
    
    // Mock para verifyIdToken
    const decodedToken = { uid: 'user-123' };
    admin.auth().verifyIdToken.mockResolvedValue(decodedToken);
    
    // Mock para getAllTicketsModel
    const userTickets = [
      { id: 1, id_rifa: 1, id_user: 'user-123', price: 10 },
      { id: 2, id_rifa: 2, id_user: 'user-123', price: 15 }
    ];
    ticketModel.getAllTicketsModel.mockResolvedValue({ data: userTickets, error: null });
    
    // Llamamos al controlador
    await getAllTickets(req, res);
    
    // Verificamos que se llamó a verifyIdToken con el token correcto
    expect(admin.auth().verifyIdToken).toHaveBeenCalledWith('valid-token');
    
    // Verificamos que se llamó a getAllTicketsModel con el uid correcto
    expect(ticketModel.getAllTicketsModel).toHaveBeenCalledWith(decodedToken.uid);
    
    // Verificamos que se devolvió el estado y los datos correctos
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ tickets: userTickets });
  });
  
  
  
});
