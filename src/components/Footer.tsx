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
    <h3 className="font-bold mb-4 text-lg">{title}</h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.title}>
          <a href={link.href} className="text-xs hover:text-gray-300">
            {link.title}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialLinks = () => (
  <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-7 gap-4 mb-6">
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

const LegalSection = () => (
  <div className="text-xs space-y-4 border-t border-teal-800 pt-6">
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
    {EXCHANGES.map((exchange, index, array) => (
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

const Footer = () => {
  return (
    <>
      <footer className="bg-[#064D51] text-white p-4 sm:py-8 sm:px-20">
        <div className="max-w-7xl mx-5">
          {/* For small screens, make a separate section that's centered */}
          <div className="block sm:hidden text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/logo-white.svg"
                alt="Logo"
                width={32}
                height={32}
                priority
              />
              <h3 className="font-bold ml-2 text-lg">Sapphire</h3>
            </div>
            <address className="text-xs leading-loose not-italic">
              Plot No. 33, Kotwal Nagar,
              <br />
              Khamla, Nagpur (MH)
              <br />
              Pincode : 440025
              <br />
              info@sapphirebroking.com
              <br />
              www.sapphirebroking.com
            </address>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-0 mb-8">
            {/* Hide this on small screens but show on sm and above */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-1 hidden sm:block">
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
              <address className="text-xs leading-loose not-italic">
                Plot No. 33, Kotwal Nagar,
                <br />
                Khamla, Nagpur (MH)
                <br />
                Pincode : 440025
                <br />
                info@sapphirebroking.com
                <br />
                www.sapphirebroking.com
              </address>
            </div>

            <LinkSection title="Company" links={COMPANY_LINKS} />
            <LinkSection title="Legal" links={LEGAL_LINKS} />
            <LinkSection title="Account" links={ACCOUNT_LINKS} />

            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-bold mb-4 text-lg">Follow us:</h3>
              <SocialLinks />

              <h3 className="font-bold mb-4 text-lg">Download Our App</h3>
              <div className="flex items-center justify-start gap-4">
                <Image
                  src="/apple.svg"
                  alt="App Store"
                  width={80}
                  height={50}
                  // className="h-10 w-auto"
                />
                <Image
                  src="/google.png"
                  alt="Google Play"
                  width={80}
                  height={50}
                  className="-ml-3 "
                />
              </div>
            </div>
          </div>
          <LegalSection />
        </div>
      </footer>
      <div className="py-1 text-white text-center bg-[#152F46] text-xs">
        Copyright © 2025 Sapphire, All rights reserved.
      </div>
    </>
  );
};

export default Footer;