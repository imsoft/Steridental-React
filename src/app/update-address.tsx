import { Resolver, useForm } from "react-hook-form";
import { emailValidations } from "../utils";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { axiosClient } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

type FormData = {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  street: string;
  outdoorNumber: string;
  interiorNumber: string;
  neighborhood: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
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
      : !values.street
      ? {
          street: {
            type: "required",
            message: "El campo calle es requerido.",
          },
        }
      : !values.outdoorNumber
      ? {
          outdoorNumber: {
            type: "required",
            message: "El campo número exterior es requerido.",
          },
        }
      : !values.interiorNumber
      ? {
          interiorNumber: {
            type: "required",
            message: "El campo número interior es requerido.",
          },
        }
      : !values.neighborhood
      ? {
          neighborhood: {
            type: "required",
            message: "El campo colonia es requerido.",
          },
        }
      : !values.postalCode
      ? {
          postalCode: {
            type: "required",
            message: "El campo código postal es requerido.",
          },
        }
      : !values.city
      ? {
          city: {
            type: "required",
            message: "El campo ciudad es requerido.",
          },
        }
      : !values.state
      ? {
          state: {
            type: "required",
            message: "El campo estado es requerido.",
          },
        }
      : !values.country
      ? {
          country: {
            type: "required",
            message: "El campo país es requerido.",
          },
        }
      : {},
  };
};

const UpdateAddressPage = () => {
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
    phone: "",
    email: "",
    street: "",
    outdoorNumber: "",
    interiorNumber: "",
    neighborhood: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
  });

  const onUpdateShippingAddress = async ({
    name,
    lastName,
    phone,
    email,
    street,
    outdoorNumber,
    interiorNumber,
    neighborhood,
    postalCode,
    city,
    state,
    country,
  }: FormData) => {
    Swal.fire({
      title: "¿Quieres actualizar la información a esta dirección?",
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
            `/shipping_addresses/${id}`,
            {
              name,
              lastName,
              phone,
              email,
              street,
              outdoorNumber,
              interiorNumber,
              neighborhood,
              postalCode,
              city,
              state,
              country,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
                'Access-Control-Allow-Origin': '*',
              },
            }
          );

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Dirección actualizada",
            showConfirmButton: false,
            timer: 1000,
          });
          navigate("/addresses");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const onDeleteShippingAddress = async () => {
    Swal.fire({
      title: "¿Quieres eliminar a esta dirección?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#164E63",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosClient.delete(`/shipping_addresses/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
              'Access-Control-Allow-Origin': '*',
            },
          });

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Dirección eliminada",
            showConfirmButton: false,
            timer: 1000,
          });
          navigate("/addresses");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/shipping_addresses/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
            'Access-Control-Allow-Origin': '*',
          },
        });
        const addressData = response.data;

        // Actualiza el estado con los datos recuperados
        setFormData({
          name: addressData[0].name,
          lastName: addressData[0].lastName,
          phone: addressData[0].phone,
          email: addressData[0].email,
          street: addressData[0].street,
          outdoorNumber: addressData[0].outdoorNumber,
          interiorNumber: addressData[0].interiorNumber,
          neighborhood: addressData[0].neighborhood,
          postalCode: addressData[0].postalCode,
          city: addressData[0].city,
          state: addressData[0].state,
          country: addressData[0].country,
        });

        reset({
          name: addressData[0].name,
          lastName: addressData[0].lastName,
          phone: addressData[0].phone,
          email: addressData[0].email,
          street: addressData[0].street,
          outdoorNumber: addressData[0].outdoorNumber,
          interiorNumber: addressData[0].interiorNumber,
          neighborhood: addressData[0].neighborhood,
          postalCode: addressData[0].postalCode,
          city: addressData[0].city,
          state: addressData[0].state,
          country: addressData[0].country,
        });
      } catch (error) {
        console.error("Error al obtener la dirección:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onUpdateShippingAddress)}
        className="space-y-6"
      >
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Agregar datos personales
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Aquí podras agregar los datos personales.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
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

            <div className="sm:col-span-3">
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
          </div>
        </div>

        <div className="border-b border-gray-900/10 py-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Agregar información de contacto
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Aquí podras agregar la información de contacto.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
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

            <div className="sm:col-span-3">
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
          </div>
        </div>
        <div className="border-b border-gray-900/10 py-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Agregar nueva dirección
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Aquí podras agregar una nueva dirección.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="TxtStreet"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Calle
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtStreet"
                  autoComplete="off"
                  className={`${
                    errors?.street
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("street")}
                  value={formData.street}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                />
                {errors?.street && (
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
              {errors?.street && (
                <>
                  <p className="mt-2 text-sm text-red-600" id="street-error">
                    {errors.street.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="TxtOutdoorNumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Número exterior
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtOutdoorNumber"
                  autoComplete="off"
                  className={`${
                    errors?.outdoorNumber
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("outdoorNumber")}
                  value={formData.outdoorNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, outdoorNumber: e.target.value })
                  }
                />
                {errors?.outdoorNumber && (
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
              {errors?.outdoorNumber && (
                <>
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="outdoorNumber-error"
                  >
                    {errors.outdoorNumber.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="TxtInteriorNumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Número interior
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtInteriorNumber"
                  autoComplete="off"
                  className={`${
                    errors?.interiorNumber
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("interiorNumber")}
                  value={formData.interiorNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, interiorNumber: e.target.value })
                  }
                />
                {errors?.interiorNumber && (
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
              {errors?.interiorNumber && (
                <>
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="interiorNumber-error"
                  >
                    {errors.interiorNumber.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="TxtNeighborhood"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Colonia
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtNeighborhood"
                  autoComplete="off"
                  className={`${
                    errors?.neighborhood
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("neighborhood")}
                  value={formData.neighborhood}
                  onChange={(e) =>
                    setFormData({ ...formData, neighborhood: e.target.value })
                  }
                />
                {errors?.neighborhood && (
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
              {errors?.neighborhood && (
                <>
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="neighborhood-error"
                  >
                    {errors.neighborhood.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="TxtPostalCode"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Código postal
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtPostalCode"
                  autoComplete="off"
                  className={`${
                    errors?.postalCode
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("postalCode")}
                  value={formData.postalCode}
                  onChange={(e) =>
                    setFormData({ ...formData, postalCode: e.target.value })
                  }
                />
                {errors?.postalCode && (
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
              {errors?.postalCode && (
                <>
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="postalCode-error"
                  >
                    {errors.postalCode.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="TxtCity"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Ciudad
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtCity"
                  autoComplete="off"
                  className={`${
                    errors?.city
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("city")}
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
                {errors?.city && (
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
              {errors?.city && (
                <>
                  <p className="mt-2 text-sm text-red-600" id="city-error">
                    {errors.city.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="TxtState"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Estado
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtState"
                  autoComplete="off"
                  className={`${
                    errors?.state
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("state")}
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />
                {errors?.state && (
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
              {errors?.state && (
                <>
                  <p className="mt-2 text-sm text-red-600" id="state-error">
                    {errors.state.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="TxtCountry"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                País
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtCountry"
                  autoComplete="off"
                  className={`${
                    errors?.country
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("country")}
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
                {errors?.country && (
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
              {errors?.country && (
                <>
                  <p className="mt-2 text-sm text-red-600" id="country-error">
                    {errors.country.message}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-x-2 rounded-md bg-cyan-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-900"
          >
            Actualizar
          </button>
          <button
            type='button'
            className="inline-flex items-center gap-x-2 rounded-md bg-cyan-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-900"
            onClick={onDeleteShippingAddress}
          >
            Eliminar
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateAddressPage;
