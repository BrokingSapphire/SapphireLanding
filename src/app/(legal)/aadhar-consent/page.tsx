import { Metadata } from "next";
import React from "react";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Aadhar Consent | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Sapphire has a next-generation trading platform designed for investors seeking expert insights and advanced trading tools. Get professional trade recommendations and stay updated with real-time corporate announcements from all listed entities. Our high-tech features ensure seamless execution, empowering both beginners and experienced traders to make well-informed market decisions.",
  keywords:
    "about sapphire broking, online trading platform India, stock market analysis tools, real-time market insights, professional trading recommendations, BSE NSE live updates, smart trading solutions, expert trading insights, stock market for beginners, advanced trading platform, corporate announcement tracker, investment decision tools, market intelligence platform, stock trading alerts India, seamless trade execution, next-gen trading platform, stock market education, technical analysis tools India, fundamental analysis platform, market trend analyzer, financial market insights, algorithmic trading India, trading platform comparison, best online broker India, intraday trading platform, portfolio management tools, stock screening tools India, equity research platform, investment analytics India, market data analysis, trading charts and indicators, mobile trading app India, derivatives trading platform, commodity trading solutions, forex trading tools India",
  openGraph: {
    title: "Aadhar Consent | Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Sapphire has a next-generation trading platform designed for investors seeking expert insights and advanced trading tools. Get professional trade recommendations and stay updated with real-time corporate announcements from all listed entities. Our high-tech features ensure seamless execution, empowering both beginners and experienced traders to make well-informed market decisions.",
    url: "https://sapphirebroking.com/",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
    type: "website",
  },
};

// Aadhaar Consent data structure
const aadhaarConsentData = [
  {
    id: "voluntary-submission",
    title: "1. VOLUNTARY SUBMISSION",
    sections: [
      {
        id: "optional-provision",
        subtitle: "1.1. Optional Provision",
        points: [
          "Providing your Aadhaar is completely optional and voluntary.",
          "Aadhaar is only needed if you'd like to complete your Sapphire Broking account opening online.",
          "You can use Aadhaar for digitally signing the account opening form for convenience.",
          "If you prefer not to use Aadhaar, you can complete the account opening process offline by signing physical forms.",
          "No Aadhaar sharing is required for offline account opening process.",
        ],
      },
    ],
  },
  {
    id: "data-handling",
    title: "2. DATA HANDLING AND STORAGE",
    sections: [
      {
        id: "no-storage-policy",
        subtitle: "2.1. No Aadhaar Storage Policy",
        points: [
          "Sapphire Broking does not store your complete Aadhaar details on our platform.",
          "You will not enter Aadhaar details directly on the Sapphire Broking platform.",
          "Our third-party verification partner, Surepass, securely retrieves limited KYC data on our behalf.",
          "This process ensures your Aadhaar details never touch our systems directly.",
        ],
      },
      {
        id: "data-retrieved",
        subtitle: "2.2. Limited Data Retrieved",
        points: [
          "Last four digits of your Aadhaar or Virtual ID (VID) only.",
          "Full name as registered with UIDAI.",
          "Date of birth from Aadhaar records.",
          "Gender information.",
          "Registered address details.",
          "Photograph from Aadhaar database.",
        ],
      },
    ],
  },
  {
    id: "third-party-partner",
    title: "3. THIRD-PARTY VERIFICATION PARTNER",
    sections: [
      {
        id: "about-surepass",
        subtitle: "3.1. About Surepass",
        points: [
          "Surepass is an authorized Aadhaar service provider certified by UIDAI.",
          "They connect directly to UIDAI systems for eKYC purposes.",
          "Surepass complies with all guidelines set by the Ministry of Electronics and IT (MeitY), Government of India.",
          "They enable Aadhaar holders to digitally verify their identity securely.",
          "Surepass maintains the highest standards of data security and privacy.",
        ],
      },
      {
        id: "secure-process",
        subtitle: "3.2. Secure Data Flow Process",
        points: [
          "The data flow is handled securely through encrypted channels.",
          "The process is equivalent to completing physical KYC at our offices.",
          "Online method provides a faster and fully compliant verification option.",
          "Offline route remains available if you prefer traditional methods.",
          "All processes comply with UIDAI regulations and guidelines.",
        ],
      },
    ],
  },
  {
    id: "esign-process",
    title: "4. ESIGN PROCESS",
    sections: [
      {
        id: "document-signing",
        subtitle: "4.1. Digital Document Signing",
        points: [
          "Your Aadhaar will be shared with Surepass to facilitate eSign of account opening documents.",
          "Surepass will never pass your Aadhaar information to Sapphire Broking during eSign process.",
          "The eSign process is conducted through UIDAI's authorized eSign service providers.",
          "Digital signatures have the same legal validity as physical signatures.",
        ],
      },
      {
        id: "document-delivery",
        subtitle: "4.2. Document Delivery",
        points: [
          "Once documents are e-signed successfully, both you and Sapphire Broking receive copies.",
          "Digitally signed forms are legally binding and compliant with IT Act, 2000.",
          "All signed documents are stored securely in our document management system.",
          "You can access your signed documents anytime through your account portal.",
        ],
      },
    ],
  },
  {
    id: "data-security",
    title: "5. DATA SECURITY AND RETENTION",
    sections: [
      {
        id: "security-measures",
        subtitle: "5.1. Security Measures",
        points: [
          "All Aadhaar-related data is stored in our encrypted Aadhaar vault.",
          "We implement industry-standard encryption protocols for data protection.",
          "Access to Aadhaar vault is restricted to authorized personnel only.",
          "Regular security audits are conducted to ensure data integrity.",
          "Multi-factor authentication is required for accessing sensitive data.",
        ],
      },
      {
        id: "retention-policy",
        subtitle: "5.2. Data Retention Policy",
        points: [
          "After successful completion of online process, we retain only the last four digits of your Aadhaar number.",
          "Minimal KYC information (name, DOB, gender, address, photograph) is retained as per regulatory requirements.",
          "Data retention is carried out strictly as per UIDAI circular dated July 25, 2017.",
          "We do not retain complete Aadhaar numbers or any other sensitive biometric data.",
          "Data is purged as per prescribed timelines and regulatory guidelines.",
        ],
      },
      {
        id: "compliance",
        subtitle: "5.3. Regulatory Compliance",
        points: [
          "All processes comply with Aadhaar (Targeted Delivery of Financial and Other Subsidies, Benefits and Services) Act, 2016.",
          "We adhere to UIDAI regulations and circulars regarding Aadhaar data handling.",
          "Compliance with Information Technology Act, 2000 and associated rules.",
          "Regular compliance audits are conducted by independent third parties.",
          "Any violations are immediately reported and corrected as per regulatory requirements.",
        ],
      },
    ],
  },
];

