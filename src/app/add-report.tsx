import { Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosClient } from "../config";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useSterilizer } from "../hooks";
import { useEffect, useMemo, useState } from "react";

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

const AddReportPage = () => {
  const navigate = useNavigate();

  const { sterilizers, getSterilizersData } = useSterilizer();

  const sterilizersMemo = useMemo(() => sterilizers, [sterilizers]);

  const [selectedSterilizerData, setSelectedSterilizerData] = useState({
    brand: "",
    model: "",
    serialNumber: "",
    sterilizerType: "",
  });

  useEffect(() => {
    getSterilizersData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({ resolver });

  const selectedSterilizer = watch("selectedSerialNumberSterilizer");

  useEffect(() => {
    const selectedSterilizerDetails = sterilizersMemo.find(
      (sterilizer) => sterilizer.serialNumber === selectedSterilizer
    );

    setSelectedSterilizerData(selectedSterilizerDetails!);
  }, [selectedSterilizer]);

  const onAddReport = async ({
    teamNumber,
    resultVial1,
    resultVial2,
    resultVial3,
    comments,
  }: FormData) => {
    try {
      await axiosClient.post(
        "/report",
        {
          teamNumber,
          resultVial1,
          resultVial2,
          resultVial3,
          comments,
          sterilizerBrand: selectedSterilizerData?.brand,
          sterilizerModel: selectedSterilizerData?.model,
          sterilizerSerialNumber: selectedSterilizerData?.serialNumber,
          sterilizerSterilizerType: selectedSterilizerData?.sterilizerType,
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
        title: "Reporte agregado",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/reports");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onAddReport)} className="space-y-6">
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
                htmlFor="CmbSterilizerType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Número de serie del esterilizador
              </label>

              <div className="relative rounded-md shadow-sm">
                <select
                  id="CmbSterilizerType"
                  className={`${
                    errors?.selectedSerialNumberSterilizer
                      ? "block mt-1 w-full rounded-md border-0 py-2 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  defaultValue="Seleccione una opción..."
                  {...register("selectedSerialNumberSterilizer")}
                >
                  <option hidden>Seleccione una opción...</option>
                  {sterilizersMemo.map((sterilizer) => (
                    <option key={sterilizer.id}>
                      {sterilizer.serialNumber}
                    </option>
                  ))}
                </select>
                {errors?.selectedSerialNumberSterilizer && (
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
              {errors?.selectedSerialNumberSterilizer && (
                <>
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="selectedSerialNumberSterilizer-error"
                  >
                    {errors.selectedSerialNumberSterilizer.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-3">
              {sterilizersMemo
                .filter(
                  (sterilizer) => sterilizer.serialNumber === selectedSterilizer
                )
                .map((sterilizer) => (
                  <div
                    key={sterilizer.id}
                    className={
                      "border-cyan-900 ring-2 ring-cyan-900 flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                    }
                  >
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <div className="block text-sm font-medium text-gray-900">
                          Marca: {sterilizer.brand}
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          Modelo: {sterilizer.model}
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          Número de serie: {sterilizer.serialNumber}
                        </div>
                        <div className="mt-6 text-sm font-medium text-gray-900">
                          Tipo de esterilizador: {sterilizer.sterilizerType}
                        </div>
                      </span>
                    </span>
                  </div>
                ))}
            </div>

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
                Resultado vial 1
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
                Resultado vial 2
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
                Resultado vial 3
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
            Guardar
          </button>
        </div>
      </form>
    </>
  );
};

export default AddReportPage;
