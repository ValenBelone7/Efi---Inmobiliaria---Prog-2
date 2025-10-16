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

export default function CardCatalog({
  id,
  titulo,
  descripcion,
  precio,
  tipo,
  imagen,
}) {
  return (
    <Box
      bg="whiteAlpha.100"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="lg"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", boxShadow: "2xl" }}
    >
      <Image src={imagen} alt={titulo} h="220px" w="100%" objectFit="cover" />

      <VStack p={5} align="start" spacing={3}>
        <HStack w="100%" justify="space-between">
          <Heading fontSize="xl">{titulo}</Heading>
          <Badge
            colorScheme={tipo === "Venta" ? "green" : "blue"}
            fontSize="0.8em"
          >
            {tipo}
          </Badge>
        </HStack>

        <Text noOfLines={2}>{descripcion}</Text>
        <Text fontWeight="bold" color="teal.300" fontSize="lg">
          ${precio}
        </Text>

        {/* Botón para ver detalle */}
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
