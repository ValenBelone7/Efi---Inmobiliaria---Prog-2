import { useState } from "react";
import { Box, VStack, FormControl, FormLabel, Input, Select, Button, Heading, useToast } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { useData } from "../dataContext";

export default function CargarPropiedad() {
  const { agregarPropiedad } = useData();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("Alquiler");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !descripcion || !precio || !imagen) {
      toast({ title: "Completa todos los campos.", status: "warning", duration: 2000, isClosable: true });
      return;
    }

    const nuevaPropiedad = { id: Date.now(), titulo, descripcion, tipo, precio: parseFloat(precio), imagen };
    agregarPropiedad(nuevaPropiedad);

    setTitulo(""); setDescripcion(""); setTipo("Alquiler"); setPrecio(""); setImagen("");
    toast({ title: "Propiedad cargada correctamente.", status: "success", duration: 2000, isClosable: true });
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box ml="200px" p="6" w="100%">
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
            <Button type="submit" colorScheme="blue" mt={4}>Guardar Propiedad</Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
