import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What are commodities in trading?',
    answer:
      'Commodities are tradable raw materials like gold, crude oil, and wheat, exchanged via contracts on platforms like MCX through futures and options.',
  },
  {
    question: 'How is commodity trading different from stocks?',
    answer:
      'Commodity trading involves contracts with expiry and is driven by global demand-supply, unlike stocks that rely on company performance and market sentiment.',
  },
  {
    question: 'Do I need a separate account for commodities?',
    answer:
      'No, you can trade commodities through your Sapphire account by activating the commodity segment—no need for a separate trading account.',
  },
];

const FAQ = () => {
  return (
    <div className="w-full mt-10 sm:mt-8 lg:mt-12 px-2 sm:px-4 md:px-8 lg:px-14 py-4 sm:py-6 lg:py-12">
      <div className="max-w-6xl mx-auto flex flex-col space-y-2 sm:space-y-4 lg:space-y-6 items-center justify-center">
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
              <AccordionTrigger className="font-lexend text-sm sm:text-base md:text-lg lg:text-[20px] xl:text-[24px] hover:no-underline text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-lexend font-normal text-gray-600 text-xs sm:text-sm md:text-base lg:text-[18px] xl:text-[20px] leading-relaxed pr-2 sm:pr-4 lg:pr-8">
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