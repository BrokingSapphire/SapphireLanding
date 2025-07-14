import PartnerSupport from '@/components/legal/BecomePartner/PartnerSupport'
import Section1 from '@/components/legal/BecomePartner/Section1'
import Section2 from '@/components/legal/BecomePartner/Section2'
import Section3 from '@/components/legal/BecomePartner/Section3'
import Section4 from '@/components/legal/BecomePartner/Section4'
import { Metadata } from "next";
import React from 'react'

export const metadata: Metadata = {
  title: "Become a Partner | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Sapphire has a next-generation trading platform designed for investors seeking expert insights and advanced trading tools. Get professional trade recommendations and stay updated with real-time corporate announcements from all listed entities. Our high-tech features ensure seamless execution, empowering both beginners and experienced traders to make well-informed market decisions.",
  keywords:
    "become a partner sapphire broking, online trading platform India, stock market analysis tools, real-time market insights, professional trading recommendations, BSE NSE live updates, smart trading solutions, expert trading insights, stock market for beginners, advanced trading platform, corporate announcement tracker, investment decision tools, market intelligence platform, stock trading alerts India, seamless trade execution, next-gen trading platform, stock market education, technical analysis tools India, fundamental analysis platform, market trend analyzer, financial market insights, algorithmic trading India, trading platform comparison, best online broker India, intraday trading platform, portfolio management tools, stock screening tools India, equity research platform, investment analytics India, market data analysis, trading charts and indicators, mobile trading app India, derivatives trading platform, commodity trading solutions, forex trading tools India",
  openGraph: {
    title: "Become a Partner | Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Sapphire has a next-generation trading platform designed for investors seeking expert insights and advanced trading tools. Get professional trade recommendations and stay updated with real-time corporate announcements from all listed entities. Our high-tech features ensure seamless execution, empowering both beginners and experienced traders to make well-informed market decisions.",
    url: "https://sapphirebroking.com/",
    images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
    type: "website",
  },
};

function BecomePartner() {
  return (
    <>
    <div className='mt-20'>
    <Section1 />
    <Section2 />
    <Section3 />
    <Section4 />
    <PartnerSupport />
    </div>
    </>
  )
}

export default BecomePartner