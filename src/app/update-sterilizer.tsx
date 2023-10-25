import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Resolver, useForm } from "react-hook-form";
import { SterilizerDataOptions } from "../data";
import { axiosClient } from "../config";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type FormData = {
  sterilizerType: string;
  brand: string;
  model: string;
  serialNumber: string;
};

const resolver: Resolver<FormData> = async (values) => {
  return {
    values,
    errors:
      values.sterilizerType === "Seleccione una opción..."
        ? {
            sterilizerType: {
              type: "required",
              message: "El campo tipo de esterilizador es requerido.",
            },
          }
        : !values.brand
        ? {
            brand: {
              type: "required",
              message: "El campo marca es requerido.",
            },
          }
        : !values.model
        ? {
            model: {
              type: "required",
              message: "El campo modelo es requerido.",
            },
          }
        : !values.serialNumber
        ? {
            serialNumber: {
              type: "required",
              message: "El campo número de serie es requerido.",
            },
          }
        : {},
  };
};

const UpdateSterilizerPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver });

  const [formData, setFormData] = useState<FormData>({
    sterilizerType: "",
    brand: "",
    model: "",
    serialNumber: "",
  });

  const onUpdateSterilizer = async ({
    sterilizerType,
    brand,
    model,
    serialNumber,
  }: FormData) => {
    Swal.fire({
      title: "¿Quieres actualizar la información a este esterilizador?",
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
            `/sterilizers/${id}`,
            {
              sterilizerType,
              brand,
              model,
              serialNumber,
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
            title: "Esterilizador actualizado",
            showConfirmButton: false,
            timer: 1000,
          });
          navigate("/sterilizers");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const onDeleteSterilizer = async () => {
    Swal.fire({
      title: "¿Quieres eliminar a este esterilizador?",
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
          await axiosClient.delete(`/sterilizers/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
              'Access-Control-Allow-Origin': '*',
            },
          });

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Esterilizador eliminado",
            showConfirmButton: false,
            timer: 1000,
          });
          navigate("/sterilizers");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/sterilizers/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
            'Access-Control-Allow-Origin': '*',
          },
        });
        const sterilizerData = response.data;

        // Actualiza el estado con los datos recuperados
        setFormData({
          sterilizerType: sterilizerData[0].sterilizerType,
          brand: sterilizerData[0].brand,
          model: sterilizerData[0].model,
          serialNumber: sterilizerData[0].serialNumber,
        });

        reset({
          sterilizerType: sterilizerData[0].sterilizerType,
          brand: sterilizerData[0].brand,
          model: sterilizerData[0].model,
          serialNumber: sterilizerData[0].serialNumber,
        });
      } catch (error) {
        console.error("Error al obtener el esterilizador:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <form onSubmit={handleSubmit(onUpdateSterilizer)} className="space-y-6">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Agregar nuevo esterelizador
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Aquí podras agregar un nuevo esterelizador.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="CmbSterilizerType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tipo de esterilizador
              </label>

              <div className="relative rounded-md shadow-sm">
                <select
                  id="CmbSterilizerType"
                  className={`${
                    errors?.sterilizerType
                      ? "block mt-1 w-full rounded-md border-0 py-2 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("sterilizerType")}
                  value={formData.sterilizerType}
                  onChange={(e) =>
                    setFormData({ ...formData, sterilizerType: e.target.value })
                  }
                >
                  <option hidden>Seleccione una opción...</option>
                  {SterilizerDataOptions.map((sterilizerDataOption) => (
                    <option
                      key={sterilizerDataOption.type}
                      value={sterilizerDataOption.type}
                    >
                      {sterilizerDataOption.type}
                    </option>
                  ))}
                </select>

                {errors?.sterilizerType && (
                  <>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                      <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  </>
                )}
              </div>
              {errors?.sterilizerType && (
                <>
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="sterilizerType-error"
                  >
                    {errors.sterilizerType.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="TxtBrand"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Marca
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtBrand"
                  autoComplete="off"
                  className={`${
                    errors?.brand
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("brand")}
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                />
                {errors?.brand && (
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
              {errors?.brand && (
                <>
                  <p className="mt-2 text-sm text-red-600" id="brand-error">
                    {errors.brand.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="TxtModel"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Modelo
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtModel"
                  autoComplete="off"
                  className={`${
                    errors?.model
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("model")}
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                />
                {errors?.model && (
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
              {errors?.model && (
                <>
                  <p className="mt-2 text-sm text-red-600" id="model-error">
                    {errors.model.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="TxtSerialNumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Número de serie
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtSerialNumber"
                  autoComplete="off"
                  className={`${
                    errors?.serialNumber
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("serialNumber")}
                  value={formData.serialNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, serialNumber: e.target.value })
                  }
                />
                {errors?.serialNumber && (
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
              {errors?.serialNumber && (
                <>
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="serialNumber-error"
                  >
                    {errors.serialNumber.message}
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
            type="button"
            className="inline-flex items-center gap-x-2 rounded-md bg-cyan-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-900"
            onClick={onDeleteSterilizer}
          >
            Eliminar
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateSterilizerPage;
