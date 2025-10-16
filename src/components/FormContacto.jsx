import {
  Box,
  VStack,
  Input,
  Textarea,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { keyframes } from "@emotion/react";

// Animaciones del botón
const btnAnim1 = keyframes`
  0% { left: -100%; }
  50%,100% { left: 100%; }
`;
const btnAnim2 = keyframes`
  0% { top: -100%; }
  50%,100% { top: 100%; }
`;
const btnAnim3 = keyframes`
  0% { right: -100%; }
  50%,100% { right: 100%; }
`;
const btnAnim4 = keyframes`
  0% { bottom: -100%; }
  50%,100% { bottom: 100%; }
`;

export default function FormContacto() {
  const [values, setValues] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const [focus, setFocus] = useState({
    nombre: false,
    correo: false,
    mensaje: false,
  });

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleFocus = (name) =>
    setFocus((prev) => ({ ...prev, [name]: true }));

  const handleBlur = (name) =>
    setFocus((prev) => ({ ...prev, [name]: false }));

  return (
    <Box
      position="relative"
      bg="gray.900"
      p={10}
      borderRadius="lg"
      boxShadow="0 15px 25px rgba(0,0,0,0.6)"
      w={{ base: "100%", md: "900px" }}
      mx="auto"
    >
      {/* Texto superior */}
      <Text
        mb={3}
        textAlign="center"
        fontSize={{ base: "1.3rem", md: "1.5rem" }}
        fontWeight="bold"
        color="white"
        letterSpacing="1px"
      >
        Ponete en contacto con nosotros
      </Text>

      {/* Línea divisoria fina */}
      <Divider
        my={6}
        borderColor="rgba(255,255,255,0.2)"
        borderBottomWidth="1px"
        w="60%"
        mx="auto"
      />

      <VStack spacing={8} align="stretch">
        {/* Campo nombre */}
        <Box position="relative">
          <Input
            name="nombre"
            value={values.nombre}
            onChange={handleChange}
            onFocus={() => handleFocus("nombre")}
            onBlur={() => handleBlur("nombre")}
            variant="unstyled"
            borderBottom="1px solid white"
            color="white"
            fontSize="16px"
            py={2}
            _focus={{ outline: "none", borderColor: "white" }}
          />
          <Text
            position="absolute"
            top={focus.nombre || values.nombre ? "-20px" : "0"}
            left="0"
            fontSize={focus.nombre || values.nombre ? "12px" : "16px"}
            color="white"
            transition="0.4s"
            pointerEvents="none"
          >
            Tu nombre
          </Text>
        </Box>

        {/* Campo correo */}
        <Box position="relative">
          <Input
            name="correo"
            value={values.correo}
            onChange={handleChange}
            onFocus={() => handleFocus("correo")}
            onBlur={() => handleBlur("correo")}
            variant="unstyled"
            borderBottom="1px solid white"
            color="white"
            fontSize="16px"
            py={2}
            type="email"
            _focus={{ outline: "none", borderColor: "white" }}
          />
          <Text
            position="absolute"
            top={focus.correo || values.correo ? "-20px" : "0"}
            left="0"
            fontSize={focus.correo || values.correo ? "12px" : "16px"}
            color="white"
            transition="0.4s"
            pointerEvents="none"
          >
            Tu correo
          </Text>
        </Box>

        {/* Campo mensaje */}
        <Box position="relative">
          <Textarea
            name="mensaje"
            value={values.mensaje}
            onChange={handleChange}
            onFocus={() => handleFocus("mensaje")}
            onBlur={() => handleBlur("mensaje")}
            variant="unstyled"
            borderBottom="1px solid white"
            color="white"
            fontSize="16px"
            py={2}
            rows={4}
            resize="none"
            _focus={{ outline: "none", borderColor: "white" }}
          />
          <Text
            position="absolute"
            top={focus.mensaje || values.mensaje ? "-20px" : "0"}
            left="0"
            fontSize={focus.mensaje || values.mensaje ? "12px" : "16px"}
            color="white"
            transition="0.4s"
            pointerEvents="none"
          >
            Tu mensaje
          </Text>
        </Box>

        {/* Botón animado */}
        <Box position="relative" display="inline-block" mx="auto" mt={4}>
          <Button
            bg="transparent"
            color="white"
            border="none"
            textTransform="uppercase"
            fontWeight="bold"
            letterSpacing="3px"
            px={8}
            py={4}
            fontSize="16px"
            _hover={{
              bg: "white",
              color: "#272727",
              borderRadius: "md",
              transition: "0.3s",
            }}
          >
            Enviar
          </Button>

          {/* Líneas animadas */}
          <Box
            as="span"
            position="absolute"
            top="0"
            left="-100%"
            w="100%"
            h="2px"
            bg="linear-gradient(90deg, transparent, white)"
            animation={`${btnAnim1} 1.5s linear infinite`}
          />
          <Box
            as="span"
            position="absolute"
            top="-100%"
            right="0"
            w="2px"
            h="100%"
            bg="linear-gradient(180deg, transparent, white)"
            animation={`${btnAnim2} 1.5s linear infinite`}
            style={{ animationDelay: ".375s" }}
          />
          <Box
            as="span"
            position="absolute"
            bottom="0"
            right="-100%"
            w="100%"
            h="2px"
            bg="linear-gradient(270deg, transparent, white)"
            animation={`${btnAnim3} 1.5s linear infinite`}
            style={{ animationDelay: ".75s" }}
          />
          <Box
            as="span"
            position="absolute"
            bottom="-100%"
            left="0"
            w="2px"
            h="100%"
            bg="linear-gradient(360deg, transparent, white)"
            animation={`${btnAnim4} 1.5s linear infinite`}
            style={{ animationDelay: "1.125s" }}
          />
        </Box>
      </VStack>
    </Box>
  );
}

