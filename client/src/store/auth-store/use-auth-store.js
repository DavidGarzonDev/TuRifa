import { create } from "zustand";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../../../firebase.config";
import { loginRequest } from "../../api/auth";

const useAuthStore = create((set, get) => {
  
  const verifyauthWhitBackend = async (user) => {
    try {
      const token = await user.getIdToken();
      const useLogedData = {
        token,
      };

      const res = await loginRequest(useLogedData);
      set({ useLooged: user, isLoading: false, isSessionValid: true });
      return res.data;
    } catch (error) {
      console.log(error);
      set({ useLooged: null, isLoading: false, isSessionValid: false });
    }
  };
  const observerAuthState = () => {
    onAuthStateChanged(auth, async (user) => {
      set({ isLoading: true });
      if (user) {
        if (get().isSessionValid) {
          set({ useLooged: user, isLoading: false });
        } else {
          await verifyauthWhitBackend(user);
        }
      } else {
        set({ useLooged: null, isLoading: false, isSessionValid: false });
      }
    });
  };

  observerAuthState();

  return {
    useLooged: null,

    loginGoogleWithPopup: async () => {
      try {
        const userLogin = await signInWithPopup(auth, new GoogleAuthProvider());
        const user = userLogin.user;
        const token = await user.getIdToken();

        const useLogedData = {
          token,
        };

        const res = await loginRequest(useLogedData);
        set({ useLooged: user, isSessionValid: true });
        return res.data;
      } catch (error) {
        set({ useLooged: null, isSessionValid: false });
        throw error.response.data.error;
      }
    },

    logout: async () => {
      return await signOut(auth)
        .then(() => set({ useLooged: null }))
        .catch((error) => console.log(error));
    },
  };
});

export default useAuthStore;
