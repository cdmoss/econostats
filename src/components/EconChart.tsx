import { Line } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart, PointElement, LineElement } from "chart.js";

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

const EconomicChart: React.FC<EconomicChartProps> = ({ labels, datasets }) => {
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

export default EconomicChart;
