.then(
    async (userCredential) => {
      const user = userCredential.user;
      const token = await user.getIdToken();
      const name = user.displayName;


      axios.post(import.meta.env.VITE_API_BACKEND_REGISTER, {
          token,
          name,
        })
        .then((response) => {
          console.log("Se verifico el token usando el backend");
        })
        .catch((error) => {
          console.error("Hubo un error", error);
          console.error("Detalles del error:", error.response);
          
        });
    }
  );