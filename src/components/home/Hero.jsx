"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Star } from "lucide-react";
import Link from "next/link";

const BADGES = [
  {
    icon: <Star size={12} className="fill-yellow-400 text-yellow-400" />,
    text: "4.9/5 from 48k+ reviews",
  },
  {
    icon: <ShieldCheck size={12} className="text-emerald-500" />,
    text: "Buyer Protected",
  },
  {
    icon: <Zap size={12} className="text-blue-500" />,
    text: "AI-Powered Discovery",
  },
];

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-36"
      style={{ background: "var(--background)" }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[160px] opacity-[0.06]" />
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-[0.08]" />
        <div className="absolute bottom-0 left-[10%] w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-[0.08]" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        {/* AI badge pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium mb-8 shadow-sm"
        >
          <Sparkles size={14} className="animate-pulse" />
          Powered by Advanced AI — Discover Smarter
          <ArrowRight size={14} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[1.05] mb-6"
          style={{ color: "var(--foreground)" }}
        >
          The Future of
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500">
            Shopping is Here
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 opacity-70"
          style={{ color: "var(--foreground)" }}
        >
          AI-powered recommendations, real-time intelligence, and
          next-generation products — all in one place. Find exactly what you
          need, before you even know you need it.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button
            as={Link}
            href="/explore"
            color="primary"
            size="lg"
            endContent={<ArrowRight size={18} />}
            className="w-full sm:w-auto font-semibold px-8 h-14 text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
          >
            Start Exploring
          </Button>
          <Button
            as={Link}
            href="/ai"
            variant="bordered"
            color="primary"
            size="lg"
            startContent={<Sparkles size={18} />}
            className="w-full sm:w-auto font-semibold px-8 h-14 text-base"
          >
            Talk to Nex AI
          </Button>
        </motion.div>

        {/* Trust Badges Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          {BADGES.map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-1.5 text-xs font-medium opacity-60"
              style={{ color: "var(--foreground)" }}
            >
              {badge.icon}
              {badge.text}
            </div>
          ))}
        </motion.div>

        {/* Floating Product Cards Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mt-16 mx-auto max-w-3xl"
        >
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              {
                name: "NeuraWatch X Pro",
                price: "$359",
                tag: "AI Health",
                img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=300&h=300",
                discount: "-10%",
              },
              {
                name: "SonicAI Headphones",
                price: "$249",
                tag: "AI Audio",
                img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300&h=300",
                discount: null,
              },
              {
                name: "VisionQuest VR 2",
                price: "$639",
                tag: "Virtual Reality",
                img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=300&h=300",
                discount: "-20%",
              },
            ].map((card, i) => (
              <motion.div
                key={card.name}
                animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-40 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={card.img}
                    alt={card.name}
                    className="w-full h-32 object-cover"
                  />
                  {card.discount && (
                    <span className="absolute top-2 left-2 text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-full">
                      {card.discount}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-blue-500">
                    {card.tag}
                  </span>
                  <p
                    className="text-xs font-semibold mt-0.5 line-clamp-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    {card.name}
                  </p>
                  <p className="text-sm font-black text-blue-500 mt-1">
                    {card.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Glow under cards */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-blue-500 filter blur-[60px] opacity-10 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
