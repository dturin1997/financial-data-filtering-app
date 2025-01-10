import React, { useEffect, useState } from "react";
import { Slider, SliderChangeEvent } from "primereact/slider";

interface params {
  name: string;
  range: number[];
}
interface Props {
  name: string;
  minAndMax: number[];
  captureRangeValue: (params: params) => void;
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
  }, [isClearButtonClicked]);

  return (
    <div className="flex flex-col w-full">
      <Slider
        className="mx-4 lg:mx-0"
        value={[value[0], value[1]]}
        onChange={(e: SliderChangeEvent) => {
          captureRangeValue({ name: name, range: e.value as number[] });
          setValue(e.value as number[]);
        }}
        range
        max={minAndMax[1]}
        min={minAndMax[0]}
      />
      <div className="flex justify-between mt-2">
        <span>
          {
            name != "Date" ? `$${Math.floor(value[0] / 1000000)}M` : value[0]
            /* Assume the date is the value obtained
             when this operation has no integer part. */
          }
        </span>
        <span>
          {name != "Date" ? `$${Math.floor(value[1] / 1000000)}M` : value[1]}
        </span>
      </div>
    </div>
  );
}
