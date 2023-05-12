import { countries, type Country, type DataSet } from "types";

interface DataSelectorProps {
  onAddDataSet: (indicator: string, country: Country) => Promise<void>;
  onRemoveDataSet: (label: string) => void;
  activeDataSets: DataSet[];
}

const DataSelector: React.FC<DataSelectorProps> = ({
  onAddDataSet,
  onRemoveDataSet,
  activeDataSets,
}) => {
  // For this example, let's assume we can fetch GDP data for these countries

  const addDataSet = (country: Country) => {
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
    <div>
      {countries.map((country) => (
        <button key={country} onClick={() => addDataSet(country)}>
          Add GDP - {country}
        </button>
      ))}
      {activeDataSets.map((dataSet) => (
        <button
          key={dataSet.label}
          onClick={() => removeDataSet(dataSet.label)}
        >
          Remove {dataSet.label}
        </button>
      ))}
    </div>
  );
};

export default DataSelector;
