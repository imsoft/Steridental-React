import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AddressesPage from "./app/addresses";
import BillsPage from "./app/bills";
import OrdersPage from "./app/orders";
import ProfilePage from "./app/profile";
import ReportsPage from "./app/reports";
import SterilizersPage from "./app/sterilizers";
import HomePage from "./app/home";
import LoginPage from "./app/login";
import SignupPage from "./app/signup";
import CreateOrderPage from "./app/create-order";
import AddSterilizerPage from "./app/add-sterilizer";
import AddBillPage from "./app/add-bill";
import AddAddressPage from "./app/add-address";
import UpdateAddressPage from "./app/update-address";
import UpdateSterilizerPage from "./app/update-sterilizer";
import UpdateBillPage from "./app/update-billingInformation";
import AddReportPage from "./app/add-report";
import UpdateReportPage from "./app/update-report";
import ThankyouPage from "./app/thankyou";
import MyTestsPage from "./app/mytests";
import UpdateUserPage from "./app/update-user";
import ConfirmEmailPage from "./app/confirm-email";
import UpdatePasswordPage from "./app/update-password";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/addresses",
    element: <MainLayout />,
    children: [
        {
          index: true,
          element: <AddressesPage />,
        },
        {
          path: ':id',
          element: <UpdateAddressPage />,
        },
      ],
  },
  {
    path: "/bills",
    element: <MainLayout />,
    children: [
        {
          index: true,
          element: <BillsPage />,
        },
        {
          path: ':id',
          element: <UpdateBillPage />,
        },
      ],
  },
  {
    path: "/reports",
    element: <MainLayout />,
    children: [
        {
          index: true,
          element: <ReportsPage />,
        },
        {
          path: ':id',
          element: <UpdateReportPage />,
        },
      ],
  },
  {
    path: "/orders",
    element: <MainLayout />,
    children: [
        {
          index: true,
          element: <OrdersPage />,
        },
      ],
  },
  {
    path: "/profile",
    element: <MainLayout />,
    children: [
        {
          index: true,
          element: <ProfilePage />,
        },
        {
          path: ':id',
          element: <UpdateUserPage />,
        },
      ],
  },
  {
    path: "/reports",
    element: <MainLayout />,
    children: [
        {
          index: true,
          element: <ReportsPage />,
        },
      ],
  },
  {
    path: "/sterilizers",
    element: <MainLayout />,
    children: [
        {
          index: true,
          element: <SterilizersPage />,
        },
        {
          path: ':id',
          element: <UpdateSterilizerPage />,
        },
      ],
  },
  {
    path: "/create-order",
    element: <MainLayout />,
    children: [
        {
          index: true,
          element: <CreateOrderPage />,
        },
      ],
  },
  {
    path: "/add-sterilizer",
    element: <MainLayout />,
    children: [
        {
          index: true,
          element: <AddSterilizerPage />,
        },
      ],
  },
  {
    path: "/add-bill",
    element: <MainLayout />,
    children: [
        {
          index: true,
          element: <AddBillPage />,
        },
      ],
  },
  {
    path: "/add-address",
    element: <MainLayout />,
    children: [
        {
          index: true,
          element: <AddAddressPage />,
        },
      ],
  },
  {
    path: "/add-report",
    element: <MainLayout />,
    children: [
        {
          index: true,
          element: <AddReportPage />,
        },
      ],
  },
  {
    path: "/thankyou",
    element: <MainLayout />,
    children: [
        {
          index: true,
          element: <ThankyouPage />,
        },
      ],
  },
  {
    path: "/mytests",
    element: <MainLayout />,
    children: [
        {
          index: true,
          element: <MyTestsPage />,
        },
      ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/confirm-email",
    element: <ConfirmEmailPage />,
  },
  {
    path: "/update-password",
    element: <UpdatePasswordPage />,
  },
]);

export default router;
