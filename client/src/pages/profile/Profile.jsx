import useAuthStore from "../../store/use-auth-store";
import { useNavigate } from "react-router";
import { useCallback } from "react";


const Profile = () => {

  const { logout, useLooged } = useAuthStore();
  const navigate = useNavigate();

  const haldleLogin = useCallback(
    () => {
      logout()
        .then(() => navigate("/login"))
        .catch((error) => {
          console.error("No se pudo cerrar sesion", error)
        })
    },
    [logout, navigate]
  );


  return (
    <>
      <h2>Bienvenido {useLooged?.displayName} </h2>
      <button
        type="button"
        title="Cerrar sesion"
        onClick={haldleLogin}
      >
        Cerrar Sesion
      </button>
    </>
  );
};

export default Profile;
