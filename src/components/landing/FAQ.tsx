import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants/landing";
import Link from "next/link";

export default function FAQ() {
  return (
    <div className="w-full bg-white px-6 py-8 sm:p-12">
      <div className="max-w-6xl w-11/12 mx-auto flex flex-col space-y-6 items-center justify-center">
        <h1 className="text-green-heading text-2xl sm:text-4xl font-bold text-center">
          Frequently Asked Questions (FAQs)
        </h1>
        <p className="text-sm sm:text-base text-center text-gray-500">
          Your Guide to Understanding Our Stock Brokerage Services
        </p>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="border-b border-black py-2"
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
          <Link href={"/contact"}>
          <button  className="px-8 mt-5 sm:px-10 py-3 sm:py-4 border border-black rounded-full text-gray-600 text-sm sm:text-base font-bold hover:bg-[#152F46] hover:text-white transition">
            Contact Us
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
