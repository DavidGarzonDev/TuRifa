import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../../../firebase.config";
import { loginRequest } from "../../api/auth";

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Initial state
      useLooged: null,
      isLoading: true,
      isSessionValid: false,

      // Action to verify auth with backend
      verifyauthWhitBackend: async (user) => {
        try {
          const token = await user.getIdToken();
          localStorage.setItem("firebase-token", token);
          const useLogedData = {
            token,
          };

          const res = await loginRequest(useLogedData);
          set({ useLooged: user, isLoading: false, isSessionValid: true });
          return res.data;
        } catch (error) {
          set({ useLooged: null, isLoading: false, isSessionValid: false });
        }
      },

      // Login with Google popup
      loginGoogleWithPopup: async () => {
        try {
          const userLogin = await signInWithPopup(auth, new GoogleAuthProvider());
          const user = userLogin.user;
          const token = await user.getIdToken();
          localStorage.setItem("firebase-token", token);

          const useLogedData = {
            token,
          };

          const res = await loginRequest(useLogedData);
          set({ useLooged: user, isSessionValid: true, isLoading: false });
          return res.data;
        } catch (error) {
          set({ useLooged: null, isSessionValid: false });
          if (error.response && error.response.data && error.response.data.error) {
            throw error.response.data.error;
          } else {
            
            throw error;
          }
        }
      },

      // Logout action
      logout: async () => {
        localStorage.removeItem("firebase-token");
        return await signOut(auth)
          .then(() => set({ useLooged: null, isSessionValid: false }))
          .catch((error) => { /* logout error handled silently */ });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        useLooged: state.useLooged,
        isSessionValid: state.isSessionValid,
      }),
      version: 1,
    }
  )
);

export default useAuthStore;
