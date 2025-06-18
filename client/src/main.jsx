import { createRoot } from "react-dom/client";
import "./index.css";
//Rutas
import Home from "./pages/home/Home.jsx";
import NotFound from "./pages/no-found/NotFound";
import Login from "./pages/login/Login.jsx";


//Import para las rutas
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./layout/Layout.jsx";
import Inicio from "./pages/inicio/Inicio.jsx";
import MakeRifa from "./pages/rifas/MakeRifa.jsx";
import UserRifas from "./pages/user-rifa/UserRifas.jsx";
import BuyTicket from "./pages/buy-ticket/BuyTicket.jsx";
import RifasAll from "./pages/rifas/RifasAll.jsx";
import SeeTicketsUser from "./pages/buy-ticket/SeeTicketsUser.jsx";
import AboutNew from "./pages/about/AboutNew.jsx";
import Help from "./pages/about/Help.jsx";
import SorteoRifa from "./pages/sorteo/SorteoRifa.jsx";
import ViewWinUser from "./pages/user-rifa/components/ViewWinUser.jsx";

createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/crear/rifa" element={<MakeRifa />} />
          <Route path="/mis/rifas" element={<UserRifas />} />
          <Route path='/comprar/rifa/:rifaId' element={<BuyTicket />} />
          <Route path="/rifas" element={<RifasAll/>}/>
          <Route path='/boletos' element={<SeeTicketsUser/>}/>          <Route path="/sobre-nosotros" element={<AboutNew />}/>
          <Route path="ayuda" element={<Help />} />
          <Route path="/sorteo/:rifaId" element={<SorteoRifa />} />
          <Route path="/rifa/ganador/:rifaId" element={<ViewWinUser />} />
          <Route path="*" element={<NotFound />} />

          </Routes>
      </Layout>
    </BrowserRouter>
);
