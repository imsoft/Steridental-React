import { Fragment, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ArchiveBoxIcon,
  Bars3Icon,
  ChatBubbleBottomCenterTextIcon,
  ClipboardDocumentIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  MapPinIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../hooks";

const socialMedia = [
  {
    name: "Facebook",
    href: `https://www.facebook.com/gammabiolabs`,
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-facebook"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: `https://www.instagram.com/gammabiolabs/`,
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-instagram"
        viewBox="0 0 16 16"
      >
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
      </svg>
    ),
  },
];

const navigation = [
  { name: "Inicio", href: "/", icon: HomeIcon },
  { name: "Pedidos", href: "/orders", icon: ArchiveBoxIcon },
  { name: "Direcciones", href: "/addresses", icon: MapPinIcon },
  {
    name: "Esterilizadores",
    href: "/sterilizers",
    icon: ComputerDesktopIcon,
  },
  {
    name: "Reportes",
    href: "/reports",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Datos de Facturación",
    href: "/bills",
    icon: CurrencyDollarIcon,
  },
];

const userNavigation = [{ name: "Mi Perfil", href: "/profile" }];

const MainLayout = () => {
  const { user, logout } = useAuth({ middleware: "auth" });
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-cyan-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <Link to="/" className="mt-5">
                        <img
                          className="h-8 w-auto"
                          src="/steridental_logo.png"
                          alt="Your Company"
                        />
                      </Link>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li className="mt-2">
                          <Link
                            to="/create-order"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800"
                          >
                            <ClipboardDocumentIcon
                              className="h-6 w-6 shrink-0 text-cyan-600 group-hover:text-cyan-800"
                              aria-hidden="true"
                            />
                            Crear orden
                          </Link>
                        </li>
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  className={`${
                                    item.href === location.pathname
                                      ? "bg-cyan-50 text-cyan-900"
                                      : "text-cyan-700 hover:text-cyan-900 hover:bg-cyan-50"
                                  } group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold`}
                                >
                                  <item.icon
                                    className={`${
                                      item.href === location.pathname
                                        ? "text-cyan-900"
                                        : "text-cyan-600 group-hover:text-cyan-900"
                                    } h-6 w-6 shrink-0`}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-cyan-600 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Link to="/" className="mt-5">
                <img
                  className="h-8 w-auto"
                  src="/steridental_logo.png"
                  alt="Your Company"
                />
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li className="mt-2">
                  <Link
                    to="/create-order"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 bg-cyan-800 text-cyan-50 hover:bg-cyan-700 hover:text-cyan-50"
                  >
                    <ClipboardDocumentIcon
                      className="h-6 w-6 shrink-0 text-cyan-50 group-hover:text-cyan-50"
                      aria-hidden="true"
                    />
                    Crear orden
                  </Link>
                </li>
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={`${
                            item.href === location.pathname
                              ? "bg-cyan-50 text-cyan-900"
                              : "text-cyan-700 hover:text-cyan-900 hover:bg-cyan-50"
                          } group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold`}
                        >
                          <item.icon
                            className={`${
                              item.href === location.pathname
                                ? "text-cyan-900"
                                : "text-cyan-600 group-hover:text-cyan-900"
                            } h-6 w-6 shrink-0`}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="https://gammabiolabs.nl/"
                    className="justify-center items-center group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-cyan-50 hover:text-cyan-800"
                  >
                    <span>Un servicio de</span>
                    <img
                      className="ml-1 h-16 w-auto shrink-0"
                      src="/gamma-biolabs-logo.png"
                      alt="Gamma Biolabs Logo"
                    />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
            <div className="flex h-16 items-center gap-x-4 border-b border-cyan-600 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-cyan-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Separator */}
              <div
                className="h-6 w-px bg-cyan-700 lg:hidden"
                aria-hidden="true"
              />

              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="flex-1" />

                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  <div className="flex space-x-6">
                    {socialMedia.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-cyan-700 hover:text-cyan-800"
                        target="_blank"
                      >
                        <span className="sr-only">{item.name}</span>
                        <item.icon aria-hidden="true" />
                      </Link>
                    ))}
                  </div>

                  {/* Separator */}
                  <div
                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-cyan-600"
                    aria-hidden="true"
                  />

                  <Link
                    className="flex -m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                    to={`https://api.whatsapp.com/send?text=Hola, tengo una duda sobre la aplicación de Steridental.`}
                    target="_blank"
                  >
                    <ChatBubbleBottomCenterTextIcon
                      className="h-6 w-6 text-cyan-800"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-cyan-800">Contáctanos</span>
                  </Link>

                  {/* Separator */}
                  <div
                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-cyan-600"
                    aria-hidden="true"
                  />

                  <div className="flex items-center gap-x-4 lg:gap-x-6">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative">
                      <Menu.Button className="-m-1.5 flex items-center p-1.5">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full bg-cyan-50"
                          src="/profile_picture.png"
                          alt=""
                        />
                        <span className="hidden lg:flex lg:items-center">
                          <span
                            className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                            aria-hidden="true"
                          >
                            {user?.name} {user?.lastName}
                          </span>
                          <ChevronDownIcon
                            className="ml-2 h-5 w-5 text-cyan-600"
                            aria-hidden="true"
                          />
                        </span>
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-cyan-900/5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.href}
                                  className={`${
                                    active ? "bg-cyan-50" : ""
                                  } block px-3 py-1 text-sm leading-6 text-gray-900`}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                          <button
                            className={`block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-cyan-50`}
                            onClick={logout}
                          >
                            Salir
                          </button>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
