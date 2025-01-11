import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { DropDownField, SortRequest } from "../interfaces/interface";

export default function SortDropdown() {
  const [selectedFields, setSelectedFields] = useState<DropDownField[]>([]);
  const [sortOrder, setSortOrder] = useState<SortRequest[]>([]);

  const fields = [
    { id: "clear", text: "Reset", state: null },
    { id: "date", text: "Date", state: null },
    { id: "revenue", text: "Revenue", state: null },
    { id: "netIncome", text: "Net Income", state: null },
  ];

  return (
    <div className="card flex justify-content-center mt-10">
      <FloatLabel className="w-full md:w-14rem">
        <Dropdown
          inputId="dd-field"
          value={selectedFields}
          onChange={(e) => {
            const found = fields.find((field) => field.id === e.value.id);
            const field: DropDownField = found ? found : ({} as DropDownField);

            if (field) {
              if (field.id === "clear") {
                setSelectedFields([]);
                return;
              }

              if (field.state === null) {
                field.state = true;
              }

              const isThere = selectedFields.find(
                (selectedField) => selectedField.id === field.id
              );

              if (isThere) {
                isThere.state = !isThere.state;
                const updatedSelectedFields = selectedFields.map((field) =>
                  field.id === isThere.id ? { ...field, ...isThere } : field
                );
                setSelectedFields(updatedSelectedFields);
              }

              if (!isThere) {
                setSelectedFields([...selectedFields, field]);
              }
            }
          }}
          options={fields}
          optionLabel="text"
          className="w-full"
        />
        <label className="text-lg mt-[-4%]" htmlFor="dd-field">
          Sort By&nbsp;
          {selectedFields.map((field, index) => {
            return (
              <span key={index}>
                {field ? field.text : ""}
                &nbsp;
                {field.state ? (
                  <i className="pi pi-arrow-up" />
                ) : (
                  <i className="pi pi-arrow-down" />
                )}
              </span>
            );
          })}
          &nbsp;
          {selectedFields.length === 0 ? (
            <>
              <i className="pi pi-arrow-up" />
              <i className="pi pi-arrow-down" />
            </>
          ) : (
            <></>
          )}
        </label>
      </FloatLabel>
    </div>
  );
}
