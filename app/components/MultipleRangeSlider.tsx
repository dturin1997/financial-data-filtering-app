import React, { useEffect, useState } from "react";
import { Slider, SliderChangeEvent } from "primereact/slider";

export default function MultipleRangeSlider({
  name,
  minAndMax,
  captureRangeValue,
  isClearButtonClicked,
}) {
  const [value, setValue] = useState<[number, number]>(minAndMax);

  useEffect(() => {
    setValue(minAndMax);
  }, [isClearButtonClicked]);

  return (
    <div className="flex flex-col w-full">
      <Slider
        className="mx-4 lg:mx-0"
        value={value}
        onChange={(e: SliderChangeEvent) => {
          captureRangeValue({ name: name, range: e.value });
          setValue(e.value as [number, number]);
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
