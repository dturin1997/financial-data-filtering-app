import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
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
      <div className="card my-3 mx-auto max-w-[650px]">
        <Card title="User Filters">
          <div className="flex flex-col">
            <div>
              {minAndMaxInfo.map((info, index) => {
                return (
                  <div
                    key={index}
                    className="w-full flex-col items-center mb-4"
                  >
                    <div className="flex justify-center">
                      <span className="mb-4">{info.name}</span>
                    </div>
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

            <div className="flex w-full justify-between">
              <Button
                className="w-[20%] text-xl px-2 py-1 ml-[25%]"
                label="Clear"
                raised
                onClick={handleButtonClearClick}
              />
              <Button
                className="w-[20%] text-xl px-2 py-1 mr-[25%]"
                label="Filter"
                raised
                onClick={handleButtonFilterClick}
                size="large"
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
