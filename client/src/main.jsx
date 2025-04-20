import { createRoot } from "react-dom/client";
import "./index.css";
//Rutas
import Home from "./pages/home/Home.jsx";
import NotFound from "./pages/no-found/NotFound";
import Login from "./pages/login/Login.jsx";


//Import para las rutas
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./layout/Layout.jsx";

createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
);
