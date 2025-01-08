"use client";
import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";

export default function TableList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=KKyqUUKofJ5BgUtYZ5k2pxOx8qYq6ih2"
      );
      const result = await res.json();
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
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
          {data.map(
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
  );
}
