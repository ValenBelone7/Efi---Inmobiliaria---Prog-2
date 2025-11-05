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

        {/* Glass Cards estilo Uiverse (responsive) */}
        <Box
          py={{ base: 10, md: 16 }}
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          gap={{ base: 8, md: 0 }}
          mt={{ base: 8, md: 12 }}
        >
          {propiedades.map((prop, index) => {
            const rotations = [-15, 5, 25];
            return (
              <Box
                key={prop.id}
                position="relative"
                width={{ base: "85%", sm: "320px", md: "360px", lg: "380px" }}
                height={{ base: "300px", sm: "340px", md: "420px" }}
                mx={{ base: 0, md: "-45px" }}
                borderRadius="15px"
                overflow="hidden"
                bg="whiteAlpha.200"
                border="1px solid rgba(255,255,255,0.1)"
                boxShadow="0 25px 25px rgba(0,0,0,0.25)"
                backdropFilter="blur(10px)"
                transform={{
                  base: "none",
                  md: `rotate(${rotations[index]}deg)`,
                }}
                transition="all 0.5s ease"
                _hover={{
                  transform: { base: "scale(1.03)", md: "rotate(0deg)" },
                  mx: { base: 0, md: "10px" },
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

                {/* Texto inferior */}
                <Box
                  position="absolute"
                  bottom="0"
                  w="100%"
                  bg="gray.700"
                  color="white"
                  fontSize={{ base: "sm", md: "md" }}
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
