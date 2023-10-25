import { Resolver, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { emailValidations } from "../utils";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAuth } from "../hooks";

type FormData = {
  name: string;
  lastName: string;
  company: string;
  phone: string;
  promotionCode: string;
  email: string;
  password: string;
  repeatedPassword: string;
};

const resolver: Resolver<FormData> = async (values) => {
  return {
    values,
    errors: !values.name
      ? {
          name: {
            type: "required",
            message: "El campo nombre es requerido.",
          },
        }
      : !values.lastName
      ? {
          lastName: {
            type: "required",
            message: "El campo apellido es requerido.",
          },
        }
      : !values.company
      ? {
          company: {
            type: "required",
            message: "El campo empresa es requerido.",
          },
        }
      : !values.phone
      ? {
          phone: {
            type: "required",
            message: "El campo teléfono es requerido.",
          },
        }
      : !values.email
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
      : !values.repeatedPassword
      ? {
          repeatedPassword: {
            type: "required",
            message: "El campo repetir contraseña es requerido.",
          },
        }
      : values.repeatedPassword !== values.password
      ? {
          repeatedPassword: {
            type: "required",
            message: "Las contraseñas no coinciden.",
          },
        }
      : {},
  };
};

const SignupPage = () => {
  const [errorMessages, setErrorMessages] = useState([]);

  const { signup } = useAuth({ middleware: "guest", url: "/" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver });

  const onSignUpUser = async ({
    name,
    lastName,
    email,
    company,
    phone,
    password,
  }: FormData) => {
    const newUser = {
      name: name,
      lastName: lastName,
      email: email,
      company: company,
      phone: phone,
      promotionCode: invertirCadena(phone),
      password: password,
      // password_confirmation: repeatedPassword,
    };

    signup(newUser, setErrorMessages);
  };

  const invertirCadena = (phone: string): string => {
    const arregloDeCaracteres = phone.split('');
    const arregloInvertido = arregloDeCaracteres.reverse();
    const cadenaInvertida = arregloInvertido.join('');
    return cadenaInvertida;
  }

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
            Regístrate con nosotros
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSignUpUser)} className="space-y-6">
            <div>
              <label
                htmlFor="TxtName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nombre(s)
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtName"
                  autoComplete="off"
                  className={`${
                    errors?.name
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("name")}
                />
                {errors?.name && (
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
              {errors?.name && (
                <>
                  <p className="mt-2 text-sm text-red-600" id="name-error">
                    {errors.name.message}
                  </p>
                </>
              )}
            </div>

            <div>
              <label
                htmlFor="TxtLastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Apellidos
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtLastName"
                  autoComplete="off"
                  className={`${
                    errors?.lastName
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("lastName")}
                />
                {errors?.lastName && (
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
              {errors?.lastName && (
                <>
                  <p className="mt-2 text-sm text-red-600" id="lastName-error">
                    {errors.lastName.message}
                  </p>
                </>
              )}
            </div>

            <div>
              <label
                htmlFor="TxtCompany"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Empresa
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtCompany"
                  autoComplete="off"
                  className={`${
                    errors?.company
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("company")}
                />
                {errors?.company && (
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
              {errors?.company && (
                <>
                  <p className="mt-2 text-sm text-red-600" id="company-error">
                    {errors.company.message}
                  </p>
                </>
              )}
            </div>

            <div>
              <label
                htmlFor="TxtPhone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Teléfono
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="tel"
                  id="TxtPhone"
                  autoComplete="off"
                  className={`${
                    errors?.phone
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("phone")}
                />
                {errors?.phone && (
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
              {errors?.phone && (
                <>
                  <p className="mt-2 text-sm text-red-600" id="phone-error">
                    {errors.phone.message}
                  </p>
                </>
              )}
            </div>

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
              <label
                htmlFor="TxtPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
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
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
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
                  <p className="mt-2 text-sm text-red-600" id="password-error">
                    {errors.password.message}
                  </p>
                </>
              )}
              {errorMessages
                ? errorMessages.map((errorMessage) => (
                    <p
                      key={errorMessage}
                      className="mt-2 text-sm text-red-600"
                      id="password-error"
                    >
                      {errorMessage}
                    </p>
                  ))
                : null}
            </div>

            <div>
              <label
                htmlFor="TxtRepeatedPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Repetir contraseña
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="password"
                  id="TxtRepeatedPassword"
                  autoComplete="off"
                  className={`${
                    errors?.repeatedPassword
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("repeatedPassword")}
                />
                {errors?.repeatedPassword && (
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
              {errors?.repeatedPassword && (
                <>
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="repeatedPassword-error"
                  >
                    {errors.repeatedPassword.message}
                  </p>
                </>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-cyan-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-900"
              >
                Registrarme
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center mt-6">
            <div className="text-sm leading-6">
              ¿Ya estas registrado?{" "}
              <Link
                to="/login"
                className="font-semibold text-cyan-900 hover:text-cyan-800"
              >
                Inicia sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
