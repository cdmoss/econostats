import { useState } from "react";
import { countries, DataSetDescription, type Country, type DataSet } from "types";

interface DataSelectorProps {
  addDataSet: (indicator: string, country: Country) => Promise<void>;
  removeDataSet: (label: string) => void;
  activeDataSets: DataSet[];
}

export const DataSetList: React.FC<DataSelectorProps> = ({
  addDataSet: onAddDataSet,
  removeDataSet: onRemoveDataSet,
  activeDataSets,
}) => {
  const [newDataSetDesc, setNewDataSetDesc] = useState<DataSetDescription>({})
  // For this example, let's assume we can fetch GDP data for these countries)

  const addDataSetHandler = (country: Country) => {
    onAddDataSet("NY.GDP.MKTP.CD", country)
      .then(() => {
        console.log("Async function finished");
      })
      .catch((err) => {
        console.error("Async function failed", err);
      });
  };

  const removeDataSet = (label: string) => {
    onRemoveDataSet(label);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {activeDataSets.length > 0 && activeDataSets.map((dataSet) => (
        <span key={dataSet.label}>{dataSet.label}</span>
      ))}
    </div>
  );
};
