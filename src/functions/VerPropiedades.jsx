import { Box, VStack, HStack, Image, Text, Button, Badge, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, useDisclosure, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useData } from "../dataContext";

export default function VerPropiedades() {
  const { propiedades, editarPropiedad, eliminarPropiedad } = useData();
  const [busqueda, setBusqueda] = useState("");
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
    toast({ title: "Propiedad actualizada.", status: "success", duration: 2000, isClosable: true });
    onClose();
  };

  const confirmarEliminar = () => {
    eliminarPropiedad(propiedadSeleccionada.id);
    toast({ title: "Propiedad eliminada.", status: "info", duration: 2000, isClosable: true });
    onClose();
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box ml="200px" p="6" w="100%">
        <Input placeholder="Buscar propiedades..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} mb={6} />

        <VStack spacing={4} align="stretch">
          {propiedadesFiltradas.map((p) => (
            <HStack key={p.id} borderWidth="1px" rounded="lg" overflow="hidden" p={4} justify="space-between">
              <HStack>
                <Image src={p.imagen} boxSize="100px" objectFit="cover" />
                <VStack align="start">
                  <Text fontWeight="bold">{p.titulo}</Text>
                  <Badge colorScheme={p.tipo === "Alquiler" ? "blue" : "green"}>{p.tipo}</Badge>
                  <Text>${p.precio}</Text>
                </VStack>
              </HStack>
              <HStack>
                <Button colorScheme="yellow" onClick={() => handleEditar(p)}>Editar</Button>
                <Button colorScheme="red" onClick={() => handleEliminar(p)}>Eliminar</Button>
              </HStack>
            </HStack>
          ))}
        </VStack>

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
                      {["titulo","descripcion","tipo","precio","imagen"].map((campo) => (
                        <FormControl key={campo}>
                          <FormLabel>{campo.charAt(0).toUpperCase() + campo.slice(1)}</FormLabel>
                          <Input
                            value={propiedadSeleccionada[campo]}
                            onChange={(e) =>
                              setPropiedadSeleccionada({...propiedadSeleccionada, [campo]: campo==="precio"? parseFloat(e.target.value) : e.target.value})
                            }
                          />
                        </FormControl>
                      ))}
                    </VStack>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={guardarEdicion}>Guardar cambios</Button>
                    <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                  </ModalFooter>
                </>
              )}

              {mostrarEliminar && (
                <>
                  <ModalHeader>Eliminar propiedad</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>¿Seguro que querés eliminar la propiedad <b>{propiedadSeleccionada.titulo}</b>?</Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={confirmarEliminar}>Eliminar</Button>
                    <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
      </Box>
    </Box>
  );
}
