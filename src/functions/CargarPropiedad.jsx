import { useState } from "react";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Heading,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  Flex,
  useDisclosure,
  DrawerBody
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { useData } from "../dataContext";
import { FiMenu } from "react-icons/fi";

export default function CargarPropiedad() {
  const { agregarPropiedad } = useData();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("Alquiler");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !descripcion || !precio || !imagen) {
      toast({ title: "Completa todos los campos.", status: "warning", duration: 2000, isClosable: true });
      return;
    }

    const nuevaPropiedad = { id: Date.now(), titulo, descripcion, tipo, precio: parseFloat(precio), imagen };
    agregarPropiedad(nuevaPropiedad);

    setTitulo("");
    setDescripcion("");
    setTipo("Alquiler");
    setPrecio("");
    setImagen("");
    toast({ title: "Propiedad cargada correctamente.", status: "success", duration: 2000, isClosable: true });
  };

  return (
    <Box>
      {/* Sidebar drawer para mobile */}
      <IconButton
        display={{ base: "flex", md: "none" }}
        icon={<FiMenu />}
        aria-label="Abrir menú"
        m={4}
        onClick={onOpen}
      />
      {/* Drawer (sidebar en mobile) */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="blue.900" color="white" maxW="230px">
          <DrawerBody p="0">
            {isOpen && <Sidebar />} {/* ← Solo renderiza cuando está abierto */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Flex>
        {/* Sidebar desktop */}
        <Box display={{ base: "none", md: "block" }} w="200px">
          <Sidebar />
        </Box>

        {/* Contenido principal */}
        <Box flex="1" p={{ base: 4, md: 6 }}>
          <Heading mb={6}>Cargar Propiedad</Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Título</FormLabel>
                <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ej: Casa en el centro" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Descripción</FormLabel>
                <Input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Detalles de la propiedad" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Tipo</FormLabel>
                <Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                  <option value="Alquiler">Alquiler</option>
                  <option value="Venta">Venta</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Precio</FormLabel>
                <Input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Ej: 250000" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>URL de imagen</FormLabel>
                <Input value={imagen} onChange={(e) => setImagen(e.target.value)} placeholder="https://..." />
              </FormControl>

              <Button type="submit" colorScheme="blue" mt={4}>
                Guardar Propiedad
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}
