import { Box, Container, Heading, SimpleGrid, Select, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroPropiedades from "../components/HeroPropiedades";
import CardCatalog from "../components/CardCatalog";
import { useData } from "../dataContext";

const MotionBox = motion(Box);

export default function Propiedades() {
  const { propiedades } = useData();
  const [filtro, setFiltro] = useState("Todas");
  const propiedadesFiltradas = filtro === "Todas" ? propiedades : propiedades.filter((p) => p.tipo === filtro);

  return (
    <Box bgGradient="linear(to-b, gray.900, gray.900)" color="white" minH="100vh">
      <Navbar />
      <HeroPropiedades />
      <Container maxW="7xl" py={16}>
        <VStack spacing={2} mb={10} textAlign="center">
          <Heading fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" position="relative" _after={{ content: '""', position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)", w: "80px", h: "3px", bgGradient: "linear(to-r, teal.400, green.300)", borderRadius: "full" }}>Catálogo de Propiedades</Heading>
          <Text color="gray.400" fontSize="lg">Encontrá tu próxima inversión o tu nuevo hogar.</Text>
        </VStack>

        <Select
          bg="whiteAlpha.100"
          border="1px solid rgba(255,255,255,0.2)"
          color="white"
          maxW="240px"
          mx="auto"
          mb={10}
          textAlign="center"
          _hover={{ borderColor: "teal.300" }}
          _focus={{ borderColor: "teal.300", boxShadow: "0 0 0 1px teal.300" }}
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option style={{ background: "#1A202C" }} value="Todas">Todas</option>
          <option style={{ background: "#1A202C" }} value="Venta">Venta</option>
          <option style={{ background: "#1A202C" }} value="Alquiler">Alquiler</option>
        </Select>

        {propiedadesFiltradas.length === 0 ? (
          <Text textAlign="center" color="gray.500" fontSize="lg">No hay propiedades cargadas.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
            {propiedadesFiltradas.map((prop) => (
              <CardCatalog
                key={prop.id}
                id={prop.id}
                titulo={prop.titulo}
                descripcion={prop.descripcion}
                precio={prop.precio}
                tipo={prop.tipo}
                imagen={prop.imagen}
              />
            ))}
          </SimpleGrid>
        )}
      </Container>
      <Footer />
    </Box>
  );
}
