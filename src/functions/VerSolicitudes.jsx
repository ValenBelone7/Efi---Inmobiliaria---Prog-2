import { useState } from "react";
import {
  Box,
  Input,
  HStack,
  VStack,
  Text,
  Avatar,
  Button,
  Divider,
  Badge,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { useData } from "../dataContext";
import { FiMenu } from "react-icons/fi";

export default function VerSolicitudes() {
  const { solicitudes, propiedades, actualizarSolicitud } = useData();
  const [busqueda, setBusqueda] = useState("");
  const [seleccionada, setSeleccionada] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const solicitudesFiltradas = solicitudes.filter((s) =>
    s.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleToggle = (sol) =>
    setSeleccionada(seleccionada?.id === sol.id ? null : sol);

  const enviarWhatsApp = (telefono, nombre) => {
    const msg = encodeURIComponent(
      `Hola ${nombre}, te contacto desde la inmobiliaria por tu solicitud.`
    );
    window.open(`https://wa.me/${telefono.replace(/\D/g, "")}?text=${msg}`, "_blank");
  };

  const enviarCorreo = (email, nombre) => {
    const asunto = encodeURIComponent("Contacto desde la inmobiliaria");
    const cuerpo = encodeURIComponent(`Hola ${nombre}, te contacto respecto a tu solicitud.`);
    window.open(`mailto:${email}?subject=${asunto}&body=${cuerpo}`);
  };

  const marcarRespondida = (id) => actualizarSolicitud(id, { estado: "Respondida" });

  const estadoColor = { "En espera": "yellow", Respondida: "green" };

  return (
    <Box>
      {/* Drawer mobile */}
      <IconButton
        display={{ base: "flex", md: "none" }}
        icon={<FiMenu />}
        aria-label="Abrir menú"
        m={4}
        onClick={onOpen}
      />
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <Sidebar />
        </DrawerContent>
      </Drawer>

      <Flex>
        {/* Sidebar desktop */}
        <Box display={{ base: "none", md: "block" }} w="200px">
          <Sidebar />
        </Box>

        {/* Contenido principal */}
        <Box flex="1" p={{ base: 4, md: 6 }}>
          <Input
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            mb={6}
          />

          {solicitudesFiltradas.map((s) => {
            const propiedad = propiedades.find((p) => p.id === s.propiedadId);
            const esSeleccionada = seleccionada?.id === s.id;
            return (
              <Box
                key={s.id}
                borderWidth="1px"
                rounded="lg"
                mb={4}
                p={4}
                _hover={{ bg: "gray.50" }}
              >
                <HStack justify="space-between" flexWrap="wrap">
                  <HStack spacing={3}>
                    <Avatar name={s.nombre} />
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold">{s.nombre}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {propiedad?.titulo || "Propiedad eliminada"}
                      </Text>
                    </VStack>
                  </HStack>
                  <HStack spacing={2} mt={{ base: 2, md: 0 }}>
                    <Badge colorScheme={estadoColor[s.estado]}>{s.estado}</Badge>
                    <Button size="sm" colorScheme="blue" onClick={() => handleToggle(s)}>
                      {esSeleccionada ? "Ocultar" : "Ver detalles"}
                    </Button>
                  </HStack>
                </HStack>

                {esSeleccionada && (
                  <Box mt={4} pl={{ base: 0, md: 12 }}>
                    <Divider mb={3} />
                    <VStack align="start" spacing={2}>
                      <Text>
                        <b>Email:</b> {s.email}
                      </Text>
                      <Text>
                        <b>Teléfono:</b> {s.telefono}
                      </Text>
                      <Text>
                        <b>Mensaje:</b> {s.mensaje}
                      </Text>
                      <Text color="gray.500" fontSize="sm">
                        <i>Fecha: {s.fecha}</i>
                      </Text>
                      <HStack spacing={2} wrap="wrap">
                        <Button size="sm" colorScheme="green" onClick={() => enviarWhatsApp(s.telefono, s.nombre)}>
                          WhatsApp
                        </Button>
                        <Button size="sm" colorScheme="teal" onClick={() => enviarCorreo(s.email, s.nombre)}>
                          Correo
                        </Button>
                        {s.estado === "En espera" && (
                          <Button size="sm" colorScheme="yellow" onClick={() => marcarRespondida(s.id)}>
                            Marcar como respondida
                          </Button>
                        )}
                      </HStack>
                    </VStack>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
}
