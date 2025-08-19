import React from 'react';
import { Award, TrendingUp } from 'lucide-react';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nakul Thakur - Managing Partner | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Meet Nakul Thakur, Founder & Managing Director of Sapphire Broking. MBA Finance from IIM Indore with 12+ years experience. Leading 2,500+ clients with ₹650Cr+ AUM through transparent investment advisory services in Nagpur, Maharashtra. SEBI registered (INZ923930210).",
  keywords:
    "Nakul Thakur, Sapphire Broking founder, investment advisor Nagpur, IIM Indore MBA, SEBI registered advisor INZ923930210, ICICI Direct, HDFC Securities, Sharekhan, transparent financial services, portfolio management, wealth management Nagpur, Maharashtra investment advisor",
  openGraph: {
    title: "Nakul Thakur - Founder & Managing Director | Sapphire Broking",
    description:
      "MBA Finance from IIM Indore, 12+ years experience, 2,500+ clients, ₹650Cr+ AUM. SEBI registered investment advisor providing transparent financial services in Nagpur, Maharashtra.",
    url: "https://sapphirebroking.com/about-nakul-thakur",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
    type: "profile",
  },
};

const NakulAboutPage = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section with improved semantic HTML */}
      <header className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
              Leadership
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Meet <span className="text-teal-600">Nakul Thakur</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Bridging the gap between market complexity and investor success through transparent, client-first financial services in Nagpur, Maharashtra.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <article>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Founder & Managing Director of Sapphire Broking</h2>
                  <p className="text-gray-600 leading-relaxed">
                    I founded <strong>Sapphire Broking</strong> in 2018 with a simple yet powerful vision: to democratize quality financial services 
                    and make sophisticated investment strategies accessible to every investor in India, regardless of their portfolio size.
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-600 leading-relaxed">
                    After spending eight years in traditional brokerages including <em>ICICI Direct, HDFC Securities, and Sharekhan</em>, I witnessed firsthand how complicated and expensive 
                    investing had become for regular people. At Sapphire Broking, we focus on transparent pricing, clear 
                    communication, and personalized investment advice that aligns with each client&apos;s unique financial goals.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6" role="region" aria-label="Key Statistics">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-teal-600">2018</div>
                    <div className="text-sm text-gray-600">Company Founded</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-teal-600">2,500+</div>
                    <div className="text-sm text-gray-600">Active Clients</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-teal-600">₹650Cr+</div>
                    <div className="text-sm text-gray-600">Assets Under Management</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-teal-600">12+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>
              </div>
            </article>
            
            <aside className="flex justify-center">
              <div className="relative">
                {/* Professional photo placeholder with proper alt text */}
                <div className="w-80 h-96 bg-gray-100 rounded-lg shadow-lg border border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl font-bold text-teal-600" aria-label="Nakul Thakur initials">NT</span>
                    </div>
                    <p className="text-gray-500 text-sm">Nakul Thakur - Professional Photo</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </header>

      {/* Professional Journey with improved structure */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Professional Journey & Career Timeline</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12" role="region" aria-label="Career Timeline">
              <article className="flex gap-8">
                <div className="flex-shrink-0 w-32 text-right">
                  <time className="text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full" dateTime="2018">2018 - Present</time>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-teal-600 rounded-full mt-2" aria-hidden="true"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Founder & Managing Director, Sapphire Broking</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Established <strong>Sapphire Broking</strong> with a vision to provide transparent, client-centric financial services in Nagpur. 
                    Built the company from ground up to serve 2,500+ clients with ₹650+ crores AUM. Developed innovative 
                    trading platforms and advisory services that prioritize transparency and client success. SEBI registered investment advisor (INZ923930210).
                  </p>
                </div>
              </article>
              
              <article className="flex gap-8">
                <div className="flex-shrink-0 w-32 text-right">
                  <time className="text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full" dateTime="2010/2018">2010 - 2018</time>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-teal-600 rounded-full mt-2" aria-hidden="true"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Senior Investment Advisor</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Worked with leading brokerages including <strong>ICICI Direct</strong>, <strong>HDFC Securities</strong>, and <strong>Sharekhan</strong>. 
                    Specialized in equity research, portfolio management, and client advisory services. 
                    Consistently ranked in top 10% for client satisfaction and portfolio performance across Maharashtra region.
                  </p>
                </div>
              </article>
              
              <article className="flex gap-8">
                <div className="flex-shrink-0 w-32 text-right">
                  <time className="text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full" dateTime="2008/2010">2008 - 2010</time>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-teal-600 rounded-full mt-2" aria-hidden="true"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">MBA Finance, IIM Indore</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Specialized in Financial Markets and Investment Banking at <strong>Indian Institute of Management, Indore</strong>. Completed internship at NSE during 
                    the market volatility of 2008-09, gaining valuable insights into risk management and market dynamics during global financial crisis.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Philosophy with better structure */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Investment Philosophy & Approach</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <article className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="mr-3 text-teal-600" size={24} aria-hidden="true" />
                Core Investment Beliefs
              </h3>
              <ul className="space-y-4" role="list">
                <li className="flex items-start">
                  <span className="text-teal-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Long-term wealth creation beats short-term speculation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Diversification is essential for risk management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Cost-efficiency - every rupee saved compounds over time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Simple strategies executed consistently outperform complexity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Risk management always comes before return optimization</span>
                </li>
              </ul>
            </article>
            
            <article className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="mr-3 text-red-500" size={24} aria-hidden="true" />
                What We Don&apos;t Do - Our Commitments
              </h3>
              <ul className="space-y-4" role="list">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1" aria-hidden="true">✗</span>
                  <span className="text-gray-700">Promise guaranteed returns or unrealistic expectations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1" aria-hidden="true">✗</span>
                  <span className="text-gray-700">Encourage excessive trading or speculation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1" aria-hidden="true">✗</span>
                  <span className="text-gray-700">Sell financial products that don&apos;t match client needs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1" aria-hidden="true">✗</span>
                  <span className="text-gray-700">Use complicated jargon or hide important information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1" aria-hidden="true">✗</span>
                  <span className="text-gray-700">Impose hidden fees or surprise charges</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Current Focus with better semantic structure */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Current Focus & Vision for Indian Investors</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <article className="md:col-span-2">
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  We&apos;re building <strong>India&apos;s most transparent brokerage platform</strong> where every client interaction, 
                  trade confirmation, and fee structure is completely transparent. Our technology platform 
                  provides real-time portfolio tracking, comprehensive research reports, and personalized 
                  investment recommendations for investors across Maharashtra and beyond.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  I personally spend time on three key areas: enhancing our technology infrastructure to provide 
                  better client experiences, training our advisory team to deliver world-class investment guidance, 
                  and regularly meeting with clients to understand their evolving financial needs in the Indian market.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  Our ultimate goal is to make quality <em>investment advice and wealth management services</em> accessible 
                  to India&apos;s growing middle class, helping them achieve their financial dreams through disciplined, 
                  long-term investing strategies tailored for the Indian market.
                </p>
              </div>
            </article>
            
            <aside>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Facts About Nakul</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Education</dt>
                    <dd className="text-base text-gray-900">MBA Finance, IIM Indore</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Headquarters</dt>
                    <dd className="text-base text-gray-900">Nagpur, Maharashtra, India</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">SEBI Registration</dt>
                    <dd className="text-base text-gray-900">INZ923930210</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Experience</dt>
                    <dd className="text-base text-gray-900">12+ Years in Financial Services</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Specialization</dt>
                    <dd className="text-base text-gray-900">Wealth Management, Portfolio Advisory</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What is Nakul Thakur&apos;s educational background?</h3>
              <p className="text-gray-600">Nakul Thakur holds an MBA in Finance from IIM Indore (2008-2010), where he specialized in Financial Markets and Investment Banking. He completed his internship at NSE during the 2008-09 market volatility.</p>
            </article>
            
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How much experience does Nakul Thakur have in financial services?</h3>
              <p className="text-gray-600">Nakul has over 12 years of experience in financial services. He worked with leading brokerages like ICICI Direct, HDFC Securities, and Sharekhan from 2010-2018 before founding Sapphire Broking in 2018.</p>
            </article>
            
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What is Sapphire Broking&apos;s Assets Under Management (AUM)?</h3>
              <p className="text-gray-600">Under Nakul Thakur&apos;s leadership, Sapphire Broking manages over ₹650 crores in assets and serves more than 2,500 active clients with transparent, client-first financial services.</p>
            </article>
            
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Where is Nakul Thakur and Sapphire Broking located?</h3>
              <p className="text-gray-600">Nakul Thakur and Sapphire Broking are headquartered in Nagpur, Maharashtra, India. The firm is SEBI registered (INZ923930210) and serves clients across Maharashtra and India.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NakulAboutPage;