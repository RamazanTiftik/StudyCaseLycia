"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

// Define variants with correct typing
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] }, // use cubic-bezier array instead of string
  },
};

export default function Hero() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px]">
      {/* Background Image */}
      <img
        src="/images/hero.png"
        alt="Hero Image"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-start px-6 md:px-20">

        {/* Title */}
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading text-white font-bold mb-4 drop-shadow-lg"
        >
          Lycia Kozmetik
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          transition={{ delay: 0.3 }}
          className="text-white text-lg sm:text-xl md:text-2xl max-w-xl mb-6 font-body drop-shadow-md"
        >
          Doğallığı ve kaliteyi ön planda tutan, modern tasarımlı ürünlerimizle eşsiz deneyimler sunuyoruz.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          transition={{ delay: 0.6 }}
        >
          <Link href="/store">
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-body text-lg md:text-xl transition-transform transform hover:scale-105 shadow-lg">
              Mağazayı Keşfet
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
