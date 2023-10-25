import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useShippingAddress } from "../hooks/useShippingAddress";

const AddressesPage = () => {
  const { shippingAddresses, getShippingAddressesData } = useShippingAddress();

  const shippingAddressesMemo = useMemo(
    () => shippingAddresses,
    [shippingAddresses]
  );

  useEffect(() => {
    getShippingAddressesData();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Mis direcciones de envío
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            En esta tabla podras ver todas las direcciones de envío.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to="/add-address"
            className="block rounded-md bg-cyan-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-900"
          >
            Agregar dirección
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
                    className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    ID
                  </th> */}
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Apellido
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Teléfono
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Correo electrónico
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Calle
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Número exterior
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Número interior
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Colonia
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Código Postal
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Ciudad
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Estado
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    País
                  </th>
                  <th
                    scope="col"
                    className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {shippingAddressesMemo.map((shippingAddress: any) => (
                  <tr key={shippingAddress.id} className="hover:bg-cyan-50">
                    {/* <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm font-medium text-gray-500">
                      {shippingAddress.id}
                    </td> */}
                    <td className="whitespace-nowrap px-2 py-5 text-sm text-gray-900">
                      {shippingAddress.name}
                    </td>
                    <td className="whitespace-nowrap px-2 py-5 text-sm text-gray-900">
                      {shippingAddress.lastName}
                    </td>
                    <td className="whitespace-nowrap px-2 py-5 text-sm text-gray-500">
                      {shippingAddress.phone}
                    </td>
                    <td className="whitespace-nowrap px-2 py-5 text-sm text-gray-500">
                      {shippingAddress.email}
                    </td>
                    <td className="whitespace-nowrap px-2 py-5 text-sm text-gray-500">
                      {shippingAddress.street}
                    </td>
                    <td className="whitespace-nowrap px-2 py-5 text-sm text-gray-500">
                      #{shippingAddress.outdoorNumber}
                    </td>
                    <td className="whitespace-nowrap px-2 py-5 text-sm text-gray-500">
                      {shippingAddress.interiorNumber
                        ? `#${shippingAddress.interiorNumber}`
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-2 py-5 text-sm text-gray-500">
                      {shippingAddress.neighborhood}
                    </td>
                    <td className="whitespace-nowrap px-2 py-5 text-sm text-gray-500">
                      {shippingAddress.postalCode}
                    </td>
                    <td className="whitespace-nowrap px-2 py-5 text-sm text-gray-500">
                      {shippingAddress.city}
                    </td>
                    <td className="whitespace-nowrap px-2 py-5 text-sm text-gray-500">
                      {shippingAddress.state}
                    </td>
                    <td className="whitespace-nowrap px-2 py-5 text-sm text-gray-500">
                      {shippingAddress.country}
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                      <Link
                        to={`/addresses/${shippingAddress.id}`}
                        className="text-cyan-900 hover:text-cyan-950"
                      >
                        Editar
                        <span className="sr-only">, {shippingAddress.id}</span>
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

export default AddressesPage;
