"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const CATEGORIES = [
  {
    id: "c1",
    name: "Smart Wearables",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=400&h=400",
    slug: "smart-wearables"
  },
  {
    id: "c2",
    name: "AI Audio",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=400&h=400",
    slug: "ai-audio"
  },
  {
    id: "c3",
    name: "Home Automation",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=400&h=400",
    slug: "home-automation"
  },
  {
    id: "c4",
    name: "Robotics",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400&h=400",
    slug: "robotics"
  },
  {
    id: "c5",
    name: "Virtual Reality",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=400&h=400",
    slug: "virtual-reality"
  },
  {
    id: "c6",
    name: "Neural Interfaces",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400&h=400",
    slug: "neural-interfaces"
  }
];

export function Categories() {
  return (
    <section className="py-16 bg-content1/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Trending Categories
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Explore the latest innovations across our most popular product categories.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={`/categories/${category.slug}`}>
                <div className="w-full h-full hover:shadow-lg transition-all group border-none rounded-xl overflow-hidden cursor-pointer relative block">
                  <div className="p-0 relative h-32 md:h-40 lg:h-48 overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                    <img
                      src={category.image}
                      alt={category.name}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-20 p-4 text-center">
                      <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-md">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
