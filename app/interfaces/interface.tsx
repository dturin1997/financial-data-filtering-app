export interface DataRow {
  date: string;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  eps: number;
  operatingIncome: number;
}

export interface Filter {
  dateRange: number[];
  revenueRange: number[];
  netIncomeRange: number[];
}

export interface MinAndMaxRow {
  name: string;
  minAndMax: number[];
}

export interface RangeValue {
  name: string;
  range: number[];
}

export interface Params {
  name: string;
  range: number[];
}

export interface Fields {
  date: string;
  revenue: string;
  netIncome: string;
  grossProfit: string;
  eps: string;
  operatingIncome: string;
}
