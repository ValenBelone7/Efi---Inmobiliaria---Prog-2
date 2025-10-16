import { Button, Box, useBoolean } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AnimatedButton({ text = "Empleados", to = "#" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link to={"/login"}>
      <Button
        position="relative"
        bg="gray.800"
        color="white"
        borderRadius="full"
        px={8}
        py={4}
        fontWeight="bold"
        overflow="hidden"
        display="flex"
        alignItems="center"
        gap={3}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        _hover={{ bg: "white", color: "gray.800" }}
      >
        {/* Icon wrapper */}
        <Box
          w="25px"
          h="25px"
          borderRadius="full"
          bg="white"
          color="gray.800"
          display="grid"
          placeItems="center"
          position="relative"
        >
          {/* SVG original */}
          <Box
            position="absolute"
            transform={hovered ? "translate(250%, -250%)" : "translate(0, 0)"}
            transition="transform 0.3s ease-in-out"
          >
            <svg
              viewBox="0 0 14 15"
              fill="currentColor"
              width={12}
              height={12}
            >
              <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" />
            </svg>
          </Box>

          {/* SVG copy */}
          <Box
            position="absolute"
            transform={hovered ? "translate(0,0)" : "translate(-150%,150%)"}
            transition="transform 0.3s ease-in-out 0.1s"
          >
            <svg
              viewBox="0 0 14 15"
              fill="currentColor"
              width={12}
              height={12}
            >
              <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" />
            </svg>
          </Box>
        </Box>

        {text}
      </Button>
    </Link>
  );
}
