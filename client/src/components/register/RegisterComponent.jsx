import { useForm } from "react-hook-form";

const RegisterComponent = () => {
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
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit(onSumit)}>
        <input
          placeholder="Nombre"
          {...register("name", { required: true })}
        ></input>
        {errors.name && <span>El nombre es requerido</span>}
        <input
          placeholder="Correo"
          {...register("email", { required: true })}
        />
        {errors.email && <span>El correo es requerido</span>}
        <input
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>La contraseña es requerida</span>}
        <input type="submit" />
      </form>
    </>
  );
};

export default RegisterComponent;
