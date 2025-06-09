"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
// import { FaChevronRight } from 'react-icons/fa';

const Opportunities = () => {
    const router = useRouter()
  return (
    <section
      className="relative bg-[#064D51] py-12 pb-0 sm:py-16 overflow-hidden "
      aria-label="Call to action"
    >
      <div className="absolute right-0 top-0 w-1/4 sm:w-1/3">
        <Image
          src="/products/arrows.svg"
          alt="Arrows pointing right"
          className="ml-auto hidden lg:block  object-cover"
          aria-hidden="true"
          width={350}
          height={350}
        />
      </div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-2">
            Ready to unlock new
          </h2>
          <h2 className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text mb-6 bg-gradient-to-r from-[#00E39F] via-[#FFC300] to-[#FFC300] from-[50%] via-[70%] to-[90%]">
            revenue opportunities?
          </h2>

          <button
            className="bg-white text-black px-4 sm:px-12 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors inline-flex items-center justify-center text-sm sm:text-base group"
            onClick={() => router.push("/signup")}
          >
            <span className="mx-auto">Sign Up</span>
            <IoIosArrowRoundForward className="w-8 h-8 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
          </button>
        </div>
      </div>
      <hr className="mt-16 border-teal-800" />
    </section>
  );
}

export default Opportunities