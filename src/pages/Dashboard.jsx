import { 
  Box, Heading, SimpleGrid, Card, CardBody, Text, Button, VStack, HStack, Icon, Flex 
} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { FiFileText, FiClock, FiXCircle, FiPlusCircle, FiSearch, FiLogOut } from "react-icons/fi"
import { useState, useEffect } from "react"
import ProximosVencimientos from "../functions/ProximosVencimientos"
import MontosContratos from "../functions/MontosContratos"

export default function Dashboard() {
  const [estadisticas, setEstadisticas] = useState({
    Activo: 0,
    "Por vencer": 0,
    Vencido: 0,
  });

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
    <Box display="flex">
      <Sidebar />
      <Box ml="200px" p="6" w="100%">
        <Flex justify="space-between" align="center" mb="8">
          <Heading fontSize="2xl">Dashboard</Heading>
          <Button 
            leftIcon={<FiLogOut />} 
            colorScheme="red" 
            variant="outline"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Flex>

        {/* Métricas */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb="12">
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

        <ProximosVencimientos />
        <MontosContratos />

        {/* Acciones */}
        <VStack spacing={6} mt="16">
          <HStack spacing={8}>
            <Link to="/cargar">
              <Button leftIcon={<FiPlusCircle />} colorScheme="blue" size="lg" px={10} py={6}>
                Cargar contrato
              </Button>
            </Link>
            <Link to="/contratos">
              <Button leftIcon={<FiSearch />} colorScheme="teal" size="lg" px={10} py={6}>
                Ver contratos
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}
