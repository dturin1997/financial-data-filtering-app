import React, { useState } from "react";
import { Slider, SliderChangeEvent } from "primereact/slider";

export default function MultipleRangeSlider({
  name,
  minAndMax,
  captureRangeValue,
}) {
  const [value, setValue] = useState<[number, number]>(minAndMax);

  return (
    <div className="flex flex-col">
      <Slider
        value={value}
        onChange={(e: SliderChangeEvent) => {
          setValue(e.value as [number, number]);
          captureRangeValue({ name: name, range: e.value });
        }}
        className="lg:w-48"
        range
        max={minAndMax[1]}
        min={minAndMax[0]}
      />
      <div className="flex justify-between">
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
