import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Sterilizer } from "../../interfaces";
import { useOrderContext, useSterilizer } from "../../hooks";
import { useEffect, useMemo } from "react";
import {
  ChevronRightIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const SterilizerData = () => {
  const { sterilizers, getSterilizersData } = useSterilizer();

  const sterilizersMemo = useMemo(() => sterilizers, [sterilizers]);

  useEffect(() => {
    getSterilizersData();
  }, []);

  const { sterilizerData, setSterilizerData } = useOrderContext();

  const onRadioOptionChangedSterilizer = (value: Sterilizer) => {
    setSterilizerData(value);
  };

  return (
    <>
      {sterilizersMemo.length === 0 ? (
        <div className="bg-white">
          <div className="mx-auto w-full max-w-7xl px-1.5 pb-4 pt-4 sm:pb-6 lg:px-2">
            <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
              <h2 className="sr-only">Popular pages</h2>
              <ul
                role="list"
                className="-mt-6 divide-y divide-gray-900/5 border-b border-gray-900/5"
              >
                <li className="relative flex gap-x-6 py-6">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-sm ring-1 ring-gray-900/10">
                    <ComputerDesktopIcon
                      className="h-6 w-6 text-cyan-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-auto">
                    <h3 className="text-sm font-semibold leading-6 text-gray-900">
                      <Link
                        to="/add-sterilizer"
                        onClick={() => {
                          localStorage.setItem("lastRoute", "/create-order");
                        }}
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        Agregar nuevo esterilizador
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Registra tu esterilizador para generar un pedido.
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

            <div className="mx-auto mt-5 max-w-2xl text-center sm:mt-6">
              <p className="select-none text-base font-semibold leading-8 text-white">
                Steridental
              </p>
              <h1 className="select-none mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                No cuentas con esterilizadores
              </h1>
              <p className="select-none mt-4 text-base leading-7 text-white sm:mt-6 sm:text-lg sm:leading-8">
                ¡Haz clic en el enlace para agregar un nuevo esterilizador!
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-6">
          <RadioGroup
            value={sterilizerData}
            onChange={onRadioOptionChangedSterilizer}
          >
            <RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900">
              Escoge un esterilizador
            </RadioGroup.Label>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
              {sterilizersMemo.map((sterilizer) => (
                <RadioGroup.Option
                  key={sterilizer.id}
                  value={sterilizer}
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
                            Marca: {sterilizer.brand}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Modelo: {sterilizer.model}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            Número de serie: {sterilizer.serialNumber}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-6 text-sm font-medium text-gray-900"
                          >
                            Tipo de esterilizador: {sterilizer.sterilizerType}
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
        </div>
      )}
    </>
  );
};
