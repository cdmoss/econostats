export interface EconDataPoint {
  date: string;
  value: number;
}

export interface DataSet {
  label: string;
  data: EconDataPoint[];
}

export const countries = ["us", "uk", "germany", "japan"];

export type Country = (typeof countries)[number];
