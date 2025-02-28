"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);
  
  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);
  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/product", label: "Product" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed font-poppins w-full top-0 z-50 bg-white backdrop-blur-md shadow-sm">
      <div className="xl:max-w-7xl mx-auto flex items-center justify-between py-4 px-6 lg:px-8">
        <Link href="/">
          <div className="items-center flex">
            <Image
              src="/logo.svg"
              alt="Sapphire Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <p className="font-semibold text-2xl text-black">Sapphire</p>
          </div>
        </Link>

        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex uppercase items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group text-black py-2 transition-all duration-300"
                onClick={() => setActiveLink(link.href)}
              >
                {link.label}

                {/* Green underline animation (for both hover & active states) */}
                <span
                  className={`absolute bottom-0 left-0 h-[3px] bg-[#064D51] transition-all duration-300 ${
                    activeLink === link.href ? "w-full" : "w-0"
                  } group-hover:w-full`}
                ></span>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-x-4">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="ghost">Signup</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
