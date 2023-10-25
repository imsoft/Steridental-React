import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { usePurchaseOrder } from "../hooks";

// Fecha
// Número de pedido

const OrdersPage = () => {
  const { purchaseOrders, getPurchaseOrdersData } = usePurchaseOrder();

  const purchaseOrdersMemo = useMemo(() => purchaseOrders, [purchaseOrders]);

  useEffect(() => {
    getPurchaseOrdersData();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Pedidos
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Aqui se mostraran los pedidos realizados.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to="/create-order"
            className="block rounded-md bg-cyan-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-900"
          >
            Agregar pedido
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Fecha
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Número de pedido
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Datos del esterilizador
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Datos de facturación
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Datos de envio
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Datos de Pago
                  </th>
                  {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {purchaseOrdersMemo.map((order) => (
                  <tr key={order.id} className="hover:bg-cyan-50">
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-900">
                          {order.id}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">{order.date}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {order.purchaseOrderNumber}
                    </td>

                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {order.brand} <br />
                      {order.model} <br />
                      {order.serialNumber} <br />
                      {order.sterilizerType} <br />
                    </td>

                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {order.billingOption} <br />
                      {order.companyName_bi} <br />
                      {order.rfc_bi} <br />
                      {order.street_bi} <br />
                      {order.outdoorNumber_bi} <br />
                      {order.interiorNumber_bi} <br />
                      {order.neighborhood_bi} <br />
                      {order.postalCode_bi} <br />
                      {order.city_bi} <br />
                      {order.state_bi} <br />
                      {order.country_bi} <br />
                    </td>

                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {order.deliveryMethod} <br />
                      {order.name_dm} <br />
                      {order.lastName_dm} <br />
                      {order.email_dm} <br />
                      {order.street_dm} <br />
                      {order.outdoorNumber_dm} <br />
                      {order.interiorNumber_dm} <br />
                      {order.neighborhood_dm} <br />
                      {order.postalCode_dm} <br />
                      {order.city_dm} <br />
                      {order.state_dm} <br />
                      {order.phone_dm} <br />
                    </td>

                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {order.deliveryCost} <br />
                      {order.subtotal} <br />
                      {order.total} <br />
                      {order.paymentMethods} <br />
                      {order.cardOwnerName} <br />
                      {order.cardNumber} <br />
                    </td>

                    {/* <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {order.status === "Pedido completado" ? (
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Pedido completado
                        </span>
                      ) : order.status === "Pedido en proceso" ? (
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-green-600/20">
                          Pedido en proceso
                        </span>
                      ) : order.status === "Pedido cancelado" ? (
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20">
                          Pedido cancelado
                        </span>
                      ) : (
                        ""
                      )}
                    </td> */}

                    {/* <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <Link
                        to="#"
                        className="text-cyan-900 hover:text-cyan-950"
                      >
                        Edit
                        <span className="sr-only">, {order.sterilizer}</span>
                      </Link>
                    </td> */}
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

export default OrdersPage;
