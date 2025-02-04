"use client";
import { PRODUCTS } from "@/constants/products";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { ProductCard } from "./ProductCard";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const Product = () => {
  const router = useRouter();
  const handleExplore = useCallback(() => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-white">
      <section
        className=" mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20"
        aria-label="Products section"
      >
        {PRODUCTS.map((product, index) => (
          <ProductCard
            key={product.title}
            {...product}
            isReverse={index % 2 !== 0}
            index={index}
          />
        ))}
      </section>
    </div>
  );
};

export default Product;
