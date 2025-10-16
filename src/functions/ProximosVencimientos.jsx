import { Box, Text, HStack, VStack, Button, Badge, Heading } from "@chakra-ui/react";
import { FiMail, FiRefreshCw } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProximosVencimientos() {
  const [contratos, setContratos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("contratos")) || [];
    const hoy = new Date();

    // Filtra contratos que vencen en <=30 días
    const proximos = data.filter(c => {
      if (!c.fechaFin) return false;
      const fin = new Date(c.fechaFin);
      const diasRestantes = (fin - hoy) / (1000 * 60 * 60 * 24);
      return diasRestantes <= 30 && diasRestantes >= 0;
    });

    setContratos(proximos);
  }, []);

  const enviarMail = (email, nombre) => {
    window.location.href = `mailto:${email}?subject=Renovación de contrato&body=Hola ${nombre}, tu contrato está próximo a vencer.`;
  };

  const renovarContrato = (contrato) => {
    // Guardar temporalmente en localStorage para prellenar el formulario
    localStorage.setItem("renovarContrato", JSON.stringify(contrato));
    navigate("/cargar");
  };

  if (contratos.length === 0) return null;

  return (
    <Box mb={8}>
      <Heading size="md" mb={4}>Contratos por vencer (30 días)</Heading>
      <VStack spacing={4} align="stretch">
        {contratos.map((c, i) => (
          <HStack key={i} justify="space-between" p={4} borderWidth="1px" rounded="md">
            <VStack align="start" spacing={1}>
              <Text fontWeight="bold">{c.inquilino}</Text>
              <Text>{c.direccion}</Text>
              <Text>Vence: {c.fechaFin}</Text>
            </VStack>
            <HStack spacing={2}>
              <Badge colorScheme="yellow">Por vencer</Badge>
              <Button size="sm" leftIcon={<FiMail />} colorScheme="teal" onClick={() => enviarMail(c.emailInquilino, c.inquilino)}>
                Enviar mail
              </Button>
              <Button size="sm" leftIcon={<FiRefreshCw />} colorScheme="blue" onClick={() => renovarContrato(c)}>
                Renovar
              </Button>
            </HStack>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
