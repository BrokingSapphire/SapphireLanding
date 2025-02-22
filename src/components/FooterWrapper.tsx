// components/FooterWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";


export default function FooterWrapper() {
  const pathname = usePathname();
  const isSignupPage = pathname?.startsWith("/signup");
  if (isSignupPage) return null;
  return <Footer />;
}