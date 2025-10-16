import { 
  Box, FormControl, FormLabel, Input, Button, VStack, Select, Card, CardBody, Heading, HStack, Flex, Icon, Divider 
} from "@chakra-ui/react"
import { useState } from "react"
import Sidebar from "../components/Sidebar"
import { FiSave, FiUser, FiHome, FiMapPin, FiFileText } from "react-icons/fi"

export default function CargarContrato() {
  const [contrato, setContrato] = useState({
    inquilino: "",
    dniInquilino: "",
    telInquilino: "",
    emailInquilino: "",
    propietario: "",
    direccion: "",
    tipo: "",
    fechaInicio: "",
    fechaFin: "",
    monto: "",
    deposito: "",
    formaPago: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setContrato({ ...contrato, [name]: value })
  }

  const handleSave = () => {
    const contratosGuardados = JSON.parse(localStorage.getItem("contratos")) || []
    contratosGuardados.push(contrato)
    localStorage.setItem("contratos", JSON.stringify(contratosGuardados))
    alert("Contrato guardado correctamente ✅")
    setContrato({
      inquilino: "",
      dniInquilino: "",
      telInquilino: "",
      emailInquilino: "",
      propietario: "",
      direccion: "",
      tipo: "",
      fechaInicio: "",
      fechaFin: "",
      monto: "",
      deposito: "",
      formaPago: "",
    })
  }

  const SectionHeader = ({ number, icon, title }) => (
    <Flex align="center" gap={3} mt={6} mb={2}>
      <Box 
        w="30px" 
        h="30px" 
        borderRadius="full" 
        bg="blue.500" 
        color="white" 
        fontSize="sm" 
        fontWeight="bold" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        {number}
      </Box>
      <Icon as={icon} boxSize={5} color="blue.500" />
      <Heading size="sm" color="gray.700">{title}</Heading>
    </Flex>
  )

  return (
    <Box display="flex">
      <Sidebar />
      <Box ml="200px" p="6" w="100%">
        <Card shadow="lg" borderRadius="xl">
          <CardBody>
            <Heading size="md" mb={6} textAlign="center">
              Cargar Contrato de Alquiler
            </Heading>
            <Divider mb={4} />

            <VStack spacing={4} align="stretch">
              {/* 1. Datos Inquilino */}
              <SectionHeader number="1" icon={FiUser} title="Datos del Inquilino" />
              <FormControl isRequired>
                <FormLabel>Nombre completo</FormLabel>
                <Input name="inquilino" value={contrato.inquilino} onChange={handleChange} placeholder="Ej: Juan Pérez" />
              </FormControl>
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>DNI</FormLabel>
                  <Input name="dniInquilino" value={contrato.dniInquilino} onChange={handleChange} placeholder="Ej: 12345678" />
                </FormControl>
                <FormControl>
                  <FormLabel>Teléfono</FormLabel>
                  <Input name="telInquilino" value={contrato.telInquilino} onChange={handleChange} placeholder="Ej: 1123456789" />
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input name="emailInquilino" type="email" value={contrato.emailInquilino} onChange={handleChange} placeholder="Ej: juan@mail.com" />
              </FormControl>

              {/* 2. Datos Propietario */}
              <SectionHeader number="2" icon={FiHome} title="Datos del Propietario" />
              <FormControl>
                <FormLabel>Nombre completo</FormLabel>
                <Input name="propietario" value={contrato.propietario} onChange={handleChange} placeholder="Ej: Carlos López" />
              </FormControl>

              {/* 3. Datos Propiedad */}
              <SectionHeader number="3" icon={FiMapPin} title="Datos de la Propiedad" />
              <FormControl>
                <FormLabel>Dirección</FormLabel>
                <Input name="direccion" value={contrato.direccion} onChange={handleChange} placeholder="Ej: Av. Siempre Viva 123" />
              </FormControl>
              <FormControl>
                <FormLabel>Tipo de inmueble</FormLabel>
                <Select name="tipo" value={contrato.tipo} onChange={handleChange}>
                  <option value="">Seleccionar...</option>
                  <option value="departamento">Departamento</option>
                  <option value="casa">Casa</option>
                  <option value="local">Local Comercial</option>
                  <option value="oficina">Oficina</option>
                </Select>
              </FormControl>

              {/* 4. Detalles Contrato */}
              <SectionHeader number="4" icon={FiFileText} title="Detalles del Contrato" />
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Fecha inicio</FormLabel>
                  <Input type="date" name="fechaInicio" value={contrato.fechaInicio} onChange={handleChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Fecha fin</FormLabel>
                  <Input type="date" name="fechaFin" value={contrato.fechaFin} onChange={handleChange} />
                </FormControl>
              </HStack>
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Monto mensual</FormLabel>
                  <Input name="monto" value={contrato.monto} onChange={handleChange} placeholder="Ej: 120000" />
                </FormControl>
                <FormControl>
                  <FormLabel>Depósito</FormLabel>
                  <Input name="deposito" value={contrato.deposito} onChange={handleChange} placeholder="Ej: 120000" />
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel>Forma de pago</FormLabel>
                <Select name="formaPago" value={contrato.formaPago} onChange={handleChange}>
                  <option value="">Seleccionar...</option>
                  <option value="transferencia">Transferencia</option>
                  <option value="efectivo">Efectivo</option>
                  <option value="debito">Débito</option>
                  <option value="otro">Otro</option>
                </Select>
              </FormControl>

              {/* Botón Guardar */}
              <Flex justify="center" mt={8}>
                <Button 
                  leftIcon={<FiSave />} 
                  colorScheme="blue" 
                  size="lg" 
                  px={10} 
                  onClick={handleSave}
                >
                  Guardar Contrato
                </Button>
              </Flex>
            </VStack>
          </CardBody>
        </Card>
      </Box>
    </Box>
  )
}
