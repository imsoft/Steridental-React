import { Resolver, useForm } from "react-hook-form";
import { emailValidations } from "../utils";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { axiosClient } from "../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
};

const resolver: Resolver<FormData> = async (values) => {
  return {
    values,
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "El campo correo electrónico es requerido.",
          },
        }
      : emailValidations.isEmail(values.email)
      ? {
          email: {
            type: "pattern",
            message: "Correo electrónico no valido.",
          },
        }
      : {},
  };
};

const ConfirmEmailPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver });

  const onConfirmEmail = async ({ email }: FormData) => {
    try {
      // Enviar la solicitud HTTP POST al backend
      await axiosClient.post("/forgotPassword", { email });

      // Si la solicitud es exitosa, puedes mostrar un mensaje de éxito
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Correo electrónico enviado con exito",
        showConfirmButton: false,
        timer: 1000,
      });
      
      navigate("/login");
    } catch (error) {
      // Maneja errores si la solicitud falla
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Ocurrio un error al enviar el correo electrónico",
        showConfirmButton: false,
        timer: 1000,
      });
      console.error(
        "Error al enviar el correo electrónico de recuperación de contraseña.",
        error
      );
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="steridental_logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Recuperar contraseña
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onConfirmEmail)} className="space-y-6">
            <div>
              <label
                htmlFor="TxtEmail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Correo electrónico
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="email"
                  id="TxtEmail"
                  autoComplete="off"
                  className={`${
                    errors?.email
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("email")}
                />
                {errors?.email && (
                  <>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  </>
                )}
              </div>
              {errors?.email && (
                <>
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    {errors.email.message}
                  </p>
                </>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-cyan-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-900"
              >
                Confirmar correo electrónico
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConfirmEmailPage;
