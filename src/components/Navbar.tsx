import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/product", label: "Product" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "contact" },
    { href: "/support", label: "support" },
  ];

  return (
    <nav className="relative shadow-lg">
      <div className="flex items-center justify-between py-4 px-12 font-medium">
          <Link href="/">
        <div className="items-center flex flex-between">
            <Image
              src="/logo.svg"
              alt="Sapphire Logo"
              width={40}
              height={40}
              className="w-8"
            />
          <p className="font-bold text-2xl">Sapphire</p>
        </div>
          </Link>

        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex uppercase items-center gap-16">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black hover:text-gray-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center">
          <Link
            href="/signup"
            className="bg-[#152F46] text-white px-6 py-2 rounded-full hover:bg-[#1A3B59] transition-colors duration-200"
          >
            LOGIN/SIGNUP
          </Link>
        </div>
      </div>

      <div className="lg:hidden fixed inset-0 z-50 bg-white hidden">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <div className="w-32">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Shop Logo"
                  width={128}
                  height={32}
                  className="w-full"
                />
              </Link>
            </div>
            <button className="p-2">Hi</button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-lg font-medium hover:bg-gray-50 rounded"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t">
            <Link
              href="/signup"
              className="block w-full bg-[#152F46] text-white px-6 py-2 rounded-full text-center hover:bg-[#1A3B59]"
            >
              LOGIN/SIGNUP
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
