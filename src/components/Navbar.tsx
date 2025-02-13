import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const Navbar = () => {
  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/product", label: "Product" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed font-poppins w-full top-0 z-50 bg-white backdrop-blur-md shadow-sm">
      <div className="max-w-[1450px] mx-auto flex items-center justify-between py-4 px-6 lg:px-8">
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
                className="text-black hover:font-bold relative group py-2 transition-all duration-300"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-black transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-black/50 transition-all duration-500 delay-75 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-x-8">
          <Link href="/login">
            <Button variant="outline">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="ghost">
              Signup
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
