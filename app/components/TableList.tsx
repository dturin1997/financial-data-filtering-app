"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Filters from "./Filters";
import { DataRow, Filter, DropDownField } from "../interfaces/interface";
import { rawData } from "../Data/fixedData";
import SortDropdown from "./SortDropdown";
import { SortFunction } from "../utilities/utilities";
import CardTable from "./CardTable";

export default function TableList() {
  const [initialData, setInitialData] = useState<DataRow[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<DataRow[]>([]);
  const [filters, setFilters] = useState<Partial<Filter>>({});

  const [minAndMaxYears, setMinAndMaxYears] = useState<number[]>([]);
  const [minAndMaxRevenue, setMinAndMaxRevenue] = useState<number[]>([]);
  const [minAndMaxNetIncome, setMinAndMaxNetIncome] = useState<number[]>([]);

  const [loading, setLoading] = useState(true);

  const columns: {
    label: string;
    render?: (row: string | number | any) => JSX.Element;
  }[] = [
    { label: "Date" },
    { label: "Revenue" },
    { label: "Net Income" },
    { label: "Gross Profit" },
    { label: "Earnings Per Share" },
    { label: "Operating Income" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

      var initialData: DataRow[];

      if (environment != "development") {
        const res = await fetch(
          `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${apiKey}`
        );
        const result = await res.json();

        initialData = result.map((item: DataRow) => ({
          date: item.date,
          revenue: item.revenue,
          netIncome: item.netIncome,
          grossProfit: item.grossProfit,
          eps: item.eps,
          operatingIncome: item.operatingIncome,
        }));
      } else {
        initialData = rawData.map((item) => ({
          date: item.date,
          revenue: item.revenue,
          netIncome: item.netIncome,
          grossProfit: item.grossProfit,
          eps: item.eps,
          operatingIncome: item.operatingIncome,
        }));
      }
      setInitialData(initialData);
      setFields(Object.keys(initialData[0]));
      setFilteredData(initialData);

      const minYear = Number(
        initialData
          .reduce((min, item) => {
            return item.date < min ? item.date : min;
          }, initialData[0].date)
          .split("-")[0]
      );
      const maxYear = Number(
        initialData
          .reduce((max, item) => {
            return item.date > max ? item.date : max;
          }, initialData[0].date)
          .split("-")[0]
      );

      const minRevenue = initialData.reduce((min, item) => {
        return item.revenue < min ? item.revenue : min;
      }, initialData[0].revenue);

      const maxRevenue = initialData.reduce((max, item) => {
        return item.revenue > max ? item.revenue : max;
      }, initialData[0].revenue);

      const minNetIncome = initialData.reduce((min, item) => {
        return item.netIncome < min ? item.netIncome : min;
      }, initialData[0].netIncome);

      const maxNetIncome = initialData.reduce((max, item) => {
        return item.netIncome > max ? item.netIncome : max;
      }, initialData[0].netIncome);

      setMinAndMaxYears([minYear, maxYear]);
      setMinAndMaxRevenue([minRevenue, maxRevenue]);
      setMinAndMaxNetIncome([minNetIncome, maxNetIncome]);

      const initialFilters = {
        dateRange: [minYear, maxYear],
        revenueRange: [minRevenue, maxRevenue],
        netIncomeRange: [minNetIncome, maxNetIncome],
      };

      setFilters(initialFilters);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filterTableList = (filters: Filter) => {
    setFilters(filters);
    const filteredData = initialData.filter((item) => {
      const year = item.date.split("-")[0];
      const revenue = item.revenue;
      const netIncome = item.netIncome;
      if (
        Number(year) >= filters.dateRange[0] &&
        Number(year) <= filters.dateRange[1] &&
        revenue >= filters.revenueRange[0] &&
        revenue <= filters.revenueRange[1] &&
        netIncome >= filters.netIncomeRange[0] &&
        netIncome <= filters.netIncomeRange[1]
      ) {
        return item;
      }
    });
    setFilteredData(filteredData);
  };

  const sortTableList = (selectedFields: DropDownField[]) => {
    setFilteredData(SortFunction(filteredData, selectedFields));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="mx-4">
        <Filters
          filters={filters}
          filterTableList={filterTableList}
          minAndMaxYears={minAndMaxYears}
          minAndMaxRevenue={minAndMaxRevenue}
          minAndMaxNetIncome={minAndMaxNetIncome}
        />
        <SortDropdown sortTableList={sortTableList} />
        <CardTable
          id="Table List"
          label="Financial data info"
          columns={columns}
          data={filteredData}
          gridTemplateColumns="2fr 2fr 2fr 2fr 2fr 2fr"
        />
      </div>
    </>
  );
}
