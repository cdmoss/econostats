import axios, { type AxiosResponse } from "axios";
import { type DataSet, type EconDataPoint } from "types";

export const fetchEconomicData = async (
  indicator: string,
  country: string
): Promise<DataSet | undefined> => {
  const url = `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?format=json`;

  try {
    const response: AxiosResponse<EconDataPoint[][]> = await axios.get<
      EconDataPoint[][]
    >(url);

    console.log(response.status);

    const data: EconDataPoint[][] = response.data;

    console.log(response.data);

    if (data[1]) {
      return {
        label: `${country} - ${indicator}`,
        data: data[1].sort((a, b) => parseInt(a.date) - parseInt(b.date)),
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle expected errors here
      console.error("Failed to fetch data:", error.message);
    } else {
      // Handle unexpected errors here
      console.error("An unexpected error occurred:", error);
    }
  }

  return undefined;
};
