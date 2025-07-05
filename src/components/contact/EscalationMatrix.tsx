'use client'
import React from "react";

interface TableRowProps {
  children: React.ReactNode;
  isHeader?: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ children, isHeader }) => (
  <tr className={isHeader ? "bg-gray-100" : "bg-white border-b"}>{children}</tr>
);

const TableCell: React.FC<{
  children: React.ReactNode;
  isHeader?: boolean;
}> = ({ children, isHeader }) => (
  <td
    className={`px-2 sm:px-3 py-3 sm:py-4 text-sm sm:text-base ${
      isHeader ? "font-medium text-base sm:text-xl" : ""
    }`}
  >
    {children}
  </td>
);

const ContactDetails: React.FC = () => {
  const otherContactDetails = [
    {
      details: "Account Freezing",
      contactNo: "0811-5883899",
      workingHours: "08:00 AM - 11:55 PM",
    },
    {
      details: "Non-Individual A/c",
      contactNo: "0811-5883899",
      workingHours: "08:00 AM - 11:55 PM",
    },
    {
      details: "API Support",
      contactNo: "0811-5883899",
      workingHours: "08:00 AM - 11:55 PM",
    },
    {
      details: "NRI A/c",
      contactNo: "0811-5883899",
      workingHours: "08:00 AM - 11:55 PM",
    },
  ];

  const escalationMatrix = [
    {
      details: "Customer Care",
      contactPerson: "Support Team",
      emailId: "support@sapphirebroking.com",
      contactNo: "0811-5883899",
      workingHours: "08:00 AM - 11:55 PM",
    },
    {
      details: "Head of Customer Care",
      contactPerson: "Mr. Pralhad Singh",
      emailId: "pralhad.singh@sapphirebroking.com",
      contactNo: "0811-5883899",
      workingHours: "11:00 AM - 06:00 PM",
    },
    {
      details: "Head of Operations",
      contactPerson: "Mr. Rakesh Sharma",
      emailId: "rakesh.sharma@sapphirebroking.com",
      contactNo: "0811-5883899",
      workingHours: "11:00 AM - 06:00 PM",
    },
    {
      details: "Compliance Officer",
      contactPerson: "Mr. Yash Katyari",
      emailId: "yash.katyari@sapphirebroking.com",
      contactNo: "+91 79729 12709",
      workingHours: "11:00 AM - 06:00 PM",
    },
    {
      details: "Managing Partner",
      contactPerson: "Mr. Nakul Thakur",
      emailId: "nakul.thakur@sapphirebroking.com",
      contactNo: "+91 74992 43342",
      workingHours: "11:00 AM - 06:00 PM",
    },
  ];

  const managerialPersonnel = [
    {
      srNo: "1",
      name: "Nakul Thakur",
      designation: "Partner",
      contactNo: "+91 74992 43342",
      email: "nakul.thakur@sapphirebroking.com",
    },
    {
      srNo: "2",
      name: "Pratap Thakur",
      designation: "Partner",
      contactNo: "+91 74992 16075",
      email: "pratap.thakur@sapphirebroking.com",
    },
    {
      srNo: "3",
      name: "Yash Katyari",
      designation: "Partner",
      contactNo: "+91 79729 12709",
      email: "yash.katyari@sapphirebroking.com",
    },
    {
      srNo: "4",
      name: "Prakash Katyari",
      designation: "Partner",
      contactNo: "+91 74992 50318",
      email: "prakash.katyari@sapphirebroking.com",
    },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto sm:mx-12 p-4 space-y-8 sm:space-y-12">
        {/* Other Contact Details */}
        <div className="mb-10 sm:mb-20">
          <h2 className="text-xl sm:text-2xl font-semibold mt-4 sm:mt-5 mb-4 sm:mb-6">
            Other Contact Details
          </h2>
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-[600px]">
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
        </div>

        {/* Escalation Matrix */}
        <div className="mb-10 sm:mb-20">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            Escalation Matrix
          </h2>
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-[800px]">
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
        </div>

        {/* Key Managerial Personnel Details */}
        <div className="mb-10 sm:mb-20">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            Key Managerial Personnel Details
          </h2>
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-[800px]">
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
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar { 
          display: none;  /* Safari and Chrome */
        }
      `}</style>
    </>
  );
};

export default ContactDetails;