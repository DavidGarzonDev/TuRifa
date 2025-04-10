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
    <form onSubmit={handleSubmit(onSumit)} className="space-y-5">
      <div>
        <input
          placeholder="Correo"
          type="email"
          {...register("email", { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <span className="text-red-600 text-sm mt-1 block">
            El correo es requerido
          </span>
        )}
      </div>

      <div>
        <input
          placeholder="Contraseña"
          type="password"
          {...register("password", { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <span className="text-red-600 text-sm mt-1 block">
            La contraseña es requerida
          </span>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transform hover:scale-105 transition duration-300"
      >
        Enviar
      </button>
    </form>
  );
};

export default LoginComponent;
