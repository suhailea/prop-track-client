import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const salesData = [12, 19, 8, 15, 22, 17, 25, 20, 14, 18, 23, 21];

const data = {
  labels: months,
  datasets: [
    {
      label: "Monthly Sales",
      data: salesData,
      backgroundColor: "rgba(59, 130, 246, 0.7)", // Tailwind blue-500
      borderRadius: 6,
      maxBarThickness: 32,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Monthly Sales",
      font: { size: 18 },
    },
  },
  scales: {
    x: {
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
      grid: { color: "#e5e7eb" },
      ticks: { stepSize: 5 },
    },
  },
};

export default function MonthlySummary() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-800 w-full">
      <Bar data={data} options={options} />
    </div>
  );
}
