import { Box, Image, Heading, Text, Badge, VStack, HStack, Button, Container, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input } from "@chakra-ui/react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useData } from "../dataContext";

const MotionBox = motion(Box);

export default function DetallePropiedad() {
  const { id } = useParams();
  const { propiedades, agregarSolicitud } = useData();
  const propiedad = propiedades.find((p) => String(p.id) === id);

  const [isOpen, setIsOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  if (!propiedad) {
    return (
      <Box textAlign="center" py={20} color="gray.300" bg="gray.900" minH="100vh">
        <Heading fontSize="3xl" mb={4}>Propiedad no encontrada</Heading>
        <Button as={RouterLink} to="/propiedades" colorScheme="teal">Volver al catálogo</Button>
      </Box>
    );
  }

  const esVenta = propiedad.tipo === "Venta";
  const colorBase = esVenta ? "teal.300" : "yellow.300";

  const handleEnviarSolicitud = () => {
    const nuevaSolicitud = {
      id: Date.now(),
      propiedadId: propiedad.id,
      nombre,
      email,
      telefono,
      mensaje,
      fecha: new Date().toLocaleString(),
      estado: "En espera",
    };
    agregarSolicitud(nuevaSolicitud);
    setIsOpen(false);
    setNombre(""); setEmail(""); setTelefono(""); setMensaje("");
  };

  return (
    <Box bg="gray.900" color="white" minH="100vh" py={20}>
      <Container maxW="6xl">
        <MotionBox display={{ base: "block", md: "flex" }} alignItems="center" gap={10} bg="whiteAlpha.100" rounded="xl" shadow="2xl" overflow="hidden" p={6} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Box flex="1" minW="300px" overflow="hidden" rounded="lg">
            <Image src={propiedad.imagen || "/placeholder.jpg"} alt={propiedad.titulo} w="100%" h="100%" objectFit="cover" />
          </Box>

          <VStack align="start" spacing={5} flex="1">
            <HStack spacing={3}>
              <Badge colorScheme={esVenta ? "teal" : "yellow"} px={3} py={1} rounded="full">{propiedad.tipo}</Badge>
              <Text fontWeight="bold" fontSize="xl" color={colorBase}>${propiedad.precio.toLocaleString()}</Text>
            </HStack>

            <Heading fontSize={{ base: "2xl", md: "3xl" }}>{propiedad.titulo}</Heading>
            <Text fontSize="lg" color="gray.300">{propiedad.descripcion}</Text>

            <HStack pt={4}>
              <Button bg={colorBase} color="gray.900" fontWeight="bold" size="md" rounded="full" _hover={{ bg: "white", color: "gray.900", transform: "scale(1.05)" }} onClick={() => setIsOpen(true)}>
                {esVenta ? "Comprar" : "Alquilar"}
              </Button>

              <Button as={RouterLink} to="/propiedades" variant="outline" borderColor="gray.500" color="white" _hover={{ bg: "whiteAlpha.200" }}>Volver al Catálogo</Button>
            </HStack>
          </VStack>
        </MotionBox>
      </Container>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Formulario de solicitud</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              <Input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
              <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <Input placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />
              <Input placeholder="Mensaje" value={mensaje} onChange={e => setMensaje(e.target.value)} />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEnviarSolicitud}>Enviar</Button>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
