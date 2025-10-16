import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Text,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "user@example.com" && password === "password") {
      localStorage.setItem("isAuth", "true");
      toast({
        title: "Login exitoso.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Credenciales inválidas.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      bgImage={`linear-gradient(rgba(26,32,44,0.85), rgba(26,32,44,0.85)), url("/hero.modern.png")`}
      bgSize="cover"
      bgPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        p={10}
        bg="gray.900"
        borderRadius="2xl"
        boxShadow="2xl"
        w="100%"
        maxW="md"
        color="white"
      >
        <Heading mb={8} textAlign="center" size="xl" color="teal.200">
          Portal Empleados
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@email.com"
                focusBorderColor="teal.400"
                borderRadius="lg"
                bg="gray.800"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                focusBorderColor="teal.400"
                borderRadius="lg"
                bg="gray.800"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>

            <Button
              bgGradient="linear(to-r, teal.400, teal.600)"
              color="white"
              _hover={{ bgGradient: "linear(to-r, teal.500, teal.700)" }}
              type="submit"
              w="full"
              size="lg"
              borderRadius="lg"
              fontWeight="bold"
            >
              Iniciar sesión
            </Button>
          </VStack>
        </form>

        <Text mt={6} textAlign="center" fontSize="sm" color="gray.400">
          Acceso exclusivo para empleados de la inmobiliaria
        </Text>
      </Box>
    </Box>
  );
};

export default Login;

