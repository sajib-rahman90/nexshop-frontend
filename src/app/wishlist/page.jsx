"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

// Static wishlist demo — in production this would be stored per user in MongoDB
const DEMO_WISHLIST = [
  { _id: "w1", name: "NeuraWatch X Pro", price: 399, discount: 10, rating: 4.9, category: "Smart Wearables", stock: 15, location: "San Francisco, CA", shortDescription: "Advanced AI health monitor with predictive diagnostics and 7-day battery.", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=600" },
  { _id: "w2", name: "ThinkBand Neural", price: 1899, discount: 0, rating: 4.9, category: "Neural Interfaces", stock: 2, location: "Cambridge, MA", shortDescription: "Non-invasive BCI wristband for controlling devices with your thoughts.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600" },
  { _id: "w3", name: "VisionQuest VR 2", price: 799, discount: 20, rating: 4.5, category: "Virtual Reality", stock: 11, location: "Los Angeles, CA", shortDescription: "Immersive 8K VR headset with eye-tracking and haptic feedback gloves.", image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=600" },
];

export default function WishlistPage() {
  const [items, setItems] = useState(DEMO_WISHLIST);
  const addItem = useCartStore((s) => s.addItem);

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((i) => i._id !== id));
    toast.success("Removed from wishlist");
  };

  const handleAddToCart = (item) => {
    addItem(item);
    toast.success(`${item.name} added to cart! 🛒`);
  };

  const handleMoveAllToCart = () => {
    items.forEach((item) => addItem(item));
    toast.success(`${items.length} items added to cart!`);
  };

  return (
    <div className="min-h-screen py-10" style={{ background: "var(--background)" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: "var(--foreground)" }}>
              <Heart size={28} className="text-red-500 fill-red-500" />
              Wishlist
            </h1>
            <p className="text-sm opacity-60 mt-1" style={{ color: "var(--foreground)" }}>
              {items.length} saved item{items.length !== 1 ? "s" : ""}
            </p>
          </div>
          {items.length > 0 && (
            <Button
              color="primary"
              variant="flat"
              size="sm"
              startContent={<ShoppingCart size={15} />}
              onPress={handleMoveAllToCart}
            >
              Add All to Cart
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-6">
              <Heart size={40} className="text-red-400" />
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--foreground)" }}>Your wishlist is empty</h2>
            <p className="opacity-60 mb-8 max-w-sm" style={{ color: "var(--foreground)" }}>
              Save products you love by clicking the heart icon on any product.
            </p>
            <Button as={Link} href="/explore" color="primary" size="lg" endContent={<ArrowRight size={18} />}>
              Explore Products
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {items.map((item, i) => {
                const discountedPrice = item.discount > 0
                  ? item.price - (item.price * item.discount) / 100
                  : item.price;

                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0, overflow: "hidden" }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="flex items-center gap-5 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                    style={{ background: "var(--background)" }}
                  >
                    {/* Image */}
                    <Link href={`/products/${item._id}`} className="shrink-0">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item._id}`}>
                        <h3 className="font-semibold text-base hover:text-blue-500 transition-colors line-clamp-1" style={{ color: "var(--foreground)" }}>
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm opacity-60 mt-0.5 line-clamp-1" style={{ color: "var(--foreground)" }}>{item.category}</p>
                      <p className="text-sm opacity-60 mt-1 hidden sm:block line-clamp-1" style={{ color: "var(--foreground)" }}>{item.shortDescription}</p>

                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-lg font-bold text-blue-500">${discountedPrice.toFixed(2)}</span>
                        {item.discount > 0 && (
                          <>
                            <span className="text-sm line-through opacity-40" style={{ color: "var(--foreground)" }}>${item.price.toFixed(2)}</span>
                            <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">
                              -{item.discount}% OFF
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <span className={`text-xs font-medium flex items-center gap-1 ${item.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${item.stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
                          {item.stock > 0 ? `In Stock (${item.stock})` : "Out of Stock"}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 shrink-0">
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        startContent={<ShoppingCart size={14} />}
                        isDisabled={item.stock === 0}
                        onPress={() => handleAddToCart(item)}
                        className="whitespace-nowrap"
                      >
                        Add to Cart
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        color="danger"
                        startContent={<Trash2 size={14} />}
                        onPress={() => handleRemove(item._id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
