import { type NextPage } from "next";
import { useState } from "react";
import type { Country, DataSet } from "types";
import { EconomicChart } from "~/components/Chart";
import DataSelector from "~/components/Chart/DataSelector";
import { fetchEconomicData } from "~/lib/external-data";

export async function getServerSideProps() {
  const data = await fetchEconomicData("NY.GDP.MKTP.CD", "us");
  console.log(data);
  return { props: { data } };
}

const ChartPage: NextPage<{ data: DataSet }> = ({ data }) => {
  const [activeDataSets, setActiveDataSets] = useState<DataSet[]>([]);

  const addDataSet = async (indicator: string, country: Country) => {
    const fetchedData = await fetchEconomicData(indicator, country);

    if (fetchedData) setActiveDataSets([...activeDataSets, fetchedData]);
  };

  const removeDataSet = (label: string) => {
    setActiveDataSets((prevDataSets) =>
      prevDataSets.filter((dataSet) => dataSet.label !== label)
    );
  };
  return (
    <div>
      <h1>Economic Data</h1>
      {data ? (
        <>
          <DataSelector
            onAddDataSet={addDataSet}
            onRemoveDataSet={removeDataSet}
            activeDataSets={activeDataSets}
          />
          <EconomicChart
            labels={data.data.map((dataPoint) => dataPoint.date)}
            datasets={[
              {
                label: "GDP",
                data: data.data.map((dataPoint) => dataPoint.value),
                fill: false,
                backgroundColor: "rgb(75,192,192)",
                borderColor: "rgba(75,192,192,0.2)",
              },
            ]}
          />
        </>
      ) : (
        <p>Waiting for data</p>
      )}
    </div>
  );
};

export default ChartPage;
