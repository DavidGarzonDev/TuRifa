import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import useAuthStore from "../storage/auth-store/use-auth-store";

/**
 * useAuthInit - Hook que inicializa el estado de auth usando onAuthStateChanged
 * 
 * Este hook DEBE ser usado en un componente de alto nivel (App o Layout)
 * para evitar efectos de módulo y mantener el estado de auth sincronizado.
 */
const useAuthInit = () => {
  const { verifyauthWhitBackend, useLooged, isSessionValid, set } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (isSessionValid) {
          // Session ya validada, solo actualizar useLooged
          set({ useLooged: user, isLoading: false });
        } else {
          // Session no validada, verificar con backend
          await verifyauthWhitBackend(user);
        }
      } else {
        // Firebase user es null, limpiar estado
        set({ useLooged: null, isLoading: false, isSessionValid: false });
      }
    });

    return () => unsubscribe();
  }, [isSessionValid, verifyauthWhitBackend, set]);

  return { useLooged, isSessionValid };
};

export default useAuthInit;
