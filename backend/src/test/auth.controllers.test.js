// @ts-nocheck
// Mocks para los tests de autenticación utilizando ESM

const userModel = {
  createUser: jest.fn(),
  getUserByUid: jest.fn()
};

const admin = {
  auth: jest.fn().mockReturnValue({
    verifyIdToken: jest.fn()
  })
};

const supabase = {
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  maybeSingle: jest.fn()
};

// Mock de los controladores
const register = jest.fn();
const login = jest.fn();

// Mock de los módulos usando ESM
jest.mock('../models/user.model.js', () => ({
  __esModule: true,
  default: userModel
}));
jest.mock('../firebase.js', () => ({
  __esModule: true,
  default: admin
}));
jest.mock('../db.js', () => ({
  __esModule: true,
  supabase
}));
jest.mock('../controllers/auth.controllers.js', () => ({
  __esModule: true,
  register, 
  login
}));

/**
 * Test suite para la autenticación con Firebase
 * Verifica el correcto funcionamiento de la integración con Firebase,
 * esencial para la seguridad de la aplicación
 */
describe('Firebase Authentication', () => {
  // Variables para las pruebas
  let req;
  let res;
  
  beforeEach(() => {
    // Reiniciar los mocks antes de cada prueba
    jest.clearAllMocks();
    
    // Mock de request y response
    req = {
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });
  
  /**
   * Test para verificar el registro exitoso de un usuario
   * Valida que se cree correctamente un usuario tras verificar el token de Firebase
   */
  test('debería registrar un nuevo usuario con un token válido', async () => {
    // Arrange
    const mockToken = 'valid-firebase-token';
    const mockUserData = {
      uid: 'user-123',
      email: 'test@example.com',
      name: 'Test User'
    };
    
    req.body = { token: mockToken };
    
    // Mock de la verificación del token de Firebase
    admin.auth().verifyIdToken.mockResolvedValue(mockUserData);
    
    // Mock para getUserByUid (usuario no encontrado)
    userModel.getUserByUid.mockRejectedValue({ status: 406 });
    
    // Mock para createUser
    userModel.createUser.mockResolvedValue({ 
      data: [{ id: 1, ...mockUserData }], 
      error: null 
    });
    
    // Act
    await register(req, res);
    
    // Assert
    expect(admin.auth().verifyIdToken).toHaveBeenCalledWith(mockToken);
    expect(userModel.getUserByUid).toHaveBeenCalledWith(mockUserData.uid);
    expect(userModel.createUser).toHaveBeenCalledWith({
      uid: mockUserData.uid,
      name: mockUserData.name,
      email: mockUserData.email
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('Usuario guardado exitosamente');
  });
  
  /**
   * Test para verificar que se rechaza el registro sin un token
   * Valida que el controlador exija un token de Firebase válido
   */
  test('debería rechazar el registro sin un token', async () => {
    // Arrange
    req.body = {}; // Sin token
    
    // Act
    await register(req, res);
    
    // Assert
    expect(admin.auth().verifyIdToken).not.toHaveBeenCalled();
    expect(userModel.createUser).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El token es requerido' });
  });
  
  /**
   * Test para verificar el manejo de usuarios duplicados
   * Valida que el controlador rechace registros duplicados
   */
  test('debería rechazar el registro de un usuario que ya existe', async () => {
    // Arrange
    const mockToken = 'valid-firebase-token';
    const mockUserData = {
      uid: 'user-123',
      email: 'test@example.com',
      name: 'Test User'
    };
    
    req.body = { token: mockToken };
    
    // Mock de la verificación del token de Firebase
    admin.auth().verifyIdToken.mockResolvedValue(mockUserData);
    
    // Mock para getUserByUid (usuario encontrado)
    userModel.getUserByUid.mockResolvedValue({ 
      data: { id: 1, ...mockUserData },
      error: null
    });
    
    // Act
    await register(req, res);
    
    // Assert
    expect(admin.auth().verifyIdToken).toHaveBeenCalledWith(mockToken);
    expect(userModel.getUserByUid).toHaveBeenCalledWith(mockUserData.uid);
    expect(userModel.createUser).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El usuario ya existe' });
  });
  
  /**
   * Test para verificar el login exitoso de un usuario existente
   * Valida que el controlador permita el acceso a usuarios registrados
   */
  test('debería permitir el login de un usuario existente', async () => {
    // Arrange
    const mockToken = 'valid-firebase-token';
    const mockUserData = {
      uid: 'user-123',
      email: 'test@example.com',
      name: 'Test User'
    };
    const mockUserInDb = {
      id: 1,
      ...mockUserData
    };
    
    req.body = { token: mockToken };
    
    // Mock de la verificación del token de Firebase
    admin.auth().verifyIdToken.mockResolvedValue(mockUserData);
    
    // Mock para la consulta en Supabase
    supabase.from().select().eq().maybeSingle.mockResolvedValue({
      data: mockUserInDb,
      error: null
    });
    
    // Act
    await login(req, res);
    
    // Assert
    expect(admin.auth().verifyIdToken).toHaveBeenCalledWith(mockToken);
    expect(supabase.from).toHaveBeenCalledWith('users');
    expect(supabase.select).toHaveBeenCalled();
    expect(supabase.eq).toHaveBeenCalledWith('uid', mockUserData.uid);
    expect(supabase.maybeSingle).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Usuario logeado con éxito',
      userId: mockUserInDb.id,
      email: mockUserInDb.email
    });
  });
  
});
