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

/* 🎞️ Animaciones del borde del botón "Enviar" */
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
  // Estado local para controlar los valores del formulario
  const [values, setValues] = useState({ nombre: "", correo: "", mensaje: "" });

  // Controla el foco visual de cada campo
  const [focus, setFocus] = useState({ nombre: false, correo: false, mensaje: false });

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleFocus = (name) => setFocus((prev) => ({ ...prev, [name]: true }));
  const handleBlur = (name) => setFocus((prev) => ({ ...prev, [name]: false }));

  return (
    <Box
      bg="gray.900"
      p={{ base: 6, md: 10 }}
      borderRadius="lg"
      boxShadow="0 15px 25px rgba(0,0,0,0.6)"
      w={{ base: "100%", md: "80%", lg: "900px" }}
      mx="auto"
    >
      {/* 🧠 Título principal del formulario */}
      <Text
        mb={3}
        textAlign="center"
        fontSize={{ base: "1.2rem", md: "1.5rem" }}
        fontWeight="bold"
        color="white"
        letterSpacing="1px"
      >
        Ponete en contacto con nosotros
      </Text>

      {/* 🔹 Línea divisoria decorativa */}
      <Divider
        my={6}
        borderColor="rgba(255,255,255,0.2)"
        borderBottomWidth="1px"
        w="60%"
        mx="auto"
      />

      {/* 🧾 Campos del formulario */}
      <VStack spacing={8} align="stretch">
        {[
          { name: "nombre", label: "Tu nombre", type: "text" },
          { name: "correo", label: "Tu correo", type: "email" },
        ].map((field) => (
          <Box key={field.name} position="relative">
            <Input
              name={field.name}
              type={field.type}
              value={values[field.name]}
              onChange={handleChange}
              onFocus={() => handleFocus(field.name)}
              onBlur={() => handleBlur(field.name)}
              variant="unstyled"
              borderBottom="1px solid white"
              color="white"
              fontSize="16px"
              py={2}
              _focus={{ outline: "none", borderColor: "teal.300" }}
            />
            <Text
              position="absolute"
              top={focus[field.name] || values[field.name] ? "-20px" : "0"}
              left="0"
              fontSize={focus[field.name] || values[field.name] ? "12px" : "16px"}
              color="white"
              transition="0.4s"
              pointerEvents="none"
            >
              {field.label}
            </Text>
          </Box>
        ))}

        {/* ✉️ Campo de mensaje */}
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
            _focus={{ outline: "none", borderColor: "teal.300" }}
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

        {/* 🎬 Botón con bordes animados */}
        <Box position="relative" mx="auto" mt={4}>
          <Button
            bg="transparent"
            color="white"
            border="none"
            textTransform="uppercase"
            fontWeight="bold"
            letterSpacing="3px"
            px={8}
            py={4}
            fontSize={{ base: "14px", md: "16px" }}
            _hover={{
              bg: "white",
              color: "#272727",
              borderRadius: "md",
              transition: "0.3s",
            }}
          >
            Enviar
          </Button>

          {/* Cuatro líneas animadas que recorren el borde del botón */}
          {[
            { anim: btnAnim1, pos: { top: "0", left: "-100%", w: "100%", h: "2px" } },
            { anim: btnAnim2, pos: { top: "-100%", right: "0", w: "2px", h: "100%" }, delay: ".375s" },
            { anim: btnAnim3, pos: { bottom: "0", right: "-100%", w: "100%", h: "2px" }, delay: ".75s" },
            { anim: btnAnim4, pos: { bottom: "-100%", left: "0", w: "2px", h: "100%" }, delay: "1.125s" },
          ].map((line, i) => (
            <Box
              key={i}
              as="span"
              position="absolute"
              {...line.pos}
              bg="linear-gradient(90deg, transparent, white)"
              animation={`${line.anim} 1.5s linear infinite`}
              style={line.delay ? { animationDelay: line.delay } : {}}
            />
          ))}
        </Box>
      </VStack>
    </Box>
  );
}
