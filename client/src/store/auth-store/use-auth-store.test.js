
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { act } from '@testing-library/react'; 
import useAuthStore from './use-auth-store'; 

import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { loginRequest } from '../../api/auth';
import { auth } from '../../../firebase.config';
vi.mock('firebase/auth', async (importOriginal) => {
    const actual = await importOriginal(); 
    return {
        ...actual, 
        signInWithPopup: vi.fn(), 
        GoogleAuthProvider: vi.fn(), 
        signOut: vi.fn(() => Promise.resolve()), 
        onAuthStateChanged: vi.fn((authParam, callback) => {
            return vi.fn(); 
        }),

    };
});

vi.mock('../../api/auth', () => ({
    loginRequest: vi.fn(),
}));


describe('useAuthStore', () => {

    beforeEach(() => {
        vi.clearAllMocks();

        act(() => {
            useAuthStore.setState({
                useLooged: null,
                isLoading: false, 
                isSessionValid: false,
            }); 
        });

        const mockFirebaseUser = {
            getIdToken: vi.fn(() => Promise.resolve('mock-firebase-token')),
        };
        signInWithPopup.mockResolvedValue({ user: mockFirebaseUser });
        loginRequest.mockResolvedValue({ data: { message: 'Login successful', } });
        signOut.mockResolvedValue(undefined);
    });
    afterEach(() => {
     
    });

    test('Iniciar un usuario logeado', () => {
        const state = useAuthStore.getState();
        expect(state.useLooged).toBeNull();
        expect(state.isLoading).toBe(false); 
        expect(state.isSessionValid).toBe(false);
    });

    test('loginGoogleWithPopup debe llamar a signInWithPopup y loginRequest en caso de éxito', async () => {
        const storeActions = useAuthStore.getState();

  
        let result;
        await act(async () => {
            result = await storeActions.loginGoogleWithPopup();
        });

        expect(signInWithPopup).toHaveBeenCalledTimes(1);

        expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(GoogleAuthProvider));


        const mockFirebaseUser = (await signInWithPopup.mock.results[0].value).user;
        expect(mockFirebaseUser.getIdToken).toHaveBeenCalledTimes(1);

 
        expect(loginRequest).toHaveBeenCalledTimes(1);
        expect(loginRequest).toHaveBeenCalledWith({ token: 'mock-firebase-token' });

      
        expect(result).toEqual({ message: 'Login successful',  });

        const finalState = useAuthStore.getState();
        expect(finalState.useLooged).toEqual(mockFirebaseUser);
        expect(finalState.isSessionValid).toBe(true);
        expect(finalState.isLoading).toBe(false); 
    });

    test('loginGoogleWithPopup debe manejar errores de signInWithPopup', async () => {
        const firebaseError = new Error("firebase error");
        signInWithPopup.mockRejectedValueOnce(firebaseError);
        const storeActions = useAuthStore.getState();

        await act(async () => {
             await expect(storeActions.loginGoogleWithPopup()).rejects.toThrow(firebaseError); 
        });


        expect(loginRequest).not.toHaveBeenCalled();

        const finalState = useAuthStore.getState();
        expect(finalState.useLooged).toBeNull();
        expect(finalState.isSessionValid).toBe(false);
    });

     test('loginGoogleWithPopup debe manejar errores de loginRequest', async () => {

        const backendError = { response: { data: { error: 'Backend validation failed' } } };
        loginRequest.mockRejectedValueOnce(backendError);
        const storeActions = useAuthStore.getState();

        await act(async () => {
            await expect(storeActions.loginGoogleWithPopup()).rejects.toEqual('Backend validation failed');
        });


        expect(signInWithPopup).toHaveBeenCalledTimes(1);
        expect(loginRequest).toHaveBeenCalledTimes(1); 


        const finalState = useAuthStore.getState();
        expect(finalState.useLooged).toBeNull();
        expect(finalState.isSessionValid).toBe(false);
    });


    test('logout debe llamar a signOut y actualizar el estado', async () => {
        act(() => {
            useAuthStore.setState({ useLooged: { uid: 'test-user' }, isSessionValid: true });
        });
        const storeActions = useAuthStore.getState();

        await act(async () => {
            await storeActions.logout();
        });

        expect(signOut).toHaveBeenCalledTimes(1);
        expect(signOut).toHaveBeenCalledWith(auth);

        const finalState = useAuthStore.getState();
        expect(finalState.useLooged).toBeNull();
    });

});
