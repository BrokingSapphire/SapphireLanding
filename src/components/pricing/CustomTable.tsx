import React from "react";

interface TableData {
  type: string;
  charges: string | number;
}

interface CustomTableProps {
  data: TableData[];
  heading: string;
}

const CustomTable: React.FC<CustomTableProps> = ({ data, heading }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-left">
        {heading}
      </h2>
      <div className=" rounded-lg overflow-hidden">
        {data.map((d, index) => (
          <div
            key={d.type}
            className={`grid grid-cols-2 first:font-bold p-4 ${
              index % 2 !== 0 ? "bg-custom-table-white" : "bg-custom-table-blue"
            }`}
          >
            <div dangerouslySetInnerHTML={{ __html: d.type}} />
            <div dangerouslySetInnerHTML={{ __html: d.charges}} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTable;
