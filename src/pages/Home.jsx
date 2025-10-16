import { Box, Container, Heading, Divider, Image, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

export default function Home() {
  const propiedades = [
    {
      id: 1,
      titulo: "Departamento 2 Ambientes",
      img: "/dos-ambientes.jpg",
      precio: "USD 75,000",
      tipo: "Venta",
    },
    {
      id: 2,
      titulo: "Casa con patio",
      img: "/casa-patio.jpg",
      precio: "USD 120,000",
      tipo: "Venta",
    },
    {
      id: 3,
      titulo: "Monoambiente céntrico",
      img: "/monoambiente.jpg",
      precio: "$150,000 / mes",
      tipo: "Alquiler",
    },
  ];

  return (
    <Box bg={"gray.800"}>
      <Navbar />
      <Hero />

      {/* Propiedades Destacadas */}
      <Container maxW="7xl" py={16}>
        <Heading size="lg" mb={4} textAlign="center" color="white">
          Propiedades Destacadas
        </Heading>

        {/* Línea separadora */}
        <Divider borderColor="white" borderWidth="1px" mb={4} width="60%" margin="0 auto" />

        {/* Glass Cards estilo Uiverse */}
        <Box
          py={16}
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          position="relative"
          minH={500}
          mt={12}
        >
          {propiedades.map((prop, index) => {
            const rotations = [-15, 5, 25]; // rotaciones iniciales
            return (
              <Box
                key={prop.id}
                position="relative"
                width="380px"
                height="420px"
                mx={index === 0 ? "-45px" : "-45px"}
                borderRadius="10px"
                overflow="hidden"
                bg="whiteAlpha.200"
                border="1px solid rgba(255,255,255,0.1)"
                boxShadow="0 25px 25px rgba(0,0,0,0.25)"
                backdropFilter="blur(10px)"
                transform={`rotate(${rotations[index]}deg)`}
                transition="all 0.5s ease"
                _hover={{
                  transform: "rotate(0deg)",
                  mx: "10px",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  src={prop.img}
                  alt={prop.titulo}
                  objectFit="cover"
                  boxSize="100%"
                  transition="transform 0.5s ease"
                  _hover={{ transform: "scale(1.05)" }}
                />

                {/* Texto inferior con fondo gris y letras blancas */}
                <Box
                  position="absolute"
                  bottom="0"
                  w="100%"
                  bg="gray.700"
                  color="white"
                  fontSize="2sm"
                  textAlign="center"
                  py={2}
                  px={1}
                >
                  {prop.titulo}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
