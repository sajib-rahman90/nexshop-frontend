"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Share2, Star, MapPin, Shield, Truck, RotateCcw, ChevronLeft, ChevronRight, Minus, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@heroui/react";
import Link from "next/link";
import { useProduct } from "@/hooks/useProducts";
import { useCartStore } from "@/store/cartStore";
import { ProductCard } from "@/components/products/ProductCard";
import toast from "react-hot-toast";

// Demo data shown when backend is unavailable
const DEMO_PRODUCT = {
  _id: "demo-1",
  name: "NeuraWatch X Pro",
  price: 399,
  discount: 10,
  rating: 4.9,
  reviewCount: 248,
  category: "Smart Wearables",
  stock: 15,
  location: "San Francisco, CA",
  shortDescription: "Advanced AI health monitor with predictive diagnostics and 7-day battery life.",
  description: `The NeuraWatch X Pro represents the pinnacle of wearable AI technology. Featuring our proprietary NeuraCore AI chip, it continuously monitors your vital signs and uses machine learning to predict health anomalies up to 72 hours before they occur.\n\nWith a gorgeous AMOLED display, surgical-grade sensors, and a 7-day battery life, the NeuraWatch X Pro is the only health companion you'll ever need. Compatible with iOS and Android through the NexShop Health app.`,
  images: [
    "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800&h=800",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800&h=800",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800&h=800",
  ],
  specs: {
    "Display": "1.9\" AMOLED, 476ppi",
    "Processor": "NeuraCore AI v3",
    "Battery": "7 Days",
    "Water Resistance": "100m / ATM10",
    "Sensors": "ECG, SpO2, Skin temp, Stress",
    "Connectivity": "Bluetooth 5.3, Wi-Fi 6, GPS",
    "Compatibility": "iOS 16+, Android 11+",
    "Weight": "39g",
  },
  tags: ["AI Health", "Fitness", "Sleep Tracking", "ECG"],
  brand: "NexShop Labs",
  sku: "NSW-X-PRO-2025",
};

const DEMO_REVIEWS = [
  { id: 1, name: "Alex M.", rating: 5, date: "Dec 2025", text: "Incredible device. The health predictions are genuinely impressive — it flagged my elevated cortisol before a major event." },
  { id: 2, name: "Sarah K.", rating: 5, date: "Nov 2025", text: "Best smartwatch I've ever owned. The AI insights are on another level. Battery easily lasts a full week." },
  { id: 3, name: "James R.", rating: 4, date: "Nov 2025", text: "Solid build quality and the accuracy is exceptional. Only wish it had more watch face options." },
];

