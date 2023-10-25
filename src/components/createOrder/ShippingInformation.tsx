import { useEffect, useMemo } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { DeliveryMethod, ShippingAddress } from "../../interfaces";
import { useOrderContext, useShippingAddress } from "../../hooks";
import { Link } from "react-router-dom";
import { ChevronRightIcon, MapPinIcon } from "@heroicons/react/24/outline";

const branchesList = [
  {
    _id: "1",
    name: "Steridental",
    lastName: "-CDMX",
    phone: "+525550870787",
    email: "a.gentry@starfilters.mx",
    street: "Calle Ventura G. Tena",
    outdoorNumber: "250",
    interiorNumber: "",
    neighborhood: "Ampliación Asturias",
    postalCode: "06890",
    city: "Cuauhtémoc",
    state: "CDMX",
  },
  {
    _id: "2",
    name: "Steridental",
    lastName: "-Jalisco",
    phone: "+523333646285",
    email: "a.gentry@starfilters.mx",
    street: "San Eduardo",
    outdoorNumber: "88",
    interiorNumber: "3",
    neighborhood: "San Juan de Ocotán",
    postalCode: "45019",
    city: "Zapopan",
    state: "Jalisco",
  },
];

const deliveryMethods = [
  {
    _id: "1",
    title: "Recoger en sucursal",
  },
  { _id: "2", title: "Envio a domicilio" },
];

