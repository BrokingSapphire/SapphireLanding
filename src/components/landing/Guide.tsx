import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Guide {
  id: number;
  title: string;
  author: string;
  image: string;
}

const guides = [
  {
    id: 1,
    title:
      "Beginner's Guide to Budgeting - Simple Steps to Take Control of Your Finances",
    author: "Nakul Thakur",
    image: "/nakul.svg",
  },
  {
    id: 2,
    title:
      "Beginner's Guide to Budgeting - Simple Steps to Take Control of Your Finances",
    author: "Nakul Thakur",
    image: "/nakul.svg",
  },
  {
    id: 3,
    title:
      "Beginner's Guide to Budgeting - Simple Steps to Take Control of Your Finances",
    author: "Nakul Thakur",
    image: "/nakul.svg",
  },
];

const GuideCard = ({ guide } : { guide: Guide }) => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full">
    <div className="relative">
      <Image
        src={guide.image}
        alt={guide.title}
        width={300}
        height={200}
        className="w-full h-48 object-cover blur-sm transition-all duration-300 hover:blur-0"
      />
    </div>
    <div className="p-4">
      <h3 className="text-md font-semibold text-slate-600">{guide.title}</h3>
      <p className="text-gray-600 text-sm mt-3">{guide.author}</p>
      <button className="mt-3 px-3 rounded-full bg-[#F2FFEF] text-[#19A800] py-1 text-sm transition hover:bg-[#E0FFD9]">
        Understand Budget
      </button>
    </div>
  </div>
);

const Guide = () => {
  return (
    <div className="bg-gray-100 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-semibold mb-8 sm:mb-12">
          Guides for Financial Success
        </h2>

        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full px-10 sm:px-0"
          >
            <CarouselContent>
              {guides.map((guide) => (
                <CarouselItem key={guide.id}>
                  <div className="p-1">
                    <GuideCard guide={guide} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 bg-white/80" />
            <CarouselNext className="right-1 bg-white/80" />
          </Carousel>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guide;
