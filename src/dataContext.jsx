import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [propiedades, setPropiedades] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const storedProps = JSON.parse(localStorage.getItem("propiedades")) || [];
    const storedSol = JSON.parse(localStorage.getItem("solicitudes")) || [];
    setPropiedades(storedProps);
    setSolicitudes(storedSol);
  }, []);

  // Guardar en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("propiedades", JSON.stringify(propiedades));
  }, [propiedades]);

  useEffect(() => {
    localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
  }, [solicitudes]);

  // Propiedades
  const agregarPropiedad = (nueva) => setPropiedades(prev => [...prev, nueva]);
  const editarPropiedad = (id, datosActualizados) => {
    setPropiedades(prev => prev.map(p => (p.id === id ? { ...p, ...datosActualizados } : p)));
  };
  const eliminarPropiedad = (id) => setPropiedades(prev => prev.filter(p => p.id !== id));

  // Solicitudes
  const agregarSolicitud = (nueva) => setSolicitudes(prev => [...prev, nueva]);
  const actualizarSolicitud = (id, datosActualizados) => {
    setSolicitudes(prev => prev.map(s => (s.id === id ? { ...s, ...datosActualizados } : s)));
  };

  return (
    <DataContext.Provider
      value={{
        propiedades,
        agregarPropiedad,
        editarPropiedad,
        eliminarPropiedad,
        solicitudes,
        agregarSolicitud,
        actualizarSolicitud,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
