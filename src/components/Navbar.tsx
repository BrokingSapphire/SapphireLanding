import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/product", label: "Product" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
    { href: "/signup", label: "Signup" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 lg:px-8">
        <Link
          href="/"
          className="transition-transform duration-200 hover:scale-105"
        >
          <div className="items-center flex">
            <Image
              src="/logo.svg"
              alt="Sapphire Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <p className="font-bold text-2xl text-black">Sapphire</p>
          </div>
        </Link>

        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex uppercase items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black font-semibold hover:font-bold relative group py-2 transition-all duration-300"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-black transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-black/50 transition-all duration-500 delay-75 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className="lg:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out hidden">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Sapphire Logo"
                width={40}
                height={40}
                className="w-8 h-8"
              />
              <p className="font-bold text-xl text-black">Sapphire</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-lg font-semibold text-black 
                    hover:bg-gray-50 rounded-lg relative group transition-all duration-200"
                  >
                    {link.label}
                    <span className="absolute bottom-3 left-4 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-32"></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
