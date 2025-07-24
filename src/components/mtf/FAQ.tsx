import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Can I trade using MTF through Sapphire Broking?',
    answer:
      'Yes, Sapphire Broking offers Margin Trading Facility (MTF) to eligible clients. You can activate it in just a few clicks and start trading with leverage on select stocks.',
  },
  {
    question: 'What is the minimum margin amount required?',
    answer:
      'You can start using MTF with a minimum margin as per the stock-specific exchange guidelines. There is no fixed amount — it depends on the stock you are trading and your available funds.',
  },
  {
    question: 'Is interest charged on MTF trades?',
    answer:
      'Yes, interest is charged daily on the funded portion of your MTF trades. You can view the applicable interest rates transparently before placing an order.',
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