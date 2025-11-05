import {
  Box,
  VStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  MdHome,
  MdAddBox,
  MdList,
  MdAddBusiness,
  MdMail,
} from "react-icons/md";

export default function Sidebar() {
  return (
    <Box
      w="210px"
      bg="blue.900"
      color="white"
      h="100vh"
      p="5"
      position="fixed"
    >
      <Text fontSize="xl" fontWeight="bold" mb="8">
        AlquiGest
      </Text>

      <VStack align="start" spacing="5">
        <Link to="/dashboard">
          <Flex align="center" gap={2}>
            <MdHome /> Dashboard
          </Flex>
        </Link>
        <Link to="/cargar">
          <Flex align="center" gap={2}>
            <MdAddBox /> Cargar contrato
          </Flex>
        </Link>
        <Link to="/contratos">
          <Flex align="center" gap={2}>
            <MdList /> Contratos
          </Flex>
        </Link>
        <Link to="/cargar-propiedad">
          <Flex align="center" gap={2}>
            <MdAddBusiness /> Cargar propiedad
          </Flex>
        </Link>
        <Link to="/solicitudes">
          <Flex align="center" gap={2}>
            <MdMail /> Solicitudes
          </Flex>
        </Link>
        <Link to="/ver-propiedades">
          <Flex align="center" gap={2}>
            <MdList /> Ver propiedades
          </Flex>
        </Link>
      </VStack>
    </Box>
  );
}
