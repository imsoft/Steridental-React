import { Link } from "react-router-dom";
import { useSterilizer } from "../hooks";
import { useEffect, useMemo } from "react";

const SterilizersPage = () => {
  const { sterilizers, getSterilizersData } = useSterilizer();

  const sterilizersMemo = useMemo(() => sterilizers, [sterilizers]);

  useEffect(() => {
    getSterilizersData();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Mis Esterilizadores
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Aqui se mostraran los esterilizadores.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to="/add-sterilizer"
            className="block rounded-md bg-cyan-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-900"
          >
            Agregar esterilizador
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {/* <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    ID
                  </th> */}
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Tipo de esterilizador
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Marca
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Modelo
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Número de serie
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {sterilizersMemo.map((sterilizer) => (
                  <tr key={sterilizer.id} className="hover:bg-cyan-50">
                    {/* <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-900">
                          {sterilizer.id}
                        </div>
                      </div>
                    </td> */}
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">
                        {sterilizer.sterilizerType}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {sterilizer.brand}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {sterilizer.model}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {sterilizer.serialNumber}
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                      <Link
                        to={`/sterilizers/${sterilizer.id}`}
                        className="text-cyan-900 hover:text-cyan-950"
                      >
                        Editar
                        <span className="sr-only">, {sterilizer.id}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SterilizersPage;
