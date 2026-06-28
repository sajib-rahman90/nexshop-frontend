"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Alexandra Kim",
    role: "Product Designer, Figma",
    rating: 5,
    text: "The AI recommendations are genuinely scary good. It suggested the NeuraWatch before I even knew what I wanted. Delivered in 2 days. I'm obsessed.",
    initials: "AK",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    name: "Marcus Johnson",
    role: "Software Engineer, Stripe",
    rating: 5,
    text: "Best tech shopping experience I've had. The Nex AI actually understood my use case and steered me away from an overpowered product to a better-value one. That's rare.",
    initials: "MJ",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "Priya Sharma",
    role: "Founder, HealthTech startup",
    rating: 5,
    text: "I bought the ThinkBand Neural for our lab research. NexShop was the only platform that had a proper technical breakdown. The specs were accurate and delivery was flawless.",
    initials: "PS",
    gradient: "from-orange-500 to-rose-500",
  },
];

export function Testimonials() {
  return (
    <section className="py-24" style={{ background: "var(--background)" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--foreground)" }}>
            Loved by tech enthusiasts worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-7 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 flex flex-col gap-4"
            >
              <Quote size={28} className="text-blue-100 dark:text-blue-900 absolute top-5 right-5" />
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm leading-relaxed opacity-80 flex-1" style={{ color: "var(--foreground)" }}>"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-50 dark:border-gray-800">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{t.name}</p>
                  <p className="text-xs opacity-50" style={{ color: "var(--foreground)" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
