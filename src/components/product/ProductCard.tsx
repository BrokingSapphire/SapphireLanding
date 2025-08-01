// import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaGooglePlay } from "react-icons/fa";
import { FaChrome } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

export const ProductCard = ({
  title,
  description,
  image,
  index,
}: ProductCardProps) => (
  <div
    className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12 py-10 md:py-20 my-0"
    data-testid={`product-${index}`}
  >
    <div className="w-full md:w-1/2 pl-4 space-y-3 sm:space-y-4">
      <h2 className="font-lexend text-3xl sm:text-4xl font-medium mb-0">{title}</h2>
      <p className="text-gray-600 text-base sm:text-lg mb-0">
        &quot;{description}&quot;
      </p>

      {/* Buttons Section */}
      <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
        {/* App Store Button */}
        <button className="bg-white flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
          <FaApple />
          <div className="flex items-center gap-1">
            <span className="text-sm sm:text-base">App store</span>
            <FaArrowRightLong className="text-xs sm:text-sm" />
          </div>
        </button>

        {/* Play Store Button */}
        {title === "Trading Terminal" && (
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button className="bg-white flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
              <FaGooglePlay />
              <div className="flex items-center gap-1">
                <span className="text-sm sm:text-base">Play store</span>
                <FaArrowRightLong className="text-xs sm:text-sm" />
              </div>
            </button>
            <button className="bg-white flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
              <FaChrome />
              <div className="flex items-center gap-1">
                <span className="text-sm sm:text-base">Web app</span>
                <FaArrowRightLong className="text-xs sm:text-sm" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>

    <div className="w-full md:w-1/2 mt-6 md:mt-0">
      <div className="bg-white rounded-lg p-3 sm:p-1 md:p-0">
        <Image
          src={image}
          alt={`${title} interface`}
          className="w-full h-full"
          width={1400}
          height={1400}
          priority
        />
      </div>
    </div>
  </div>
);