import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Bill, BillingOption } from "../../interfaces";
import { useBillingInformation, useOrderContext } from "../../hooks";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRightIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const billingOptions = [
  {
    _id: "1",
    title: "No facturar",
  },
  { _id: "2", title: "Facturar" },
];

export const BillingInformation = () => {
  const {
    billingInformation,
    setBillingInformation,
    billingOption,
    setBillingOption,
  } = useOrderContext();

  const { billingsInformation, getBillingsInformationData } =
    useBillingInformation();

  const billingsInformationMemo = useMemo(
    () => billingsInformation,
    [billingsInformation]
  );

  useEffect(() => {
    getBillingsInformationData();
  }, []);

  const onRadioOptionChangedBillingOption = (value: BillingOption) => {
    setBillingOption(value);

    if (value.title === "No facturar") {
      setBillingInformation({
        id: "XXXXXX",
        companyName: "XXXXXX",
        rfc: "XXXXXX",
        taxStatusRegime: "XXXXXX",
        cfdi: "XXXXXX",
        street: "XXXXXX",
        outdoorNumber: "XXXXXX",
        interiorNumber: "XXXXXX",
        neighborhood: "XXXXXX",
        postalCode: "XXXXXX",
        city: "XXXXXX",
        state: "XXXXXX",
        country: "XXXXXX",
      });
    }
  };

  const onRadioOptionChangedBill = (value: Bill) => {
    setBillingInformation(value);
  };

  return (
    <>
      <div className=" py-6 space-y-6">
        <RadioGroup
          value={billingOption}
          onChange={onRadioOptionChangedBillingOption}
        >
          <RadioGroup.Label className="text-lg font-medium text-gray-900">
            ¿Necesitas facturación?
          </RadioGroup.Label>

          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            {billingOptions.map((billingOption) => (
              <RadioGroup.Option
                key={billingOption._id}
                value={billingOption}
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
                          {billingOption.title}
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

        {billingOption.title === "" ? (
          <div className="bg-white">
            <div className="mx-auto w-full max-w-8xl px-1.5 pb-4 pt-4 sm:pb-6 lg:px-2">
              <div className="mx-auto mt-5 max-w-2xl text-center sm:mt-6">
                <p className="text-base font-semibold leading-8 text-cyan-500">
                  Steridental
                </p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Selecciona una opción de facturación ⬆️
                </h1>
                <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
                  Primero debes seleccionar una opción de facturación.
                </p>
              </div>
            </div>
          </div>
        ) : billingOption.title === "No facturar" ? (
          <div className="bg-white">
            <div className="mx-auto w-full max-w-8xl px-1.5 pb-4 pt-4 sm:pb-6 lg:px-2">
              <div className="mx-auto mt-5 max-w-2xl text-center sm:mt-6">
                <p className="text-base font-semibold leading-8 text-cyan-500">
                  Steridental
                </p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Sin factura para el pedido actual
                </h1>
                <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
                  Puede continuar con el pedido.
                </p>
              </div>
            </div>
          </div>
        ) : billingsInformationMemo.length === 0 ? (
          <div className="bg-white">
            <div className="mx-auto w-full max-w-7xl px-1.5 pb-4 pt-4 sm:pb-6 lg:px-2">
              <div className="mx-auto mt-5 max-w-2xl text-center sm:mt-6">
                <p className="text-base font-semibold leading-8 text-cyan-500">
                  Steridental
                </p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  No cuentas con datos de facturación
                </h1>
                <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
                  ¡Haz clic en el enlace para agregar nuevos datos de
                  facturación!
                </p>
              </div>
              <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
                <h2 className="sr-only">Popular pages</h2>
                <ul
                  role="list"
                  className="-mt-6 divide-y divide-gray-900/5 border-b border-gray-900/5"
                >
                  <li className="relative flex gap-x-6 py-6">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-sm ring-1 ring-gray-900/10">
                      <CurrencyDollarIcon
                        className="h-6 w-6 text-cyan-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-auto">
                      <h3 className="text-sm font-semibold leading-6 text-gray-900">
                        <Link to="/add-bill">
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          Agregar nuevos datos de facturación
                        </Link>
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        Te invitamos a agregar uno nuevo en nuestra sección de
                        datos de facturación.
                      </p>
                    </div>
                    <div className="flex-none self-center">
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </li>
                </ul>
                <div className="mt-10 flex justify-center">
                  <Link
                    to="/"
                    className="text-sm font-semibold leading-6 text-cyan-500"
                  >
                    <span aria-hidden="true">&larr;</span> Regresar al inicio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <RadioGroup
            value={billingInformation}
            onChange={onRadioOptionChangedBill}
          >
            <RadioGroup.Label className="mt-4 gap-y-6 text-base font-semibold leading-6 text-gray-900">
              Escoge un dato de facturación
            </RadioGroup.Label>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
              {billingsInformationMemo.map((bill) => (
                <RadioGroup.Option
                  key={bill.id}
                  value={bill}
                  className={({ active }) =>
                    `${
                      active
                        ? "border-cyan-900 ring-2 ring-cyan-900"
                        : "border-gray-300"
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
                            Nombre de la empresa: {bill.companyName}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            RFC: {bill.rfc}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Calle: {bill.street}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Número exterior: {bill.outdoorNumber}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Número interior:{" "}
                            {bill.interiorNumber
                              ? `#${bill.interiorNumber}`
                              : "-"}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Colonia: {bill.neighborhood}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Código postal: {bill.postalCode}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Ciudad: {bill.city}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Estado: {bill.state}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-6 text-sm font-medium text-gray-900"
                          >
                            País: {bill.country}
                          </RadioGroup.Description>
                        </span>
                      </span>
                      <CheckCircleIcon
                        className={`${
                          !checked ? "invisible" : ""
                        } h-5 w-5 text-cyan-900`}
                        aria-hidden="true"
                      />
                      <span
                        className={`${active ? "border" : "border-2"} ${
                          checked
                            ? "z-10 border-cyan-900"
                            : "border-transparent"
                        } pointer-events-none absolute -inset-px rounded-lg`}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        )}
      </div>
    </>
  );
};

export default BillingInformation;
