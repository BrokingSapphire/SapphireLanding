import { Metadata } from "next";
import CollateralHaircutClient from "./CollateralHaircutClient";

export const metadata: Metadata = {
  title: "Collateral Haircut | Sapphire Broking: Smarter Trading, Expert Insights",
  description:
    "Understand collateral haircuts in stock trading and pledging. Learn how haircut percentages affect your margin, the role of SEBI guidelines, and how Sapphire Broking applies haircuts on pledged shares and mutual funds for margin trading.",
  keywords:
    "collateral haircut, haircut in pledging, margin against shares, pledged securities haircut, SEBI haircut rules, Sapphire Broking collateral margin, haircut percentage list, mutual fund haircut, haircut on stocks, how haircuts work, haircut margin trading, collateral value after haircut, haircut calculator, stock pledge haircut, trading margin from collateral, haircut in demat pledge, margin benefit after haircut, collateral risk management",
  openGraph: {
    title: "Collateral Haircut | Sapphire Broking: Smarter Trading, Expert Insights",
    description:
      "Get clarity on how collateral haircuts work in trading. Know the haircut rates applied on stocks and mutual funds pledged for margin, and how they impact your collateral value.",
    url: "https://www.sapphirebroking.com/collateral-haircut",
    images: [
      {
        url: "https://www.sapphirebroking.com/logo-white.svg",
        alt: "Sapphire Broking Logo",
      },
    ],
    type: "website",
  },
};

export default function CollateralHaircutPage() {
  return <CollateralHaircutClient />;
}