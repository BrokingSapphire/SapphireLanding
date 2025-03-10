/* eslint-disable */
import React from "react";
import Link from "next/link";

// Code of Conduct data structure
const codeOfConductData = [
  {
    id: "ethical-practices",
    title: "1. ETHICAL PRACTICES",
    sections: [
      {
        id: "honesty-integrity",
        subtitle: "1.1. Honesty and Integrity",
        points: [
          "Sapphire Broking shall conduct its business with integrity, fairness, dignity, and ethics.",
          "We shall act honestly and fairly in the best interests of our clients.",
          "We shall maintain high standards of integrity in all business dealings.",
          "We shall not knowingly participate in or assist any violation of laws, rules, or regulations.",
        ],
      },
      {
        id: "conflicts-interest",
        subtitle: "1.2. Conflicts of Interest",
        points: [
          "Sapphire Broking shall take all reasonable steps to identify conflicts of interest.",
          "We shall disclose actual or potential conflicts of interest to clients.",
          "We shall implement measures to manage conflicts in a way that protects clients' interests.",
          "We shall ensure that personal investments of employees do not conflict with client interests.",
        ],
      },
      {
        id: "market-integrity",
        subtitle: "1.3. Market Integrity",
        points: [
          "Sapphire Broking shall uphold the integrity and fairness of the securities market.",
          "We shall not engage in manipulative, fraudulent, or deceptive practices.",
          "We shall promote fair dealing in the securities market.",
          "We shall report suspicious transactions to relevant authorities.",
        ],
      },
    ],
  },
  {
    id: "client-service",
    title: "2. CLIENT SERVICE COMMITMENT",
    sections: [
      {
        id: "client-classification",
        subtitle: "2.1. Client Classification and Profiling",
        points: [
          "Sapphire Broking shall classify clients based on their knowledge, experience, financial situation, and risk tolerance.",
          "We shall periodically update client profiles to ensure appropriate service.",
          "We shall offer services suitable to each client's profile and needs.",
          "We shall respect clients' investment objectives and constraints.",
        ],
      },
      {
        id: "best-execution",
        subtitle: "2.2. Best Execution",
        points: [
          "Sapphire Broking shall take all reasonable steps to obtain the best possible result for clients.",
          "We shall execute orders promptly, fairly, and expeditiously.",
          "We shall not discriminate between clients when executing orders.",
          "We shall maintain effective systems and controls for order execution.",
        ],
      },
      {
        id: "client-communication",
        subtitle: "2.3. Client Communication",
        points: [
          "Sapphire Broking shall communicate with clients in a clear, fair, and not misleading manner.",
          "We shall provide accurate information about services, fees, and charges.",
          "We shall respond to client inquiries promptly and courteously.",
          "We shall notify clients of significant matters affecting their accounts.",
        ],
      },
      {
        id: "safeguarding-assets",
        subtitle: "2.4. Safeguarding Client Assets",
        points: [
          "Sapphire Broking shall segregate client funds and securities from its own assets.",
          "We shall ensure proper accounting of client assets.",
          "We shall implement robust systems to prevent misuse of client assets.",
          "We shall conduct regular reconciliation of client accounts.",
        ],
      },
      {
        id: "complaint-handling",
        subtitle: "2.5. Complaint Handling",
        points: [
          "Sapphire Broking shall establish effective procedures for handling client complaints.",
          "We shall investigate complaints promptly, thoroughly, and impartially.",
          "We shall communicate the outcome of investigations to clients.",
          "We shall use complaints as feedback to improve services.",
        ],
      },
    ],
  },
  {
    id: "transparency",
    title: "3. TRANSPARENCY AND DISCLOSURE",
    sections: [
      {
        id: "fee-disclosure",
        subtitle: "3.1. Fee Disclosure",
        points: [
          "Sapphire Broking shall disclose all fees, charges, and commissions clearly.",
          "We shall provide a detailed break-up of various charges.",
          "We shall avoid hidden fees or unexpected charges.",
          "We shall inform clients in advance about any changes in the fee structure.",
        ],
      },
      {
        id: "risk-disclosure",
        subtitle: "3.2. Risk Disclosure",
        points: [
          "Sapphire Broking shall adequately disclose all material risks to clients.",
          "We shall ensure clients understand the risks associated with different products and services.",
          "We shall not downplay risks to promote products or services.",
          "We shall provide risk disclosure documents as required by regulations.",
        ],
      },
      {
        id: "transaction-reporting",
        subtitle: "3.3. Transaction Reporting",
        points: [
          "Sapphire Broking shall provide timely and accurate contract notes for all transactions.",
          "We shall maintain comprehensive records of client transactions.",
          "We shall provide periodic statements of accounts to clients.",
          "We shall ensure all trade confirmations are accurate and complete.",
        ],
      },
    ],
  },
  {
    id: "compliance",
    title: "4. COMPLIANCE FRAMEWORK",
    sections: [
      {
        id: "regulatory-compliance",
        subtitle: "4.1. Regulatory Compliance",
        points: [
          "Sapphire Broking shall comply with all applicable laws, rules, and regulations.",
          "We shall stay updated on regulatory changes and implement them promptly.",
          "We shall cooperate fully with regulatory examinations and inquiries.",
          "We shall maintain all required licenses and registrations.",
        ],
      },
      {
        id: "kyc",
        subtitle: "4.2. Know Your Customer (KYC)",
        points: [
          "Sapphire Broking shall implement robust KYC procedures.",
          "We shall verify the identity of clients using reliable, independent source documents.",
          "We shall conduct enhanced due diligence for high-risk clients.",
          "We shall periodically update KYC information.",
        ],
      },
      {
        id: "aml",
        subtitle: "4.3. Anti-Money Laundering (AML)",
        points: [
          "Sapphire Broking shall establish effective AML policies and procedures.",
          "We shall monitor transactions for suspicious activities.",
          "We shall report suspicious transactions to relevant authorities.",
          "We shall provide regular AML training to staff.",
        ],
      },
      {
        id: "record-keeping",
        subtitle: "4.4. Record Keeping",
        points: [
          "Sapphire Broking shall maintain complete and accurate records as required by regulations.",
          "We shall preserve records for the prescribed periods.",
          "We shall ensure the security and confidentiality of records.",
          "We shall maintain proper audit trails for all transactions.",
        ],
      },
    ],
  },
  {
    id: "human-resources",
    title: "5. HUMAN RESOURCES AND TRAINING",
    sections: [
      {
        id: "staff-competence",
        subtitle: "5.1. Staff Competence",
        points: [
          "Sapphire Broking shall employ staff with appropriate qualifications and expertise.",
          "We shall ensure staff remains competent through continuous professional development.",
          "We shall assess staff performance regularly.",
          "We shall maintain adequate supervision of staff activities.",
        ],
      },
      {
        id: "training",
        subtitle: "5.2. Training and Development",
        points: [
          "Sapphire Broking shall provide comprehensive training to staff.",
          "We shall conduct regular training on compliance, ethics, and product knowledge.",
          "We shall promote a culture of continuous learning and improvement.",
          "We shall ensure staff is updated on market developments and regulatory changes.",
        ],
      },
      {
        id: "employee-conduct",
        subtitle: "5.3. Employee Conduct",
        points: [
          "Sapphire Broking shall establish clear standards of conduct for employees.",
          "We shall prohibit employees from engaging in unethical practices.",
          "We shall require employees to disclose personal investments and outside business activities.",
          "We shall implement disciplinary procedures for violations of the code of conduct.",
        ],
      },
    ],
  },
  {
    id: "technology",
    title: "6. TECHNOLOGY AND CYBERSECURITY",
    sections: [
      {
        id: "system-reliability",
        subtitle: "6.1. System Reliability",
        points: [
          "Sapphire Broking shall maintain reliable and efficient trading systems.",
          "We shall conduct regular testing and maintenance of systems.",
          "We shall implement backup and recovery procedures.",
          "We shall have contingency plans for system failures.",
        ],
      },
      {
        id: "cybersecurity",
        subtitle: "6.2. Cybersecurity",
        points: [
          "Sapphire Broking shall implement robust cybersecurity measures.",
          "We shall protect client data from unauthorized access.",
          "We shall conduct regular vulnerability assessments and penetration testing.",
          "We shall have an incident response plan for security breaches.",
        ],
      },
      {
        id: "data-privacy",
        subtitle: "6.3. Data Privacy",
        points: [
          "Sapphire Broking shall respect the privacy of client information.",
          "We shall collect, use, and store client data in accordance with data protection laws.",
          "We shall obtain necessary consents for data processing.",
          "We shall implement appropriate data security measures.",
        ],
      },
    ],
  },
  {
    id: "risk-management",
    title: "7. RISK MANAGEMENT",
    sections: [
      {
        id: "risk-assessment",
        subtitle: "7.1. Risk Assessment",
        points: [
          "Sapphire Broking shall identify and assess risks in all aspects of operations.",
          "We shall implement appropriate controls to mitigate identified risks.",
          "We shall regularly review and update risk assessments.",
          "We shall establish risk tolerance levels and monitoring mechanisms.",
        ],
      },
      {
        id: "margin-management",
        subtitle: "7.2. Margin Management",
        points: [
          "Sapphire Broking shall implement effective margin collection and monitoring systems.",
          "We shall inform clients about margin requirements and consequences of non-compliance.",
          "We shall liquidate positions when margins are not maintained as required.",
          "We shall conduct stress testing of margin requirements.",
        ],
      },
      {
        id: "business-continuity",
        subtitle: "7.3. Business Continuity",
        points: [
          "Sapphire Broking shall develop and maintain business continuity plans.",
          "We shall test these plans regularly to ensure their effectiveness.",
          "We shall ensure critical functions can continue during disruptions.",
          "We shall train staff on their roles during business disruptions.",
        ],
      },
    ],
  },
  {
    id: "marketing",
    title: "8. MARKETING AND PROMOTION",
    sections: [
      {
        id: "honest-representation",
        subtitle: "8.1. Honest Representation",
        points: [
          "Sapphire Broking shall ensure all marketing materials are accurate and not misleading.",
          "We shall not make unrealistic promises or guarantees about investment returns.",
          "We shall clearly differentiate between facts and opinions in marketing communications.",
          "We shall not misrepresent our capabilities, qualifications, or services.",
        ],
      },
      {
        id: "fair-competition",
        subtitle: "8.2. Fair Competition",
        points: [
          "Sapphire Broking shall compete fairly and ethically.",
          "We shall not denigrate competitors or their services.",
          "We shall not use unfair or deceptive practices to gain competitive advantage.",
          "We shall respect intellectual property rights.",
        ],
      },
    ],
  },
  {
    id: "social-responsibility",
    title: "9. SOCIAL RESPONSIBILITY",
    sections: [
      {
        id: "environmental",
        subtitle: "9.1. Environmental Responsibility",
        points: [
          "Sapphire Broking shall consider environmental impacts in business operations.",
          "We shall promote sustainable practices.",
          "We shall comply with environmental regulations.",
          "We shall work towards reducing our carbon footprint.",
        ],
      },
      {
        id: "community",
        subtitle: "9.2. Community Engagement",
        points: [
          "Sapphire Broking shall contribute positively to the communities in which we operate.",
          "We shall support financial literacy initiatives.",
          "We shall participate in community development programs.",
          "We shall encourage staff to engage in volunteering activities.",
        ],
      },
      {
        id: "investor-education",
        subtitle: "9.3. Investor Education",
        points: [
          "Sapphire Broking shall promote investor education and awareness.",
          "We shall provide educational resources to clients.",
          "We shall organize workshops and webinars on investing and market knowledge.",
          "We shall contribute to raising financial literacy standards.",
        ],
      },
    ],
  },
  {
    id: "implementation",
    title: "10. IMPLEMENTATION AND MONITORING",
    sections: [
      {
        id: "responsibility",
        subtitle: "10.1. Responsibility for Implementation",
        points: [
          "The senior management of Sapphire Broking shall be responsible for implementing this code.",
          "We shall allocate adequate resources for implementation.",
          "We shall designate specific individuals to oversee compliance with the code.",
          "We shall incorporate the code into all aspects of operations.",
        ],
      },
      {
        id: "monitoring",
        subtitle: "10.2. Monitoring and Review",
        points: [
          "Sapphire Broking shall regularly monitor compliance with this code.",
          "We shall conduct periodic reviews of practices against the code.",
          "We shall update the code as necessary to reflect changes in regulations and industry standards.",
          "We shall address any identified gaps or weaknesses promptly.",
        ],
      },
      {
        id: "reporting-violations",
        subtitle: "10.3. Reporting Violations",
        points: [
          "Sapphire Broking shall establish channels for reporting violations of the code.",
          "We shall protect whistleblowers from retaliation.",
          "We shall investigate reported violations thoroughly.",
          "We shall take appropriate corrective actions for confirmed violations.",
        ],
      },
    ],
  },
  {
    id: "specific-commitments",
    title: "11. SPECIFIC COMMITMENTS",
    sections: [
      {
        id: "to-clients",
        subtitle: "11.1. To Clients",
        points: [
          "Sapphire Broking shall prioritize clients' interests.",
          "We shall provide appropriate advice and recommendations.",
          "We shall execute transactions promptly and efficiently.",
          "We shall maintain confidentiality of client information.",
        ],
      },
      {
        id: "to-regulators",
        subtitle: "11.2. To Regulators",
        points: [
          "Sapphire Broking shall comply with the letter and spirit of regulations.",
          "We shall cooperate fully with regulatory authorities.",
          "We shall report violations of regulations to appropriate authorities.",
          "We shall participate constructively in regulatory consultations.",
        ],
      },
      {
        id: "to-employees",
        subtitle: "11.3. To Employees",
        points: [
          "Sapphire Broking shall provide a safe and conducive work environment.",
          "We shall promote diversity and inclusion.",
          "We shall offer fair compensation and benefits.",
          "We shall respect employee rights and dignity.",
        ],
      },
      {
        id: "to-business-partners",
        subtitle: "11.4. To Business Partners",
        points: [
          "Sapphire Broking shall deal fairly with business partners.",
          "We shall honor contractual obligations.",
          "We shall make timely payments to service providers.",
          "We shall build relationships based on mutual respect and trust.",
        ],
      },
      {
        id: "to-markets",
        subtitle: "11.5. To Markets",
        points: [
          "Sapphire Broking shall contribute to efficient and transparent markets.",
          "We shall not engage in activities that disrupt market integrity.",
          "We shall promote fair price discovery.",
          "We shall support regulatory initiatives aimed at market development.",
        ],
      },
    ],
  },
];

