import React from 'react';
import { Shield, TrendingUp, CheckCircle } from 'lucide-react';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yash Katyari - Partner & Compliance Officer | Sapphire Broking: Regulatory Excellence & Risk Management",
  description:
    "Meet Yash Katyari, Partner & Compliance Officer at Sapphire Broking. Expert in SEBI regulations, risk management, and compliance framework. Ensuring transparent, compliant investment services for 2,500+ clients in Nagpur, Maharashtra.",
  keywords:
    "Yash Katyari, Sapphire Broking partner, compliance officer Nagpur, SEBI compliance expert, risk management specialist, financial regulations Maharashtra, investment compliance, regulatory framework, transparent broking services",
  openGraph: {
    title: "Yash Katyari - Partner & Compliance Officer | Sapphire Broking",
    description:
      "Expert in SEBI regulations and risk management. Ensuring compliant, transparent investment services for 2,500+ clients. Partner at Sapphire Broking, Nagpur, Maharashtra.",
    url: "https://sapphirebroking.com/about-yash-katyari",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
    type: "profile",
  },
};

const YashAboutPage = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <header className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              Compliance & Risk Management
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Meet <span className="text-blue-600">Yash Katyari</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ensuring regulatory excellence and risk management integrity while maintaining the highest standards of compliance for transparent financial services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <article>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Partner & Compliance Officer at Sapphire Broking</h2>
                  <p className="text-gray-600 leading-relaxed">
                    As <strong>Partner & Compliance Officer</strong> at Sapphire Broking, I ensure that every client interaction, 
                    investment recommendation, and business operation adheres to the highest standards of regulatory compliance 
                    and ethical practices set by SEBI and other financial authorities.
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-600 leading-relaxed">
                    My role encompasses comprehensive risk management, regulatory oversight, and the development of robust 
                    compliance frameworks that protect our clients' interests while enabling them to achieve their financial 
                    goals through transparent and legally sound investment strategies.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6" role="region" aria-label="Key Statistics">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">100%</div>
                    <div className="text-sm text-gray-600">Compliance Rate</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2,500+</div>
                    <div className="text-sm text-gray-600">Protected Clients</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">₹650Cr+</div>
                    <div className="text-sm text-gray-600">Assets Safeguarded</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">Zero</div>
                    <div className="text-sm text-gray-600">Regulatory Issues</div>
                  </div>
                </div>
              </div>
            </article>
            
            <aside className="flex justify-center">
              <div className="relative">
                {/* Professional photo placeholder */}
                <div className="w-80 h-96 bg-gray-100 rounded-lg shadow-lg border border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl font-bold text-blue-600" aria-label="Yash Katyari initials">YK</span>
                    </div>
                    <p className="text-gray-500 text-sm">Yash Katyari - Professional Photo</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </header>

      {/* Professional Journey */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Professional Journey & Expertise</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12" role="region" aria-label="Career Timeline">
              <article className="flex gap-8">
                <div className="flex-shrink-0 w-32 text-right">
                  <time className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full" dateTime="2018">2018 - Present</time>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2" aria-hidden="true"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Partner & Compliance Officer, Sapphire Broking</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Established and maintains comprehensive compliance framework ensuring 100% adherence to SEBI regulations. 
                    Oversees risk management for ₹650+ crores AUM and 2,500+ client portfolios. Developed robust internal 
                    controls and audit procedures that have maintained zero regulatory violations since inception.
                  </p>
                </div>
              </article>
              
              <article className="flex gap-8">
                <div className="flex-shrink-0 w-32 text-right">
                  <time className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full" dateTime="2015/2018">2015 - 2018</time>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2" aria-hidden="true"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Senior Compliance Manager</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Led compliance teams at leading financial institutions, specializing in regulatory framework implementation, 
                    risk assessment protocols, and client protection measures. Developed expertise in SEBI guidelines, 
                    KYC/AML procedures, and investment advisory compliance across Maharashtra region.
                  </p>
                </div>
              </article>
              
              <article className="flex gap-8">
                <div className="flex-shrink-0 w-32 text-right">
                  <time className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full" dateTime="2012/2015">2012 - 2015</time>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2" aria-hidden="true"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Risk Management Specialist</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Specialized in financial risk assessment, regulatory compliance monitoring, and internal audit procedures. 
                    Gained extensive experience in portfolio risk analysis, client suitability assessments, and regulatory 
                    reporting requirements across various financial products and services.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Compliance Philosophy & Risk Management</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <article className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="mr-3 text-blue-600" size={24} aria-hidden="true" />
                Core Compliance Principles
              </h3>
              <ul className="space-y-4" role="list">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Client protection is paramount in every decision</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Transparency in all regulatory and business processes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Proactive risk identification and mitigation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Continuous monitoring and process improvement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Ethical business practices beyond regulatory minimums</span>
                </li>
              </ul>
            </article>
            
            <article className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle className="mr-3 text-green-600" size={24} aria-hidden="true" />
                Risk Management Framework
              </h3>
              <ul className="space-y-4" role="list">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Comprehensive client suitability assessments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Real-time portfolio risk monitoring systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Regular internal audits and compliance reviews</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Robust KYC/AML procedures and documentation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Continuous staff training on regulatory updates</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Current Focus */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Current Focus & Regulatory Excellence</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <article className="md:col-span-2">
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  My primary focus is maintaining <strong>Sapphire Broking's exemplary compliance record</strong> while 
                  implementing cutting-edge risk management technologies that protect our clients' investments. 
                  I work closely with regulatory bodies to ensure we exceed industry standards and anticipate 
                  regulatory changes before they impact our operations.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  I oversee the development of automated compliance monitoring systems, conduct regular training 
                  sessions for our advisory team on regulatory best practices, and maintain direct communication 
                  with SEBI and other regulatory authorities to stay ahead of industry developments.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  Our commitment to regulatory excellence ensures that every client can invest with complete 
                  confidence, knowing their interests are protected by robust compliance frameworks and 
                  transparent business practices that set the gold standard for the Indian financial services industry.
                </p>
              </div>
            </article>
            
            <aside>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Compliance Expertise</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Primary Role</dt>
                    <dd className="text-base text-gray-900">Partner & Compliance Officer</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Specialization</dt>
                    <dd className="text-base text-gray-900">SEBI Regulations & Risk Management</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Headquarters</dt>
                    <dd className="text-base text-gray-900">Nagpur, Maharashtra, India</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Compliance Record</dt>
                    <dd className="text-base text-gray-900">Zero Regulatory Violations</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Experience</dt>
                    <dd className="text-base text-gray-900">10+ Years in Compliance & Risk</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Key Responsibilities */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Key Responsibilities & Oversight Areas</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Regulatory Compliance</h3>
              <p className="text-gray-600 text-sm">
                Ensuring adherence to SEBI guidelines, investment advisory regulations, and all applicable 
                financial laws. Maintaining updated compliance documentation and regulatory filings.
              </p>
            </article>
            
            <article className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Risk Assessment</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive portfolio risk analysis, client suitability evaluations, and market risk 
                monitoring to protect client investments and ensure appropriate investment recommendations.
              </p>
            </article>
            
            <article className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Internal Audits</h3>
              <p className="text-gray-600 text-sm">
                Regular internal compliance audits, process reviews, and quality assurance measures 
                to maintain operational excellence and identify areas for improvement.
              </p>
            </article>
            
            <article className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Client Protection</h3>
              <p className="text-gray-600 text-sm">
                Implementing robust client protection measures, grievance handling procedures, and 
                ensuring transparent communication of all investment-related information.
              </p>
            </article>
            
            <article className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Team Training</h3>
              <p className="text-gray-600 text-sm">
                Conducting regular compliance training sessions, regulatory updates, and ensuring 
                all team members understand and follow best practices in client advisory services.
              </p>
            </article>
            
            <article className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Technology Oversight</h3>
              <p className="text-gray-600 text-sm">
                Overseeing compliance technology systems, automated monitoring tools, and ensuring 
                data security and privacy protection for all client information and transactions.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What is Yash Katyari's role at Sapphire Broking?</h3>
              <p className="text-gray-600">Yash Katyari serves as Partner & Compliance Officer at Sapphire Broking, responsible for ensuring regulatory compliance, risk management, and maintaining the highest standards of client protection across all business operations.</p>
            </article>
            
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How does Yash ensure client protection and compliance?</h3>
              <p className="text-gray-600">Yash maintains comprehensive compliance frameworks, conducts regular internal audits, implements robust risk management systems, and ensures 100% adherence to SEBI regulations and other financial authorities' guidelines.</p>
            </article>
            
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What is Sapphire Broking's compliance record under Yash's oversight?</h3>
              <p className="text-gray-600">Under Yash Katyari's compliance oversight, Sapphire Broking maintains a perfect regulatory record with zero violations, protecting over ₹650 crores in client assets and ensuring transparent, compliant services for 2,500+ clients.</p>
            </article>
            
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What areas of risk management does Yash specialize in?</h3>
              <p className="text-gray-600">Yash specializes in portfolio risk assessment, client suitability analysis, regulatory compliance monitoring, KYC/AML procedures, and implementing automated risk management systems for comprehensive client protection.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YashAboutPage;