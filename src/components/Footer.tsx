import React from "react";
import Image from "next/image";
import {
  ACCOUNT_LINKS,
  COMPANY_LINKS,
  EXCHANGES,
  INVESTOR_POINTS,
  LEGAL_SECTIONS,
  LinkSectionProps,
  SOCIAL_ICONS,
  LEGAL_LINKS,
} from "@/constants/footer";
import Link from "next/link";

const LinkSection = ({ title, links }: LinkSectionProps) => (
  <div className="col-span-1">
    <h3 className="font-bold mb-4 text-lg sm:text-[20px]">{title}</h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.title}>
          <a href={link.href} className="text-xs sm:text-[14px] hover:text-gray-300">
            {link.title}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialLinks = () => (
  <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-7 gap-1.5 mb-6 max-w-[140px] md:max-w-[120px] lg:max-w-[120px] xl:max-w-xs">
    {SOCIAL_ICONS.map(({ Icon, href }) => (
      <a
        key={href}
        href={href}
        className="hover:opacity-80"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className="text-2xl" />
      </a>
    ))}
  </div>
);

const LegalSection = () => {
  // Create a copy of EXCHANGES and interchange BSE and MCX
  const modifiedExchanges = [...EXCHANGES];
  const bseIndex = modifiedExchanges.findIndex(exchange => exchange.name.includes("BSE"));
  const mcxIndex = modifiedExchanges.findIndex(exchange => exchange.name.includes("MCX"));
  
  if (bseIndex !== -1 && mcxIndex !== -1) {
    const temp = modifiedExchanges[bseIndex];
    modifiedExchanges[bseIndex] = modifiedExchanges[mcxIndex];
    modifiedExchanges[mcxIndex] = temp;
  }

  return (
    <div className="text-xs sm:text-[14px] space-y-4 border-t border-teal-800 pt-6">
      <div className="grid gap-4">
        {LEGAL_SECTIONS.map((section) => (
          <p key={section.title}>
            <strong>{section.title}:</strong> {section.content}
          </p>
        ))}

        <div>
          <strong>Attention Investors:</strong>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            {INVESTOR_POINTS.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ol>
        </div>

        <p>
          <strong>ODR Portal:</strong> Resolve disputes efficiently using
          SEBI&apos;s Online Dispute Resolution Portal:
          [https://smartodr.in/login].
        </p>
        <p>
          <strong>Charts are powered by:</strong>{" "}
          <Link href="https://www.tradingview.com">
            <span className="underline">TradingView</span>
          </Link>
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 py-4">
        {modifiedExchanges.map((exchange, index, array) => (
          <a
            key={exchange.name}
            href={exchange.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-400 ${
              index !== array.length - 1 ? "sm:border-r border-white sm:pr-4" : ""
            }`}
          >
            {exchange.name}
          </a>
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <>
      <footer className="bg-[#064D51] text-white p-4 sm:py-8 sm:px-20">
        <div className="max-w-7xl mx-5">
          {/* Mobile Layout (hidden on sm and above) */}
          <div className="sm:hidden">
            {/* Full Width Sapphire Address */}
            <div className="w-full mb-8">
              <div className="flex items-center mb-4">
                <Image
                  src="/logo-white.svg"
                  alt="Logo"
                  width={32}
                  height={32}
                  priority
                />
                <h3 className="font-bold ml-2 text-lg">Sapphire</h3>
              </div>
              <address className="text-xs leading-loose not-italic mb-6 w-full">
                First Floor, Pande Layout, New Sneh Nagar, Khamla, Nagpur (MH) - 440025
                <br />
                info@sapphirebroking.com
                <br />
                www.sapphirebroking.com
              </address>
            </div>

            {/* Two Column Layout for Mobile */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Left Column: Company and Legal */}
              <div className="col-span-1 space-y-8">
                <LinkSection title="Company" links={COMPANY_LINKS} />
                <LinkSection title="Legal" links={LEGAL_LINKS} />
              </div>

              {/* Right Column: Account and Follow us + Download */}
              <div className="col-span-1 space-y-8">
                <LinkSection title="Account" links={ACCOUNT_LINKS} />
                
                <div>
                  <h3 className="font-bold mb-4 text-lg">Follow us:</h3>
                  <SocialLinks />
                  
                  <h3 className="font-bold mb-4 text-lg">Download Our App</h3>
                  <div className="flex items-center justify-start gap-4">
                    <Image
                      src="/apple.svg"
                      alt="App Store"
                      width={80}
                      height={50}
                    />
                    <Image
                      src="/google.png"
                      alt="Google Play"
                      width={80}
                      height={50}
                      className="-ml-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout (hidden on xs, visible on sm and above) */}
          <div className="hidden sm:block">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-2 mb-8">
              <div className="col-span-2 lg:col-span-1">
                <div className="flex items-center mb-4">
                  <Image
                    src="/logo-white.svg"
                    alt="Logo"
                    width={32}
                    height={32}
                    priority
                  />
                  <h3 className="font-bold ml-2 text-[20px]">Sapphire</h3>
                </div>
                <address className="text-[14px] leading-loose not-italic mb-6 sm:mb-0 w-full max-w-[180px] lg:max-w-[160px] xl:max-w-[200px] break-words">
                  First Floor, Pande Layout,
                  <br />
                  New Sneh Nagar,
                  <br />
                  Khamla, Nagpur (MH)
                  <br />
                  Pincode : 440025
                  <br />
                  <span className="break-all">info@sapphirebroking.com</span>
                  <br />
                  <span className="break-all">www.sapphirebroking.com</span>
                </address>
              </div>

              <div className="hidden lg:block">
                <LinkSection title="Company" links={COMPANY_LINKS} />
              </div>
              <div className="hidden lg:block">
                <LinkSection title="Legal" links={LEGAL_LINKS} />
              </div>
              <div className="hidden lg:block">
                <LinkSection title="Account" links={ACCOUNT_LINKS} />
              </div>

              {/* SM/MD Layout - Company, Legal, Account, Follow us in responsive grid */}
              <div className="col-span-2 lg:hidden">
                <div className="grid grid-cols-2 gap-6">
                  <LinkSection title="Company" links={COMPANY_LINKS} />
                  <LinkSection title="Legal" links={LEGAL_LINKS} />
                  <LinkSection title="Account" links={ACCOUNT_LINKS} />
                  
                  <div className="col-span-1">
                    <h3 className="font-bold mb-4 text-[20px]">Follow us:</h3>
                    <SocialLinks />

                    <h3 className="font-bold mb-4 text-[20px]">Download Our App</h3>
                    <div className="flex items-center justify-start gap-4">
                      <Image
                        src="/apple.svg"
                        alt="App Store"
                        width={80}
                        height={50}
                      />
                      <Image
                        src="/google.png"
                        alt="Google Play"
                        width={80}
                        height={50}
                        className="-ml-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* LG+ Layout - Follow us column */}
              <div className="hidden lg:block col-span-1">
                <h3 className="font-bold mb-4 text-[20px]">Follow us:</h3>
                <SocialLinks />

                <h3 className="font-bold mb-4 text-[20px]">Download Our App</h3>
                <div className="flex items-center justify-start gap-4">
                  <Image
                    src="/apple.svg"
                    alt="App Store"
                    width={80}
                    height={50}
                  />
                  <Image
                    src="/google.png"
                    alt="Google Play"
                    width={80}
                    height={50}
                    className="-ml-3"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <LegalSection />
        </div>
      </footer>
      <div className="py-1 text-white text-center bg-[#152F46] text-xs sm:text-[14px]">
        Copyright © 2025 Sapphire, All rights reserved.
      </div>
    </>
  );
};

export default Footer;