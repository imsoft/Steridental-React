import { CheckIcon } from "@heroicons/react/24/outline";
import { ThankYou } from "../components/createOrder";

const steps = [
  { id: "01", name: "Datos del esterilizador" },
  { id: "02", name: "Datos de facturación" },
  { id: "03", name: "Datos de envio" },
  { id: "04", name: "Datos de Pago" },
  { id: "05", name: "¡Gracias!" },
];

const ThankyouPage = () => {
  return (
    <>
      <nav aria-label="Progress">
        <ol
          role="list"
          className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
        >
          {steps.map((stepItem) => (
            <li key={stepItem.id} className="relative md:flex md:flex-1">
              <div
                className={
                  "group flex w-full items-center px-6 py-4 text-sm font-medium"
                }
              >
                <span
                  className={
                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cyan-900 group-hover:bg-cyan-950"
                  }
                >
                  <CheckIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </span>
                <span className={"ml-4 text-sm font-medium text-cyan-900"}>
                  {stepItem.name}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>
      <ThankYou />
    </>
  );
};

export default ThankyouPage;
