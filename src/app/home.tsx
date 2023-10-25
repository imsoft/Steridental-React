import { useAuth } from "../hooks";
import { Link } from "react-router-dom";
import {
  BanknotesIcon,
  TicketIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Uso: ",
    description:
      "Tu colega se registra e ingresa tu código al hacer un pedido.",
    icon: UserGroupIcon,
  },
  {
    name: "Descuento: ",
    description:
      "Ella / él recibirá su muestra gratis y tú también obtendrás un 50% de descuento en tu siguiente compra.*",
    icon: BanknotesIcon,
  },
];

const HomePage = () => {
  const { user } = useAuth({ middleware: "auth" });

  return (
    <div className="overflow-hidden bg-white py-2 sm:py-3">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-cyan-900">
                Steridental
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Bienvenido a tu portal personal de Steridental
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Steridental es un servicio que simplifica la validación de tu
                esterilizador. Nuestro servicio incluye tres indicadores
                biológicos para tu tipo de esterilizador, servicio de
                incubación, y la emisión del resultado de la validación.
                Recuerda agendar un servicio cada 2 meses para cumplir con la
                NOM-013-SSA2-2015.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Para solicitar tu servicio Steridental, haz click en Crear
                pedido en el menú de la izquierda y sigue las instrucciones.
                ¿Tienes alguna pregunta o comentario? Contáctanos al
                33-3364-6285 o por whatsapp al 55-4393-7524
              </p>
              <p className="mt-6 text-base leading-8 text-gray-600">
                ¿Quieres obtener un 50% de descuento en tu siguiente orden?
                Sigue estos pasos:
              </p>
              <ul className="mt-3 text-base leading-8 text-gray-600">
                <li>
                  <span className="inline font-semibold text-gray-900">
                    1.-
                  </span>{" "}
                  Invita a un colega a registrarse y hacer un pedido.
                </li>
                <li>
                  <span className="inline font-semibold text-gray-900">
                    2.-
                  </span>{" "}
                  Al momento de hacer el pedido deberá poner tu código de
                  invitación.
                </li>
                <li>
                  <span className="inline font-semibold text-gray-900">
                    3.-
                  </span>{" "}
                  Tu colega obtendrá un servicio gratuito y tú obtendrás un 50%
                  de descuento en tu siguiente órden.
                </li>
              </ul>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <TicketIcon
                      className="absolute left-1 top-1 h-5 w-5 text-cyan-900"
                      aria-hidden="true"
                    />
                    Código de invitación:
                  </dt>
                  <dd className="inline">
                    Tu código de invitación personal es: {user?.promotionCode}
                  </dd>
                </div>

                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-cyan-900"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="bg-white mt-4">
            <div className="py-6 sm:py-8">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Comparte tu código de promoción por whatsapp
              </h2>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  target="_blank"
                  to={`https://api.whatsapp.com/send?text=Hola, te invito a registrate en https://steridental.mx Al hacer un pedido usa mi código ${user?.promotionCode} para obtener 50% de descuento.`}
                  className="rounded-md bg-cyan-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-900"
                >
                  ¡Compartir código por Whatsapp!
                </Link>
              </div>
            </div>
            <img
              src="/autoclave_dental.webp"
              alt="Product screenshot"
              className="h-[20rem] max-h-none mt-4 rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