// Section component
type ConsentSectionProps = {
  subtitle: string;
  points: string[];
};

const ConsentSection = ({ subtitle, points }: ConsentSectionProps) => {
  return (
    <div className="mb-6 ml-8">
      <h3 className="text-xl font-medium text-green-heading mb-3">
        {subtitle}
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-500">
        {points.map((point: string, index: number) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

// Main component
const AadhaarConsent = () => {
  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20 px-8">
      {/* Breadcrumb */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-3">
          <nav className="flex items-center text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-gray-500 hover:text-[#064D51] transition-colors">Home</Link>
            <span className="mx-2 text-gray-400">›</span>
            <Link href="/" className="text-gray-500 hover:text-[#064D51] transition-colors">Legal</Link>
            <span className="mx-2 text-gray-400">›</span>
            <span className="text-[#064D51] font-regular ">Aadhaar Consent</span>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        {/* Main content starts here */}
        <h1 className="text-4xl sm:text-6xl pt-6 font-bold text-green-heading mb-8 uppercase text-center">
          Aadhaar Consent
        </h1>

        <p className="text-gray-500 mb-14 text-center">
          Understanding how we handle your Aadhaar information with complete transparency and security.
        </p>

        <div className="space-y-10">
          <hr />
          {/* Introduction */}
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
            <div className="space-y-4 text-gray-500">
              <p>
                At Sapphire Broking, we respect your privacy and are committed to protecting your personal information, 
                including your Aadhaar details. This consent document explains how we handle Aadhaar information 
                during the account opening process.
              </p>
              <p>
                We believe in complete transparency about our data handling practices and want you to make an 
                informed decision about sharing your Aadhaar information with us.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {aadhaarConsentData.map((category) => (
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
                    <ConsentSection
                      key={section.id}
                      subtitle={section.subtitle}
                      points={section.points}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Key Highlights */}
          <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8 bg-gray-50">
            <h2 className="text-2xl font-semibold text-green-heading mb-4">
              Key Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-center font-medium text-green-heading mb-2">
                  Completely Optional
                </h3>
                <p className="text-gray-500 text-sm text-center">
                  Providing Aadhaar is entirely voluntary. You can always choose offline account opening.
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-center font-medium text-green-heading mb-2">
                  No Direct Storage
                </h3>
                <p className="text-gray-500 text-sm text-center">
                  Your complete Aadhaar details never touch our systems directly.
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
                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-center font-medium text-green-heading mb-2">
                  Authorized Partner
                </h3>
                <p className="text-gray-500 text-sm text-center">
                  Surepass is UIDAI authorized and MeitY compliant for secure eKYC processing.
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
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-center font-medium text-green-heading mb-2">
                  Minimal Retention
                </h3>
                <p className="text-gray-500 text-sm text-center">
                  We only retain last 4 digits and basic KYC data as per UIDAI guidelines.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="p-6 border border-gray-200 rounded-lg shadow-sm mb-8 pb-12">
            <h2 className="text-2xl font-semibold text-green-heading mb-4">
              Contact Information
            </h2>
            <div className="space-y-4 text-gray-500">
              <p>
                For questions or concerns regarding Aadhaar consent and data handling, please contact:
              </p>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="font-medium text-green-heading mb-2">
                  Data Protection Officer
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
                      privacy@sapphirebroking.com
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
                      <span className="font-medium">Phone:</span> [Privacy Officer Phone Number]
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div className="text-gray-500 mt-4 pb-12">
            <p>Last Updated: June 26, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AadhaarConsent;