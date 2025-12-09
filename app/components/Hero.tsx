"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
  },
};

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] min-h-[1000px]">

      {/* Background */}
      <img
        src="/images/hero.jpg"
        alt="Hero Image"
        className="w-full h-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-8 md:px-24">

        {/* Title */}
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="text-5xl sm:text-6xl md:text-7xl font-heading text-white font-bold mb-4 drop-shadow-lg"
        >
          Lycia Kozmetik
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="text-white text-lg sm:text-xl md:text-2xl max-w-xl mb-6 font-body drop-shadow-md"
        >
          Doğallığı ve kaliteyi ön planda tutan modern tasarımlı ürünlerimizle eşsiz bir deneyim sunuyoruz.
        </motion.p>

        {/* Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          transition={{ delay: 0.4 }}
        >
          <Link href="/store">
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-body text-lg md:text-xl transition-transform hover:scale-105 shadow-lg">
              Mağazayı Keşfet
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
