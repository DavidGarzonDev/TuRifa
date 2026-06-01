import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import useAuthStore from "../storage/auth-store/use-auth-store";

/**
 * useAuthListener - Hook que sincroniza Firebase auth state con el store
 * 
 * Uso: dentro de Layout o App via useEffect con []
 */
const useAuthListener = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User existe en Firebase
        const state = useAuthStore.getState();
        if (state.isSessionValid) {
          // Session válida, solo actualizar useLooged
          useAuthStore.setState({ useLooged: user, isLoading: false });
        } else {
          // Session inválida o no existe, verificar con backend
          await state.verifyauthWhitBackend(user);
        }
      } else {
        // Firebase user es null, limpiar todo
        useAuthStore.setState({ useLooged: null, isLoading: false, isSessionValid: false });
      }
    });

    return () => unsubscribe();
  }, []);

  return useAuthStore();
};

export default useAuthListener;