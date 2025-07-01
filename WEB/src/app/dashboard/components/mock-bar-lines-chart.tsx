"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Agua entregada por proveedor",
    },
  },
};

const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"];

export const data = {
  labels,
  datasets: [
    {
      label: "Agua de la Cordillera",
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Agua de la Pampa",
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Agua de la Pampa",
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgb(75, 192, 0.5)",
    },
  ],
};

export default function MockBarLinesChart() {
  return <Bar options={options} data={data} />;
}

// export const data = {
//   labels,
//   datasets: [
//     {
//       type: "line" as const,
//       label: "Agua de los Glaciares",
//       borderColor: "rgb(255, 99, 132)",
//       borderWidth: 2,
//       fill: false,
//       data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
//     },
//     {
//       type: "bar" as const,
//       label: "Agua de la Cordillera",
//       backgroundColor: "rgb(75, 192, 192)",
//       data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
//       borderColor: "white",
//       borderWidth: 2,
//     },
//     {
//       type: "bar" as const,
//       label: "Agua de la Pampa",
//       backgroundColor: "rgb(53, 162, 235)",
//       data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
//     },
//   ],
// };
