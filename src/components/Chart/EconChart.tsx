import {
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

interface EconomicChartProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
  }[];
}

export const EconomicChart: React.FC<EconomicChartProps> = ({
  labels,
  datasets,
}) => {
  return (
    <div>
      <Line
        data={{
          labels: labels,
          datasets: datasets,
        }}
      />
    </div>
  );
};
