import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const ThankYou = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen py-24 sm:px-6 sm:py-8 lg:px-8">
        <div className="relative isolate overflow-hidden bg-cyan-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#ECFEFF" />
                <stop offset={1} stopColor="#334444" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              ¡Gracias por tu pedido!
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Tu pedido ha sido procesado exitosamente. Nos encargaremos de
              enviar tu pedido a la dirección indicada de 2 a 3 dias.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Link
                to="/create-order"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Realizar otro pedido
              </Link>
              <Link
                className="flex -m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                to={`https://api.whatsapp.com/send?text=Hola, tengo una duda sobre la aplicación de Steridental.`}
                target="_blank"
              >
                <ChatBubbleBottomCenterTextIcon
                  className="h-6 w-6 text-cyan-200"
                  aria-hidden="true"
                />
                <span className="ml-2 text-gray-200">Contáctanos</span>
              </Link>
              <Link
                to="/"
                className="text-sm font-semibold leading-6 text-white"
              >
                Inicio <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src="premium-photo-1661507183946-559d65a5ad5e.jpeg"
              alt="App screenshot"
              width={1824}
              height={1080}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
