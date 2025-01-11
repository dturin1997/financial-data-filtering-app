"use client";
import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Filters from "./Filters";
import { DataRow, Filter } from "../interfaces/interface";
//import { rawData } from "../Data/fixedData";

export default function TableList() {
  const [initialData, setInitialData] = useState<DataRow[]>([]);
  const [filteredData, setFilteredData] = useState<DataRow[]>([]);
  const [filters, setFilters] = useState<Partial<Filter>>({});

  const [minAndMaxYears, setMinAndMaxYears] = useState<number[]>([]);
  const [minAndMaxRevenue, setMinAndMaxRevenue] = useState<number[]>([]);
  const [minAndMaxNetIncome, setMinAndMaxNetIncome] = useState<number[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=KKyqUUKofJ5BgUtYZ5k2pxOx8qYq6ih2"
      );
      const initialData: DataRow[] = await res.json();

      /*
      const initialData = rawData.map((item) => ({
        date: item.date,
        revenue: item.revenue,
        netIncome: item.netIncome,
        grossProfit: item.grossProfit,
        eps: item.eps,
        operatingIncome: item.operatingIncome,
      }));
      */

      setInitialData(initialData);
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="">
      <Filters
        filters={filters}
        filterTableList={filterTableList}
        minAndMaxYears={minAndMaxYears}
        minAndMaxRevenue={minAndMaxRevenue}
        minAndMaxNetIncome={minAndMaxNetIncome}
      />
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Date
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Revenue
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Net Income
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Gross Profit
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                EPS
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Operating Income
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(
              (
                { date, revenue, netIncome, grossProfit, eps, operatingIncome },
                index
              ) => {
                return (
                  <tr key={index}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {revenue}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {netIncome}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {grossProfit}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {eps}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {operatingIncome}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