// Code section component
const CodeSection: React.FC<{
  subtitle: string;
  points: string[];
}> = ({ subtitle, points }) => {
  return (
    <div className="mb-6 ml-8">
      <h3 className="text-xl font-medium text-green-heading mb-3">
        {subtitle}
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-500">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

// Main component
const CodeOfConduct: React.FC = () => {
  return (
    <div className="max-w-4xl py-40 mx-auto p-6 bg-white">
      <h1 className="text-6xl font-bold text-green-heading mb-8 uppercase text-center">
        Code of Conduct
      </h1>

      <p className="text-gray-500 mb-14 text-center">SAPPHIRE BROKING</p>

      <div className="space-y-10">
        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border border-gray-200 rounded-lg shadow-sm mb-8 bg-gray-50">
          <div>
            <h3 className="text-xl font-semibold text-green-heading mb-2">
              Related Documents
            </h3>
            <p className="text-gray-500">
              View other important company policies
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/investor-attention"
              className="px-6 py-3 bg-green-heading text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Investor Advisories
            </Link>
            <Link
              href="/privacy-policy"
              className="px-6 py-3 border border-green-heading text-green-heading rounded-md hover:bg-green-50 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Introduction */}
        <div className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <div className="space-y-4 text-gray-500">
            <p>
              This Code of Conduct represents Sapphire Broking's commitment to
              the highest standards of ethical business conduct. All directors,
              employees, and authorized representatives are expected to adhere
              to this code in their daily activities.
            </p>
            <p>
              The code is a living document that will evolve as our business and
              the regulatory environment change. It serves as a guide for how we
              conduct business and interact with our stakeholders.
            </p>
          </div>
        </div>

        {/* Quick Navigation */}
        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8 bg-gray-50">
          <h2 className="text-2xl font-semibold text-green-heading mb-4">
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {codeOfConductData.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="p-3 bg-white rounded-md shadow-sm hover:shadow border border-gray-200 text-center hover:bg-gray-50 transition-colors"
              >
                <span className="text-green-heading font-medium text-sm">
                  {category.title}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <div className="space-y-8">
          {codeOfConductData.map((category) => (
            <section
              id={category.id}
              key={category.id}
              className="p-6 border border-gray-200 rounded-lg shadow-sm scroll-mt-20"
            >
              <h2 className="text-2xl font-semibold text-green-heading mb-6">
                {category.title}
              </h2>

              <div className="space-y-6">
                {category.sections.map((section) => (
                  <CodeSection
                    key={section.id}
                    subtitle={section.subtitle}
                    points={section.points}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact Information */}
        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-semibold text-green-heading mb-4">
            Contact Information
          </h2>
          <div className="space-y-4 text-gray-500">
            <p>
              For questions or concerns regarding this Code of Conduct, please
              contact:
            </p>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="font-medium text-green-heading mb-2">
                Compliance Officer
              </h3>
              <ul className="list-none space-y-2">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-heading"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    <span className="font-medium">Email:</span>{" "}
                    compliance@sapphirebroking.com
                  </span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-heading"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>
                    <span className="font-medium">Phone:</span> [Compliance
                    Officer Phone Number]
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Compliance Framework */}
        <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8 bg-gray-50">
          <h2 className="text-2xl font-semibold text-green-heading mb-4">
            Compliance Framework
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
              <div className="text-green-heading mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-center font-medium text-green-heading mb-2">
                Preventive Controls
              </h3>
              <p className="text-gray-500 text-sm text-center">
                Policies, procedures, and training to prevent violations of the
                Code of Conduct
              </p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
              <div className="text-green-heading mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-center font-medium text-green-heading mb-2">
                Detective Controls
              </h3>
              <p className="text-gray-500 text-sm text-center">
                Monitoring and oversight activities to identify potential
                violations
              </p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
              <div className="text-green-heading mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-center font-medium text-green-heading mb-2">
                Corrective Controls
              </h3>
              <p className="text-gray-500 text-sm text-center">
                Procedures for addressing violations and implementing corrective
                actions
              </p>
            </div>
          </div>
        </section>

        <div className="text-gray-500 text-center mt-8">
          <p>Last Updated: April 1, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default CodeOfConduct;
