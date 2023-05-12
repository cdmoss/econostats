import { useEffect, useState } from 'react';
import EconomicChart from '../components/EconChart';
import { fetchGDP } from '../lib/external-data';

const EconomicsPage = () => {
  const [gdpData, setGdpData] = useState<{ date: string; value: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGDP('us');
      setGdpData(data[1]);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Economic Data</h1>
      <EconomicChart
        labels={gdpData.map((dataPoint) => dataPoint.date)}
        datasets={[
          {
            label: 'GDP',
            data: gdpData.map((dataPoint) => dataPoint.value),
            fill: false,
            backgroundColor: 'rgb(75,192,192)',
            borderColor: 'rgba(75,192,192,0.2)',
          },
        ]}
      />
    </div>
  );
};

export default EconomicsPage;
