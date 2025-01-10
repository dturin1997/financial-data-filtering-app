"use client";
import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Filters from "./Filters";

export default function TableList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [minAndMaxYears, setMinAndMaxYears] = useState<[number, number]>();
  const [minAndMaxRevenue, setMinAndMaxRevenue] = useState<[number, number]>();
  const [minAndMaxNetIncome, setMinAndMaxNetIncome] =
    useState<[number, number]>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      /*
      const res = await fetch(
        "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=KKyqUUKofJ5BgUtYZ5k2pxOx8qYq6ih2"
      );
      const result = await res.json();
      */
      const result = [
        {
          date: "2024-09-28",
          symbol: "AAPL",
          reportedCurrency: "USD",
          cik: "0000320193",
          fillingDate: "2024-11-01",
          acceptedDate: "2024-11-01 06:01:36",
          calendarYear: "2024",
          period: "FY",
          revenue: 391035000000,
          costOfRevenue: 210352000000,
          grossProfit: 180683000000,
          grossProfitRatio: 0.4620634982,
          researchAndDevelopmentExpenses: 31370000000,
          generalAndAdministrativeExpenses: 0,
          sellingAndMarketingExpenses: 0,
          sellingGeneralAndAdministrativeExpenses: 26097000000,
          otherExpenses: 0,
          operatingExpenses: 57467000000,
          costAndExpenses: 267819000000,
          interestIncome: 0,
          interestExpense: 0,
          depreciationAndAmortization: 11445000000,
          ebitda: 134661000000,
          ebitdaratio: 0.3443707085,
          operatingIncome: 123216000000,
          operatingIncomeRatio: 0.3151022287,
          totalOtherIncomeExpensesNet: 269000000,
          incomeBeforeTax: 123485000000,
          incomeBeforeTaxRatio: 0.3157901467,
          incomeTaxExpense: 29749000000,
          netIncome: 93736000000,
          netIncomeRatio: 0.2397125577,
          eps: 6.11,
          epsdiluted: 6.08,
          weightedAverageShsOut: 15343783000,
          weightedAverageShsOutDil: 15408095000,
          link: "https://www.sec.gov/Archives/edgar/data/320193/000032019324000123/0000320193-24-000123-index.htm",
          finalLink:
            "https://www.sec.gov/Archives/edgar/data/320193/000032019324000123/aapl-20240928.htm",
        },
        {
          date: "2023-09-30",
          symbol: "AAPL",
          reportedCurrency: "USD",
          cik: "0000320193",
          fillingDate: "2023-11-03",
          acceptedDate: "2023-11-02 18:08:27",
          calendarYear: "2023",
          period: "FY",
          revenue: 383285000000,
          costOfRevenue: 214137000000,
          grossProfit: 169148000000,
          grossProfitRatio: 0.4413112958,
          researchAndDevelopmentExpenses: 29915000000,
          generalAndAdministrativeExpenses: 0,
          sellingAndMarketingExpenses: 0,
          sellingGeneralAndAdministrativeExpenses: 24932000000,
          otherExpenses: 382000000,
          operatingExpenses: 54847000000,
          costAndExpenses: 268984000000,
          interestIncome: 3750000000,
          interestExpense: 3933000000,
          depreciationAndAmortization: 11519000000,
          ebitda: 125820000000,
          ebitdaratio: 0.3282674772,
          operatingIncome: 114301000000,
          operatingIncomeRatio: 0.2982141227,
          totalOtherIncomeExpensesNet: -565000000,
          incomeBeforeTax: 113736000000,
          incomeBeforeTaxRatio: 0.2967400237,
          incomeTaxExpense: 16741000000,
          netIncome: 96995000000,
          netIncomeRatio: 0.2530623426,
          eps: 6.16,
          epsdiluted: 6.13,
          weightedAverageShsOut: 15744231000,
          weightedAverageShsOutDil: 15812547000,
          link: "https://www.sec.gov/Archives/edgar/data/320193/000032019323000106/0000320193-23-000106-index.htm",
          finalLink:
            "https://www.sec.gov/Archives/edgar/data/320193/000032019323000106/aapl-20230930.htm",
        },
        {
          date: "2022-09-24",
          symbol: "AAPL",
          reportedCurrency: "USD",
          cik: "0000320193",
          fillingDate: "2022-10-28",
          acceptedDate: "2022-10-27 18:01:14",
          calendarYear: "2022",
          period: "FY",
          revenue: 394328000000,
          costOfRevenue: 223546000000,
          grossProfit: 170782000000,
          grossProfitRatio: 0.4330963056,
          researchAndDevelopmentExpenses: 26251000000,
          generalAndAdministrativeExpenses: 0,
          sellingAndMarketingExpenses: 0,
          sellingGeneralAndAdministrativeExpenses: 25094000000,
          otherExpenses: 228000000,
          operatingExpenses: 51573000000,
          costAndExpenses: 275119000000,
          interestIncome: 2825000000,
          interestExpense: 2931000000,
          depreciationAndAmortization: 11104000000,
          ebitda: 130541000000,
          ebitdaratio: 0.3310467428,
          operatingIncome: 119437000000,
          operatingIncomeRatio: 0.302887444,
          totalOtherIncomeExpensesNet: -334000000,
          incomeBeforeTax: 119103000000,
          incomeBeforeTaxRatio: 0.3020404333,
          incomeTaxExpense: 19300000000,
          netIncome: 99803000000,
          netIncomeRatio: 0.2530964071,
          eps: 6.15,
          epsdiluted: 6.11,
          weightedAverageShsOut: 16215963000,
          weightedAverageShsOutDil: 16325819000,
          link: "https://www.sec.gov/Archives/edgar/data/320193/000032019322000108/0000320193-22-000108-index.htm",
          finalLink:
            "https://www.sec.gov/Archives/edgar/data/320193/000032019322000108/aapl-20220924.htm",
        },
        {
          date: "2021-09-25",
          symbol: "AAPL",
          reportedCurrency: "USD",
          cik: "0000320193",
          fillingDate: "2021-10-29",
          acceptedDate: "2021-10-28 18:04:28",
          calendarYear: "2021",
          period: "FY",
          revenue: 365817000000,
          costOfRevenue: 212981000000,
          grossProfit: 152836000000,
          grossProfitRatio: 0.4177935963,
          researchAndDevelopmentExpenses: 21914000000,
          generalAndAdministrativeExpenses: 0,
          sellingAndMarketingExpenses: 0,
          sellingGeneralAndAdministrativeExpenses: 21973000000,
          otherExpenses: -60000000,
          operatingExpenses: 43827000000,
          costAndExpenses: 256808000000,
          interestIncome: 2843000000,
          interestExpense: 2645000000,
          depreciationAndAmortization: 11284000000,
          ebitda: 120233000000,
          ebitdaratio: 0.3286697994,
          operatingIncome: 108949000000,
          operatingIncomeRatio: 0.2978237753,
          totalOtherIncomeExpensesNet: 258000000,
          incomeBeforeTax: 109207000000,
          incomeBeforeTaxRatio: 0.2985290459,
          incomeTaxExpense: 14527000000,
          netIncome: 94680000000,
          netIncomeRatio: 0.2588179336,
          eps: 5.67,
          epsdiluted: 5.61,
          weightedAverageShsOut: 16701272000,
          weightedAverageShsOutDil: 16864919000,
          link: "https://www.sec.gov/Archives/edgar/data/320193/000032019321000105/0000320193-21-000105-index.htm",
          finalLink:
            "https://www.sec.gov/Archives/edgar/data/320193/000032019321000105/aapl-20210925.htm",
        },
        {
          date: "2020-09-26",
          symbol: "AAPL",
          reportedCurrency: "USD",
          cik: "0000320193",
          fillingDate: "2020-10-30",
          acceptedDate: "2020-10-29 18:06:25",
          calendarYear: "2020",
          period: "FY",
          revenue: 274515000000,
          costOfRevenue: 169559000000,
          grossProfit: 104956000000,
          grossProfitRatio: 0.3823324773,
          researchAndDevelopmentExpenses: 18752000000,
          generalAndAdministrativeExpenses: 0,
          sellingAndMarketingExpenses: 0,
          sellingGeneralAndAdministrativeExpenses: 19916000000,
          otherExpenses: 87000000,
          operatingExpenses: 38755000000,
          costAndExpenses: 208314000000,
          interestIncome: 3763000000,
          interestExpense: 2873000000,
          depreciationAndAmortization: 11056000000,
          ebitda: 77344000000,
          ebitdaratio: 0.2817478098,
          operatingIncome: 66288000000,
          operatingIncomeRatio: 0.2414731435,
          totalOtherIncomeExpensesNet: 803000000,
          incomeBeforeTax: 67091000000,
          incomeBeforeTaxRatio: 0.2443983025,
          incomeTaxExpense: 9680000000,
          netIncome: 57411000000,
          netIncomeRatio: 0.2091361128,
          eps: 3.31,
          epsdiluted: 3.28,
          weightedAverageShsOut: 17352119000,
          weightedAverageShsOutDil: 17528214000,
          link: "https://www.sec.gov/Archives/edgar/data/320193/000032019320000096/0000320193-20-000096-index.htm",
          finalLink:
            "https://www.sec.gov/Archives/edgar/data/320193/000032019320000096/aapl-20200926.htm",
        },
      ];

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

  const filterTableList = (filters: any) => {
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
