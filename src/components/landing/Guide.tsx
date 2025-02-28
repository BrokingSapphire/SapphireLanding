import Image from "next/image";
import React from "react";

const guides = [
  {
    id: 1,
    title: "Beginner’s Guide to Budgeting - Simple Steps to Take Control of Your Finances",
    author: "Nakul Thakur",
    image: "/nakul.svg",
  },
  {
    id: 2,
    title: "Beginner’s Guide to Budgeting - Simple Steps to Take Control of Your Finances",
    author: "Nakul Thakur",
    image: "/nakul.svg",
  },
  {
    id: 3,
    title: "Beginner’s Guide to Budgeting - Simple Steps to Take Control of Your Finances",
    author: "Nakul Thakur",
    image: "/nakul.svg",
  },
];

const Guide = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-4xl font-semibold mb-12">
          Guides for Financial Success
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {guides.map((guide) => (
            <div key={guide.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
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
                <button className="mt-3 px-3 rounded-full bg-[#F2FFEF] text-[#19A800] py-1 text-sm transition">
                  Understand Budget
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guide;
