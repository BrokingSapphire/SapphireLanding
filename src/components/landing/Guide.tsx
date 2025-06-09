'use client'
import Image from "next/image";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import { Play } from "lucide-react";

interface Guide {
  id: number;
  title: string;
  author: string;
  thumbnail: string;
  videoId: string;
  duration: string;
}

const guides = [
  {
    id: 1,
    title: "Rick Astley - Never Gonna Give You Up (Official Video)",
    author: "Rick Astley",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoId: "dQw4w9WgXcQ",
    duration: "3:33",
  },
  {
    id: 2,
    title: "PSY - GANGNAM STYLE(강남스타일) M/V",
    author: "PSY",
    thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
    videoId: "9bZkp7q19f0",
    duration: "4:13",
  },
  {
    id: 3,
    title: "Smash Mouth - All Star (Official Music Video)",
    author: "Smash Mouth",
    thumbnail: "https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg",
    videoId: "L_jWHffIx5E",
    duration: "3:21",
  },
];

const GuideCard = ({ guide }: { guide: Guide }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayVideo = () => {
    // Redirect to YouTube video in a new tab
    window.open(`https://www.youtube.com/watch?v=${guide.videoId}`, '_blank');
  };

  return (
    <div className="bg-white rounded-[18px] pb-2 shadow-md overflow-hidden h-full">
      <div className="relative">
        <div 
          className="relative group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handlePlayVideo}
        >
          <Image
            src={guide.thumbnail}
            alt={guide.title}
            width={300}
            height={200}
            className={`w-full h-48 object-cover transition-all duration-300 ${
              isHovered ? 'blur-0' : 'blur-[2px]'
            }`}
          />
          
          {/* Video Duration - Bottom Right (hidden on hover) */}
          {!isHovered && (
            <div className="absolute bottom-4 left-12 text-white text-[12px] font-semibold px-2 py-1 rounded transition-all duration-300">
              {guide.duration}
            </div>
          )}

          {/* Animated Play Button */}
          <div 
            className={`absolute transition-all duration-500 ease-in-out ${
              isHovered 
                ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' 
                : 'bottom-3 left-3'
            }`}
          >
            <div className="bg-black/50 rounded-full p-2 flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
          </div>

          {/* Background overlay on hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-300" />
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-lexend text-[20px] font-medium text-slate-600 line-clamp-2">
          {guide.title}
        </h3>
        <p className="text-gray-600 text-sm mt-3">{guide.author}</p>
        <button 
          onClick={handlePlayVideo}
          className="mt-3 px-3 rounded-full bg-[#F2FFEF] text-[#19A800] py-1 text-sm transition hover:bg-[#E0FFD9]"
        >
          Watch Video
        </button>
      </div>
    </div>
  );
};

const Guide = () => {
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
    <div className="bg-gray-100 py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-24">
        <h2 className="font-lexend text-center text-3xl sm:text-4xl font-semibold mb-8 sm:mb-12">
          Guides for Financial Success
        </h2>

        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            setApi={setApi}
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
          
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {guides.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  current === index ? "w-4 bg-blue-600" : "w-2 bg-gray-300"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-16">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guide;