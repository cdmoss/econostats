import {
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DataSet } from "types";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

interface EconomicChartProps {
  activeDataSets: DataSet[]
}
export const EconomicChart: React.FC<EconomicChartProps> = ({
  activeDataSets
}) => {

  console.log(activeDataSets)
  const labels = activeDataSets[0]?.data.map(point => point.date)

  const dataSets = activeDataSets.map(dataSet => ({
    label: dataSet.label, data: dataSet.data.map(point => point.value), fill: false, backgroundColor: "rgb(75,192,192)",
    borderColor: "rgba(75,192,192,0.2)",
  }))

  console.log('labels', labels)

  return (
    <Line
      className="h-full w-full"
      data={{
        labels: labels,
        datasets: dataSets,
      }}
    />
  );
};
