"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@heroui/react";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";
import { useProducts } from "@/hooks/useProducts";

const CATEGORIES = [
  "All", "Smart Wearables", "AI Audio", "Home Automation", 
  "Robotics", "Virtual Reality", "Neural Interfaces", "Electronics"
];

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating_desc" },
];

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: 99999 },
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 – $300", min: 100, max: 300 },
  { label: "$300 – $1,000", min: 300, max: 1000 },
  { label: "Above $1,000", min: 1000, max: 99999 },
];

// Static demo products (displayed while backend is being connected)
const DEMO_PRODUCTS = [
  { _id: "1", name: "NeuraWatch X Pro", price: 399, discount: 10, rating: 4.9, category: "Smart Wearables", stock: 15, location: "San Francisco, CA", shortDescription: "Advanced AI health monitor with predictive diagnostics and 7-day battery.", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=600&h=600" },
  { _id: "2", name: "SonicAI Headphones Pro", price: 249, discount: 0, rating: 4.8, category: "AI Audio", stock: 8, location: "Austin, TX", shortDescription: "AI-powered noise cancellation that adapts to your environment in real-time.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600&h=600" },
  { _id: "3", name: "HoloHome Hub 3", price: 599, discount: 15, rating: 4.7, category: "Home Automation", stock: 22, location: "Seattle, WA", shortDescription: "Central AI hub to control and automate your entire smart home ecosystem.", image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600&h=600" },
  { _id: "4", name: "RoboAssist Mini", price: 1299, discount: 5, rating: 4.6, category: "Robotics", stock: 3, location: "Boston, MA", shortDescription: "Compact home robot for errands, reminders, and senior care assistance.", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600&h=600" },
  { _id: "5", name: "VisionQuest VR 2", price: 799, discount: 20, rating: 4.5, category: "Virtual Reality", stock: 11, location: "Los Angeles, CA", shortDescription: "Immersive 8K VR headset with eye-tracking and haptic feedback gloves included.", image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=600&h=600" },
  { _id: "6", name: "ThinkBand Neural", price: 1899, discount: 0, rating: 4.9, category: "Neural Interfaces", stock: 2, location: "Cambridge, MA", shortDescription: "Non-invasive BCI wristband for controlling devices with your thoughts.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600&h=600" },
  { _id: "7", name: "AuraRing Health", price: 199, discount: 0, rating: 4.7, category: "Smart Wearables", stock: 30, location: "Portland, OR", shortDescription: "Smart ring tracking sleep, HRV, blood oxygen, and body temperature 24/7.", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600&h=600" },
  { _id: "8", name: "QuietPods Elite", price: 159, discount: 12, rating: 4.6, category: "AI Audio", stock: 45, location: "New York, NY", shortDescription: "True wireless earbuds with conversational AI and real-time translation.", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600&h=600" },
];

export default function ExploreClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [sort, setSort] = useState("newest");
  const [priceRange, setPriceRange] = useState(PRICE_RANGES[0]);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const filters = {
    search: debouncedSearch || undefined,
    category: category !== "All" ? category : undefined,
    sort,
    page,
    limit: 8,
    minPrice: priceRange.min,
    maxPrice: priceRange.max === 99999 ? undefined : priceRange.max,
  };

  const { data, isLoading, isError } = useProducts(filters);

  // Use demo data when backend is unavailable
  const products = data?.products || data || DEMO_PRODUCTS;
  const totalPages = data?.totalPages || 1;

  const activeFilters = [
    category !== "All" && { key: "category", label: category },
    debouncedSearch && { key: "search", label: `"${debouncedSearch}"` },
    priceRange.min > 0 || priceRange.max < 99999 ? { key: "price", label: priceRange.label } : null,
  ].filter(Boolean);

  const clearFilter = (key) => {
    if (key === "category") setCategory("All");
    if (key === "search") setSearch("");
    if (key === "price") setPriceRange(PRICE_RANGES[0]);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 py-8" style={{ background: "var(--background)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>Explore Products</h1>
              <p className="text-sm mt-1" style={{ color: "var(--foreground)", opacity: 0.6 }}>
                Discover the best in AI-powered technology
              </p>
            </div>
            {/* Search bar */}
            <div className="relative w-full md:w-96">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" style={{ color: "var(--foreground)" }} />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                style={{ background: "var(--background)", color: "var(--foreground)" }}
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100">
                  <X size={16} style={{ color: "var(--foreground)" }} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
            <div className="sticky top-20 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 space-y-6" style={{ background: "var(--background)" }}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base" style={{ color: "var(--foreground)" }}>Filters</h3>
                <button
                  onClick={() => { setCategory("All"); setPriceRange(PRICE_RANGES[0]); setSearch(""); }}
                  className="text-xs text-blue-500 hover:underline"
                >
                  Clear all
                </button>
              </div>

              {/* Category */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-50" style={{ color: "var(--foreground)" }}>Category</p>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setCategory(cat); setPage(1); }}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${
                        category === cat
                          ? 'bg-blue-500 text-white font-medium'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      style={category !== cat ? { color: "var(--foreground)" } : {}}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-50" style={{ color: "var(--foreground)" }}>Price Range</p>
                <div className="space-y-1">
                  {PRICE_RANGES.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => { setPriceRange(range); setPage(1); }}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${
                        priceRange.label === range.label
                          ? 'bg-blue-500 text-white font-medium'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      style={priceRange.label !== range.label ? { color: "var(--foreground)" } : {}}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm"
                style={{ color: "var(--foreground)", background: "var(--background)" }}
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>

              {/* Active filter chips */}
              <div className="flex flex-wrap gap-2 flex-1">
                {activeFilters.map((f) => (
                  <Chip
                    key={f.key}
                    onClose={() => clearFilter(f.key)}
                    variant="flat"
                    size="sm"
                    className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  >
                    {f.label}
                  </Chip>
                ))}
              </div>

              <span className="text-sm opacity-50 ml-auto" style={{ color: "var(--foreground)" }}>
                {products.length} products
              </span>

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm"
                  style={{ color: "var(--foreground)", background: "var(--background)" }}
                >
                  {SORT_OPTIONS.find((s) => s.value === sort)?.label}
                  <ChevronDown size={14} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 z-20 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg w-48 py-1" style={{ background: "var(--background)" }}>
                    {SORT_OPTIONS.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => { setSort(s.value); setSortOpen(false); setPage(1); }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        style={{ color: "var(--foreground)" }}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-blue-500 text-white' : ''}`}
                  style={viewMode !== 'grid' ? { color: "var(--foreground)" } : {}}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-blue-500 text-white' : ''}`}
                  style={viewMode !== 'list' ? { color: "var(--foreground)" } : {}}
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className={`grid gap-5 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : isError ? (
              /* Show demo products when backend is offline */
              <div>
                <div className="mb-4 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300 text-sm">
                  Showing demo products — connect the backend to see live data.
                </div>
                <div className={`grid gap-5 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {DEMO_PRODUCTS.map((product, i) => (
                    <motion.div key={product._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>No products found</h3>
                <p className="opacity-60 mb-6" style={{ color: "var(--foreground)" }}>Try adjusting your filters or search term</p>
                <Button color="primary" variant="flat" onPress={() => { setSearch(""); setCategory("All"); setPriceRange(PRICE_RANGES[0]); }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${category}-${debouncedSearch}-${sort}-${page}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`grid gap-5 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}
                >
                  {products.map((product, i) => (
                    <motion.div key={product._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <Button
                  isDisabled={page === 1}
                  variant="flat"
                  size="sm"
                  onPress={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    size="sm"
                    variant={p === page ? "solid" : "flat"}
                    color={p === page ? "primary" : "default"}
                    onPress={() => setPage(p)}
                  >
                    {p}
                  </Button>
                ))}
                <Button
                  isDisabled={page === totalPages}
                  variant="flat"
                  size="sm"
                  onPress={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
