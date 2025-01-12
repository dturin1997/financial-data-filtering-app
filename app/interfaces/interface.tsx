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

export interface DropDownField {
  id: string;
  text?: string;
  state: boolean | null;
}

export interface TruthTableRowThreeFields {
  A: boolean;
  B: boolean;
  C: boolean;
  result: boolean;
}
export interface TruthTableRowTwoFields {
  A: boolean;
  B: boolean;
  result: boolean;
}
export interface TruthTableRowOneField {
  A: boolean;
  result: boolean;
}

export type TruthValues =
  | TruthTableRowThreeFields
  | TruthTableRowTwoFields
  | TruthTableRowOneField
  | null;
