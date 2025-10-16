import { Box, Image, Stack, Heading, Text, Badge, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function PropertyCard({ id, img, titulo, precio, tipo, rotation }) {
  return (
    <Box
      position="relative"
      w="100%"
      h="100%"
      transform={`rotate(${rotation}deg)`}
      transition="all 0.5s ease"
      _hover={{ transform: "rotate(0deg)", margin: "0 10px", boxShadow: "2xl" }}
    >
      <Box
        bg="whiteAlpha.100"
        backdropFilter="blur(10px)"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="lg"
        transition="all 0.3s ease"
      >
        <Box overflow="hidden">
          <Image
            src={img}
            alt={titulo}
            h="200px"
            w="100%"
            objectFit="cover"
            transition="0.3s ease"
            _hover={{ transform: "scale(1.05)" }}
          />
        </Box>

        <Stack spacing={3} p={4}>
          <Heading size="md" color="white">
            {titulo}
          </Heading>
          <Text fontWeight="bold" fontSize="lg" color={tipo === "Venta" ? "teal.400" : "orange.400"}>
            {precio}
          </Text>
          <Badge colorScheme={tipo === "Venta" ? "teal" : "orange"} w="fit-content" px={2} py={1} borderRadius="md">
            {tipo}
          </Badge>
          <Button
            as={RouterLink}
            to={`/propiedades/${id}`}
            colorScheme={tipo === "Venta" ? "teal" : "orange"}
            size="sm"
          >
            {tipo === "Venta" ? "Comprar" : "Alquilar"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
