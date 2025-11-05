import { 
  Box, Heading, SimpleGrid, Card, CardBody, Text, Button, VStack, HStack, Icon, Flex, Drawer, DrawerBody, DrawerContent, DrawerOverlay, useDisclosure, IconButton 
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiFileText, FiClock, FiXCircle, FiPlusCircle, FiSearch, FiLogOut, FiMenu } from "react-icons/fi";
import { useState, useEffect } from "react";
import ProximosVencimientos from "../functions/ProximosVencimientos";
import MontosContratos from "../functions/MontosContratos";

export default function Dashboard() {
  const [estadisticas, setEstadisticas] = useState({
    Activo: 0,
    "Por vencer": 0,
    Vencido: 0,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    navigate("/");
  };

  const calcularEstado = (fechaFin) => {
    if (!fechaFin) return "Activo";
    const hoy = new Date();
    const fin = new Date(fechaFin);
    if (fin < hoy) return "Vencido";
    const diasRestantes = (fin - hoy) / (1000 * 60 * 60 * 24);
    if (diasRestantes <= 30) return "Por vencer";
    return "Activo";
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("contratos")) || [];
    const contratosConEstado = data.map((c) => ({
      ...c,
      estado: calcularEstado(c.fechaFin),
    }));

    const counts = { Activo: 0, "Por vencer": 0, Vencido: 0 };
    contratosConEstado.forEach((c) => {
      counts[c.estado] = (counts[c.estado] || 0) + 1;
    });

    setEstadisticas(counts);
  }, []);

  return (
    <Box display="flex" flexDir={{ base: "column", md: "row" }}>
      {/* Sidebar desktop */}
      <Box display={{ base: "none", md: "block" }}>
        <Sidebar />
      </Box>

    {/* Drawer (sidebar en mobile) */}
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent bg="blue.900" color="white" maxW="230px">
        <DrawerBody p="0">
          {isOpen && <Sidebar />} {/* ← Solo renderiza cuando está abierto */}
        </DrawerBody>
      </DrawerContent>
    </Drawer>



      {/* Contenido principal */}
      <Box ml={{ base: 0, md: "210px" }} p={{ base: 4, md: 6 }} w="100%">
        {/* Header */}
        <Flex justify="space-between" align="center" mb="8">
          <Flex align="center" gap="3">
            {/* Botón menú solo en mobile */}
            <IconButton
              icon={<FiMenu />}
              aria-label="Abrir menú"
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
              colorScheme="blue"
              variant="outline"
            />
            <Heading fontSize={{ base: "xl", md: "2xl" }}>Dashboard</Heading>
          </Flex>

          <Button
            leftIcon={<FiLogOut />}
            colorScheme="red"
            variant="outline"
            size={{ base: "sm", md: "md" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Flex>

        {/* Métricas */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} mb="12">
          <Card bg="green.50" shadow="md">
            <CardBody textAlign="center">
              <Icon as={FiFileText} boxSize={8} color="green.500" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="green.700">
                {estadisticas["Activo"]}
              </Text>
              <Text color="gray.600">Contratos Activos</Text>
            </CardBody>
          </Card>

          <Card bg="yellow.50" shadow="md">
            <CardBody textAlign="center">
              <Icon as={FiClock} boxSize={8} color="yellow.500" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="yellow.700">
                {estadisticas["Por vencer"]}
              </Text>
              <Text color="gray.600">Por vencer</Text>
            </CardBody>
          </Card>

          <Card bg="red.50" shadow="md">
            <CardBody textAlign="center">
              <Icon as={FiXCircle} boxSize={8} color="red.500" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="red.700">
                {estadisticas["Vencido"]}
              </Text>
              <Text color="gray.600">Vencidos</Text>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Componentes de funciones */}
        <ProximosVencimientos />
        <MontosContratos />

        {/* Acciones */}
        <VStack spacing={6} mt="16">
          <HStack spacing={{ base: 4, md: 8 }} flexWrap="wrap" justify="center">
            <Link to="/cargar">
              <Button
                leftIcon={<FiPlusCircle />}
                colorScheme="blue"
                size={{ base: "md", md: "lg" }}
                px={{ base: 6, md: 10 }}
                py={{ base: 4, md: 6 }}
                w={{ base: "100%", sm: "auto" }}
              >
                Cargar contrato
              </Button>
            </Link>
            <Link to="/contratos">
              <Button
                leftIcon={<FiSearch />}
                colorScheme="teal"
                size={{ base: "md", md: "lg" }}
                px={{ base: 6, md: 10 }}
                py={{ base: 4, md: 6 }}
                w={{ base: "100%", sm: "auto" }}
              >
                Ver contratos
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
