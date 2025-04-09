import { useForm } from "react-hook-form";

const LoginComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSumit = (data) => {
    console.log(data);
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSumit)}>
        <input
          placeholder="Correo"
          {...register("email", { required: true })}
        />
        {errors.email && <span>El correo es requerido</span>}
        <input
          placeholder="Contraseña"
          {...register("password", { required: true })}
        />
        {errors.password && <span>La contraseña es requerida</span>}
        <input type="submit" />
      </form>
      <div></div>
    </>
  );
};

export default LoginComponent;
