import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

/* 💡 Componente reutilizable que muestra una tarjeta con información visual clara.
   Se usa para mostrar propiedades o productos con imagen, descripción y precio. */
export default function CardCatalog({ id, titulo, descripcion, precio, tipo, imagen }) {
  return (
    <Box
      bg="whiteAlpha.100"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="lg"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", boxShadow: "2xl" }}
      w={{ base: "100%", sm: "300px", md: "320px" }}
    >
      {/* 🖼️ Imagen superior */}
      <Image src={imagen} alt={titulo} h={{ base: "180px", md: "220px" }} w="100%" objectFit="cover" />

      {/* 📦 Contenido de la tarjeta */}
      <VStack p={5} align="start" spacing={3}>
        <HStack w="100%" justify="space-between">
          <Heading fontSize="lg">{titulo}</Heading>
          <Badge colorScheme={tipo === "Venta" ? "green" : "blue"}>{tipo}</Badge>
        </HStack>

        <Text noOfLines={2} fontSize="sm" color="gray.300">
          {descripcion}
        </Text>

        <Text fontWeight="bold" color="teal.300" fontSize="lg">
          ${precio}
        </Text>

        <Button
          as={Link}
          to={`/propiedades/${id}`}
          colorScheme="teal"
          size="sm"
          alignSelf="flex-start"
        >
          Ver Detalle
        </Button>
      </VStack>
    </Box>
  );
}
