import { type NextPage } from "next";
import { useEffect, useState } from "react";
import type { Country, DataSet, DataSetDescription } from "types";
import { EconomicChart } from "~/components/Chart";
import { DataSetList } from "~/components/Chart/DataSetList";
import { fetchEconomicData } from "~/lib/external-data";

export async function getServerSideProps() {
  const data = await fetchEconomicData("NY.GDP.MKTP.CD", "us", 2010, 2023);
  return { props: { initialData: data } }
}

const ChartPage: NextPage<{ initialData: DataSet }> = ({ initialData }) => {

  const [activeDataSets, setActiveDataSets] = useState<DataSet[]>([initialData]);

  const addDataSet = async (indicator: string, country: Country) => {
    const fetchedData = await fetchEconomicData(indicator, country, 2010, 2023);

    if (fetchedData) setActiveDataSets([...activeDataSets, fetchedData]);
  };

  const removeDataSet = (label: string) => {
    setActiveDataSets((prevDataSets) =>
      prevDataSets.filter((dataSet) => dataSet.label !== label)
    );
  };

  return (
    <div className="p-10 h-full flex flex-col items-center">
      <h1>Economic Data</h1>
      {activeDataSets.length > 0 ? (
        <div className="flex gap-10 h-full w-full">
          <div>
            <DataSetList
              addDataSet={addDataSet}
              removeDataSet={removeDataSet}
              activeDataSets={activeDataSets}
            />
          </div>
          <div className="flex-1">
            <EconomicChart
              activeDataSets={activeDataSets}
            />
          </div>
        </div>
      ) : (
        <p>Waiting for data</p>
      )}
    </div>
  );
};

export default ChartPage;
