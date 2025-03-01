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
    className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12`}
    data-testid={`product-${index}`}
  >
    <div className="w-full md:w-1/2 space-y-4">
      <h2 className="sm:text-5xl font-bold">{title}</h2>
      <p className="text-gray-600 text-lg">&quot;{description}&quot;</p>

      {/* Buttons Section */}

      <div className="flex gap-4">
        {/* App Store Button */}
        <button className="bg-white flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md` hover:bg-gray-100 transition">
          <FaApple/>
          <div className="flex items-center gap-1">
            <span>App store</span>
            <FaArrowRightLong />
          </div>
        </button>

        {/* Play Store Button */}
        <button className="bg-white flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          <FaGooglePlay/>
          <div className="flex items-center gap-1">
            <span>Play store</span>
            <FaArrowRightLong />
          </div>
        </button>

        {/* Web App Button */}
        <button className="bg-white flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          <FaChrome/>
          <div className="flex items-center gap-1">
            <span>Web app</span>
            <FaArrowRightLong />
          </div>
        </button>
      </div>
    </div>

    <div className="w-full md:w-1/2">
      <div className="bg-white rounded-lg p-4 sm:p-8">
        <Image
          src={image}
          alt={`${title} interface`}
          className="w-full h-auto"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  </div>
);
