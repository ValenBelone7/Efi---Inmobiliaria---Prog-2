import { Box, VStack, Text, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdHome, MdAddBox, MdList, MdAddBusiness, MdMail } from "react-icons/md"; // 👈 nuevo ícono

export default function Sidebar() {
  return (
    <Box w="210px" bg="blue.900" color="white" h="100vh" p="5" position="fixed">
      <Text fontSize="xl" fontWeight="bold" mb="8">
        AlquiGest
      </Text>
      <VStack align="start" spacing="5">
        <Link to="/dashboard">
          <IconButton icon={<MdHome />} colorScheme="blue" variant="ghost" /> Dashboard
        </Link>
        <Link to="/cargar">
          <IconButton icon={<MdAddBox />} colorScheme="blue" variant="ghost" /> Cargar contrato
        </Link>
        <Link to="/contratos">
          <IconButton icon={<MdList />} colorScheme="blue" variant="ghost" /> Contratos
        </Link>
        {/* 🏡 Nuevo botón para cargar propiedad */}
        <Link to="/cargar-propiedad">
          <IconButton icon={<MdAddBusiness />} colorScheme="blue" variant="ghost" /> Cargar propiedad
        </Link>
        <Link to="/solicitudes">
        <IconButton icon={<MdMail />} colorScheme="blue" variant="ghost" />
        Solicitudes
        </Link>
        <Link to="/ver-propiedades">
          <IconButton icon={<MdList />} colorScheme="blue" variant="ghost" /> Ver propiedades
        </Link>
      </VStack>
    </Box>
  );
}
