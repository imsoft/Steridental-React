import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Resolver, useForm } from "react-hook-form";
import { axiosClient } from "../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type FormData = {
  companyName: string;
  rfc: string;
  taxStatusRegime: string;
  cfdi: string;
  street: string;
  outdoorNumber: string;
  interiorNumber: string;
  neighborhood: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
};

const taxStatusRegimes = [
  "601 - General de Ley Personas Morales",
  "603 - Personas Morales con Fines no Lucrativos",
  "605 - Sueldos y Salarios e Ingresos Asimilados a Salarios",
  "606 - Arrendamiento",
  "607 - Régimen de Enajenación o Adquisición de Bienes",
  "608 - Demás ingresos",
  "609 - Consolidación",
  "610 - Residentes en el Extranjero sin Establecimiento Permanente en México",
  "611 - Ingresos por Dividendos (socios y accionistas)",
  "612 - Personas Físicas con Actividades Empresariales y Profesionales",
  "614 - Ingresos por intereses",
  "615 - Régimen de los ingresos por obtención de premios",
  "616 - Sin obligaciones fiscales",
  "620 - Sociedades Cooperativas de Producción que optan por diferir sus ingresos",
  "621 - Incorporación Fiscal",
  "622 - Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras",
  "623 - Opcional para Grupos de Sociedades",
  "624 - Coordinados",
  "625 - Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas",
  "626 - Régimen Simplificado de Confianza",
  "628 - Hidrocarburos",
  "629 - De los Regímenes Fiscales Preferentes y de las Empresas Multinacionales",
  "630 - Enajenación de acciones en bolsa de valores",
];

const CFDIS = [
  "G01 - ADQUISICIÓN DE MERCANCIAS",
  "G02 - DEVOLUCIONES, DESCUENTOS O BONIFICACIONES",
  "G03 - GASTOS EN GENERAL",
  "I01 - CONSTRUCCIONES",
  "I02 - MOBILIARIO Y EQUIPO DE OFICINA POR INVERSIONES",
  "I03 - EQUIPO DE TRANSPORTE",
  "I04 - EQUIPO DE COMPUTO Y ACCESORIOS",
  "I05 - DADOS, TROQUETES, MOLDES, MATRICES Y HERRAMIENTAS",
  "I06 - COMUNICACIONES TELEFÓNICAS",
  "I07 - COMUNICACIÓNES SATELITALES",
  "I08 - OTRA MAQUINARIA Y EQUIPO",
  "D01 - HONORARIOS MÉDICOS, DENTALES Y GASTOS HOSPITALARIOS",
  "D02 - GASTOS MÉDICOS POR INCAPACIDAD 0 DISCAPACIDAD",
  "D03 - GASTOS FUNERARIOS",
  "D04 - DONATIVOS",
  "D05 - INTERESES REALES EFECTIVAMENTE PAGADOS POR CRÉDITOS HIPOTECARIOS (CASA HABITACIÓN)",
  "D06 - APORTACIONES VOLUNTARIAS ALSAR",
  "D07 - PRIMAS POR SEGUROS DE GASTOS MÉDICOS",
  "D08 - GASTOS DE TRANSPORTACIÓN ESCOLAR OBLIGATORIAS",
  "D09 - DÉPOSITOS EN CUENTAS PARA EL AHORRO, PRIMAS QUE TENGAN COMO BASE PLANES DE PENSIONES",
  "D10 - PAGOS POR SERVICIO EDUCATIVOS (COLEGIATURAS)",
  "S01 - SIN EFECTOS FISCALES",
  "CP01 - PAGOS",
  "CN01 - NÓMINA",
];

const resolver: Resolver<FormData> = async (values) => {
  return {
    values,
    errors: !values.companyName
      ? {
          companyName: {
            type: "required",
            message: "El campo empresa es requerido.",
          },
        }
      : values.rfc === "Seleccione una opción..."
      ? {
          rfc: {
            type: "required",
            message: "El campo RFC es requerido.",
          },
        }
      : values.taxStatusRegime === "Seleccione una opción..."
      ? {
          taxStatusRegime: {
            type: "required",
            message: "El campo regimen de situación fiscal es requerido.",
          },
        }
      : !values.cfdi
      ? {
          cfdi: {
            type: "required",
            message: "El campo Uso del CFDI es requerido.",
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

const AddBillPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver });

  const onAddBill = async ({
    companyName,
    rfc,
    taxStatusRegime,
    cfdi,
    street,
    outdoorNumber,
    interiorNumber,
    neighborhood,
    postalCode,
    city,
    state,
    country,
  }: FormData) => {
    try {
      await axiosClient.post(
        "/billing_information",
        {
          companyName,
          rfc,
          taxStatusRegime,
          cfdi,
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
        title: "Datos de facturación agregados",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/bills");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onAddBill)} className="space-y-6">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Agregar datos de empresa
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Aquí podras agregar los datos de tu empresa.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="TxtCompanyName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Empresa
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtCompanyName"
                  autoComplete="off"
                  className={`${
                    errors?.companyName
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("companyName")}
                />
                {errors?.companyName && (
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
              {errors?.companyName && (
                <>
                  <p className="mt-2 text-sm text-red-600" id="companyName-error">
                    {errors.companyName.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="TxtRFC"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                RFC
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="TxtRFC"
                  autoComplete="off"
                  className={`${
                    errors?.rfc
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  {...register("rfc")}
                />
                {errors?.rfc && (
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
              {errors?.rfc && (
                <>
                  <p className="mt-2 text-sm text-red-600" id="rfc-error">
                    {errors.rfc.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="CmbTaxStatusRegime"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Regimen de situacion fiscal
              </label>

              <div className="relative rounded-md shadow-sm">
                <select
                  id="CmbTaxStatusRegime"
                  className={`${
                    errors?.taxStatusRegime
                      ? "block mt-1 w-full rounded-md border-0 py-2 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  defaultValue="Seleccione una opción..."
                  {...register("taxStatusRegime")}
                >
                  <option hidden>Seleccione una opción...</option>
                  {taxStatusRegimes.map((taxStatusRegime) => (
                    <option key={taxStatusRegime} value={taxStatusRegime}>
                      {taxStatusRegime}
                    </option>
                  ))}
                </select>

                {errors?.taxStatusRegime && (
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
              {errors?.taxStatusRegime && (
                <>
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="taxStatusRegime-error"
                  >
                    {errors.taxStatusRegime.message}
                  </p>
                </>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="CmbCFDI"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Uso del CFDI
              </label>

              <div className="relative rounded-md shadow-sm">
                <select
                  id="CmbCFDI"
                  className={`${
                    errors?.cfdi
                      ? "block mt-1 w-full rounded-md border-0 py-2 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                  }`}
                  defaultValue="Seleccione una opción..."
                  {...register("cfdi")}
                >
                  <option hidden>Seleccione una opción...</option>
                  {CFDIS.map((cfdi) => (
                    <option key={cfdi} value={cfdi}>
                      {cfdi}
                    </option>
                  ))}
                </select>

                {errors?.cfdi && (
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
              {errors?.cfdi && (
                <>
                  <p className="mt-2 text-sm text-red-600" id="cfdi-error">
                    {errors.cfdi.message}
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
            Guardar
          </button>
        </div>
      </form>
    </>
  );
};

export default AddBillPage;
