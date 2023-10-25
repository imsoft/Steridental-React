import { useContext, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import {
  BillingInformation,
  OrderSummary,
  PaymentData,
  ShippingInformation,
  SterilizerData,
  ThankYou,
} from "../components/createOrder";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { CreateOrderContext } from "../context";

const steps = [
  { id: "01", name: "Datos del esterilizador", status: "upcoming" },
  { id: "02", name: "Datos de facturación", status: "upcoming" },
  { id: "03", name: "Datos de envio", status: "upcoming" },
  { id: "04", name: "Datos de Pago", status: "upcoming" },
  { id: "05", name: "¡Gracias!", status: "upcoming" },
];

const CreateOrderPage = () => {
  const {
    sterilizerData,
    billingOption,
    billingInformation,
    deliveryMethod,
    shippingInformation,
  } = useContext(CreateOrderContext);

  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    if (step >= 5) return;
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step <= 1) return;
    setStep(step - 1);
  };

  return (
    <>
      <nav aria-label="Progress">
        <ol
          role="list"
          className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
        >
          {steps.map((stepItem, stepIdx) => (
            <li key={stepItem.id} className="relative md:flex md:flex-1">
              <div
                className={`${
                  stepIdx < step - 1
                    ? "group flex w-full items-center"
                    : "flex items-center"
                } ${
                  stepIdx === step - 1
                    ? "px-6 py-4 text-sm font-medium"
                    : "px-6 py-4 text-sm font-medium"
                }`}
              >
                <span
                  className={`${
                    stepIdx < step - 1
                      ? "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cyan-900 group-hover:bg-cyan-950"
                      : stepIdx === step - 1
                      ? "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-cyan-900"
                      : "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 text-gray-500 border-gray-300 group-hover:border-gray-400"
                  }`}
                >
                  {stepIdx < step - 1 ? (
                    <CheckIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      className={`${
                        stepIdx === step - 1
                          ? "text-cyan-900"
                          : stepIdx < step - 1
                          ? "text-white"
                          : "text-gray-500 group-hover:text-gray-900"
                      }`}
                    >
                      {stepItem.id}
                    </span>
                  )}
                </span>
                <span
                  className={`${
                    stepIdx === step - 1
                      ? "ml-4 text-sm font-medium text-cyan-900"
                      : "ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900"
                  }`}
                >
                  {stepItem.name}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      <div className={`${step <= 3 ? "grid grid-cols-1 sm:grid-cols-6" : ""}`}>
        <div
          className={`mx-auto max-w-7xl border-gray-200 ${
            step <= 3 ? "border-r sm:col-span-4" : ""
          } sm:px-6 lg:px-8`}
        >
          {step === 1 ? (
            <SterilizerData />
          ) : step === 2 ? (
            <BillingInformation />
          ) : step === 3 ? (
            <ShippingInformation />
          ) : step === 4 ? (
            <PaymentData />
          ) : step === 5 ? (
            <ThankYou />
          ) : (
            <></>
          )}
        </div>
        {step <= 3 ? <OrderSummary /> : <></>}
      </div>

      <div className="flex justify-end space-x-4 mt-4">
        {step <= 1 ? (
          <></>
        ) : (
          <button
            className="inline-flex items-center gap-x-2 rounded-md bg-cyan-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-900"
            onClick={handlePrevStep}
          >
            <ArrowLeftIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            anterior
          </button>
        )}

        {step >= 4 ? (
          <></>
        ) : (
          <button
            className="inline-flex items-center gap-x-2 rounded-md bg-cyan-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-900"
            onClick={handleNextStep}
            disabled={
              (sterilizerData.id === "" && step === 1) ||
              (billingOption._id === "" && step === 2) ||
              (billingOption.title !== "No facturar" &&
                billingInformation.id === "" &&
                step === 2) ||
              (deliveryMethod._id === "" && step === 3) ||
              (deliveryMethod._id !== "" &&
                shippingInformation.name === "" &&
                step === 3)
            }
          >
            siguiente
            <ArrowRightIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          </button>
        )}

      </div>
    </>
  );
};

export default CreateOrderPage;
