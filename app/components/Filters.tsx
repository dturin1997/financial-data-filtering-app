import React, { useEffect, useState } from "react";
import { Button, Typography, Card } from "@material-tailwind/react";
import MultipleRangeSlider from "./MultipleRangeSlider";

export default function Filters({
  minAndMaxYears,
  minAndMaxRevenue,
  minAndMaxNetIncome,
  filterTableList,
}) {
  const [dateRange, setDateRange] = useState<[number, number]>(minAndMaxYears);
  const [revenueRange, setRevenueRange] =
    useState<[number, number]>(minAndMaxRevenue);
  const [netIncomeRange, setNetIncomeRange] =
    useState<[number, number]>(minAndMaxNetIncome);

  const [minAndMaxInfo, setMinAndMaxInfo] = useState([]);

  const captureRangeValue = (params) => {
    if (params.name == "Date") {
      setDateRange(params.range);
    }
    if (params.name == "Revenue") {
      setRevenueRange(params.range);
    }
    if (params.name == "Net Income") {
      setNetIncomeRange(params.range);
    }
  };
  useEffect(() => {
    const minAndMaxInfo = [
      { name: "Date", minAndMax: dateRange },
      { name: "Revenue", minAndMax: revenueRange },
      { name: "Net Income", minAndMax: netIncomeRange },
    ];
    setMinAndMaxInfo(minAndMaxInfo);
  }, []);

  const handleButtonFilterClick = () => {
    const filters: any = {
      dateRange: dateRange,
      revenueRange: revenueRange,
      netIncomeRange: netIncomeRange,
    };
    filterTableList(filters);
  };

  const handleButtonClearClick = () => {
    const filters: any = {
      dateRange: minAndMaxYears,
      revenueRange: minAndMaxRevenue,
      netIncomeRange: minAndMaxNetIncome,
    };
    filterTableList(filters);
  };

  return (
    <>
      <Card className="my-4">
        <div className="flex justify-between py-4 w-full flex-col lg:flex-row gap-8">
          <div className="flex flex-col lg:flex-row items-center">
            {minAndMaxInfo.map((info, index) => {
              return (
                <div key={index} className="lg:px-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {info.name}
                  </Typography>
                  <MultipleRangeSlider
                    name={info.name}
                    minAndMax={info.minAndMax}
                    range={info.minAndMax}
                    captureRangeValue={captureRangeValue}
                  />
                </div>
              );
            })}
            <div className="flex lg:flex-col">
              <Button
                className="mr-2 lg:mb-2 lg:mx-0"
                size="sm"
                variant="gradient"
                onClick={handleButtonFilterClick}
              >
                Filter
              </Button>
              <Button
                className="ml-2 lg:mt-2 lg:mx-0"
                size="sm"
                variant="gradient"
                onClick={handleButtonClearClick}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
