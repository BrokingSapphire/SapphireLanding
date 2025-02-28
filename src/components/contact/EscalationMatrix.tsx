import React from "react";

interface TableRowProps {
  children: React.ReactNode;
  isHeader?: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ children, isHeader }) => (
  <tr className={isHeader ? "bg-gray-100" : "bg-white border-b"}>
    {children}
  </tr>
);

const TableCell: React.FC<{ children: React.ReactNode; isHeader?: boolean }> = ({ children, isHeader }) => (
  <td className={`px-3 py-4 ${isHeader ? " font-medium text-xl" : ""}`}>{children}</td>
);

const ContactDetails: React.FC = () => {
  const otherContactDetails = [
    { details: "Account Freezing", contactNo: "0811-5883899", workingHours: "11:00 - 6:00" },
    { details: "Non-Individual A/c", contactNo: "0811-5883899", workingHours: "11:00 - 6:00" },
    { details: "API Support", contactNo: "0811-5883899", workingHours: "11:00 - 6:00" },
    { details: "NRI A/c", contactNo: "0811-5883899", workingHours: "11:00 - 6:00" },
  ];

  const escalationMatrix = [
    {
      details: "Customer Care",
      contactPerson: "Support Team",
      emailId: "support@sapphirebroking.com",
      contactNo: "0811-5883899",
      workingHours: "11:00 - 6:00"
    },
    {
      details: "Head of Customer Care",
      contactPerson: "Mr.",
      emailId: "ghijk@sapphirebroking.com",
      contactNo: "0811-5883899",
      workingHours: "11:00 - 6:00"
    },
    {
      details: "Compliance Officer",
      contactPerson: "Mr.",
      emailId: "abcdef@sapphirebroking.com",
      contactNo: "0811-5883899",
      workingHours: "11:00 - 6:00"
    },
    {
      details: "Managing Partner",
      contactPerson: "Mr. Nakul Thakur",
      emailId: "nakul.thakur@sapphirebroking.com",
      contactNo: "0811-5883899",
      workingHours: "11:00 - 6:00"
    },
  ];

  const managerialPersonnel = [
    {
      srNo: "1",
      name: "Nakul Thakur",
      designation: "Managing Partner",
      contactNo: "0811-5883899",
      email: "nakul.thakur@sapphirebroking.com"
    },
    {
      srNo: "2",
      name: "Pratap Thakur",
      designation: "Partner",
      contactNo: "0811-5883899",
      email: "pratap.thakur@sapphirebroking.com"
    },
    {
      srNo: "3",
      name: "Yash Katyari",
      designation: "Partner",
      contactNo: "0811-5883899",
      email: "yash.katyari@sapphirebroking.com"
    },
    {
      srNo: "4",
      name: "Prakash Katyari",
      designation: "Partner",
      contactNo: "0811-5883899",
      email: "prakash.katyari@sapphirebroking.com"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-12">
      {/* Other Contact Details */}
      <div>
        <h2 className="text-2xl font-semibold mt-5 mb-6">Other Contact Details</h2>
        <table className="w-full">
          <thead>
            <TableRow isHeader>
              <TableCell isHeader>Details</TableCell>
              <TableCell isHeader>Contact No.</TableCell>
              <TableCell isHeader>Working hours</TableCell>
            </TableRow>
          </thead>
          <tbody>
            {otherContactDetails.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.details}</TableCell>
                <TableCell>{item.contactNo}</TableCell>
                <TableCell>{item.workingHours}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>

      {/* Escalation Matrix */}
      <div>
        <h2 className="text-2xl font-semibold   mb-6">Escalation Matrix</h2>
        <table className="w-full">
          <thead>
            <TableRow isHeader>
              <TableCell isHeader>Details</TableCell>
              <TableCell isHeader>Contact person</TableCell>
              <TableCell isHeader>Email ID</TableCell>
              <TableCell isHeader>Contact No.</TableCell>
              <TableCell isHeader>Working hours</TableCell>
            </TableRow>
          </thead>
          <tbody>
            {escalationMatrix.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.details}</TableCell>
                <TableCell>{item.contactPerson}</TableCell>
                <TableCell>{item.emailId}</TableCell>
                <TableCell>{item.contactNo}</TableCell>
                <TableCell>{item.workingHours}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key Managerial Personnel Details */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Key Managerial Personnel Details</h2>
        <table className="w-full">
          <thead>
            <TableRow isHeader>
              <TableCell isHeader>Sr. No.</TableCell>
              <TableCell isHeader>Name</TableCell>
              <TableCell isHeader>Designation</TableCell>
              <TableCell isHeader>Contact No.</TableCell>
              <TableCell isHeader>Email</TableCell>
            </TableRow>
          </thead>
          <tbody>
            {managerialPersonnel.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.srNo}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.designation}</TableCell>
                <TableCell>{item.contactNo}</TableCell>
                <TableCell>{item.email}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactDetails;