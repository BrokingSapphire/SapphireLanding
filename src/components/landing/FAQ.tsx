import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants/landing";

export default function FAQ() {
  return (
    <div className="w-full mb-10 mt-2 px-14 sm:px-6 py-8 sm:p-12">
      <div className="max-w-6xl mx-auto flex flex-col space-y-4 sm:space-y-6 items-center justify-center">
        <h1 className="font-lexend  text-3xl sm:text-4xl font-bold text-center">
          Frequently Asked Questions (FAQs)
        </h1>
        <p className="font-lexend text-sm sm:text-base text-center text-gray-500 max-w-2xl">
          Your Guide to Understanding Our Stock Brokerage Services
        </p>

        <Accordion
          type="single"
          collapsible
          className="w-full space-y-2 sm:space-y-3 mt-4 sm:mt-6"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="py-1 sm:py-2"
            >
              <AccordionTrigger className="font-lexend text-sm sm:text-base md:text-[28px] hover:no-underline text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-lexend font-light text-gray-600 text-[24px] leading-relaxed pr-2 sm:pr-8">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}