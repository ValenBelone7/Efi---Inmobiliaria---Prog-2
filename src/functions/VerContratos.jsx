import {
  Box,
  Avatar,
  Text,
  HStack,
  Button,
  VStack,
  Input,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Divider,
  useDisclosure,
  useToast,
  FormControl,
  FormLabel,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import jsPDF from "jspdf";
import { FiMenu } from "react-icons/fi";

export default function VerContratos() {
  const [contratos, setContratos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [contratoSeleccionado, setContratoSeleccionado] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("contratos")) || [];
    const contratosConEstado = data.map((c) => ({
      ...c,
      estado: calcularEstado(c.fechaFin),
    }));
    setContratos(contratosConEstado);
  }, []);

  const generarPDF = (contrato) => {
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text("Contrato de Alquiler", 105, 20, { align: "center" });
    pdf.setFontSize(12);
    pdf.text(`Inquilino: ${contrato.inquilino}`, 20, 40);
    pdf.text(`Propietario: ${contrato.propietario}`, 20, 50);
    pdf.text(`Dirección: ${contrato.direccion}`, 20, 60);
    pdf.text(`Monto mensual: $${contrato.monto}`, 20, 70);
    pdf.text(`Depósito: $${contrato.deposito}`, 20, 80);
    pdf.text(`Fecha inicio: ${contrato.fechaInicio}`, 20, 90);
    pdf.text(`Fecha fin: ${contrato.fechaFin}`, 20, 100);
    pdf.text(`Forma de pago: ${contrato.formaPago}`, 20, 110);
    pdf.save(`Contrato-${contrato.inquilino}.pdf`);
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

  const estadoColor = {
    Activo: "green",
    "Por vencer": "yellow",
    Vencido: "red",
  };

  const contratosFiltrados = contratos.filter((c) =>
    (c.inquilino || "").toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleVer = (contrato) => {
    setContratoSeleccionado(contrato);
    setModoEdicion(false);
    setMostrarEliminar(false);
    onOpen();
  };

  const handleEditar = (contrato) => {
    setContratoSeleccionado({ ...contrato });
    setModoEdicion(true);
    setMostrarEliminar(false);
    onOpen();
  };

  const handleEliminar = (contrato) => {
    setContratoSeleccionado(contrato);
    setMostrarEliminar(true);
    setModoEdicion(false);
    onOpen();
  };

  const guardarEdicion = () => {
    const contratosActualizados = contratos.map((c) =>
      c.dniInquilino === contratoSeleccionado.dniInquilino
        ? contratoSeleccionado
        : c
    );
    localStorage.setItem("contratos", JSON.stringify(contratosActualizados));
    setContratos(contratosActualizados);
    toast({
      title: "Contrato actualizado correctamente.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  const confirmarEliminar = () => {
    const contratosActualizados = contratos.filter(
      (c) => c.dniInquilino !== contratoSeleccionado.dniInquilino
    );
    localStorage.setItem("contratos", JSON.stringify(contratosActualizados));
    setContratos(contratosActualizados);
    toast({
      title: "Contrato eliminado.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Box>
      {/* Drawer para mobile */}
      <IconButton
        display={{ base: "flex", md: "none" }}
        icon={<FiMenu />}
        aria-label="Abrir menú"
        m={4}
        onClick={onDrawerOpen}
      />
      <Drawer placement="left" onClose={onDrawerClose} isOpen={isDrawerOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <Sidebar />
        </DrawerContent>
      </Drawer>

      <Flex>
        {/* Sidebar desktop */}
        <Box display={{ base: "none", md: "block" }} w="210px">
          <Sidebar />
        </Box>

        {/* Contenido principal */}
        <Box flex="1" p={{ base: 4, md: 6 }}>
          <Input
            placeholder="Buscar por inquilino..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            mb={6}
          />

          <VStack spacing={4} align="stretch">
            {contratosFiltrados.map((c, i) => (
              <HStack
                key={i}
                justify="space-between"
                p="4"
                borderWidth="1px"
                rounded="lg"
                spacing={4}
                flexWrap="wrap"
              >
                <HStack flex="1" minW={{ base: "100%", md: "auto" }}>
                  <Avatar name={c.inquilino} />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold">{c.inquilino}</Text>
                    <Text>{c.direccion}</Text>
                  </VStack>
                </HStack>

                <Badge colorScheme={estadoColor[c.estado]}>{c.estado}</Badge>

                <HStack spacing={2} flexWrap="wrap">
                  <Button size="sm" colorScheme="blue" onClick={() => handleVer(c)}>
                    Ver
                  </Button>
                  <Button size="sm" colorScheme="yellow" onClick={() => handleEditar(c)}>
                    Editar
                  </Button>
                  <Button size="sm" colorScheme="red" onClick={() => handleEliminar(c)}>
                    Eliminar
                  </Button>
                </HStack>
              </HStack>
            ))}
          </VStack>

          {/* Modal */}
          {contratoSeleccionado && (
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
              <ModalOverlay />
              <ModalContent>
                {!modoEdicion && !mostrarEliminar && (
                  <>
                    <ModalHeader>Detalles del contrato</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <VStack align="start" spacing={3}>
                        <Text><b>Inquilino:</b> {contratoSeleccionado.inquilino}</Text>
                        <Text><b>Propietario:</b> {contratoSeleccionado.propietario}</Text>
                        <Text><b>DNI/CUIT:</b> {contratoSeleccionado.dniInquilino}</Text>
                        <Text><b>Teléfono:</b> {contratoSeleccionado.telInquilino}</Text>
                        <Text><b>Email:</b> {contratoSeleccionado.emailInquilino}</Text>
                        <Text><b>Dirección:</b> {contratoSeleccionado.direccion}</Text>
                        <Text><b>Tipo:</b> {contratoSeleccionado.tipo}</Text>
                        <Text><b>Fecha inicio:</b> {contratoSeleccionado.fechaInicio}</Text>
                        <Text><b>Fecha fin:</b> {contratoSeleccionado.fechaFin}</Text>
                        <Text><b>Monto mensual:</b> ${contratoSeleccionado.monto}</Text>
                        <Text><b>Depósito:</b> ${contratoSeleccionado.deposito}</Text>
                        <Text><b>Forma de pago:</b> {contratoSeleccionado.formaPago}</Text>
                        <Badge colorScheme={estadoColor[contratoSeleccionado.estado]}>
                          {contratoSeleccionado.estado}
                        </Badge>
                      </VStack>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="teal" mr={3} onClick={() => generarPDF(contratoSeleccionado)}>
                        Ver contrato
                      </Button>
                      <Button variant="ghost" onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                  </>
                )}

                {modoEdicion && (
                  <>
                    <ModalHeader>Editar contrato</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <VStack spacing={3} align="stretch">
                        <FormControl>
                          <FormLabel>Inquilino</FormLabel>
                          <Input
                            value={contratoSeleccionado.inquilino}
                            onChange={(e) =>
                              setContratoSeleccionado({ ...contratoSeleccionado, inquilino: e.target.value })
                            }
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Dirección</FormLabel>
                          <Input
                            value={contratoSeleccionado.direccion}
                            onChange={(e) =>
                              setContratoSeleccionado({ ...contratoSeleccionado, direccion: e.target.value })
                            }
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Monto mensual</FormLabel>
                          <Input
                            type="number"
                            value={contratoSeleccionado.monto}
                            onChange={(e) =>
                              setContratoSeleccionado({ ...contratoSeleccionado, monto: e.target.value })
                            }
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Fecha fin</FormLabel>
                          <Input
                            type="date"
                            value={contratoSeleccionado.fechaFin}
                            onChange={(e) =>
                              setContratoSeleccionado({ ...contratoSeleccionado, fechaFin: e.target.value })
                            }
                          />
                        </FormControl>
                      </VStack>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={guardarEdicion}>Guardar cambios</Button>
                      <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                  </>
                )}

                {mostrarEliminar && (
                  <>
                    <ModalHeader>Eliminar contrato</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text>
                        ¿Seguro que querés eliminar el contrato de <b>{contratoSeleccionado.inquilino}</b>?
                      </Text>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="red" mr={3} onClick={confirmarEliminar}>Eliminar</Button>
                      <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
