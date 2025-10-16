// components/HeroPropiedades.jsx
import { Box, Flex, Heading, Text, Button, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function HeroPropiedades() {
  return (
    <Box
      position="relative"
      bgImage={`linear-gradient(to right, rgba(26, 32, 44, 0.95) 35%, rgba(26, 32, 44, 0.5) 100%, transparent), url("/propiedades-photo.jpg")`}
      bgSize="cover"
      bgPosition="center right"
      minH={{ base: "100vh", md: "100vh" }}
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
          Descubrí tu próximo hogar
        </Text>

        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
          color="#d4af37"
          lineHeight="1.2"
          mb={4}
        >
          Nuestras Propiedades <br /> Más Exclusivas
        </Heading>

        <Text color="gray.300" fontSize={{ base: "md", md: "lg" }} mb={6}>
          Encontrá propiedades únicas para comprar o alquilar. Filtrá por tipo, precio y ubicación,
          todo desde un solo lugar.
        </Text>
      </Flex>
    </Box>
  );
}
