import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Hero() {
  return (
    <Box
      position="relative"
      bgImage={`linear-gradient(to right, rgba(26, 32, 44, 0.95) 35%, rgba(26, 32, 44, 0.5) 100%, transparent), url("/hero.modern.png")`}
      bgSize="cover"
      bgPosition="center right"
      minH="100vh"
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
          Una nueva forma de encontrar propiedades
        </Text>

        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
          color="#d4af37"
          lineHeight="1.2"
          mb={4}
        >
          Encontrá tu Propiedad <br /> Más Adecuada
        </Heading>

        <Text color="gray.300" fontSize={{ base: "md", md: "lg" }} mb={6}>
          Gran cantidad de propiedades disponibles para comprar o alquilar.
          También podés encontrar opciones de co-living, con asesoramiento
          profesional.
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
            to="/contacto"
            size="lg"
            variant="outline"
            borderColor="gray.400"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
          >
            Contáctanos
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
