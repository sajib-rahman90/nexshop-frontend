"use client";

import { motion } from "framer-motion";
import { Watch, Headphones, Home, Cpu, Glasses, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const CATEGORIES = [
  {
    id: "smart-wearables",
    name: "Smart Wearables",
    icon: <Watch size={32} />,
    color: "from-blue-500 to-cyan-400",
    description: "Next-gen smartwatches and fitness trackers with AI diagnostics.",
    itemCount: 42,
    href: "/explore?category=Smart%20Wearables"
  },
  {
    id: "ai-audio",
    name: "AI Audio",
    icon: <Headphones size={32} />,
    color: "from-purple-500 to-pink-500",
    description: "Adaptive noise cancellation and real-time translation devices.",
    itemCount: 28,
    href: "/explore?category=AI%20Audio"
  },
  {
    id: "home-automation",
    name: "Home Automation",
    icon: <Home size={32} />,
    color: "from-emerald-500 to-teal-400",
    description: "Predictive smart home hubs, lighting, and security systems.",
    itemCount: 56,
    href: "/explore?category=Home%20Automation"
  },
  {
    id: "robotics",
    name: "Robotics",
    icon: <Cpu size={32} />,
    color: "from-orange-500 to-yellow-400",
    description: "Personal AI companions and automated home assistants.",
    itemCount: 15,
    href: "/explore?category=Robotics"
  },
  {
    id: "virtual-reality",
    name: "Virtual Reality",
    icon: <Glasses size={32} />,
    color: "from-indigo-500 to-blue-500",
    description: "Immersive 8K headsets and haptic feedback accessories.",
    itemCount: 24,
    href: "/explore?category=Virtual%20Reality"
  },
  {
    id: "neural-interfaces",
    name: "Neural Interfaces",
    icon: <Activity size={32} />,
    color: "from-rose-500 to-red-400",
    description: "Non-invasive brain-computer interfaces for seamless control.",
    itemCount: 8,
    href: "/explore?category=Neural%20Interfaces"
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-12" style={{ background: "var(--background)" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Shop by Category
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg opacity-60"
            style={{ color: "var(--foreground)" }}
          >
            Explore our curated collection of next-generation technology, organized to help you find exactly what you're looking for.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={category.href} className="block group h-full">
                <div className="h-full rounded-3xl p-8 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300 flex flex-col relative overflow-hidden">
                  
                  {/* Decorative Gradient Blob */}
                  <div className={`absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br ${category.color} rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />

                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white mb-6 w-fit shadow-lg shadow-${category.color.split('-')[1]}-500/30 group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
                    {category.name}
                  </h3>
                  
                  <p className="opacity-60 text-sm mb-6 flex-grow" style={{ color: "var(--foreground)" }}>
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-sm font-medium text-blue-500">
                      {category.itemCount} Products
                    </span>
                    <span className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors" style={{ color: "var(--foreground)" }}>
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
