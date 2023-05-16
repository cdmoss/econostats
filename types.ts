export interface EconDataPoint {
  date: string;
  value: number;
}

export interface DataSetDescription {
  startYear?: number
  endYear?: number
  indicator?: string
  country?: Country
}
export interface DataSet {
  label: string;
  data: EconDataPoint[];
}

export const countries = ["us", "uk", "germany", "japan"];

export type Country = (typeof countries)[number];
