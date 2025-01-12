import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { DropDownField } from "../interfaces/interface";

interface Props {
  sortTableList: (selectedFields: DropDownField[]) => void;
}

export default function SortDropdown({ sortTableList }: Props) {
  const [selectedFields, setSelectedFields] = useState<DropDownField[]>([]);
  const fields = [
    { id: "clear", text: "Reset", state: null },
    { id: "date", text: "Date", state: null },
    { id: "revenue", text: "Revenue", state: null },
    { id: "netIncome", text: "Net Income", state: null },
  ];

  useEffect(() => {
    if (selectedFields.length != 0) {
      sortTableList(selectedFields);
    }
  }, [selectedFields]);

  return (
    <div className="card flex justify-content-center mt-10">
      <FloatLabel className="w-full md:w-14rem">
        <Dropdown
          inputId="dd-field"
          value={selectedFields}
          onChange={(e) => {
            const isThere = selectedFields.find(
              (selectedField) => selectedField.id === e.value.id
            );

            //Handling when the search gives {}
            const fieldOrEmpty: DropDownField = isThere
              ? isThere
              : ({} as DropDownField);

            /*
            Selecting reset enters in this condition
            */
            if (e.value.id === "clear") {
              setSelectedFields([]);
              return;
            }

            /*
            After the first time selected fields 
            enter in this condition
            */

            if (Object.keys(fieldOrEmpty).length > 0) {
              fieldOrEmpty.state = !fieldOrEmpty.state;

              const updatedFields = selectedFields.map((field) =>
                field.id === fieldOrEmpty.id
                  ? { ...field, ...fieldOrEmpty }
                  : field
              );
              setSelectedFields(updatedFields);
            }

            /*
            The first time not selected fields 
            enter in this condition
            */
            if (Object.keys(fieldOrEmpty).length === 0) {
              e.value.state = true;
              setSelectedFields([...selectedFields, e.value]);
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
