import React from "react";

// Types
interface Point {
  subtitle: string;
  points: string[];
}

interface ContactInfo {
  company: string;
  email: string;
  phone: string;
  address: string;
}

interface AdvisoryCardProps {
  title: string;
  points?: string[];
  description?: string;
  contact?: ContactInfo;
  sections?: Point[];
}

interface RightsItem {
  category: string;
  rights: string[];
}

interface RightsTableProps {
  rights: RightsItem[];
}

interface TimelineItem {
  id: number;
  service: string;
  timeline: string;
}

interface TimelineTableProps {
  timelines: TimelineItem[];
}

interface GrievanceStep {
  step: string;
  details: string[];
}

interface GrievanceStepsProps {
  steps: GrievanceStep[];
}

interface ExpectationItem {
  category: string;
  expectations: string[];
}

interface ExpectationsTableProps {
  expectations: ExpectationItem[];
}

interface ServiceSegment {
  name: string;
  services: string[];
}

interface ServicesTableProps {
  category: string;
  segments: ServiceSegment[];
}

interface DosAndDontsTableProps {
  dos: string[];
  donts: string[];
}

interface ComplaintData {
  source?: string;
  month?: string;
  year?: string;
  carried: number;
  received: number;
  resolved: number;
  pending: number;
  avgTime?: string;
}

interface ComplaintsTableProps {
  data: ComplaintData[];
  total: Omit<ComplaintData, "source" | "month" | "year">;
}

