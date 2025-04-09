
import { test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginWhitGoogleComponent from "./LoginWhitGoogleComponent";



const mockLoginGoogleWithPopup = vi.fn();
vi.mock("../../store/auth-store/use-auth-store", () => ({
  default: vi.fn(() => ({
    loginGoogleWithPopup: mockLoginGoogleWithPopup,
    useLooged: null,
  })),
}));


const mockNavigate = vi.fn();
vi.mock("react-router", async (importOriginal) => {
    const actual = await importOriginal(); 
    return {
        ...actual, 
        useNavigate: () => mockNavigate, 
    };
});



describe("LoginWhitGoogleComponent", () => {

  beforeEach(() => {
    vi.clearAllMocks(); 
  });


  test("renderiza el botón de inicio de sesión", () => {
    render(<LoginWhitGoogleComponent />);
    const loginButton = screen.getByRole("button", { name: /login con google/i });
    expect(loginButton).toBeInTheDocument();
    });

  test("llama a loginGoogleWithPopup cuando se hace clic en el botón", async () => {

    render(<LoginWhitGoogleComponent />);
    const loginButton = screen.getByRole("button", { name: /login con google/i }); 
    expect(mockLoginGoogleWithPopup).not.toHaveBeenCalled();
    await fireEvent.click(loginButton);
    expect(mockLoginGoogleWithPopup).toHaveBeenCalledTimes(1);


  });

  test("navega a /login y muestra el mensaje de error cuando loginGoogleWithPopup falla", async () => {
 
    const errorMessage = "Error simulado de autenticación de Google"; 
    const errorObject = new Error(errorMessage);
    mockLoginGoogleWithPopup.mockRejectedValueOnce(errorObject);

    render(<LoginWhitGoogleComponent />);

    const loginButton = screen.getByRole("button", { name: /login con google/i });


    await fireEvent.click(loginButton);

    expect(mockNavigate).toHaveBeenCalledWith("/login");


    expect(mockNavigate).not.toHaveBeenCalledWith("/");

    const errorParagraph = await screen.findByText(errorMessage); 
    expect(errorParagraph).toBeInTheDocument(); 
    expect(errorParagraph.tagName).toBe('P');

  });

  test("navega a / cuando loginGoogleWithPopup tiene éxito", async () => {
    const mockSuccessResponse = { user: { uid: 'test-uid', displayName: 'Test User' } };
    mockLoginGoogleWithPopup.mockResolvedValueOnce(mockSuccessResponse);

    render(<LoginWhitGoogleComponent />);
    const loginButton = screen.getByRole("button", { name: /login con google/i });


    await fireEvent.click(loginButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockNavigate).not.toHaveBeenCalledWith("/login");

    const errorParagraph = screen.queryByRole('paragraph'); 
    expect(errorParagraph).not.toBeInTheDocument(); 

  });


});
