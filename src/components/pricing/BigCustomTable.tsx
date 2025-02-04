interface SapphireCharge {
  category: string;
  value: string;
}

interface SapphireChargesRow {
  type: string;
  charges: SapphireCharge[];
}

interface SapphireTableProps {
  data: SapphireChargesRow[];
  heading: string;
}

export const BigCustomTable: React.FC<SapphireTableProps> = ({
  data,
  heading,
}) => {
  return (
    <div className="w-full max-w-6xl mb-8 mx-auto">
      <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-left">
        {heading}
      </h2>
      <div className="border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-5 bg-custom-table-blue p-4 font-semibold">
          <div className="font-bold">Type</div>
          <div>Equity Delivery</div>
          <div>Equity Intraday</div>
          <div>Equity Futures</div>
          <div>Equity Options</div>
        </div>

        {/* Rows */}
        {data.map((row, index) => (
          <div
            key={row.type}
            className={`grid grid-cols-5 p-4 gap-9 ${
              index % 2 !== 0 ? "bg-custom-table-white" : "bg-custom-table-blue"
            }`}
          >
            <div className="font-bold text-gray-800">{row.type}</div>
            {row.charges.map((charge, i) => (
              <div key={i} className="text-gray-700">
                {charge.value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
