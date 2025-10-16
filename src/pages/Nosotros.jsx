import {
  Box,
  Container,
  Text,
  SimpleGrid,
  Heading,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { FaHandshake, FaHome, FaUsers } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroNosotros from "../components/HeroNosotros";
import AnimatedCard from "../components/AnimatedCard";

export default function Nosotros() {
  return (
    <Box bg="gray.800" color="white">
      <Navbar />
      <HeroNosotros />

      <Container maxW="6xl" py={12}>
        <VStack spacing={6} mb={12}>
          <Heading
            size="lg"
            textAlign="center"
            pb={2}
          >
            ¿Por qué elegirnos?
          </Heading>
          <Text fontSize="lg" textAlign="center" maxW="3xl">
            En <b>AlquiGuest</b> nos especializamos en el mercado inmobiliario,
            ofreciendo confianza, profesionalismo y compromiso con cada cliente.
            Nuestra misión es ayudarte a encontrar tu hogar ideal o la mejor
            inversión.
          </Text>
        </VStack>

        <Divider borderColor="gray.600" mb={10} />

        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={10}
          justifyItems="center"
        >
          <AnimatedCard
            icon={FaHandshake}
            title="Confianza"
            description="Generamos relaciones duraderas basadas en la transparencia y el respeto."
          />

          <AnimatedCard
            icon={FaHome}
            title="Experiencia"
            description="Más de 10 años brindando soluciones en compra, venta y alquiler."
          />

          <AnimatedCard
            icon={FaUsers}
            title="Equipo"
            description="Un grupo de profesionales dispuestos a acompañarte en cada decisión."
          />
        </SimpleGrid>
      </Container>

      <Footer />
    </Box>
  );
}

