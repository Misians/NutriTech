import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Emagrecimento",
    concluido: 4000,
    emprogresso: 2400,
    estagnado: 2400,
  },
  {
    name: "Hipertrofia",
    concluido: 3000,
    emprogresso: 1398,
    estagnado: 2210,
  },
  {
    name: "Manutenção",
    concluido: 2000,
    emprogresso: 9800,
    estagnado: 2290,
  },
];

const ProgressCharts = () => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="concluido"
          fill="#9AD2B2"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="emprogresso"
          fill="#FD9D7B"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
        <Bar
          dataKey="estagnado"
          fill="#9AD2B2"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
export default ProgressCharts