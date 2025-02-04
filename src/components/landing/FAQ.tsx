import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants/landing";



export default function FAQ() {
  return (
    <div className="max-w-4xl flex flex-col space-y-4 items-center justify-center mx-auto px-4 py-6 sm:p-8">
      <h1 className="text-[#064D51] text-2xl sm:text-4xl font-bold text-center">
        Frequently Asked Questions (FAQs)
      </h1>
        <p className="text-sm sm:text-base text-center text-gray-500">

        Your Guide to Understanding Our Stock Brokerage Services
      </p>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index + 1}`}
            className="border-b border-black py-1"
          >
            <AccordionTrigger className="text-base sm:text-xl font-semibold hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm sm:text-lg pr-8">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="text-center">
        <button className="px-6 mt-4 sm:px-8 py-2 sm:py-3 border border-black rounded-full text-gray-600 text-sm sm:text-base font-bold hover:bg-[#152F46] hover:text-white transition">
          View More
        </button>
      </div>
    </div>
  );
}
