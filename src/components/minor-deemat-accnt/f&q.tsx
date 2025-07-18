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
      'Yes, you can invest in US stocks from India through Sapphire Broking. We provide international investment opportunities with proper regulatory compliance and support.',
  },
  {
    question: 'Can a Minor Demat Account be used for trading?',
    answer:
      'The minimum investment amount varies depending on the specific stocks and investment plans. Please contact our team for detailed information about minimum investment requirements.',
  },
  {
    question: 'What happens to the Minor Demat Account when the minor turns 18?',
    answer:
      'Yes, we are SEBI-registered and comply with all regulatory guidelines to ensure the security of your investments. Your investments are protected under international investment frameworks.',
  },
];

const FAQ = () => {
  return (
    <div className="w-full mb-6 sm:mb-8 lg:mb-10 mt-2 px-4 sm:px-8 lg:px-14 py-6 sm:py-8 lg:py-12">
      <div className="max-w-6xl mx-auto flex flex-col space-y-3 sm:space-y-4 lg:space-y-6 items-center justify-center">
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