// AdvisoryCard component to display individual advisory items
export const AdvisoryCard: React.FC<AdvisoryCardProps> = ({
  title,
  points,
  description,
  contact,
  sections,
}) => {
  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-sm mb-4">
      <h2 className="text-xl font-bold text-green-heading mb-4">{title}</h2>

      {points && (
        <ul className="list-disc pl-6 space-y-2 text-gray-500">
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}

      {description && <p className="text-gray-500">{description}</p>}

      {contact && (
        <div className="space-y-2 text-gray-500">
          <p>{contact.company}</p>
          <ul className="list-none space-y-1">
            <li>Email: {contact.email}</li>
            <li>Phone: {contact.phone}</li>
            <li>Address: {contact.address}</li>
          </ul>
        </div>
      )}

      {sections &&
        sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mt-4">
            <p className="text-gray-500 mb-2">{section.subtitle}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              {section.points.map((point, pointIndex) => (
                <li key={pointIndex}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

// RightsTable component for the Rights of Investors section
export const RightsTable: React.FC<RightsTableProps> = ({ rights }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">Category</th>
            <th className="border border-gray-300 p-3 text-left">Rights</th>
          </tr>
        </thead>
        <tbody>
          {rights.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-3 font-medium">
                {item.category}
              </td>
              <td className="border border-gray-300 p-3">
                <ul className="list-disc pl-6 space-y-1">
                  {item.rights.map((right, rightIndex) => (
                    <li key={rightIndex}>{right}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// TimelineTable component for broker timelines
export const TimelineTable: React.FC<TimelineTableProps> = ({ timelines }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">Sr. No.</th>
            <th className="border border-gray-300 p-3 text-left">Service</th>
            <th className="border border-gray-300 p-3 text-left">Timeline</th>
          </tr>
        </thead>
        <tbody className="text-gray-500">
          {timelines.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 p-3">{item.id}</td>
              <td className="border border-gray-300 p-3">{item.service}</td>
              <td className="border border-gray-300 p-3">{item.timeline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// GrievanceSteps component for the grievance redressal mechanism
export const GrievanceSteps: React.FC<GrievanceStepsProps> = ({ steps }) => {
  return (
    <div className="space-y-6 text-gray-500">
      {steps.map((step, index) => (
        <div key={index}>
          <h4 className="text-lg font-medium mb-2">
            {index + 1}. {step.step}
          </h4>
          <ul className="list-disc pl-6 space-y-2">
            {step.details.map((detail, detailIndex) => (
              <li key={detailIndex}>{detail}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// ExpectationsTable component for expectations from investors
export const ExpectationsTable: React.FC<ExpectationsTableProps> = ({
  expectations,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">Category</th>
            <th className="border border-gray-300 p-3 text-left">
              Expectations
            </th>
          </tr>
        </thead>
        <tbody>
          {expectations.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-3 font-medium">
                {item.category}
              </td>
              <td className="border border-gray-300 p-3">
                <ul className="list-disc pl-6 space-y-1">
                  {item.expectations.map((expectation, expIndex) => (
                    <li key={expIndex}>{expectation}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ServicesTable component for services provided by Sapphire Broking
export const ServicesTable: React.FC<ServicesTableProps> = ({
  category,
  segments,
}) => {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-medium mb-2">{category}</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-left">Segment</th>
              <th className="border border-gray-300 p-3 text-left">Services</th>
            </tr>
          </thead>
          <tbody className="text-gray-500">
            {segments.map((segment, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-3 font-medium">
                  {segment.name}
                </td>
                <td className="border border-gray-300 p-3">
                  <ul className="list-disc pl-6 space-y-1">
                    {segment.services.map((service, serviceIndex) => (
                      <li key={serviceIndex}>{service}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// DosAndDontsTable component for the do's and don'ts section
export const DosAndDontsTable: React.FC<DosAndDontsTableProps> = ({
  dos,
  donts,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">DO's</th>
            <th className="border border-gray-300 p-3 text-left">DON'Ts</th>
          </tr>
        </thead>
        <tbody className="text-gray-500">
          {dos.map((doItem, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-3">{doItem}</td>
              <td className="border border-gray-300 p-3">
                {donts[index] || ""}
              </td>
            </tr>
          ))}
          {donts.length > dos.length &&
            donts.slice(dos.length).map((dontItem, index) => (
              <tr key={dos.length + index}>
                <td className="border border-gray-300 p-3"></td>
                <td className="border border-gray-300 p-3">{dontItem}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

// ComplaintsTable components for complaints data tables
export const QuarterlyComplaintsTable: React.FC<ComplaintsTableProps> = ({
  data,
  total,
}) => {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">Sr. No.</th>
            <th className="border border-gray-300 p-3 text-left">
              Received from
            </th>
            <th className="border border-gray-300 p-3 text-left">
              Carried forward from previous quarter
            </th>
            <th className="border border-gray-300 p-3 text-left">
              Received during the quarter
            </th>
            <th className="border border-gray-300 p-3 text-left">
              Resolved during the quarter
            </th>
            <th className="border border-gray-300 p-3 text-left">
              Pending at the end of the quarter
            </th>
            <th className="border border-gray-300 p-3 text-left">
              Average Resolution time (in days)
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-500">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-3">{index + 1}</td>
              <td className="border border-gray-300 p-3">{item.source}</td>
              <td className="border border-gray-300 p-3">{item.carried}</td>
              <td className="border border-gray-300 p-3">{item.received}</td>
              <td className="border border-gray-300 p-3">{item.resolved}</td>
              <td className="border border-gray-300 p-3">{item.pending}</td>
              <td className="border border-gray-300 p-3">{item.avgTime}</td>
            </tr>
          ))}
          <tr className="font-medium">
            <td className="border border-gray-300 p-3" colSpan={2}>
              Grand Total
            </td>
            <td className="border border-gray-300 p-3">{total.carried}</td>
            <td className="border border-gray-300 p-3">{total.received}</td>
            <td className="border border-gray-300 p-3">{total.resolved}</td>
            <td className="border border-gray-300 p-3">{total.pending}</td>
            <td className="border border-gray-300 p-3">{total.avgTime}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const MonthlyComplaintsTable: React.FC<ComplaintsTableProps> = ({
  data,
  total,
}) => {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">Sr. No.</th>
            <th className="border border-gray-300 p-3 text-left">Month</th>
            <th className="border border-gray-300 p-3 text-left">
              Carried forward from previous month
            </th>
            <th className="border border-gray-300 p-3 text-left">Received</th>
            <th className="border border-gray-300 p-3 text-left">Resolved</th>
            <th className="border border-gray-300 p-3 text-left">Pending</th>
          </tr>
        </thead>
        <tbody className="text-gray-500">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-3">{index + 1}</td>
              <td className="border border-gray-300 p-3">{item.month}</td>
              <td className="border border-gray-300 p-3">{item.carried}</td>
              <td className="border border-gray-300 p-3">{item.received}</td>
              <td className="border border-gray-300 p-3">{item.resolved}</td>
              <td className="border border-gray-300 p-3">{item.pending}</td>
            </tr>
          ))}
          <tr className="font-medium">
            <td className="border border-gray-300 p-3" colSpan={2}>
              Grand Total
            </td>
            <td className="border border-gray-300 p-3">{total.carried}</td>
            <td className="border border-gray-300 p-3">{total.received}</td>
            <td className="border border-gray-300 p-3">{total.resolved}</td>
            <td className="border border-gray-300 p-3">{total.pending}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const AnnualComplaintsTable: React.FC<ComplaintsTableProps> = ({
  data,
  total,
}) => {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">Sr. No.</th>
            <th className="border border-gray-300 p-3 text-left">Year</th>
            <th className="border border-gray-300 p-3 text-left">
              Carried forward from previous year
            </th>
            <th className="border border-gray-300 p-3 text-left">
              Received during the year
            </th>
            <th className="border border-gray-300 p-3 text-left">
              Resolved during the year
            </th>
            <th className="border border-gray-300 p-3 text-left">
              Pending at the end of the year
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-500">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-3">{index + 1}</td>
              <td className="border border-gray-300 p-3">{item.year}</td>
              <td className="border border-gray-300 p-3">{item.carried}</td>
              <td className="border border-gray-300 p-3">{item.received}</td>
              <td className="border border-gray-300 p-3">{item.resolved}</td>
              <td className="border border-gray-300 p-3">{item.pending}</td>
            </tr>
          ))}
          <tr className="font-medium">
            <td className="border border-gray-300 p-3" colSpan={2}>
              Grand Total
            </td>
            <td className="border border-gray-300 p-3">{total.carried}</td>
            <td className="border border-gray-300 p-3">{total.received}</td>
            <td className="border border-gray-300 p-3">{total.resolved}</td>
            <td className="border border-gray-300 p-3">{total.pending}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
