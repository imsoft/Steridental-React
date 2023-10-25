import { Resolver, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { emailValidations } from "../utils";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { axiosClient } from "../config";
import Swal from "sweetalert2";
import { useAuth } from "../hooks";

type FormData = {
  name: string;
  lastName: string;
  company: string;
  phone: string;
  email: string;
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
      : {},
  };
};

const UpdateUserPage = () => {
  const { user } = useAuth({ middleware: "auth" });

  const navigate = useNavigate();

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    lastName: "",
    company: "",
    phone: "",
    email: "",
  });

  const onUpdateUser = async ({
    name,
    lastName,
    email,
    company,
    phone,
  }: FormData) => {
    Swal.fire({
      title: "¿Quieres actualizar la información a este usuario?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#164E63",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosClient.put(
            `/updateUser/${id}`,
            {
              name,
              lastName,
              email,
              company,
              phone,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
                "Access-Control-Allow-Origin": "*",
              },
            }
          );

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Usuario actualizado",
            showConfirmButton: false,
            timer: 1000,
          });
          navigate("/profile");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  useEffect(() => {
    // Actualiza el estado con los datos recuperados
    setFormData({
      name: user?.name,
      lastName: user?.lastName,
      email: user?.email,
      company: user?.company,
      phone: user?.phone,
    });

    reset({
      name: user?.name,
      lastName: user?.lastName,
      email: user?.email,
      company: user?.company,
      phone: user?.phone,
    });
  }, [id]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/steridental_logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Actualización de datos
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onUpdateUser)} className="space-y-6">
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
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
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
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
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
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
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
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
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
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateUserPage;
