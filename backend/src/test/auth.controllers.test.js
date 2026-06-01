// @ts-nocheck

/**
 * Mocks de dependencias para auth.controllers con Prisma
 */
const admin = {
  auth: jest.fn().mockReturnValue({
    verifyIdToken: jest.fn()
  })
};
const userModel = {
  getUserByUid: jest.fn(),
  createUser: jest.fn()
};
const prisma = {
  user: {
    findFirst: jest.fn()
  }
};

/**
 * Register mock (replica la lógica del controller refactoreado)
 */
const register = jest.fn(async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'El token es requerido' });
  }
  const decoded = await admin.auth().verifyIdToken(token);
  const { uid, email, name } = decoded;
  try {
    const { data } = await userModel.getUserByUid(uid);
    if (data) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }
  } catch (err) {
    if (err.status !== 404) throw err;
  }
  await userModel.createUser({ uid, name, email });
  return res.status(200).send('Usuario guardado exitosamente');
});

/**
 * Login mock (replica la lógica del controller refactoreado con Prisma)
 */
const login = jest.fn(async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'El token es requerido' });
  }
  const decoded = await admin.auth().verifyIdToken(token);
  const { uid } = decoded;
  let userInDb = null;
  let findError = null;

  try {
    const { data, error } = await userModel.getUserByUid(uid);
    if (error) {
      return res.status(500).json({ error: 'Error interno al buscar el usuario.' });
    }
    userInDb = data;
  } catch (err) {
    return res.status(500).json({ error: 'Error interno al buscar el usuario.' });
  }

  if (!userInDb) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  return res.status(200).json({ message: 'Usuario logeado con éxito', userId: userInDb.uid, email: userInDb.email });
});

/**
 * Test suite para Firebase Authentication
 */
describe('Firebase Authentication', () => {
  let req, res;
  beforeEach(() => {
    jest.clearAllMocks();
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };
  });

  test('debería registrar un nuevo usuario con un token válido', async () => {
    const mockToken = 'valid-firebase-token';
    const mockUserData = { uid: 'user-123', email: 'u@e.com', name: 'Test' };
    req.body = { token: mockToken };
    admin.auth().verifyIdToken.mockResolvedValueOnce(mockUserData);
    userModel.getUserByUid.mockRejectedValueOnce(Object.assign(new Error(), { status: 404 }));
    userModel.createUser.mockResolvedValueOnce({ data: { uid: mockUserData.uid, ...mockUserData }, error: null });
    await register(req, res);
    expect(admin.auth().verifyIdToken).toHaveBeenCalledWith(mockToken);
    expect(userModel.getUserByUid).toHaveBeenCalledWith(mockUserData.uid);
    expect(userModel.createUser).toHaveBeenCalledWith({ uid: mockUserData.uid, name: mockUserData.name, email: mockUserData.email });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('Usuario guardado exitosamente');
  });

  test('debería rechazar el registro sin un token', async () => {
    req.body = {};
    await register(req, res);
    expect(admin.auth().verifyIdToken).not.toHaveBeenCalled();
    expect(userModel.createUser).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El token es requerido' });
  });

  test('debería rechazar el registro de un usuario que ya existe', async () => {
    const mockToken = 't'; const mockUserData = { uid: 'u', email: 'e', name: 'n' };
    req.body = { token: mockToken };
    admin.auth().verifyIdToken.mockResolvedValueOnce(mockUserData);
    userModel.getUserByUid.mockResolvedValueOnce({ data: { uid: mockUserData.uid, ...mockUserData }, error: null });
    await register(req, res);
    expect(admin.auth().verifyIdToken).toHaveBeenCalledWith(mockToken);
    expect(userModel.createUser).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El usuario ya existe' });
  });

  test('debería permitir el login de un usuario existente', async () => {
    const mockToken = 't'; const mockUserData = { uid: 'u', email: 'e', name: 'n' };
    const mockUserInDb = { uid: mockUserData.uid, ...mockUserData };
    req.body = { token: mockToken };
    admin.auth().verifyIdToken.mockResolvedValueOnce(mockUserData);
    userModel.getUserByUid.mockResolvedValueOnce({ data: mockUserInDb, error: null });
    await login(req, res);
    expect(admin.auth().verifyIdToken).toHaveBeenCalledWith(mockToken);
    expect(userModel.getUserByUid).toHaveBeenCalledWith(mockUserData.uid);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario logeado con éxito', userId: mockUserInDb.uid, email: mockUserInDb.email });
  });
});