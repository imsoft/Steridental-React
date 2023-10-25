import { Link } from "react-router-dom";
import { Resolver, useForm } from "react-hook-form";
import { emailValidations } from "../utils";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

type FormData = {
  email: string;
  password: string;
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
      : !values.password
      ? {
          password: {
            type: "required",
            message: "El campo contraseña es requerido.",
          },
        }
      : {},
  };
};

const LoginPage = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const { login } = useAuth({
    middleware: "guest",
    url: "/",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver });

  const onLoginUser = async ({ email, password }: FormData) => {
    const loginUserData = {
      email: email,
      password: password,
    };

    login(loginUserData, setErrorMessages);
  };

  return (
    <>
      <div className="flex h-screen flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-10 w-auto"
                src="/steridental_logo.png"
                alt="Your Company"
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Iniciar sesión en su cuenta
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <form
                  onSubmit={handleSubmit(onLoginUser)}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="TxtEmail"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Correo Electrónico
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
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {errors.email.message}
                        </p>
                      </>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="TxtPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contraseña
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="password"
                        id="TxtPassword"
                        autoComplete="off"
                        className={`${
                          errors?.password
                            ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                        }`}
                        {...register("password")}
                      />
                      {errors?.password && (
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
                    {errors?.password && (
                      <>
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {errors.password.message}
                        </p>
                      </>
                    )}
                    {errorMessages
                      ? errorMessages.map((errorMessage) => (
                          <p
                            className="mt-2 text-sm text-red-600"
                            id="password-error"
                            key={errorMessage}
                          >
                            {errorMessage}
                          </p>
                        ))
                      : null}
                  </div>

                  <div className="flex items-center">
                    <div className="text-sm leading-6">
                      ¿Aún no tienes una cuenta?{" "}
                      <Link
                        to="/signup"
                        className="font-semibold text-cyan-900 hover:text-cyan-800"
                      >
                        Registrate
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-cyan-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-900"
                    >
                      Iniciar sesión
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm leading-6">
                      ¿Olvidate tu contraseña?{" "}
                      <Link
                        to="/confirm-email"
                        className="font-semibold text-cyan-900 hover:text-cyan-800"
                      >
                        Haz clic aquí
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="dentista-sosteniendo.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
