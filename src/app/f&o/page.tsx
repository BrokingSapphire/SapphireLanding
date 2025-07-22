import AboutInfo from "@/components/stocks/content";
import FAQ from "@/components/f&o/FAQ";
import ReasonToChoose from "@/components/stocks/ReasonToChoose";
import BuiltForTraders from "@/components/f&o/BuiltForTraders";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "F&O Trading | Sapphire Broking: Advanced Futures & Options Platform",
	description:
		"Trade futures and options with Sapphire's advanced F&O platform. Get real-time market data, powerful analytics tools, and expert insights for smarter derivatives trading. Our platform offers seamless execution, competitive pricing, and comprehensive research to help both beginners and experienced traders navigate the F&O market effectively.",
	keywords:
		"futures and options trading, F&O trading platform, derivatives trading India, options trading strategies, futures trading tools, F&O market analysis, NSE F&O trading, BSE F&O platform, options chain analysis, futures contract trading, derivatives market insights, F&O margin calculator, options premium calculator, F&O trading for beginners, advanced options strategies, futures rollover, options expiry, index futures trading, stock futures trading, F&O risk management, derivatives market data, options Greeks calculator, F&O technical analysis, futures price charts, options open interest, F&O market trends, derivatives trading tips, F&O brokerage India, low-cost F&O trading, F&O trading app, mobile F&O trading",
	openGraph: {
		title: "About | Sapphire Broking: Smarter Trading, Expert Insights",
		description:
			"Sapphire has a next-generation trading platform designed for investors seeking expert insights and advanced trading tools. Get professional trade recommendations and stay updated with real-time corporate announcements from all listed entities. Our high-tech features ensure seamless execution, empowering both beginners and experienced traders to make well-informed market decisions.",
		url: "https://sapphirebroking.com/",
		images: [{ url: "https://www.sapphirebroking.com/logo-white.svg" }],
		type: "website",
	},
};

const Home = () => {
	return (
		<main className="w-full bg-white">
			<div className="bg-white w-full">
				<AboutInfo />
			</div>
			<div className="bg-white w-full">
				<BuiltForTraders />
			</div>
			<div className="bg-white max-w-7xl mx-auto">
				<ReasonToChoose />
			</div>
			<div className="bg-white w-full">
				<FAQ />
			</div>
		</main>
	);
};

export default Home;
