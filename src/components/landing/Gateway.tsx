'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GatewayItem, gatewayItems } from "@/constants/landing";
import { type CarouselApi } from "@/components/ui/carousel";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const GatewayCard = ({ title, icon, description }: GatewayItem) => (
  <div className="flex justify-center h-full mt-10 sm:mt-0">
    <div className="relative w-[280px] max-w-xs sm:max-w-sm h-64 group">
      <div className="absolute bottom-20 sm:bottom-8 w-full h-36 bg-[#FFD62D] rounded-xl transform-gpu transition-transform duration-700 ease-in-out origin-top group-hover:-rotate-6" />
      
      <div className="relative -top-0">
        <div className="bg-gray-100 rounded-xl p-6 sm:p-8 shadow-md h-full flex flex-col justify-between transform-gpu transition-all duration-300 ease-in-out group-hover:-translate-y-4">
          <div className="flex flex-col items-start space-y-2 sm:space-y-3">
            <Image
              src={icon}
              alt={title}
              width={64}
              height={64}
              className="w-10 h-10 sm:w-14 sm:h-14 transition-all duration-300"
            />
            <h3 className="text-lg sm:text-2xl font-semibold transition-all duration-300">
              {title}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm opacity-100 group-hover:opacity-0 transition-opacity duration-300">
              {description}
            </p>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-teal-800 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-start p-6 sm:p-8 space-y-2 sm:space-y-3 group-hover:-translate-y-4">
          <Image
            src={icon}
            alt={title}
            width={64}
            height={64}
            className="w-10 h-10 sm:w-14 sm:h-14 text-white"
          />
          <h3 className="text-lg sm:text-2xl font-semibold text-white">
            {title}
          </h3>
          <button className="px-3 sm:px-5 py-1.5 sm:py-2 border rounded-full bg-white text-gray-900 text-xs sm:text-sm">
            Learn more
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Gateway = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="max-w-7xl mt-4 mx-auto p-8 xl:py-[58px] xl:px-[118px]">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="font-lexend text-3xl sm:text-4xl font-semibold mb-3 sm:mb-4">
          Your Gateway to Smart Investing
        </h1>
        <p className="font-lexend text-xl text-gray-600 sm:text-base tracking-wider mt-3 px-4">
          Highlighted features that simplify and enhance the investing
          experience.
        </p>
      </div>
      
      {/* Mobile Carousel View */}
      <div className="md:hidden">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent>
            {gatewayItems.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <GatewayCard {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-white/80" />
          <CarouselNext className="right-0 bg-white/80" />
        </Carousel>
        
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {gatewayItems.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                current === index ? "w-4 bg-teal-600" : "w-2 bg-gray-300"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Desktop Grid View */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-[48px]">
        {gatewayItems.map((item, index) => (
          <GatewayCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Gateway;