import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Button,
  IconButton,
  useDisclosure,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import AnimatedButton from "./AnimatedButton";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.800" px={4} py={3} color="white" boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Image
          src="/logo-blanco.png"
          alt="AlquiGuest Logo"
          w={{ base: "120px", md: "180px" }}
          h={{ base: "60px", md: "90px" }}
          objectFit="contain"
        />

        {/* Links (desktop) */}
        <HStack
          spacing={8}
          display={{ base: "none", md: "flex" }}
        >
          <Link as={RouterLink} to="/">Home</Link>
          <Link as={RouterLink} to="/propiedades">Propiedades</Link>
          <Link as={RouterLink} to="/nosotros">Nosotros</Link>
          <Link as={RouterLink} to="/contacto">Contacto</Link>
        </HStack>

        {/* Portal Empleados (desktop) */}
        <AnimatedButton />

        {/* Botón hamburguesa (mobile) */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="Abrir menú"
          icon={<HamburgerIcon />}
          onClick={onOpen}
          variant="ghost"
          color="white"
        />
      </Flex>

      {/* Drawer (mobile menu) */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="gray.900" color="white">
          <DrawerCloseButton />
          <DrawerHeader>Menú</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="flex-start">
              <Link as={RouterLink} to="/" onClick={onClose}>Home</Link>
              <Link as={RouterLink} to="/propiedades" onClick={onClose}>Propiedades</Link>
              <Link as={RouterLink} to="/nosotros" onClick={onClose}>Nosotros</Link>
              <Link as={RouterLink} to="/contacto" onClick={onClose}>Contacto</Link>
              <AnimatedButton />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
