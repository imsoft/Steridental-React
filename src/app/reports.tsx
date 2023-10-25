import { useAuth, useReport } from "../hooks";
import { useEffect, useMemo } from "react";
import { generateReport } from "../utils";
import { Report } from "../interfaces";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ReportsPage = () => {
  const { user } = useAuth({ middleware: "auth" });

  const { reports, getReportsData } = useReport();

  const reportsMemo = useMemo(() => reports, [reports]);

  useEffect(() => {
    getReportsData();
  }, []);

  const handleGenerateTicketClick = (reportData: Report) => {
    Swal.fire({
      title: "¿A quien va dirigido el reporte?",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#164E63",
      cancelButtonColor: "#d33",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        generateReport({
          id: reportData.id,
          reportNumber: reportData.reportNumber,
          date: reportData.date,
          teamNumber: reportData.teamNumber,
          resultVial1: reportData.resultVial1,
          resultVial2: reportData.resultVial2,
          resultVial3: reportData.resultVial3,
          comments: reportData.comments,
          userName: result.value,
          userLastName: "",
          userId: user?.id,
          sterilizerBrand: reportData.sterilizerBrand,
          sterilizerModel: reportData.sterilizerModel,
          sterilizerSerialNumber: reportData.sterilizerSerialNumber,
          sterilizerSterilizerType: reportData.sterilizerSterilizerType,
        });
      }
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Mis Reportes
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Aqui se mostraran los reportes.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to="/add-report"
            className="block rounded-md bg-cyan-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-900"
          >
            Agregar reporte
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
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Número de reporte
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
                    Autoclave
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Número de equipo
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Resultado Vial 1
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Resultado Vial 2
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Resultado Vial 3
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Comentarios
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Reporte
                  </th>
                  {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {reportsMemo.map((report) => (
                  <tr key={report.id} className="hover:bg-cyan-50">
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-900">
                          {report.id}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">{report.reportNumber}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {report.date}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {report.sterilizerSerialNumber} <br />
                      {report.sterilizerBrand} <br />
                      {report.sterilizerModel} <br />
                      {report.sterilizerSterilizerType} <br />
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {report.teamNumber}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {report.resultVial1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {report.resultVial2}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {report.resultVial3}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {report.comments}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <button
                        type="button"
                        onClick={() => handleGenerateTicketClick(report)}
                        className="text-cyan-900 hover:text-cyan-950"
                      >
                        <div className="flex gap-1">
                          <span>Ver reporte</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 36 36"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                            />
                          </svg>
                        </div>
                      </button>
                    </td>
                    {/* <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                      <Link
                        to={`/reports/${report.id}`}
                        className="text-cyan-900 hover:text-cyan-950"
                      >
                        Editar
                        <span className="sr-only">, {report.id}</span>
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

export default ReportsPage;
