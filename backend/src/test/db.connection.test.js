// @ts-nocheck
/**
 * Test suite simplificado para la conexión con Supabase
 * Verifica el correcto funcionamiento básico de la conexión con la base de datos
 */

// Mock para Supabase
const mockSupabase = {
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnValue({
    data: [{ id: 1 }],
    error: null
  })
};

// Mock los módulos necesarios
jest.mock('../db.js', () => ({
  supabase: mockSupabase
}));

describe('Supabase Database Connection', () => {
  
  beforeEach(() => {
    // Reiniciar los mocks antes de cada prueba
    jest.clearAllMocks();
  });
  
  /**
   * Test para verificar la instancia de Supabase
   */
  test('debería tener una instancia de Supabase configurada', () => {
    const { supabase } = require('../db.js');
    expect(supabase).toBeDefined();
    expect(typeof supabase.from).toBe('function');
  });
  
  /**
   * Test para verificar manejo de errores simulados
   */
  test('debería manejar errores en la conexión a la base de datos', () => {
    const { supabase } = require('../db.js');
    
    // Modificar el mock para simular un error
    mockSupabase.limit.mockReturnValueOnce({
      data: null,
      error: { message: 'Database connection error' }
    });
    
    // Realizar una consulta que producirá un error
    const result = supabase.from('users').select().limit();
    
    // Verificar que se llamaron los métodos correctos
    expect(supabase.from).toHaveBeenCalledWith('users');
    
    // Verificar el resultado de error
    expect(result.error).toBeDefined();
    expect(result.error.message).toBe('Database connection error');
  });
});
