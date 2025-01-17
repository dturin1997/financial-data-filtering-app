import React from "react";
import { DataRow } from "../interfaces/interface";
interface Props {
  id?: string;
  label?: string;
  columns: {
    label: string;
    render?: (row: string | number | any) => JSX.Element;
  }[];
  data: DataRow[];
  gridTemplateColumns: string;
}

export default function CardTable({
  id,
  label,
  columns,
  data,
  gridTemplateColumns,
}: Props) {
  columns = columns.map((col) =>
    typeof col === "string" ? { label: col } : col
  );

  const tableClasses = "block md:border text-center";

  const renderRows = ({ data, columns, gridTemplateColumns }: Props) => (
    <>
      {data.map((row, rowIndex) => {
        return (
          <tr
            key={rowIndex}
            className={
              "block bg-amber-50	 w-full md:grid grid-flow-col py-3 md:py-0 border mb-6 md:mb-0 shadow-md md:shadow-none rounded md:rounded-none" +
              (rowIndex > 0 ? " border-t" : "")
            }
            style={{ gridTemplateColumns }}
          >
            {Object.keys(row).map((key, colIndex) => (
              <td
                className={
                  "grid grid-flow-col grid-cols-2 items-center h-full md:grid-cols-1 p-2" +
                  (colIndex > 0 ? " md:border-l" : "")
                }
                key={"row-" + rowIndex + "-col-" + colIndex}
                title={typeof row[key] === "string" ? row[key] : ""}
              >
                <div className="md:sr-only font-semibold text-left pl-4 pr-2">
                  {columns[colIndex].label}
                </div>
                <div className="pl-2 md:p-0 text-left md:text-center">
                  {columns[colIndex].render
                    ? columns[colIndex].render(row[key])
                    : row[key]}
                </div>
              </td>
            ))}
          </tr>
        );
      })}
    </>
  );

  return (
    <table id={id} className={tableClasses} aria-label={label}>
      <thead aria-hidden="true" className="border-b hidden md:block">
        <tr
          className={"block bg-yellow-100 md:grid grid-flow-col"}
          style={{ gridTemplateColumns }}
        >
          {columns.map((col, i) => (
            <th
              key={id + "-th-" + i}
              className={
                "block overflow-hidden p-2" + (i > 0 ? " border-l" : "")
              }
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="block">
        {renderRows({ data, columns, gridTemplateColumns })}
      </tbody>
    </table>
  );
}
