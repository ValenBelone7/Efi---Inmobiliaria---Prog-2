import React from "react";
import { Box, Text, Link, Stack, HStack, Icon } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <Box bg="gray.900" color="white" py={10} px={5}>
      <Stack spacing={6} align="center">
        {/* Ubicación */}
        <Text fontSize="sm" color="gray.400">
          Rio Cuarto - Argentina
        </Text>

        {/* Información de contacto */}
        <HStack spacing={8} justify="center" flexWrap="wrap">
          <HStack>
            <Icon as={FaPhone} color="teal.500" />
            <Text>+54 9 351 123 4567</Text>
          </HStack>
          <HStack>
            <Icon as={FaEnvelope} color="teal.500" />
            <Text>info@alquiguest.com</Text>
          </HStack>
          <HStack>
            <Icon as={FaMapMarkerAlt} color="teal.500" />
            <Text>Av. Siempre Viva 742, Córdoba</Text>
          </HStack>
        </HStack>

        {/* Copyright */}
        <Text fontSize="sm" color="gray.400" textAlign="center">
          Copyright 2025 © AlquiGuest - Todos los derechos reservados
        </Text>

        {/* Redes sociales */}
        <HStack spacing={4}>
          <Link href="https://www.facebook.com" isExternal aria-label="Facebook">
            <FaFacebook size="20" />
          </Link>
          <Link href="https://www.instagram.com" isExternal aria-label="Instagram">
            <FaInstagram size="20" />
          </Link>
          <Link href="https://www.linkedin.com" isExternal aria-label="LinkedIn">
            <FaLinkedin size="20" />
          </Link>
        </HStack>
      </Stack>
    </Box>
  );
}
