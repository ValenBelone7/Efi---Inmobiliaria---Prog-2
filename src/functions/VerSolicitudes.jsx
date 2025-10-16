import { useState } from "react";
import { Box, Input, HStack, VStack, Text, Avatar, Button, Divider, Badge } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { useData } from "../dataContext";

export default function VerSolicitudes() {
  const { solicitudes, propiedades, actualizarSolicitud } = useData();
  const [busqueda, setBusqueda] = useState("");
  const [seleccionada, setSeleccionada] = useState(null);

  const solicitudesFiltradas = solicitudes.filter(s => s.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  const handleToggle = sol => setSeleccionada(seleccionada?.id === sol.id ? null : sol);

  const enviarWhatsApp = (telefono, nombre) => {
    const msg = encodeURIComponent(`Hola ${nombre}, te contacto desde la inmobiliaria por tu solicitud.`);
    window.open(`https://wa.me/${telefono.replace(/\D/g, "")}?text=${msg}`, "_blank");
  };

  const enviarCorreo = (email, nombre) => {
    const asunto = encodeURIComponent("Contacto desde la inmobiliaria");
    const cuerpo = encodeURIComponent(`Hola ${nombre}, te contacto respecto a tu solicitud.`);
    window.open(`mailto:${email}?subject=${asunto}&body=${cuerpo}`);
  };

  const marcarRespondida = id => actualizarSolicitud(id, { estado: "Respondida" });

  const estadoColor = { "En espera": "yellow", Respondida: "green" };

  return (
    <Box display="flex">
      <Sidebar />
      <Box ml="200px" p="6" w="100%">
        <Input placeholder="Buscar por nombre..." value={busqueda} onChange={e => setBusqueda(e.target.value)} mb={6} />
        {solicitudesFiltradas.map((s) => {
          const propiedad = propiedades.find(p => p.id === s.propiedadId);
          const esSeleccionada = seleccionada?.id === s.id;
          return (
            <Box key={s.id} borderWidth="1px" rounded="lg" mb={4} p={4} _hover={{ bg: "gray.50" }}>
              <HStack justify="space-between">
                <HStack>
                  <Avatar name={s.nombre} />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold">{s.nombre}</Text>
                    <Text fontSize="sm" color="gray.500">{propiedad?.titulo || "Propiedad eliminada"}</Text>
                  </VStack>
                </HStack>
                <HStack spacing={3}>
                  <Badge colorScheme={estadoColor[s.estado]}>{s.estado}</Badge>
                  <Button colorScheme="blue" onClick={() => handleToggle(s)}>{esSeleccionada ? "Ocultar" : "Ver detalles"}</Button>
                </HStack>
              </HStack>

              {esSeleccionada && (
                <Box mt={4} pl={12}>
                  <Divider mb={3} />
                  <VStack align="start" spacing={2}>
                    <Text><b>Email:</b> {s.email}</Text>
                    <Text><b>Teléfono:</b> {s.telefono}</Text>
                    <Text><b>Mensaje:</b> {s.mensaje}</Text>
                    <Text color="gray.500" fontSize="sm"><i>Fecha: {s.fecha}</i></Text>
                    <HStack mt={3} spacing={3}>
                      <Button colorScheme="green" onClick={() => enviarWhatsApp(s.telefono, s.nombre)}>WhatsApp</Button>
                      <Button colorScheme="teal" onClick={() => enviarCorreo(s.email, s.nombre)}>Correo</Button>
                      {s.estado === "En espera" && (
                        <Button colorScheme="yellow" onClick={() => marcarRespondida(s.id)}>Marcar como respondida</Button>
                      )}
                    </HStack>
                  </VStack>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