const RELATED_PRODUCTS = [
  { _id: "r1", name: "AuraRing Health", price: 199, discount: 0, rating: 4.7, category: "Smart Wearables", stock: 30, location: "Portland, OR", shortDescription: "Smart ring tracking sleep, HRV, and body temperature 24/7.", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600" },
  { _id: "r2", name: "SonicAI Headphones", price: 249, discount: 0, rating: 4.8, category: "AI Audio", stock: 8, location: "Austin, TX", shortDescription: "AI-powered adaptive noise cancellation headphones.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600" },
  { _id: "r3", name: "ThinkBand Neural", price: 1899, discount: 0, rating: 4.9, category: "Neural Interfaces", stock: 2, location: "Cambridge, MA", shortDescription: "Non-invasive BCI wristband for thought-controlled devices.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600" },
  { _id: "r4", name: "QuietPods Elite", price: 159, discount: 12, rating: 4.6, category: "AI Audio", stock: 45, location: "New York, NY", shortDescription: "True wireless earbuds with real-time AI translation.", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600" },
];

export default function ProductDetailClient({ id }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { data: fetchedProduct, isLoading, isError } = useProduct(id);
  const addItem = useCartStore((s) => s.addItem);

  const product = fetchedProduct || DEMO_PRODUCT;
  const images = product.images || [product.image];
  const discountedPrice = product.discount > 0
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const handleAddToCart = () => {
    addItem({ ...product, qty: 1 });
    setAddedToCart(true);
    toast.success(`${product.name} added to cart!`, { icon: "🛒" });
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" style={{ background: "var(--background)" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8 opacity-60" style={{ color: "var(--foreground)" }}>
          <Link href="/" className="hover:opacity-100 transition-opacity">Home</Link>
          <span>/</span>
          <Link href="/explore" className="hover:opacity-100 transition-opacity">Explore</Link>
          <span>/</span>
          <span className="opacity-100 font-medium">{product.name}</span>
        </nav>

        {isError && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300 text-sm">
            Showing demo product — connect the backend to see live data.
          </div>
        )}

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 aspect-square">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIndex}
                  src={images[imgIndex]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIndex((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 dark:bg-black/60 flex items-center justify-center shadow hover:scale-110 transition-transform"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setImgIndex((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 dark:bg-black/60 flex items-center justify-center shadow hover:scale-110 transition-transform"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{product.discount}% OFF
                </div>
              )}
            </div>
            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${imgIndex === i ? 'border-blue-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-80'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            <div>
              <Chip size="sm" variant="flat" className="mb-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                {product.category}
              </Chip>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "var(--foreground)" }}>
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                  ))}
                  <span className="text-sm font-medium ml-1" style={{ color: "var(--foreground)" }}>{product.rating}</span>
                </div>
                <span className="text-sm opacity-50" style={{ color: "var(--foreground)" }}>
                  ({product.reviewCount || "124"} reviews)
                </span>
                <span className="text-sm opacity-50 flex items-center gap-1" style={{ color: "var(--foreground)" }}>
                  <MapPin size={13} />{product.location}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-blue-500">${discountedPrice.toFixed(2)}</span>
              {product.discount > 0 && (
                <span className="text-xl opacity-40 line-through" style={{ color: "var(--foreground)" }}>${product.price.toFixed(2)}</span>
              )}
            </div>

            <p className="text-base opacity-70 leading-relaxed" style={{ color: "var(--foreground)" }}>
              {product.shortDescription}
            </p>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`} />
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                {product.stock > 5 ? `In Stock (${product.stock} available)` : product.stock > 0 ? `Only ${product.stock} left!` : 'Out of Stock'}
              </span>
            </div>

            {/* Qty + Add to Cart */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  style={{ color: "var(--foreground)" }}
                >
                  <Minus size={16} />
                </button>
                <span className="px-5 py-2.5 font-semibold min-w-[3rem] text-center" style={{ color: "var(--foreground)" }}>{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  style={{ color: "var(--foreground)" }}
                >
                  <Plus size={16} />
                </button>
              </div>
              <Button
                color="primary"
                size="lg"
                className="flex-1 font-semibold"
                isDisabled={product.stock === 0}
                startContent={addedToCart ? <Check size={18} /> : <ShoppingCart size={18} />}
                onPress={handleAddToCart}
              >
                {addedToCart ? "Added!" : "Add to Cart"}
              </Button>
              <Button
                isIconOnly
                size="lg"
                variant="flat"
                onPress={() => setWishlisted(!wishlisted)}
                className={wishlisted ? "text-red-500" : ""}
              >
                <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
              </Button>
              <Button isIconOnly size="lg" variant="flat">
                <Share2 size={20} />
              </Button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: <Truck size={20} />, title: "Free Shipping", sub: "Orders over $50" },
                { icon: <RotateCcw size={20} />, title: "30-Day Returns", sub: "No questions asked" },
                { icon: <Shield size={20} />, title: "2-Year Warranty", sub: "Manufacturer" },
              ].map((badge) => (
                <div key={badge.title} className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-900 gap-1.5">
                  <div className="text-blue-500">{badge.icon}</div>
                  <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>{badge.title}</p>
                  <p className="text-xs opacity-50" style={{ color: "var(--foreground)" }}>{badge.sub}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            {product.tags && (
              <div className="flex flex-wrap gap-2 pt-1">
                {product.tags.map((tag) => (
                  <Chip key={tag} size="sm" variant="bordered" className="opacity-70">{tag}</Chip>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tabs: Description / Specs / Reviews */}
        <div className="mb-16">
          <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8 gap-1">
            {["description", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize transition-all border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                style={activeTab !== tab ? { color: "var(--foreground)" } : {}}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "description" && (
                <div className="max-w-2xl">
                  <div className="prose dark:prose-invert prose-sm sm:prose-base" style={{ color: "var(--foreground)" }}>
                    {(product.description || product.shortDescription).split('\n\n').map((p, i) => (
                      <p key={i} className="mb-4 opacity-80 leading-relaxed">{p}</p>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="max-w-lg">
                  <table className="w-full text-sm">
                    <tbody>
                      {Object.entries(product.specs || {}).map(([key, val]) => (
                        <tr key={key} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-3 pr-8 font-medium opacity-60 w-40" style={{ color: "var(--foreground)" }}>{key}</td>
                          <td className="py-3 font-medium" style={{ color: "var(--foreground)" }}>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6 max-w-2xl">
                  {DEMO_REVIEWS.map((review) => (
                    <div key={review.id} className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800" style={{ background: "var(--background)" }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                            {review.name[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{review.name}</p>
                            <p className="text-xs opacity-50" style={{ color: "var(--foreground)" }}>{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={13} className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm opacity-70 leading-relaxed" style={{ color: "var(--foreground)" }}>{review.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--foreground)" }}>You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RELATED_PRODUCTS.map((p, i) => (
              <motion.div key={p._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
