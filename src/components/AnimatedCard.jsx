import { Box, Heading, Text, Icon } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const rotateGradient = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export default function AnimatedCard({ icon, title, description }) {
  return (
    <Box
      position="relative"
      w="310px"
      h="300px"
      bg="gray.700"
      borderRadius="xl"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      textAlign="center"
      color="white"
      _before={{
        content: '""',
        position: "absolute",
        width: "100px",
        height: "130%",
        backgroundImage:
          "linear-gradient(180deg, rgb(0,183,255), rgb(255,48,255))",
        animation: `${rotateGradient} 3s linear infinite`,
        transition: "all 0.2s linear",
      }}
      _after={{
        content: '""',
        position: "absolute",
        inset: "5px",
        borderRadius: "lg",
        bg: "#07182E",
      }}
    >
      <Box zIndex={1}>
        <Icon as={icon} boxSize={10} mb={3} color="cyan.400" />
        <Heading size="md">{title}</Heading>
        <Text fontSize="sm" color="gray.300" px={3} mt={2}>
          {description}
        </Text>
      </Box>
    </Box>
  );
}
