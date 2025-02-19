import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";

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
    className={`flex flex-col
      md:flex-row
    items-center justify-between gap-8 md:gap-12`}
    data-testid={`product-${index}`}
  >
    <div className="w-full md:w-1/2 space-y-4">
      <h2 className="sm:text-5xl font-bold">{title}</h2>
      <p className="text-gray-600 text-lg">&quot;{description}&quot;</p>
      <a
        href={`#${title.toLowerCase()}`}
        className="text-blue-600 hover:text-blue-700 inline-flex items-center"
        aria-label={`Learn more about ${title}`}
      >
        Learn more <FaChevronRight className="ml-1 w-4 h-4" />
      </a>
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
