import { Resolver, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosClient } from "../config";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type FormData = {
  selectedSerialNumberSterilizer: string;
  teamNumber: string;
  resultVial1: string;
  resultVial2: string;
  resultVial3: string;
  comments: string;
};

const resolver: Resolver<FormData> = async (values) => {
  return {
    values,
    errors:
      values.selectedSerialNumberSterilizer === "Seleccione una opción..."
        ? {
            selectedSerialNumberSterilizer: {
              type: "required",
              message: "El campo Número de serie es requerido.",
            },
          }
        : !values.teamNumber
        ? {
            teamNumber: {
              type: "required",
              message: "El campo número de equipo es requerido.",
            },
          }
        : !values.resultVial1
        ? {
            resultVial1: {
              type: "required",
              message: "El campo resultado del vial 1 es requerido.",
            },
          }
        : !values.resultVial2
        ? {
            resultVial2: {
              type: "required",
              message: "El campo resultado del vial 2 es requerido.",
            },
          }
        : !values.resultVial3
        ? {
            resultVial3: {
              type: "required",
              message: "El campo resultado del vial 3 es requerido.",
            },
          }
        : !values.comments
        ? {
            comments: {
              type: "required",
              message: "El campo comentarios es requerido.",
            },
          }
        : {},
  };
};

const UpdateReportPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver });

  const [formData, setFormData] = useState<FormData>({
    selectedSerialNumberSterilizer: "",
    teamNumber: "",
    resultVial1: "",
    resultVial2: "",
    resultVial3: "",
    comments: "",
  });

  const onUpdateReport = async ({
    selectedSerialNumberSterilizer,
    teamNumber,
    resultVial1,
    resultVial2,
    resultVial3,
    comments,
  }: FormData) => {
    Swal.fire({
      title: "¿Quieres actualizar la información a este reporte?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#164E63",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then(async (resp) => {
      if (resp.isConfirmed) {
        try {
          await axiosClient.put(
            `/report/${id}`,
            {
              selectedSerialNumberSterilizer,
              teamNumber,
              resultVial1,
              resultVial2,
              resultVial3,
              comments,
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
            title: "Reporte actualizado",
            showConfirmButton: false,
            timer: 1000,
          });
          navigate("/reports");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const onDeleteReport = async () => {
    Swal.fire({
      title: "¿Quieres eliminar a este reporte?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#164E63",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (resp) => {
      if (resp.isConfirmed) {
        try {
          await axiosClient.delete(`/report/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
              'Access-Control-Allow-Origin': '*',
            },
          });

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Reporte eliminado",
            showConfirmButton: false,
            timer: 1000,
          });
          navigate("/reports");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/report/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
            'Access-Control-Allow-Origin': '*',
          },
        });
        const reportData = response.data;

        // Actualiza el estado con los datos recuperados
        setFormData({
          selectedSerialNumberSterilizer: reportData[0].serialNumberSterilizer,
          teamNumber: reportData[0].teamNumber,
          resultVial1: reportData[0].resultVial1,
          resultVial2: reportData[0].resultVial2,
          resultVial3: reportData[0].resultVial3,
          comments: reportData[0].comments,
        });

        reset({
          selectedSerialNumberSterilizer: reportData[0].serialNumberSterilizer,
          teamNumber: reportData[0].teamNumber,
          resultVial1: reportData[0].resultVial1,
          resultVial2: reportData[0].resultVial2,
          resultVial3: reportData[0].resultVial3,
          comments: reportData[0].comments,
        });
      } catch (error) {
        console.error("Error al obtener el reporte:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <form onSubmit={handleSubmit(onUpdateReport)} className="space-y-6">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Agregar nuevo Reporte
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Aquí podras agregar un nuevo reporte.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="TxtTeamNumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Número de equipo
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtTeamNumber"
                  autoComplete="off"
                  className={`${
                    errors?.teamNumber
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("teamNumber")}
                  value={formData.teamNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, teamNumber: e.target.value })
                  }
                />
                {errors?.teamNumber && (
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
              {errors?.teamNumber && (
                <>
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="teamNumber-error"
                  >
                    {errors.teamNumber.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="TxtResultVial1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Resultado Vial 1
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtResultVial1"
                  autoComplete="off"
                  className={`${
                    errors?.resultVial1
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("resultVial1")}
                  value={formData.resultVial1}
                  onChange={(e) =>
                    setFormData({ ...formData, resultVial1: e.target.value })
                  }
                />
                {errors?.resultVial1 && (
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
              {errors?.resultVial1 && (
                <>
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="resultVial1-error"
                  >
                    {errors.resultVial1.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="TxtResultVial2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Resultado Vial 1
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtResultVial2"
                  autoComplete="off"
                  className={`${
                    errors?.resultVial2
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("resultVial2")}
                  value={formData.resultVial2}
                  onChange={(e) =>
                    setFormData({ ...formData, resultVial2: e.target.value })
                  }
                />
                {errors?.resultVial2 && (
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
              {errors?.resultVial2 && (
                <>
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="resultVial2-error"
                  >
                    {errors.resultVial2.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="TxtResultVial3"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Resultado Vial 3
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtResultVial3"
                  autoComplete="off"
                  className={`${
                    errors?.resultVial3
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("resultVial3")}
                  value={formData.resultVial3}
                  onChange={(e) =>
                    setFormData({ ...formData, resultVial3: e.target.value })
                  }
                />
                {errors?.resultVial3 && (
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
              {errors?.resultVial3 && (
                <>
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="resultVial3-error"
                  >
                    {errors.resultVial3.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="TxtComments"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Comentarios
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtComments"
                  autoComplete="off"
                  className={`${
                    errors?.comments
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("comments")}
                  value={formData.comments}
                  onChange={(e) =>
                    setFormData({ ...formData, comments: e.target.value })
                  }
                />
                {errors?.comments && (
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
              {errors?.comments && (
                <>
                  <p className="mt-2 text-sm text-red-600" id="comments-error">
                    {errors.comments.message}
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
            onClick={onDeleteReport}
          >
            Eliminar
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateReportPage;
