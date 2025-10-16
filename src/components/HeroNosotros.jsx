// components/HeroNosotros.jsx
import { Box, Flex, Heading, Text, Button, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function HeroNosotros() {
  return (
    <Box
      position="relative"
      bgImage={`linear-gradient(to right, rgba(26, 32, 44, 0.95) 35%, rgba(26, 32, 44, 0.5) 100%, transparent), url("/sobre-nos.jpg")`}
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
          Conocé a nuestro equipo
        </Text>

        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
          color="#d4af37"
          lineHeight="1.2"
          mb={4}
        >
          Sobre Nosotros
        </Heading>

        <Text color="gray.300" fontSize={{ base: "md", md: "lg" }} mb={6}>
          En AlquiGuest trabajamos con dedicación y compromiso para ofrecer un
          servicio inmobiliario transparente, confiable y cercano a las personas.
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
            Contactanos
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
