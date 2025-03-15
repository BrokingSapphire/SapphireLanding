"use client";
import { PRODUCTS } from "@/constants/products";
import { ProductCard } from "./ProductCard";

const Product = () => {
  // const router = useRouter();
  // const handleExplore = useCallback(() => {
  //   window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  // }, []);

  return (
    <div className="bg-[#F5F7FA] w-full px-3 sm:px-0">
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-20"
        aria-label="Products section"
      >
        {PRODUCTS.map((product, index) => (
          <ProductCard key={product.title} {...product} index={index} />
        ))}
      </section>
    </div>
  );
};

export default Product;
