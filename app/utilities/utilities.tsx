import { DataRow, DropDownField } from "../interfaces/interface";

const customSort = (
  data: DataRow[],
  comparators: (((a: DataRow, b: DataRow) => number) | null)[]
) => {
  return [...data].sort((a, b) => {
    for (let comparator of comparators) {
      const result = comparator != null ? comparator(a, b) : 0;
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

const comparators = [
  { id: "date", asc: dateAsc, desc: dateDesc },
  { id: "revenue", asc: revenueAsc, desc: revenueDesc },
  { id: "netIncome", asc: netIncomeAsc, desc: netIncomeDesc },
];

export const SortFunction = (
  data: DataRow[],
  fields: DropDownField[]
): DataRow[] => {
  let result: DataRow[] = [];

  fields.forEach((field) => {
    const comparatorsArray: (((a: DataRow, b: DataRow) => number) | null)[] =
      [];

    comparators.forEach((item) => {
      const comparator =
        item.id === field.id ? (field.state ? item.asc : item.desc) : null;
      comparatorsArray.push(comparator);
    });
    result = customSort(data, comparatorsArray);
  });
  return result;
};