export const ShippingInformation = () => {
  const { shippingAddresses, getShippingAddressesData } = useShippingAddress();

  const shippingAddressesMemo = useMemo(
    () => shippingAddresses,
    [shippingAddresses]
  );

  useEffect(() => {
    getShippingAddressesData();
  }, []);

  const {
    shippingInformation,
    setShippingInformation,
    deliveryMethod,
    setDeliveryMethod,
    setDeliveryCost,
  } = useOrderContext();

  const onRadioOptionChangedShipping = (value: ShippingAddress) => {
    setShippingInformation(value);
  };

  const onRadioOptionChangedDeliveryMethod = (value: DeliveryMethod) => {
    setDeliveryMethod(value);
  };

  useEffect(() => {
    if (deliveryMethod.title === "Recoger en sucursal") {
      setDeliveryCost(0);
    } else if (
      shippingInformation.city === "Zona Metropolitana de Guadalajara" ||
      shippingInformation.city === "Guadalajara" ||
      shippingInformation.city === "guadalajara" ||
      shippingInformation.city === "GDL" ||
      shippingInformation.city === "gdl" ||
      shippingInformation.city === "Zapopan" ||
      shippingInformation.city === "zapopan" ||
      shippingInformation.city === "Tlaquepaque" ||
      shippingInformation.city === "tlaquepaque" ||
      shippingInformation.city === "Tonala" ||
      shippingInformation.city === "Tonalá" ||
      shippingInformation.city === "tonala" ||
      shippingInformation.city === "tonalá" ||
      shippingInformation.city === "Tlajomulco de Zúñiga" ||
      shippingInformation.city === "tlajomulco de zúñiga" ||
      shippingInformation.city === "El Salto" ||
      shippingInformation.city === "El salto" ||
      shippingInformation.city === "el salto" ||
      shippingInformation.city === "Ixtlahuacán de los membrillos" ||
      shippingInformation.city === "ixtlahuacán de los membrillos" ||
      shippingInformation.city === "Ixtlahuacan de los membrillos" ||
      shippingInformation.city === "ixtlahuacan de los membrillos" ||
      shippingInformation.city === "cuauhtémoc" ||
      shippingInformation.city === "Cuauhtémoc" ||
      shippingInformation.city === "Cuauhtemoc" ||
      shippingInformation.city === "Cuauhtemoc" ||
      shippingInformation.city === "cdmx" ||
      shippingInformation.city === "CDMX" ||
      shippingInformation.city === "ciudad de mexico" ||
      shippingInformation.city === "ciudad de méxico" ||
      shippingInformation.city === "Ciudad de mexico" ||
      shippingInformation.city === "Ciudad de méxico" ||
      shippingInformation.city === "Ciudad de Mexico" ||
      shippingInformation.city === "Ciudad de México"
    ) {
      setDeliveryCost(80);
    } else {
      setDeliveryCost(250);
    }
  }, [deliveryMethod, shippingInformation]);

  return (
    <>
      <div className="py-6 space-y-6">
        <RadioGroup
          value={deliveryMethod}
          onChange={onRadioOptionChangedDeliveryMethod}
        >
          <div className="flex flex-col">
            <RadioGroup.Label className="text-lg font-medium text-gray-900">
              ¿Cómo gustarías recibir tu pedido?
            </RadioGroup.Label>
            <RadioGroup.Label className="text-sm font-light text-gray-700">
              de 2-3 dias enviamos tu pedido
            </RadioGroup.Label>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            {deliveryMethods.map((deliveryMethod) => (
              <RadioGroup.Option
                key={deliveryMethod._id}
                value={deliveryMethod}
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
                          {deliveryMethod.title}
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

        {deliveryMethod.title === "" ? (
          <div className="bg-white">
            <div className="mx-auto w-full max-w-8xl px-1.5 pb-4 pt-4 sm:pb-6 lg:px-2">
              <div className="mx-auto mt-5 max-w-2xl text-center sm:mt-6">
                <p className="text-base font-semibold leading-8 text-cyan-500">
                  Steridental
                </p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Selecciona una opción de envío ⬆️
                </h1>
                <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
                  Primero debes seleccionar una opción de envio.
                </p>
              </div>
            </div>
          </div>
        ) : deliveryMethod.title === "Recoger en sucursal" ? (
          <RadioGroup
            value={shippingInformation}
            onChange={onRadioOptionChangedShipping}
          >
            <RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900">
              Recoger en sucursal
            </RadioGroup.Label>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
              {branchesList.map((address) => (
                <RadioGroup.Option
                  key={address._id}
                  value={address}
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
                            Nombre: {address.name} {address.lastName}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Correo electrónico: {address.email}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Calle: {address.street}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Número exterior: #{address.outdoorNumber}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Número interior:{" "}
                            {address.interiorNumber
                              ? `#${address.interiorNumber}`
                              : "-"}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Colonia: {address.neighborhood}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Código Postal: {address.postalCode}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Ciudad: {address.city}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Estado: {address.state}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-6 text-sm font-medium text-gray-900"
                          >
                            Teléfono: {address.phone}
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
        ) : shippingAddressesMemo.length === 0 ? (
          <div className="bg-white">
            <div className="mx-auto w-full max-w-7xl px-1.5 pb-4 pt-4 sm:pb-6 lg:px-2">
              <div className="mx-auto mt-5 max-w-2xl text-center sm:mt-6">
                <p className="text-base font-semibold leading-8 text-cyan-500">
                  Steridental
                </p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  No cuentas con datos de envío
                </h1>
                <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
                  ¡Haz clic en el enlace para agregar nuevos datos de envío!
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
                      <MapPinIcon
                        className="h-6 w-6 text-cyan-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-auto">
                      <h3 className="text-sm font-semibold leading-6 text-gray-900">
                        <Link to="/add-address">
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
            value={shippingInformation}
            onChange={onRadioOptionChangedShipping}
          >
            <RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900">
              Escoge un dato de envío
            </RadioGroup.Label>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
              {shippingAddressesMemo.map((address) => (
                <RadioGroup.Option
                  key={address.id}
                  value={address}
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
                            Nombre: {address.name} {address.lastName}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Correo electrónico: {address.email}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Calle: {address.street}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Número exterior: #{address.outdoorNumber}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Número interior:{" "}
                            {address.interiorNumber
                              ? `#${address.interiorNumber}`
                              : "-"}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Colonia: {address.neighborhood}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Código Postal: {address.postalCode}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Ciudad: {address.city}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Estado: {address.state}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-6 text-sm font-medium text-gray-900"
                          >
                            Teléfono: {address.phone}
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
