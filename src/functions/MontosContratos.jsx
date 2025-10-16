import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#38A169", "#D69E2E", "#E53E3E"]; // verde, amarillo, rojo

export default function MontosContratos() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const contratos = JSON.parse(localStorage.getItem("contratos")) || [];
    const hoy = new Date();

    const calcularEstado = (fechaFin) => {
      if (!fechaFin) return "Activo";
      const fin = new Date(fechaFin);
      if (fin < hoy) return "Vencido";
      const diasRestantes = (fin - hoy) / (1000 * 60 * 60 * 24);
      if (diasRestantes <= 30) return "Por vencer";
      return "Activo";
    };

    const montos = { Activo: 0, "Por vencer": 0, Vencido: 0 };

    contratos.forEach((c) => {
      const estado = calcularEstado(c.fechaFin);
      montos[estado] += Number(c.monto) || 0;
    });

    setData([
      { name: "Activo", value: montos.Activo },
      { name: "Por vencer", value: montos["Por vencer"] },
      { name: "Vencido", value: montos.Vencido },
    ]);
  }, []);

  return (
    <Box mb={8}>
      <Heading size="md" mb={4}>Montos de contratos</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
