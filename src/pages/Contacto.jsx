import {
  Box,
  Container,
  Text,
  VStack,
  Divider,
  Heading,
} from "@chakra-ui/react";
import HeroContacto from "../components/HeroContacto";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FormContacto from "../components/FormContacto";

export default function Contacto() {
  return (
    <Box bg="gray.900" color="white" minH="100vh">
      <Navbar />
      <HeroContacto />

      <Container maxW="6xl" py={{ base: 12, md: 20 }}>
        <VStack spacing={12}>
          {/* Título y descripción */}
          <VStack spacing={4} textAlign="center" maxW="3xl">
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              bgGradient="linear(to-r, teal.300, blue.400)"
              bgClip="text"
              letterSpacing="wide"
            >
              ¡Estamos para ayudarte!
            </Heading>

            <Text fontSize={{ base: "md", md: "lg" }} color="gray.300">
              ¿Tenés dudas o querés coordinar una visita?  
              Completá el formulario y te responderemos a la brevedad.
            </Text>
          </VStack>

          {/* Línea divisoria sutil */}
          <Divider borderColor="rgba(255,255,255,0.15)" w="60%" />

          {/* Formulario */}
          <FormContacto />
        </VStack>
      </Container>

      <Footer />
    </Box>
  );
}
