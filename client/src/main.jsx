import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//Rutas
import Home from "./pages/home/home.jsx";
import Profile from "./pages/profile/Profile";
import App from "./App";
import NotFound from "./pages/no-found/NotFound";
import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import { AuthProvider } from "./context/AuthContext";

//Import para las rutas
import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
