import React, { useEffect, useState } from "react";
import { Button, Typography, Card } from "@material-tailwind/react";
import MultipleRangeSlider from "./MultipleRangeSlider";
import { Filter, MinAndMaxRow, RangeValue } from "../interfaces/interface";

interface Props {
  minAndMaxYears: number[];
  minAndMaxRevenue: number[];
  minAndMaxNetIncome: number[];
  filterTableList: (filters: Filter) => void;
  filters: Partial<Filter>;
}

export default function Filters({
  minAndMaxYears,
  minAndMaxRevenue,
  minAndMaxNetIncome,
  filterTableList,
}: Props) {
  const [dateRange, setDateRange] = useState<number[]>(minAndMaxYears);
  const [revenueRange, setRevenueRange] = useState<number[]>(minAndMaxRevenue);
  const [netIncomeRange, setNetIncomeRange] =
    useState<number[]>(minAndMaxNetIncome);

  const [minAndMaxInfo, setMinAndMaxInfo] = useState<MinAndMaxRow[]>([]);
  const [isClearButtonClicked, setIsClearButtonClicked] = useState(false);

  const captureRangeValue = (params: RangeValue) => {
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
    const minAndMaxInfo: MinAndMaxRow[] = [
      { name: "Date", minAndMax: dateRange },
      { name: "Revenue", minAndMax: revenueRange },
      { name: "Net Income", minAndMax: netIncomeRange },
    ];
    setMinAndMaxInfo(minAndMaxInfo);
  }, []);

  const handleButtonFilterClick = () => {
    const filters: Filter = {
      dateRange: dateRange,
      revenueRange: revenueRange,
      netIncomeRange: netIncomeRange,
    };
    filterTableList(filters);
  };

  const handleButtonClearClick = () => {
    const filters: Filter = {
      dateRange: minAndMaxYears,
      revenueRange: minAndMaxRevenue,
      netIncomeRange: minAndMaxNetIncome,
    };

    setIsClearButtonClicked(!isClearButtonClicked);
    filterTableList(filters);
  };

  return (
    <>
      <Card className="my-4">
        <div className="flex py-4 flex-col lg:flex-row">
          <div className="flex w-full justify-between flex-col lg:flex-row items-center px-8">
            <div className="flex flex-col lg:flex-row">
              {minAndMaxInfo.map((info, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center w-full mb-4 lg:px-4"
                  >
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="font-normal mb-2"
                    >
                      {info.name}
                    </Typography>
                    <MultipleRangeSlider
                      name={info.name}
                      minAndMax={info.minAndMax}
                      captureRangeValue={captureRangeValue}
                      isClearButtonClicked={isClearButtonClicked}
                    />
                  </div>
                );
              })}
            </div>
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
