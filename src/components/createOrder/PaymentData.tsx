import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useAuth, useOrderContext } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { Resolver, useForm } from "react-hook-form";
import {
  ArrowRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { axiosClient } from "../../config";
import Swal from "sweetalert2";

type FormData = {
  cardOwnerName: string;
  cardNumber: string;
  expirationDateMonth: string;
  expirationDateYear: string;
  securityCode: string;
  termsAndConditions: boolean;
  usePromo: string;
};

const resolver: Resolver<FormData> = async (values) => {
  return {
    values,
    errors: !values.usePromo
      ? {
          usePromo: {
            type: "required",
            message: "El campo usar promoción es requerido.",
          },
        }
      : !values.cardOwnerName
      ? {
          cardOwnerName: {
            type: "required",
            message:
              "El campo nombre del propietario de la tarjeta es requerido.",
          },
        }
      : !values.cardNumber
      ? {
          cardNumber: {
            type: "required",
            message: "El campo número de tarjeta es requerido.",
          },
        }
      : values.expirationDateMonth === "Seleccione una opción..."
      ? {
          expirationDateMonth: {
            type: "required",
            message: "El campo fecha de expiración mes es requerido.",
          },
        }
      : values.expirationDateYear === "Seleccione una opción..."
      ? {
          expirationDateYear: {
            type: "required",
            message: "El campo fecha de expiración año es requerido.",
          },
        }
      : !values.securityCode
      ? {
          securityCode: {
            type: "required",
            message: "El campo código de seguridad es requerido.",
          },
        }
      : values.termsAndConditions === false
      ? {
          termsAndConditions: {
            type: "required",
            message: "Seleccione la casilla de terminos y condiciones.",
          },
        }
      : {},
  };
};

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const years = [
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031",
  "2032",
  "2033",
  "2034",
  "2035",
];

const paymentMethods = [
  {
    id: "1",
    title: "Tarjeta de crédito o débito",
  },
  { id: "2", title: "Transferencia Bancaria (SPEI)" },
];

export const PaymentData = () => {
  const { user } = useAuth({ middleware: "auth" });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver });

  const {
    applyPromotionCode,
    applySharedCode,
    sterilizerData,
    sterilizerPrice,
    deliveryMethod,
    shippingInformation,
    billingInformation,
    deliveryCost,
    calculateSubtotal,
    calculateIVA,
    calculateTotal,
    billingOption,
  } = useOrderContext();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0]
  );

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (selectedPaymentMethod.title === "Transferencia Bancaria (SPEI)") {
      reset({
        cardOwnerName: "XXXXXX",
        cardNumber: "XXXXXX",
        expirationDateMonth: "03",
        expirationDateYear: "2000",
        securityCode: "XXXXXX",
        termsAndConditions: false,
      });
    } else if (selectedPaymentMethod.title === "Tarjeta de crédito o débito") {
      reset({
        cardOwnerName: "",
        cardNumber: "",
        expirationDateMonth: "Seleccione una opción...",
        expirationDateYear: "Seleccione una opción...",
        securityCode: "",
        termsAndConditions: false,
      });
    }
  }, [selectedPaymentMethod]);

  useEffect(() => {
    setTotal(calculateTotal());
  }, []);

  const onPaymentData = async ({ cardOwnerName, cardNumber }: FormData) => {
    if (applyPromotionCode) {
      try {
        await axiosClient.post(
          "/promotion_code",
          {
            promotionCode: applyPromotionCode,
            userEmail: user!.email,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }

    if (applySharedCode) {
      try {
        await axiosClient.put(
          `/promotion_code/${user!.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axiosClient.post(
        "/purchase_order",
        {
          sterilizerType: sterilizerData.sterilizerType,
          brand: sterilizerData.brand,
          model: sterilizerData.model,
          serialNumber: sterilizerData.serialNumber,

          billingOption: billingOption.title,
          companyName_bi: billingInformation.companyName,
          rfc_bi: billingInformation.rfc,
          taxStatusRegime_bi: billingInformation.taxStatusRegime,
          cfdi_bi: billingInformation.cfdi,
          street_bi: billingInformation.street,
          outdoorNumber_bi: billingInformation.outdoorNumber,
          interiorNumber_bi: billingInformation.interiorNumber,
          neighborhood_bi: billingInformation.neighborhood,
          postalCode_bi: billingInformation.postalCode,
          city_bi: billingInformation.city,
          state_bi: billingInformation.state,
          country_bi: billingInformation.country,

          deliveryMethod: deliveryMethod.title,
          name_dm: shippingInformation.name,
          lastName_dm: shippingInformation.lastName,
          phone_dm: shippingInformation.phone,
          email_dm: shippingInformation.email,
          street_dm: shippingInformation.street,
          outdoorNumber_dm: shippingInformation.outdoorNumber,
          interiorNumber_dm: shippingInformation.interiorNumber,
          neighborhood_dm: shippingInformation.neighborhood,
          postalCode_dm: shippingInformation.postalCode,
          city_dm: shippingInformation.city,
          state_dm: shippingInformation.state,
          country_dm: shippingInformation.country,

          deliveryCost,
          subtotal: calculateSubtotal(),
          total,

          paymentMethods: selectedPaymentMethod.title,
          cardOwnerName,
          cardNumber,
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
        title: "Orden agregada",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      console.log(error);
    }

    navigate("/thankyou");
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-xl">
            <h1 className="text-base font-medium text-cyan-900">
              Datos de pago
            </h1>
            <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Casi terminas
            </p>
            <p className="mt-2 text-base text-gray-500">
              Tus indicadores biológicos serán enviados por paquetería el
              siguiente día hábil.
            </p>

            {/* <dl className="mt-12 text-sm font-medium">
              <dt className="text-gray-900">Número de rastreo</dt>
              <dd className="mt-2 text-cyan-900">51547878755545848512</dd>
            </dl> */}
          </div>

          <div className="mt-10 border-t border-gray-200">
            <h2 className="sr-only">Your order</h2>

            <h3 className="sr-only">Items</h3>

            <div className="flex space-x-6 items-center justify-center border-b border-gray-200 py-10">
              <img
                src={"/vial-morado.webp"}
                alt={sterilizerData.sterilizerType}
                className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
                loading="lazy"
              />
              <div className="flex flex-auto flex-col">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Tipo de esterilizador: {sterilizerData.sterilizerType}
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    Marca: {sterilizerData.brand}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Modelo: {sterilizerData.model}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Número de serie: {sterilizerData.serialNumber}
                  </p>
                </div>
              </div>
            </div>

            <div className="sm:ml-40 sm:pl-6">
              <h3 className="sr-only">Your information</h3>

              <h4 className="sr-only">Addresses</h4>
              <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
                <div>
                  <dt className="font-medium text-gray-900">Datos de envio</dt>
                  <dd className="mt-2 text-gray-700">
                    <address className="not-italic">
                      <span className="block">
                        Nombre: {shippingInformation.name}
                      </span>
                      <span className="block">
                        Apellido: {shippingInformation.lastName}
                      </span>
                      <span className="block">
                        Correo electrónico: {shippingInformation.email}
                      </span>
                      <span className="block">
                        Teléfono: {shippingInformation.phone}
                      </span>
                      <span className="block">
                        Calle: {shippingInformation.street}
                      </span>
                      <span className="block">
                        Número exterior: #{shippingInformation.outdoorNumber}
                      </span>
                      <span className="block">
                        Número interior:{" "}
                        {shippingInformation.interiorNumber
                          ? `#${shippingInformation.interiorNumber}`
                          : "-"}
                      </span>
                      <span className="block">
                        Colonia: {shippingInformation.neighborhood}
                      </span>
                      <span className="block">
                        Código postal: {shippingInformation.postalCode}
                      </span>
                      <span className="block">
                        Estado: {shippingInformation.state}
                      </span>
                      <span className="block">
                        Ciudad: {shippingInformation.city}
                      </span>
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">
                    Datos de facturación
                  </dt>
                  {billingOption.title === "No facturar" ? (
                    <dd className="mt-2 text-gray-700">
                      Se decidio no facturar.
                    </dd>
                  ) : (
                    <dd className="mt-2 text-gray-700">
                      <address className="not-italic">
                        <span className="block">
                          Nombre de la compañia:{" "}
                          {billingInformation.companyName}
                        </span>
                        <span className="block">
                          RFC: {billingInformation.rfc}
                        </span>
                        <span className="block">
                          Calle: {billingInformation.street}
                        </span>
                        <span className="block">
                          Número exterior: #{billingInformation.outdoorNumber}
                        </span>
                        <span className="block">
                          Número interior:{" "}
                          {billingInformation.interiorNumber
                            ? `#${billingInformation.interiorNumber}`
                            : "-"}
                        </span>
                        <span className="block">
                          Colonia: {billingInformation.neighborhood}
                        </span>
                        <span className="block">
                          Código postal: {billingInformation.postalCode}
                        </span>
                        <span className="block">
                          Estado: {billingInformation.state}
                        </span>
                        <span className="block">
                          Ciudad: {billingInformation.city}
                        </span>
                        <span className="block">
                          Pais: {billingInformation.country}
                        </span>
                      </address>
                    </dd>
                  )}
                </div>
              </dl>

              {/* <h4 className="sr-only">Payment</h4>
              <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
                <div>
                  <dt className="font-medium text-gray-900">Método de pago</dt>
                  <dd className="mt-2 text-gray-700">
                    <p>Apple Pay</p>
                    <p>Mastercard</p>
                    <p>
                      <span aria-hidden="true">••••</span>
                      <span className="sr-only">Ending in </span>1545
                    </p>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Método en envio</dt>
                  <dd className="mt-2 text-gray-700">
                    <p>DHL</p>
                    <p>Takes up to 3 working days</p>
                  </dd>
                </div>
              </dl> */}

              <h3 className="sr-only">Summary</h3>

              <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Precio:</dt>
                  <dd className="text-gray-700">
                    $
                    {/* {getSterilizerPrice(sterilizerData.sterilizerType)?.toFixed(
                      2
                    )} */}
                    {sterilizerPrice?.toFixed(2)}
                  </dd>
                </div>

                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">
                    Costos de envío:
                  </dt>
                  <dd className="text-gray-700">${deliveryCost.toFixed(2)}</dd>
                </div>
                {/* <div className="flex justify-between">
                  <dt className="flex font-medium text-gray-900">
                    Discount
                    <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                      STUDENT50
                    </span>
                  </dt>
                  <dd className="text-gray-700">-$18.00 (50%)</dd>
                </div> */}
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Subtotal:</dt>
                  <dd className="text-gray-700">
                    ${calculateSubtotal().toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">IVA (16%):</dt>
                  <dd className="text-gray-900">
                    ${calculateIVA().toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Total:</dt>
                  <dd className="text-gray-900">${total.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-10">
            <RadioGroup
              value={selectedPaymentMethod}
              onChange={setSelectedPaymentMethod}
            >
              <RadioGroup.Label className="text-lg font-medium text-gray-900">
                Método de pago
              </RadioGroup.Label>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                {paymentMethods.map((paymentMethod) => (
                  <RadioGroup.Option
                    key={paymentMethod.id}
                    value={paymentMethod}
                    className={({ checked, active }) =>
                      `${checked ? "border-transparent" : "border-gray-300"} ${
                        active ? "ring-2 ring-cyan-800" : ""
                      } relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none`
                    }
                  >
                    {({ checked, active }) => (
                      <>
                        <span className="flex flex-1">
                          <span className="flex flex-col">
                            <RadioGroup.Label
                              as="span"
                              className="block text-sm font-medium text-gray-900"
                            >
                              {paymentMethod.title}
                            </RadioGroup.Label>
                          </span>
                        </span>
                        {checked ? (
                          <CheckCircleIcon
                            className="h-5 w-5 text-cyan-900"
                            aria-hidden="true"
                          />
                        ) : null}
                        <span
                          className={`${active ? "border" : "border-2"} ${
                            checked ? "border-cyan-900" : "border-transparent"
                          } pointer-events-none absolute -inset-px rounded-lg`}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>

          <form onSubmit={handleSubmit(onPaymentData)} className="space-y-6">
            {selectedPaymentMethod.title === "Tarjeta de crédito o débito" ? (
              <div className="pt-10">
                <h2 className="text-lg font-medium text-gray-900">
                  Tarjeta de débito o crédito
                </h2>

                <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                  <div className="col-span-4">
                    <label
                      htmlFor="name-on-card"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nombre (como aparece en la tarjeta)
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="name-on-card"
                        autoComplete="off"
                        className={`${
                          errors?.cardOwnerName
                            ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                        }`}
                        {...register("cardOwnerName")}
                      />
                      {errors?.cardOwnerName && (
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
                    {errors?.cardOwnerName && (
                      <>
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="cardOwnerName-error"
                        >
                          {errors.cardOwnerName.message}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="col-span-4">
                    <label
                      htmlFor="card-number"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Número de tarjeta
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="card-number"
                        autoComplete="off"
                        className={`${
                          errors?.cardNumber
                            ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                        }`}
                        {...register("cardNumber")}
                      />
                      {errors?.cardNumber && (
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
                    {errors?.cardNumber && (
                      <>
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="cardNumber-error"
                        >
                          {errors.cardNumber.message}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="col-span-3">
                    <label
                      htmlFor="CmbMonth"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Fecha de expiración (MM/YY)
                    </label>
                    <div className="mt-0.5 flex gap-4">
                      <div className="relative rounded-md shadow-sm">
                        <select
                          id="CmbMonth"
                          className={`${
                            errors?.expirationDateMonth
                              ? "block mt-1 w-full rounded-md border-0 py-2 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                              : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                          }`}
                          defaultValue="Seleccione una opción..."
                          {...register("expirationDateMonth")}
                        >
                          <option hidden>Seleccione una opción...</option>
                          {months.map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>

                        {errors?.expirationDateMonth && (
                          <>
                            <div className="flex pointer-events-none inset-y-0 right-0 items-center pr-4">
                              <ExclamationCircleIcon
                                className="h-5 w-5 text-red-500"
                                aria-hidden="true"
                              />
                              <p
                                className="mt-2 ml-2 text-sm text-red-600"
                                id="expirationDateMonth-error"
                              >
                                {errors.expirationDateMonth.message}
                              </p>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="relative rounded-md shadow-sm">
                        <select
                          id="CmbYear"
                          className={`${
                            errors?.expirationDateYear
                              ? "block mt-1 w-full rounded-md border-0 py-2 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                              : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                          }`}
                          defaultValue="Seleccione una opción..."
                          {...register("expirationDateYear")}
                        >
                          <option hidden>Seleccione una opción...</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>

                        {errors?.expirationDateYear && (
                          <>
                            <div className="pointer-events-none inset-y-0 right-0 flex items-center pr-4">
                              <ExclamationCircleIcon
                                className="h-5 w-5 text-red-500"
                                aria-hidden="true"
                              />
                              <p
                                className="mt-2 ml-2 text-sm text-red-600"
                                id="expirationDateYear-error"
                              >
                                {errors.expirationDateYear.message}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="cvc"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Código de seguridad
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="cvc"
                        autoComplete="off"
                        className={`${
                          errors?.securityCode
                            ? "block mt-1 w-full rounded-md border-0 py-1.5 px-3 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-800 focus:border-cyan-800 sm:text-sm"
                        }`}
                        {...register("securityCode")}
                      />
                      {errors?.securityCode && (
                        <>
                          <div className="pointer-events-none inset-y-0 right-0 flex items-center">
                            <ExclamationCircleIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                            <p
                              className="mt-2 ml-2 text-sm text-red-600"
                              id="securityCode-error"
                            >
                              {errors.securityCode.message}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="mt-6 flex space-x-2">
              <div className="flex h-5 items-center gap-2">
                <input
                  id="AceptTermsAndConds"
                  type="checkbox"
                  defaultChecked={false}
                  className="h-4 w-4 rounded border-gray-300 text-cyan-800 focus:ring-cyan-700"
                  {...register("termsAndConditions")}
                />
                <label
                  htmlFor="AceptTermsAndConds"
                  className="text-sm font-medium text-gray-900"
                >
                  Acepto los{" "}
                  <Link
                    to={"https://www.steridental.mx/terms_cond"}
                    target="_blank"
                    className="text-cyan-600"
                  >
                    Términos y condiciones
                  </Link>
                </label>
              </div>
              {errors?.termsAndConditions && (
                <>
                  <div className="pointer-events-none inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                    <p
                      className="ml-1 text-sm text-red-600"
                      id="termsAndConditions-error"
                    >
                      {errors.termsAndConditions.message}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end space-x-4 mt-4">
              <button
                type="submit"
                className="inline-flex items-center gap-x-2 rounded-md bg-cyan-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-900"
                disabled={selectedPaymentMethod === null}
              >
                Finalizar pedido
                <ArrowRightIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
