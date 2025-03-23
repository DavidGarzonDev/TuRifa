import { create } from "zustand";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase.config";
import { loginRequest } from "../api/auth"

const useAuthStore = create((set) => {
  const observerAuthState = () => {
    onAuthStateChanged(auth, (user) => {
      user ? set({ useLooged: user }) : set({ useLooged: null });
    });
  };

  observerAuthState();

  return {
    useLooged: null,

    loginGoogleWithPopup: async () => {
      try {
        const userCredential = await signInWithPopup(
          auth,
          new GoogleAuthProvider()
        );
        const user = userCredential.user;
        const token = await user.getIdToken();
        const name = user.displayName;
        
        const userLoge = {
          token,
          name,
        };
        
        loginRequest(userLoge);
        
        console.log("Se verifico el token usando el backend");
        return userCredential; 
      } catch (error) {
        if (error.response) {
          console.error("Error del backend:", error.response.data);
          console.error("Status del error:", error.response.status);
          throw new Error("backend-error");
        } else {
          console.error("An unexpected error occurred during login:", error);
          throw new Error("unexpected-error"); 
        }
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
