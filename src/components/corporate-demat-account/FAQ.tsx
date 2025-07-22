import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Who can open a Corporate Demat Account?',
    answer:
      'Any registered company, LLP, or partnership firm with a valid PAN and business registration can open a Corporate Demat Account to hold securities in electronic form.',
  },
  {
    question: 'Can a Corporate Demat Account be used for trading?',
    answer:
      'Yes, corporate accounts can be linked to a trading account, enabling the company to buy, sell, and manage shares, bonds, or mutual funds digitally.',
  },
  {
    question: 'What documents are required for opening a Corporate Demat Account?',
    answer:
      'You&apos;ll typically need the company PAN, Certificate of Incorporation, Board Resolution, address proof, and KYC documents of authorized signatories',
  },
  
  
];

const FAQ = () => {
  return (
    <div className="w-full bg-white px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto flex flex-col space-y-6 items-center justify-center">
        <h1 className="font-lexend text-xl sm:text-2xl lg:text-4xl font-medium text-center px-2">
          Frequently Asked Questions (FAQs)
        </h1>
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-1 sm:space-y-2 md:space-y-3 mt-2 sm:mt-4 lg:mt-6"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="py-1 sm:py-2"
            >
              <AccordionTrigger className="font-lexend text-sm sm:text-base md:text-lg lg:text-[20px] hover:no-underline text-left break-words">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-lexend font-normal text-gray-600 text-xs sm:text-sm md:text-base lg:text-[18px] leading-relaxed pr-2 sm:pr-4 lg:pr-8 break-words">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;