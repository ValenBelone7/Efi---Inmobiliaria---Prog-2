import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CargarContrato from "./functions/CargarContrato";
import VerContratos from "./functions/VerContratos";
import Home from "./pages/Home";
import Propiedades from "./pages/Propiedades";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import DetallePropiedad from "./pages/DetallePropiedad";
import CargarPropiedad from "./functions/CargarPropiedad";
import { useEffect, useState } from "react";
import VerSolicitudes from "./functions/VerSolicitudes";
import VerPropiedades from "./functions/VerPropiedades";

const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem("isAuth") === "true";
  return isAuth ? children : <Navigate to="/login" />;
};

function App() {
  const [propiedades, setPropiedades] = useState([]);

  // 🔹 Cargar propiedades del localStorage una sola vez
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("propiedades")) || [];
    setPropiedades(stored);
  }, []);

  // 🔹 Cada vez que cambien, guardarlas en localStorage
  useEffect(() => {
    localStorage.setItem("propiedades", JSON.stringify(propiedades));
  }, [propiedades]);

  // 🔹 Agregar nueva propiedad
  const agregarPropiedad = (nuevaPropiedad) => {
    const updated = [...propiedades, nuevaPropiedad];
    setPropiedades(updated);
    localStorage.setItem("propiedades", JSON.stringify(updated));
  };

  return (
    <Router>
      <Routes>
        {/* PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/propiedades"
          element={<Propiedades propiedades={propiedades} />}
        />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/propiedades/:id" element={<DetallePropiedad propiedades={propiedades} />} />

        {/* PRIVADAS */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/cargar"
          element={
            <PrivateRoute>
              <CargarContrato />
            </PrivateRoute>
          }
        />
        <Route
          path="/contratos"
          element={
            <PrivateRoute>
              <VerContratos propiedades={propiedades} />
            </PrivateRoute>
          }
        />
        <Route
          path="/cargar-propiedad"
          element={
            <PrivateRoute>
              <CargarPropiedad agregarPropiedad={agregarPropiedad} />
            </PrivateRoute>
          }
        />
        <Route
          path="/solicitudes"
          element={
            <PrivateRoute>
              <VerSolicitudes propiedades={propiedades} />
            </PrivateRoute>
          }
        />
        <Route
          path="/ver-propiedades"
          element={
            <PrivateRoute>
              <VerPropiedades propiedades={propiedades} setPropiedades={setPropiedades} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
