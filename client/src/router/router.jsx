import { createBrowserRouter } from "react-router-dom";
import React from "react";

const Inicio = React.lazy(() => import("../pages/inicio/Inicio"));
const Login = React.lazy(() => import("../pages/login/Login"));
const MakeRifa = React.lazy(() => import("../pages/rifas/MakeRifa"));
const UserRifas = React.lazy(() => import("../pages/user-rifa/UserRifas"));
const BuyTicket = React.lazy(() => import("../pages/buy-ticket/BuyTicket"));
const RifasAll = React.lazy(() => import("../pages/rifas/RifasAll"));
const SeeTicketsUser = React.lazy(() => import("../pages/buy-ticket/SeeTicketsUser"));
const AboutNew = React.lazy(() => import("../pages/about/AboutNew"));
const Help = React.lazy(() => import("../pages/about/Help"));
const SorteoRifa = React.lazy(() => import("../pages/sorteo/SorteoRifa"));
const ViewWinUser = React.lazy(() => import("../pages/user-rifa/components/ViewWinUser"));
const NotFound = React.lazy(() => import("../pages/no-found/NotFound"));

import Layout from "../layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Inicio />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "crear/rifa",
        element: <MakeRifa />,
      },
      {
        path: "mis/rifas",
        element: <UserRifas />,
      },
      {
        path: "comprar/rifa/:rifaId",
        element: <BuyTicket />,
      },
      {
        path: "rifas",
        element: <RifasAll />,
      },
      {
        path: "boletos",
        element: <SeeTicketsUser />,
      },
      {
        path: "sobre-nosotros",
        element: <AboutNew />,
      },
      {
        path: "ayuda",
        element: <Help />,
      },
      {
        path: "sorteo/:rifaId",
        element: <SorteoRifa />,
      },
      {
        path: "rifa/ganador/:rifaId",
        element: <ViewWinUser />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;