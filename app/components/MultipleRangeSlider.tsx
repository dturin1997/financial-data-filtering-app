import React, { useEffect, useState } from "react";
import { Slider, SliderChangeEvent } from "primereact/slider";
import { Params } from "../interfaces/interface";

interface Props {
  name: string;
  minAndMax: number[];
  captureRangeValue: (params: Params) => void;
  isClearButtonClicked: boolean;
}
export default function MultipleRangeSlider({
  name,
  minAndMax,
  captureRangeValue,
  isClearButtonClicked,
}: Props) {
  const [value, setValue] = useState<number[]>(minAndMax);

  useEffect(() => {
    setValue(minAndMax);
    captureRangeValue({ name: name, range: minAndMax });
  }, [isClearButtonClicked]);

  return (
    <div className="flex flex-col items-center ml-[10%] mr-[10%]">
      <Slider
        className="w-[85%]"
        value={[value[0], value[1]]}
        onChange={(e: SliderChangeEvent) => {
          captureRangeValue({ name: name, range: e.value as number[] });
          setValue(e.value as number[]);
        }}
        range
        max={minAndMax[1]}
        min={minAndMax[0]}
      />
      <div className="flex w-[60%] justify-between mt-3">
        <span className="">
          {
            name != "Date" ? `$${(value[0] / 10 ** 9).toFixed(1)}B` : value[0]
            /* Assume the date is the value obtained
             when this operation has no integer part. */
          }
        </span>
        <span className="">
          {name != "Date" ? `$${(value[1] / 10 ** 9).toFixed(1)}B` : value[1]}
        </span>
      </div>
    </div>
  );
}
