// components/HeroContacto.jsx
import { Box, Flex, Heading, Text, Button, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function HeroContacto() {
  return (
    <Box
      position="relative"
      bgImage={`linear-gradient(to right, rgba(26, 32, 44, 0.95) 35%, rgba(26, 32, 44, 0.5) 100%, transparent), url("/contacto.jpg")`}
      bgSize="cover"
      bgPosition="center right"
      minH={{ base: "70vh", md: "100vh" }}
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Flex
        direction="column"
        align="flex-start"
        maxW={{ base: "90%", md: "45%" }}
        px={{ base: 6, md: 16 }}
        zIndex={1}
      >
        <Text
          color="teal.200"
          fontWeight="medium"
          fontSize="sm"
          textTransform="uppercase"
          mb={2}
        >
          Estamos para ayudarte
        </Text>

        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
          color="#d4af37"
          lineHeight="1.2"
          mb={4}
        >
          Contactanos <br /> y Coordiná tu Visita
        </Heading>

        <Text color="gray.300" fontSize={{ base: "md", md: "lg" }} mb={6}>
          Nuestro equipo te brindará asesoramiento personalizado para encontrar la propiedad ideal o resolver tus consultas.
        </Text>

        <HStack spacing={4}>
          <Button
            as={RouterLink}
            to="/propiedades"
            colorScheme="yellow"
            bg="#d4af37"
            color="white"
            size="lg"
            _hover={{ bg: "#c19e34" }}
          >
            Ver Propiedades
          </Button>

          <Button
            as={RouterLink}
            to="/"
            size="lg"
            variant="outline"
            borderColor="gray.400"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
          >
            Volver al Inicio
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
