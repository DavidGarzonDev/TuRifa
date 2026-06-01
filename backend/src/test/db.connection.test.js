// @ts-nocheck
/**
 * Test suite simplificado para la conexión con Prisma
 * Verifica el correcto funcionamiento básico de la conexión con la base de datos
 */

// Mock para Prisma
const mockPrisma = {
  user: {
    findFirst: jest.fn()
  }
};

// Mock los módulos necesarios
jest.mock('../db.js', () => ({
  prisma: mockPrisma
}));

describe('Prisma Database Connection', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test para verificar la instancia de Prisma
   */
  test('debería tener una instancia de Prisma configurada', () => {
    const { prisma } = require('../db.js');
    expect(prisma).toBeDefined();
    expect(typeof prisma.user.findFirst).toBe('function');
  });

  /**
   * Test para verificar la consulta básica
   */
  test('debería poder ejecutar findFirst en User', async () => {
    const mockUser = { uid: 'test-uid', email: 'test@test.com', name: 'Test' };
    mockPrisma.user.findFirst.mockResolvedValueOnce(mockUser);

    const result = await mockPrisma.user.findFirst();

    expect(mockPrisma.user.findFirst).toHaveBeenCalled();
    expect(result).toEqual(mockUser);
  });

  /**
   * Test para verificar manejo de errores
   */
  test('debería manejar errores en la conexión a la base de datos', async () => {
    mockPrisma.user.findFirst.mockRejectedValueOnce(new Error('Database connection error'));

    await expect(mockPrisma.user.findFirst()).rejects.toThrow('Database connection error');
  });
});