import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Who can open a Minor Demat Account?',
    answer:
      'You can open your account online in minutes by submitting your PAN card, Aadhaar, and bank details, or visit our office for assistance.',
  },
  {
    question: 'Can a Minor Demat Account be used for trading?',
    answer:
      'We provide stock broking, mutual fund distribution, portfolio management, insurance solutions, and expert financial advisory.',
  },
  {
    question: 'What happens to the Minor Demat Account when the minor turns 18?',
    answer:
      'Yes, we are SEBI-registered and comply with all regulatory guidelines to ensure the security of your investments.',
  },
];

const FAQ = () => {
  return (
    <div className="w-full px-2 sm:px-4 md:px-8 lg:px-14 py-4 sm:py-6 lg:py-12">
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
              <AccordionTrigger className="font-lexend text-sm sm:text-base md:text-lg lg:text-[20px] xl:text-[24px] hover:no-underline text-left flex items-center min-h-[56px]">
                <span className="flex-1">{faq.question}</span>
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