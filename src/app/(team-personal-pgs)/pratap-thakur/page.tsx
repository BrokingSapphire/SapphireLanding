import React from 'react';
import { BarChart3, Globe, Lightbulb } from 'lucide-react';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pratap Thakur - Partner | Sapphire Broking: Investment Strategy & Market Intelligence",
  description:
    "Meet Pratap Thakur, Partner at Sapphire Broking. Expert in investment strategy, market analysis, and portfolio optimization for 2,500+ clients. Driving research excellence and strategic investment decisions in Nagpur, Maharashtra.",
  keywords:
    "Pratap Thakur, Sapphire Broking partner, investment strategy expert, market analysis Nagpur, portfolio optimization Maharashtra, research analyst, strategic investment planning, wealth management partner",
  openGraph: {
    title: "Pratap Thakur - Partner | Sapphire Broking",
    description:
      "Investment strategy expert and partner at Sapphire Broking. Leading market research and portfolio optimization for 2,500+ clients in Nagpur, Maharashtra.",
    url: "https://sapphirebroking.com/about-pratap-thakur",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
    type: "profile",
  },
};

const PratapAboutPage = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <header className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              Investment Strategy & Research
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Meet <span className="text-purple-600">Pratap Thakur</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Combining deep market intelligence with strategic investment expertise to deliver superior portfolio performance and informed investment decisions for discerning investors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <article>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Partner & Investment Strategist at Sapphire Broking</h2>
                  <p className="text-gray-600 leading-relaxed">
                    As <strong>Partner</strong> at Sapphire Broking, I specialize in investment strategy development, 
                    comprehensive market research, and portfolio optimization. My focus is on translating complex market 
                    dynamics into actionable investment insights that drive superior returns while managing risk effectively 
                    for our diverse client base.
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-600 leading-relaxed">
                    I believe that successful investing requires a perfect blend of rigorous research, strategic thinking, 
                    and disciplined execution. By staying ahead of market trends and maintaining a deep understanding of 
                    economic fundamentals, I help our clients navigate market volatility and capitalize on emerging opportunities.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6" role="region" aria-label="Key Statistics">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">2,500+</div>
                    <div className="text-sm text-gray-600">Portfolios Managed</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">₹650Cr+</div>
                    <div className="text-sm text-gray-600">Investment Value</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">15%+</div>
                    <div className="text-sm text-gray-600">Average Annual Returns</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">12+</div>
                    <div className="text-sm text-gray-600">Years Research Experience</div>
                  </div>
                </div>
              </div>
            </article>
            
            <aside className="flex justify-center">
              <div className="relative">
                {/* Professional photo placeholder */}
                <div className="w-80 h-96 bg-gray-100 rounded-lg shadow-lg border border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl font-bold text-purple-600" aria-label="Pratap Thakur initials">PT</span>
                    </div>
                    <p className="text-gray-500 text-sm">Pratap Thakur - Professional Photo</p>
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Professional Journey & Investment Expertise</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12" role="region" aria-label="Career Timeline">
              <article className="flex gap-8">
                <div className="flex-shrink-0 w-32 text-right">
                  <time className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full" dateTime="2018">2018 - Present</time>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-purple-600 rounded-full mt-2" aria-hidden="true"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Partner & Chief Investment Strategist, Sapphire Broking</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Lead investment strategy and research initiatives for <strong>Sapphire Broking's</strong> ₹650+ crores AUM. 
                    Develop comprehensive market analysis, sector research, and portfolio optimization strategies. Created proprietary 
                    research frameworks that have consistently delivered superior risk-adjusted returns for 2,500+ client portfolios.
                  </p>
                </div>
              </article>
              
              <article className="flex gap-8">
                <div className="flex-shrink-0 w-32 text-right">
                  <time className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full" dateTime="2014/2018">2014 - 2018</time>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-purple-600 rounded-full mt-2" aria-hidden="true"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Senior Research Analyst & Portfolio Manager</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Specialized in equity research and portfolio management at leading financial institutions. Developed expertise 
                    in fundamental analysis, sector rotation strategies, and risk management. Consistently ranked among top 
                    performers for research accuracy and portfolio returns across Central India region.
                  </p>
                </div>
              </article>
              
              <article className="flex gap-8">
                <div className="flex-shrink-0 w-32 text-right">
                  <time className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full" dateTime="2011/2014">2011 - 2014</time>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-purple-600 rounded-full mt-2" aria-hidden="true"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Investment Research Associate</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Started career in investment research, focusing on market analysis, company valuations, and investment 
                    recommendations. Built strong foundation in financial modeling, technical analysis, and macroeconomic 
                    research that forms the basis of current investment philosophy and strategic approach.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Investment Philosophy & Research Methodology</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <article className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="mr-3 text-purple-600" size={24} aria-hidden="true" />
                Research-Driven Investment Approach
              </h3>
              <ul className="space-y-4" role="list">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Fundamental analysis combined with technical insights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Rigorous company and sector evaluation processes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Quantitative risk assessment and portfolio optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Long-term value creation with tactical adjustments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Continuous monitoring and performance evaluation</span>
                </li>
              </ul>
            </article>
            
            <article className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Globe className="mr-3 text-indigo-600" size={24} aria-hidden="true" />
                Market Intelligence Framework
              </h3>
              <ul className="space-y-4" role="list">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Macroeconomic trend analysis and sector rotation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Global market correlation and emerging opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Regulatory impact assessment and policy analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Technology disruption and innovation tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Sentiment analysis and behavioral finance insights</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Current Focus */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Current Focus & Investment Innovation</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <article className="md:col-span-2">
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  My current focus revolves around <strong>leveraging technology and data analytics</strong> to enhance our 
                  investment research capabilities and deliver more precise, personalized investment strategies. I'm developing 
                  advanced portfolio optimization models that factor in ESG considerations, market volatility patterns, 
                  and emerging sector dynamics specific to the Indian market.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  I lead our research team in identifying tomorrow's investment themes today—from renewable energy and 
                  digitalization trends to demographic shifts and consumption patterns. Our proprietary research framework 
                  combines traditional fundamental analysis with modern data science techniques to uncover hidden value 
                  and anticipate market movements.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  Looking ahead, we're building sophisticated risk management systems and alternative investment strategies 
                  that help our clients achieve their financial goals while navigating an increasingly complex global 
                  investment landscape. Our commitment to research excellence ensures we stay ahead of market trends 
                  and deliver consistent value to our investors.
                </p>
              </div>
            </article>
            
            <aside>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Investment Expertise</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Position</dt>
                    <dd className="text-base text-gray-900">Partner & Investment Strategist</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Specialization</dt>
                    <dd className="text-base text-gray-900">Research & Portfolio Strategy</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Location</dt>
                    <dd className="text-base text-gray-900">Nagpur, Maharashtra, India</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Track Record</dt>
                    <dd className="text-base text-gray-900">15%+ Average Annual Returns</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Experience</dt>
                    <dd className="text-base text-gray-900">12+ Years Investment Research</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Investment Specializations */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Investment Specializations & Research Areas</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Equity Research & Analysis</h3>
              <p className="text-gray-600 text-sm">
                Deep fundamental analysis of companies, sectors, and market trends. Comprehensive financial modeling, 
                valuation techniques, and investment thesis development for optimal stock selection.
              </p>
            </article>
            
            <article className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Portfolio Optimization</h3>
              <p className="text-gray-600 text-sm">
                Advanced portfolio construction using modern portfolio theory, risk-return optimization, and 
                diversification strategies tailored to individual client risk profiles and investment objectives.
              </p>
            </article>
            
            <article className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sector Rotation Strategies</h3>
              <p className="text-gray-600 text-sm">
                Tactical asset allocation based on economic cycles, sector performance analysis, and thematic 
                investment opportunities across various industries and market segments.
              </p>
            </article>
            
            <article className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Risk Management</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive risk assessment frameworks, volatility analysis, and hedging strategies to 
                protect client portfolios during market downturns and preserve capital.
              </p>
            </article>
            
            <article className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Emerging Market Trends</h3>
              <p className="text-gray-600 text-sm">
                Identifying and capitalizing on emerging investment themes including technology disruption, 
                ESG investing, and demographic shifts specific to the Indian market context.
              </p>
            </article>
            
            <article className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Alternative Investments</h3>
              <p className="text-gray-600 text-sm">
                Research and implementation of alternative investment strategies including REITs, commodity 
                investments, and structured products for enhanced portfolio diversification.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Investment Research Process & Methodology</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <article className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Market Analysis</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive macroeconomic and sector analysis to identify investment themes and market opportunities.
              </p>
            </article>
            
            <article className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Company Research</h3>
              <p className="text-gray-600 text-sm">
                Detailed fundamental analysis including financial modeling, management evaluation, and competitive positioning.
              </p>
            </article>
            
            <article className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Risk Assessment</h3>
              <p className="text-gray-600 text-sm">
                Quantitative and qualitative risk analysis to ensure appropriate risk-return profile for each investment.
              </p>
            </article>
            
            <article className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Portfolio Integration</h3>
              <p className="text-gray-600 text-sm">
                Strategic portfolio construction and ongoing monitoring to optimize performance and manage risk.
              </p>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What is Pratap Thakur's role at Sapphire Broking?</h3>
              <p className="text-gray-600">Pratap Thakur serves as Partner & Investment Strategist at Sapphire Broking, specializing in investment research, portfolio optimization, and strategic market analysis. He leads the research team and develops investment strategies for the firm's ₹650+ crores AUM.</p>
            </article>
            
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What is Pratap's investment philosophy and approach?</h3>
              <p className="text-gray-600">Pratap follows a research-driven investment approach combining fundamental analysis with quantitative methods. His philosophy emphasizes long-term value creation, rigorous risk management, and continuous portfolio optimization based on changing market dynamics.</p>
            </article>
            
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What kind of returns has Pratap achieved for clients?</h3>
              <p className="text-gray-600">Under Pratap's investment strategies, client portfolios have achieved an average annual return of 15%+. His research-driven approach and systematic risk management have consistently delivered superior risk-adjusted returns for Sapphire Broking's 2,500+ clients.</p>
            </article>
            
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What areas of investment research does Pratap specialize in?</h3>
              <p className="text-gray-600">Pratap specializes in equity research, portfolio optimization, sector rotation strategies, risk management, and emerging market trends. He also focuses on alternative investments and technology-driven investment solutions for enhanced portfolio diversification.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PratapAboutPage;