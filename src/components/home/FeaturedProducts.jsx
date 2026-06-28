"use client";

import { motion } from "framer-motion";
import { ProductCard } from "../products/ProductCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { useFeaturedProducts } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";

export function FeaturedProducts() {
  const { data, isLoading } = useFeaturedProducts();
  const products = data?.products || data || [];
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
              Featured Products
            </h2>
            <p className="text-foreground/70 max-w-2xl">
              Discover our most popular AI-enhanced products curated just for you.
            </p>
          </div>
          <Button
            as={Link}
            href="/explore"
            variant="light"
            color="primary"
            endContent={<ArrowRight size={16} />}
            className="hidden sm:flex"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[300px]">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <motion.div
                key={product._id || product.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              No featured products found.
            </div>
          )}
        </div>
        
        <div className="mt-8 flex justify-center sm:hidden">
          <Button
            as={Link}
            href="/explore"
            variant="flat"
            color="primary"
            endContent={<ArrowRight size={16} />}
            className="w-full"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
