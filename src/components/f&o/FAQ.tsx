import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is F&O trading?',
    answer:
      'Futures & Options are derivative contracts that let you speculate or hedge on the future price of stocks, indices, or commodities.',
  },
  {
    question: 'How is F&O different from equity trading?',
    answer:
      'F&O involves contracts with expiry, leverage, and margin requirements, unlike equity trading where you directly own shares without time-bound obligations.',
  },
  {
    question: 'What are the risks in F&O trading?',
    answer:
      'F&O trading involves significant risk due to leverage and expiry. Prices can move quickly—risk management and proper strategies are essential.',
  },
];

const FAQ = () => {
  return (
    <div className="w-full mb-6 sm:mb-8 lg:mb-10  px-4 sm:px-8 lg:px-14 py-3 sm:py-10 lg:py-8">
      <div className="max-w-6xl mx-auto flex flex-col space-y-3 sm:space-y-4 lg:space-y-10 items-center justify-center">
        <h1 className="font-lexend text-2xl sm:text-3xl lg:text-4xl font-medium text-center px-2">
          Frequently Asked Questions (FAQs)
        </h1>
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-2 sm:space-y-3 mt-3 sm:mt-4 lg:mt-6"
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