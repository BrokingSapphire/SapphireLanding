import React from 'react';
import { Users, Target } from 'lucide-react';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prakash Katyari - Partner | Sapphire Broking: Strategic Leadership & Client Excellence",
  description:
    "Meet Prakash Katyari, Partner at Sapphire Broking. Strategic business leader driving growth and client satisfaction for 2,500+ investors. Expert in business development, client relations, and investment advisory services in Nagpur, Maharashtra.",
  keywords:
    "Prakash Katyari, Sapphire Broking partner, business development Nagpur, investment advisory leadership, client relations expert, strategic planning Maharashtra, wealth management partner, financial services leader",
  openGraph: {
    title: "Prakash Katyari - Partner | Sapphire Broking",
    description:
      "Strategic business leader and partner at Sapphire Broking. Driving growth and excellence in client services for 2,500+ investors in Nagpur, Maharashtra.",
    url: "https://sapphirebroking.com/about-prakash-katyari",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
    type: "profile",
  },
};

const PrakashAboutPage = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <header className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
              Strategic Leadership
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Meet <span className="text-emerald-600">Prakash Katyari</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Driving strategic growth and operational excellence while fostering lasting client relationships built on trust, transparency, and exceptional service delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <article>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Partner at Sapphire Broking</h2>
                  <p className="text-gray-600 leading-relaxed">
                    As <strong>Partner</strong> at Sapphire Broking, I focus on strategic business development, 
                    operational excellence, and building meaningful relationships with our clients across Maharashtra. 
                    My role encompasses driving growth initiatives while ensuring every client receives personalized 
                    attention and world-class investment advisory services.
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-600 leading-relaxed">
                    I believe in the power of long-term partnerships—both with our clients and within our team. 
                    By combining strategic vision with hands-on execution, we've built a firm that prioritizes 
                    client success and maintains the highest standards of service quality in the Indian financial services industry.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6" role="region" aria-label="Key Statistics">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">2,500+</div>
                    <div className="text-sm text-gray-600">Clients Served</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">₹650Cr+</div>
                    <div className="text-sm text-gray-600">Portfolio Value</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">98%</div>
                    <div className="text-sm text-gray-600">Client Satisfaction</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">15+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>
              </div>
            </article>
            
            <aside className="flex justify-center">
              <div className="relative">
                {/* Professional photo placeholder */}
                <div className="w-80 h-96 bg-gray-100 rounded-lg shadow-lg border border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl font-bold text-emerald-600" aria-label="Prakash Katyari initials">PK</span>
                    </div>
                    <p className="text-gray-500 text-sm">Prakash Katyari - Professional Photo</p>
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Professional Journey & Business Leadership</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12" role="region" aria-label="Career Timeline">
              <article className="flex gap-8">
                <div className="flex-shrink-0 w-32 text-right">
                  <time className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full" dateTime="2018">2018 - Present</time>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-emerald-600 rounded-full mt-2" aria-hidden="true"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Partner, Sapphire Broking</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Co-founded and scaled <strong>Sapphire Broking</strong> to serve 2,500+ clients with ₹650+ crores AUM. 
                    Lead strategic planning, business development, and operational excellence initiatives. Established strong 
                    client relationships and built a reputation for transparent, client-first financial services across Maharashtra.
                  </p>
                </div>
              </article>
              
              <article className="flex gap-8">
                <div className="flex-shrink-0 w-32 text-right">
                  <time className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full" dateTime="2012/2018">2012 - 2018</time>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-emerald-600 rounded-full mt-2" aria-hidden="true"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Senior Business Development Manager</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Led business development initiatives at prominent financial institutions, focusing on client acquisition, 
                    relationship management, and portfolio growth strategies. Specialized in building long-term client partnerships 
                    and developing customized investment solutions for diverse investor needs across Central India.
                  </p>
                </div>
              </article>
              
              <article className="flex gap-8">
                <div className="flex-shrink-0 w-32 text-right">
                  <time className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full" dateTime="2008/2012">2008 - 2012</time>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-emerald-600 rounded-full mt-2" aria-hidden="true"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Investment Advisor & Client Relations</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Started career in investment advisory services, developing expertise in client consultation, portfolio planning, 
                    and financial goal mapping. Built foundation in understanding diverse investor profiles and creating 
                    tailored investment strategies that align with individual risk tolerance and financial objectives.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Leadership Philosophy & Business Approach</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <article className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="mr-3 text-emerald-600" size={24} aria-hidden="true" />
                Client-Centric Leadership
              </h3>
              <ul className="space-y-4" role="list">
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Every decision prioritizes long-term client success</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Building relationships based on trust and transparency</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Personalized service regardless of portfolio size</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Continuous improvement in service delivery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Empowering clients through financial education</span>
                </li>
              </ul>
            </article>
            
            <article className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="mr-3 text-orange-600" size={24} aria-hidden="true" />
                Strategic Business Growth
              </h3>
              <ul className="space-y-4" role="list">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Sustainable growth through quality service delivery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Innovation in client experience and technology</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Team development and professional excellence</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Market expansion through referrals and reputation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span className="text-gray-700">Operational efficiency and cost optimization</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Current Focus */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Current Focus & Strategic Vision</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <article className="md:col-span-2">
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  My current focus centers on <strong>scaling Sapphire Broking's impact</strong> while maintaining our 
                  commitment to personalized service and transparent practices. I'm leading initiatives to enhance our 
                  digital platform capabilities, expand our research offerings, and strengthen our position as 
                  Maharashtra's most trusted investment advisory firm.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  I work closely with our team to identify emerging market opportunities, develop innovative service 
                  offerings, and ensure we're always ahead of our clients' evolving financial needs. Our strategic 
                  partnerships and continuous process improvements help us deliver exceptional value while maintaining 
                  competitive pricing structures.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  Looking ahead, we're building infrastructure to serve the next generation of Indian investors through 
                  enhanced technology, comprehensive financial education programs, and strategic alliances that 
                  expand our service capabilities while preserving the personal touch that defines Sapphire Broking.
                </p>
              </div>
            </article>
            
            <aside>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Leadership Profile</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Position</dt>
                    <dd className="text-base text-gray-900">Partner</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Focus Areas</dt>
                    <dd className="text-base text-gray-900">Strategy & Business Development</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Location</dt>
                    <dd className="text-base text-gray-900">Nagpur, Maharashtra, India</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Experience</dt>
                    <dd className="text-base text-gray-900">15+ Years in Financial Services</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Expertise</dt>
                    <dd className="text-base text-gray-900">Client Relations & Growth Strategy</dd>
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Key Responsibilities & Strategic Areas</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="bg-emerald-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Strategic Planning</h3>
              <p className="text-gray-600 text-sm">
                Developing long-term business strategies, market expansion plans, and growth initiatives 
                that position Sapphire Broking as the leading investment advisory firm in Maharashtra.
              </p>
            </article>
            
            <article className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Client Relations</h3>
              <p className="text-gray-600 text-sm">
                Building and maintaining strong relationships with key clients, ensuring exceptional service 
                delivery, and personally managing high-value client portfolios and investment strategies.
              </p>
            </article>
            
            <article className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Business Development</h3>
              <p className="text-gray-600 text-sm">
                Leading new client acquisition initiatives, partnership development, and market penetration 
                strategies to expand our reach while maintaining service quality standards.
              </p>
            </article>
            
            <article className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Operations Management</h3>
              <p className="text-gray-600 text-sm">
                Overseeing daily operations, process optimization, technology integration, and ensuring 
                smooth workflow across all departments for enhanced client experience delivery.
              </p>
            </article>
            
            <article className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Team Leadership</h3>
              <p className="text-gray-600 text-sm">
                Mentoring and developing team members, fostering a culture of excellence, and ensuring 
                continuous professional growth within our advisory and support teams.
              </p>
            </article>
            
            <article className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Market Analysis</h3>
              <p className="text-gray-600 text-sm">
                Analyzing market trends, competitive landscape, and investment opportunities to guide 
                strategic decisions and enhance our advisory services for optimal client outcomes.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Values & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Values & Vision for the Future</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <article>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Values</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Integrity First</h4>
                    <p className="text-gray-600 text-sm">Always acting in our clients' best interests with complete transparency and honesty.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Excellence in Service</h4>
                    <p className="text-gray-600 text-sm">Delivering exceptional quality in every client interaction and investment recommendation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Long-term Partnership</h4>
                    <p className="text-gray-600 text-sm">Building lasting relationships that grow and evolve with our clients' financial journeys.</p>
                  </div>
                </div>
              </div>
            </article>
            
            <article>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Future Vision</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Technology Leadership</h4>
                    <p className="text-gray-600 text-sm">Implementing cutting-edge technology while maintaining the personal touch our clients value.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Market Expansion</h4>
                    <p className="text-gray-600 text-sm">Growing our reach across India while maintaining our commitment to personalized service.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Financial Education</h4>
                    <p className="text-gray-600 text-sm">Empowering the next generation of investors through comprehensive financial literacy programs.</p>
                  </div>
                </div>
              </div>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What is Prakash Katyari's role at Sapphire Broking?</h3>
              <p className="text-gray-600">Prakash Katyari serves as Partner at Sapphire Broking, focusing on strategic business development, client relations, and operational excellence. He plays a key role in driving growth while maintaining the firm's commitment to transparent, client-first financial services.</p>
            </article>
            
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How does Prakash contribute to client success at Sapphire Broking?</h3>
              <p className="text-gray-600">Prakash focuses on building long-term client relationships, ensuring personalized service delivery, and developing strategic initiatives that enhance client experience. His leadership has helped achieve 98% client satisfaction while serving 2,500+ investors with ₹650+ crores AUM.</p>
            </article>
            
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What is Prakash's experience in financial services?</h3>
              <p className="text-gray-600">Prakash brings over 15 years of experience in financial services, including senior roles in business development and client relations. He co-founded Sapphire Broking in 2018 and has been instrumental in scaling the business while maintaining quality service standards.</p>
            </article>
            
            <article>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What areas does Prakash focus on for business growth?</h3>
              <p className="text-gray-600">Prakash focuses on strategic planning, client relationship management, business development, operations optimization, and team leadership. His approach emphasizes sustainable growth through quality service delivery and innovation in client experience.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrakashAboutPage;