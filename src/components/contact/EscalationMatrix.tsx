import React from "react";

const EscalationMatrix = () => {
  const escalationData = [
    {
      details: "Customer Care",
      contactPerson: "Support Team",
      emailId: "support@sapphirebroking.com",
      contactNo: "080-65000111",
    },
    {
      details: "Head of Customer Care",
      contactPerson: "Mr.",
      emailId: "abcde.efg@sapphirebroking.com",
      contactNo: "080-45568634",
    },
    {
      details: "Compliance Officer",
      contactPerson: "Mr.",
      emailId: "abcde.efg@sapphirebroking.com",
      contactNo: "080-45568633",
    },
    {
      details: "CEO",
      contactPerson: "Mr.Nakul Thakur",
      emailId: "nakul.thakur@sapphirebroking.com",
      contactNo: "080-45568632",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Escalation Matrix</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-teal-100">
              <th className="py-3 px-4 text-left font-semibold">Details</th>
              <th className="py-3 px-4 text-left font-semibold">
                Contact Person
              </th>
              <th className="py-3 px-4 text-left font-semibold">Email ID</th>
              <th className="py-3 px-4 text-left font-semibold">Contact No.</th>
            </tr>
          </thead>
          <tbody>
            {escalationData.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-3 px-4 border-t">{row.details}</td>
                <td className="py-3 px-4 border-t">{row.contactPerson}</td>
                <td className="py-3 px-4 border-t">
                  <a
                    href={`mailto:${row.emailId}`}
                    className="text-blue-500 hover:underline"
                  >
                    {row.emailId}
                  </a>
                </td>
                <td className="py-3 px-4 border-t">{row.contactNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EscalationMatrix;
