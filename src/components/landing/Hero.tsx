"use client";

import React from "react";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import CustomButtonX from "../general-components/CustomButtonX";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Hero() {
  return (
    <AnimatePresence mode="wait">
      <div
        className="relative mt-24 md:mt-32 w-full flex flex-col items-center justify-center mx-auto px-4 md:px-0"
        style={{
          backgroundImage: "url('/main/Bg_Landing.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#A3F794]/10 to-[#FFDE55]/20 z-0" />

        <motion.div
          className="relative z-10 max-w-2xl space-y-3 md:space-y-5 text-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center font-semibold leading-tight text-3xl md:text-5xl"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transform Your
            <motion.span
              className="font-lobster-two pr-2 italic text-transparent bg-clip-text font-[400] bg-gradient-to-r from-[#14A5AD] to-[#21B906]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {" "}
              Investment
            </motion.span>
            <br /> Journey Today!
          </motion.div>

          <motion.div
            className="text-base md:text-xl text-gray-heading px-2 md:px-0"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Trade smarter with advanced tools, real-time insights, and expert
            support to maximize your portfolio&apos;s growth.
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.div>
              <Link href={"/signup"}>
                <CustomButtonX
                  text="Get Started"
                  backgroundColor="#064D51"
                  textColor="#ffffff"
                  iconColor="#064D51"
                  iconBackgroundColor="#ffffff"
                  boxShadowColor="#99000099"
                  iconBoxShadowColor="#99000066"
                  icon={<FaArrowRightLong />}
                />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-10 mt-8 md:mt-12 w-full max-w-full overflow-hidden px-2 md:px-0"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Image
            className="border-4 md:border-8 border-gray-100 rounded-md w-full h-auto"
            alt="Platform Photo"
            src="/hero.svg"
            width={1000}
            height={1000}
            priority
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
