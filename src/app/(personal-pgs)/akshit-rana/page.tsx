import React from 'react';
import { Settings, Zap, CheckSquare } from 'lucide-react';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Akshit Rana - Head of Operations | Sapphire Broking: Operational Excellence & Process Innovation",
  description:
    "Meet Akshit Rana, Head of Operations at Sapphire Broking. Expert in operational efficiency, process optimization, and technology integration. Ensuring seamless operations for 2,500+ clients and ₹650Cr+ AUM in Nagpur, Maharashtra.",
  keywords:
    "Akshit Rana, Sapphire Broking operations head, process optimization Nagpur, operational efficiency expert, technology integration Maharashtra, trading operations, client service optimization, financial operations manager",
  openGraph: {
    title: "Akshit Rana - Head of Operations | Sapphire Broking",
    description:
      "Operations expert driving efficiency and innovation at Sapphire Broking. Ensuring seamless operations for 2,500+ clients in Nagpur, Maharashtra.",
    url: "https://sapphirebroking.com/about-akshit-rana",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
    type: "profile",
  },
};

const AkshitAboutPage = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <header className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6">
              Operations & Technology
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Meet <span className="text-orange-600">Akshit Rana</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Driving operational excellence through innovative processes, cutting-edge technology, and streamlined workflows that deliver exceptional client experiences at scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <article>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Head of Operations at Sapphire Broking</h2>
                  <p className="text-gray-600 leading-relaxed">
                    As <strong>Head of Operations</strong> at Sapphire Broking, I orchestrate the seamless functioning 
                    of our entire operational ecosystem. From trade execution and settlement to client onboarding and 
                    technology integration, I ensure that every process operates with precision, efficiency, and 
                    unwavering reliability.
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-600 leading-relaxed">
                    My focus is on building robust operational frameworks that scale with our growth while maintaining 
                    the personal touch that defines Sapphire Broking. By leveraging technology and optimizing processes, 
                    we deliver faster, more accurate, and more transparent services to our clients across all touchpoints.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6" role="region" aria-label="Key Statistics">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">99.9%</div>
                    <div className="text-sm text-gray-600">System Uptime</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">2,500+</div>
                    <div className="text-sm text-gray-600">Daily Operations</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">₹650Cr+</div>
                    <div className="text-sm text-gray-600">Operational Value</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">24/7</div>
                    <div className="text-sm text-gray-600">Support Coverage</div>
                  </div>
                </div>
              </div>
            </article>
            
            <aside className="flex justify-center">
              <div className="relative">
                {/* Professional photo placeholder */}
                <div className="w-80 h-96 bg-gray-100 rounded-lg shadow-lg border border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl font-bold text-orange-600" aria-label="Akshit Rana initials">AR</span>
                    </div>
                    <p className="text-gray-500 text-sm">Akshit Rana - Professional Photo</p>
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Professional Journey & Operational Excellence</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12" role="region" aria-label="Career Timeline">
              <article className="flex gap-8">
                <div className="flex-shrink-0 w-32 text-right">
                  <time className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full" dateTime="2019">2019 - Present</time>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-orange-600 rounded-full mt-2" aria-hidden="true"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Head of Operations, Sapphire Broking</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Leading operational transformation at <strong>Sapphire Broking</strong>, managing daily operations for 2,500+ clients 
                    and ₹650+ crores AUM. Implemented cutting-edge technology solutions, streamlined processes, and built 
                    scalable operational frameworks that maintain 99.9% system uptime and exceptional client satisfaction.
                  </p>
                </div>
              </article>
              
              <article className="flex gap-8">
                <div className="flex-shrink-0 w-32 text-right">
                  <time className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full" dateTime="2016/2019">2016 - 2019</time>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-orange-600 rounded-full mt-2" aria-hidden="true"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Senior Operations Manager</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Managed complex operational workflows at leading financial institutions, specializing in trade processing, 
                    settlement operations, and client service optimization. Developed expertise in regulatory compliance, 
                    risk management, and technology integration across diverse financial products and services.
                  </p>
                </div>
              </article>
              
              <article className="flex gap-8">
                <div className="flex-shrink-0 w-32 text-right">
                  <time className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full" dateTime="2013/2016">2013 - 2016</time>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-orange-600 rounded-full mt-2" aria-hidden="true"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Operations Specialist & Process Analyst</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Started career in financial operations, focusing on process improvement, quality assurance, and 
                    client support systems. Built strong foundation in trading systems, back-office operations, and 
                    regulatory requirements that forms the backbone of current operational philosophy.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Operational Philosophy & Technology Integration</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <article className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="mr-3 text-orange-600" size={24} aria-hidden="true" />
                Core Operational Principles
              </h3>
              <ul className="space-y-4" role="list">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Efficiency without compromising accuracy or quality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Scalable processes that grow with business needs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Technology-driven automation for routine tasks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Continuous improvement and process optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Client-centric approach in all operational decisions</span>
                </li>
              </ul>
            </article>
            
            <article className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="mr-3 text-yellow-600" size={24} aria-hidden="true" />
                Technology & Innovation Focus
              </h3>
              <ul className="space-y-4" role="list">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Real-time monitoring and alert systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Automated workflow management and tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Data analytics for operational insights and optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Integrated systems for seamless information flow</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Digital transformation initiatives and modernization</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Current Focus */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Current Focus & Operational Innovation</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <article className="md:col-span-2">
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  My current initiatives focus on <strong>building next-generation operational infrastructure</strong> that 
                  combines artificial intelligence, machine learning, and advanced analytics to create predictive 
                  operational models. We&apos;re implementing smart automation systems that can anticipate client needs, 
                  optimize resource allocation, and ensure zero-downtime operations.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  I&apos;m leading digital transformation projects that integrate all our operational touchpoints into a 
                  unified, intelligent platform. This includes developing advanced client portals, real-time reporting 
                  systems, and automated compliance monitoring tools that enhance both efficiency and transparency 
                  across all business functions.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  Looking ahead, we&apos;re building operational resilience through cloud-based infrastructure, 
                  comprehensive disaster recovery systems, and scalable technology architecture that positions 
                  Sapphire Broking as a technology leader in the Indian financial services sector while maintaining 
                  our commitment to personalized client service.
                </p>
              </div>
            </article>
            
            <aside>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Operations Profile</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Position</dt>
                    <dd className="text-base text-gray-900">Head of Operations</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Specialization</dt>
                    <dd className="text-base text-gray-900">Process Optimization & Technology</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Location</dt>
                    <dd className="text-base text-gray-900">Nagpur, Maharashtra, India</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">System Performance</dt>
                    <dd className="text-base text-gray-900">99.9% Uptime Achievement</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Experience</dt>
                    <dd className="text-base text-gray-900">10+ Years Operations Excellence</dd>
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Key Responsibilities & Operational Areas</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Trading Operations</h3>
              <p className="text-gray-600 text-sm">
                Managing daily trading operations, order execution, settlement processes, and ensuring seamless 
                trade lifecycle management for optimal client experience and regulatory compliance.
              </p>
            </article>
            
            <article className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Technology Systems</h3>
              <p className="text-gray-600 text-sm">
                Overseeing technology infrastructure, system integrations, platform optimization, and ensuring 
                high availability and performance of all client-facing and internal systems.
              </p>
            </article>
            
            <article className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Process Management</h3>
              <p className="text-gray-600 text-sm">
                Designing and implementing efficient operational workflows, standard operating procedures, 
                and quality control measures across all business functions and departments.
              </p>
            </article>
            
            <article className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Client Onboarding</h3>
              <p className="text-gray-600 text-sm">
                Streamlining client onboarding processes, KYC procedures, account opening workflows, and 
                ensuring smooth transition from prospect to active trading client.
              </p>
            </article>
            
            <article className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Data Management</h3>
              <p className="text-gray-600 text-sm">
                Managing data integrity, security protocols, backup systems, and ensuring accurate, timely 
                information flow across all operational and reporting systems.
              </p>
            </article>
            
            <article className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quality Assurance</h3>
              <p className="text-gray-600 text-sm">
                Implementing comprehensive quality control measures, performance monitoring, error prevention 
                systems, and continuous improvement initiatives across all operations.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Operational Metrics */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Operational Excellence Metrics & Achievements</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <article className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="text-orange-600" size={32} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">99.9%</h3>
              <p className="text-gray-600 text-sm">System Uptime & Reliability</p>
            </article>
            
            <article className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-blue-600" size={32} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">&lt;2 min</h3>
              <p className="text-gray-600 text-sm">Average Trade Execution Time</p>
            </article>
            
            <article className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="text-green-600" size={32} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
              <p className="text-gray-600 text-sm">Operational Support Coverage</p>
            </article>
            
            <article className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="text-purple-600" size={32} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600 text-sm">Regulatory Compliance Rate</p>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What is Akshit Rana&apos;s role at Sapphire Broking?</h3>
              <p className="text-gray-600">Akshit Rana serves as Head of Operations at Sapphire Broking, responsible for managing all operational processes, technology systems, and ensuring seamless daily operations for 2,500+ clients and ₹650+ crores AUM with 99.9% system uptime.</p>
            </article>
            
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How does Akshit ensure operational efficiency at Sapphire Broking?</h3>
              <p className="text-gray-600">Akshit implements technology-driven automation, streamlined workflows, real-time monitoring systems, and continuous process optimization. His approach combines cutting-edge technology with robust quality control measures to deliver exceptional operational performance.</p>
            </article>
            
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What operational metrics has Akshit achieved for the firm?</h3>
              <p className="text-gray-600">Under Akshit&apos;s leadership, Sapphire Broking maintains 99.9% system uptime, less than 2-minute average trade execution time, 24/7 operational support coverage, and 100% regulatory compliance rate while managing daily operations for thousands of clients.</p>
            </article>
            
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What areas of operations does Akshit oversee?</h3>
              <p className="text-gray-600">Akshit oversees trading operations, technology systems, process management, client onboarding, data management, and quality assurance. His role encompasses the entire operational ecosystem from trade execution to client service delivery.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AkshitAboutPage;