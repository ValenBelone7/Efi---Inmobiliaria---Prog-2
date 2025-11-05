import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  FormControl,
  FormLabel,
  Flex,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Avatar,
} from "@chakra-ui/react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useData } from "../dataContext";
import { FiMenu } from "react-icons/fi";

export default function VerPropiedades() {
  const { propiedades, editarPropiedad, eliminarPropiedad } = useData();
  const [busqueda, setBusqueda] = useState("");
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const propiedadesFiltradas = propiedades.filter((p) =>
    (p.titulo || "").toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleEditar = (propiedad) => {
    setPropiedadSeleccionada({ ...propiedad });
    setModoEdicion(true);
    setMostrarEliminar(false);
    onOpen();
  };

  const handleEliminar = (propiedad) => {
    setPropiedadSeleccionada(propiedad);
    setMostrarEliminar(true);
    setModoEdicion(false);
    onOpen();
  };

  const guardarEdicion = () => {
    editarPropiedad(propiedadSeleccionada.id, propiedadSeleccionada);
    onClose();
  };

  const confirmarEliminar = () => {
    eliminarPropiedad(propiedadSeleccionada.id);
    onClose();
  };

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
      <SidebarDrawer isOpen={isOpen} onClose={onClose} />

      <Flex>
        {/* Sidebar desktop */}
        <Box display={{ base: "none", md: "block" }} w="200px">
          <Sidebar />
        </Box>

        {/* Contenido principal */}
        <Box flex="1" p={{ base: 4, md: 6 }}>
          <Input
            placeholder="Buscar propiedades..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            mb={6}
          />

        <VStack spacing={4} align="stretch">
          {propiedadesFiltradas.map((item) => (
            <HStack
              key={item.id}
              justify="space-between"
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg="gray.50"
              _dark={{ bg: "gray.800" }}
              _hover={{ bg: "gray.100", _dark: { bg: "gray.700" } }}
              transition="0.2s"
              flexWrap="wrap"
            >
              <HStack spacing={3} flex="1" minW={{ base: "100%", md: "auto" }}>
                <Avatar name={item.nombre} />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold">{item.nombre}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {item.detalle}
                  </Text>
                </VStack>
              </HStack>

              <Badge colorScheme="green">Activo</Badge>

              <HStack spacing={2}>
                <Button size="sm" colorScheme="blue">Ver</Button>
                <Button size="sm" colorScheme="yellow">Editar</Button>
                <Button size="sm" colorScheme="red">Eliminar</Button>
              </HStack>
            </HStack>
          ))}
        </VStack>


          {/* Modal */}
          {propiedadSeleccionada && (
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
              <ModalOverlay />
              <ModalContent>
                {modoEdicion && (
                  <>
                    <ModalHeader>Editar propiedad</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <VStack spacing={3} align="stretch">
                        {["titulo", "descripcion", "tipo", "precio", "imagen"].map((campo) => (
                          <FormControl key={campo}>
                            <FormLabel>{campo.charAt(0).toUpperCase() + campo.slice(1)}</FormLabel>
                            <Input
                              value={propiedadSeleccionada[campo]}
                              onChange={(e) =>
                                setPropiedadSeleccionada({
                                  ...propiedadSeleccionada,
                                  [campo]: campo === "precio" ? parseFloat(e.target.value) : e.target.value,
                                })
                              }
                            />
                          </FormControl>
                        ))}
                      </VStack>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={guardarEdicion}>
                        Guardar cambios
                      </Button>
                      <Button variant="ghost" onClick={onClose}>
                        Cancelar
                      </Button>
                    </ModalFooter>
                  </>
                )}

                {mostrarEliminar && (
                  <>
                    <ModalHeader>Eliminar propiedad</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text>
                        ¿Seguro que querés eliminar la propiedad <b>{propiedadSeleccionada.titulo}</b>?
                      </Text>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="red" mr={3} onClick={confirmarEliminar}>
                        Eliminar
                      </Button>
                      <Button variant="ghost" onClick={onClose}>
                        Cancelar
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

// Componente Drawer separado para mantener orden
function SidebarDrawer({ isOpen, onClose }) {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <Sidebar />
      </DrawerContent>
    </Drawer>
  );
}

