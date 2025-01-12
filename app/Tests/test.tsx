import { rawData } from "../Data/fixedData";
import { DataRow } from "../interfaces/interface";
import {
  DropDownField,
  TruthTableRowThreeFields,
  TruthTableRowTwoFields,
  TruthTableRowOneField,
  TruthValues,
} from "../interfaces/interface";

const initialData = rawData.map((item) => ({
  date: item.date,
  revenue: item.revenue,
  netIncome: item.netIncome,
  grossProfit: item.grossProfit,
  eps: item.eps,
  operatingIncome: item.operatingIncome,
}));

const customSort = (
  data: DataRow[],
  comparators: ((a: DataRow, b: DataRow) => number)[]
) => {
  return [...data].sort((a, b) => {
    for (let comparator of comparators) {
      const result = comparator(a, b);
      if (result !== 0) return result;
    }
    return 0;
  });
};

const dateAsc = (a: DataRow, b: DataRow) =>
  new Date(a.date).getTime() - new Date(b.date).getTime();
const dateDesc = (a: DataRow, b: DataRow) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();
const revenueAsc = (a: DataRow, b: DataRow) => a.revenue - b.revenue;
const revenueDesc = (a: DataRow, b: DataRow) => b.revenue - a.revenue;
const netIncomeAsc = (a: DataRow, b: DataRow) => a.netIncome - b.netIncome;
const netIncomeDesc = (a: DataRow, b: DataRow) => b.netIncome - a.netIncome;

const sortedByDateAscRevenueDescNetIncomeAsc = customSort(initialData, [
  dateAsc,
  revenueDesc,
  netIncomeAsc,
]);
console.log(
  "Date Ascending, Revenue Descending, NetIncome Ascending:",
  sortedByDateAscRevenueDescNetIncomeAsc
);

const sortedByDateDescRevenueAscNetIncomeDesc = customSort(initialData, [
  dateDesc,
  revenueAsc,
  netIncomeDesc,
]);
console.log(
  "Date Descending, Revenue Ascending, NetIncome Descending:",
  sortedByDateDescRevenueAscNetIncomeDesc
);

// Function to generate the truth table For 3 Variables
const generateTruthTableThreeFields = (): TruthTableRowThreeFields[] => {
  const truthTable: TruthTableRowThreeFields[] = [];
  for (let A of [true, false]) {
    for (let B of [true, false]) {
      for (let C of [true, false]) {
        const result = A && B && C;
        truthTable.push({ A, B, C, result });
      }
    }
  }
  return truthTable;
};

// Function to generate the truth table For 2 Variables
const generateTruthTableTwoFields = (): TruthTableRowTwoFields[] => {
  const truthTable: TruthTableRowTwoFields[] = [];
  for (let A of [true, false]) {
    for (let B of [true, false]) {
      const result = A && B;
      truthTable.push({ A, B, result });
    }
  }
  return truthTable;
};

// Function to generate the truth table For 1 Variables
const generateTruthTableOneField = (): TruthTableRowOneField[] => {
  var truthTable: TruthTableRowOneField[] = [];
  for (let A of [true, false]) {
    const result = A;
    truthTable.push({ A, result });
  }
  return truthTable;
};

export const truthValues = (fields: DropDownField[]): TruthValues[] => {
  var count = 0;
  const ids: string[] = [];
  const states: (boolean | null)[] = [];
  fields.forEach((item) => {
    ids.push(item.id);
    states.push(item.state !== null ? item.state : null);
    count++;
  });

  const conditionValues: TruthValues[] =
    count == 1
      ? generateTruthTableOneField()
      : count == 2
      ? generateTruthTableTwoFields()
      : count == 3
      ? generateTruthTableThreeFields()
      : [null];

  return conditionValues;
};

// Add more combinations as needed
