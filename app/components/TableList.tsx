"use client";
import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Filters from "./Filters";

interface DataRow {
  date: string;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  eps: number;
  operatingIncome: number;
}

interface Filter {
  dateRange: number[];
  revenueRange: number[];
  netIncomeRange: number[];
}

export default function TableList() {
  const [data, setData] = useState<DataRow[]>([]);
  const [filteredData, setFilteredData] = useState<DataRow[]>([]);

  const [minAndMaxYears, setMinAndMaxYears] = useState<number[]>([]);
  const [minAndMaxRevenue, setMinAndMaxRevenue] = useState<number[]>([]);
  const [minAndMaxNetIncome, setMinAndMaxNetIncome] = useState<number[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=KKyqUUKofJ5BgUtYZ5k2pxOx8qYq6ih2"
      );
      const result: DataRow[] = await res.json();

      setData(result);
      setFilteredData(result);

      const minYear = Number(
        result
          .reduce((min, item) => {
            return item.date < min ? item.date : min;
          }, result[0].date)
          .split("-")[0]
      );
      const maxYear = Number(
        result
          .reduce((max, item) => {
            return item.date > max ? item.date : max;
          }, result[0].date)
          .split("-")[0]
      );

      const minRevenue = result.reduce((min, item) => {
        return item.revenue < min ? item.revenue : min;
      }, result[0].revenue);

      const maxRevenue = result.reduce((max, item) => {
        return item.revenue > max ? item.revenue : max;
      }, result[0].revenue);

      const minNetIncome = result.reduce((min, item) => {
        return item.netIncome < min ? item.netIncome : min;
      }, result[0].netIncome);

      const maxNetIncome = result.reduce((max, item) => {
        return item.netIncome > max ? item.netIncome : max;
      }, result[0].netIncome);

      setMinAndMaxYears([minYear, maxYear]);
      setMinAndMaxRevenue([minRevenue, maxRevenue]);
      setMinAndMaxNetIncome([minNetIncome, maxNetIncome]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filterTableList = (filters: Filter) => {
    const filteredData = data.filter((item) => {
      const year = item.date.split("-")[0];
      const revenue = item.revenue;
      const netIncome = item.netIncome;
      if (
        Number(year) >= Number(filters.dateRange[0]) &&
        Number(year) <= Number(filters.dateRange[1]) &&
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
