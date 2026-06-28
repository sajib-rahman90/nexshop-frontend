"use client";

import { Star, MapPin, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { useState } from "react";

export function ProductCard({ product }) {
  const {
    _id,
    id,
    name = "AI Smart Watch",
    price = 299,
    discount = 0,
    rating = 4.8,
    category = "Electronics",
    stock = 12,
    location = "New York, USA",
    shortDescription = "Next generation AI-powered product.",
    image,
    images,
  } = product || {};

  const productId = _id || id || "1";
  const productImage = image || images?.[0] || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400&h=400";
  const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;
  const [wishlisted, setWishlisted] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ ...product, _id: productId });
    toast.success(`${name} added to cart! 🛒`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((w) => !w);
    toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist! ❤️");
  };

  return (
    <Link href={`/products/${productId}`} className="block group h-full">
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden h-full flex flex-col hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300">
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
          <img
            src={productImage}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
              -{discount}%
            </span>
          )}
          <span className="absolute top-3 right-3 bg-blue-500/90 text-white text-xs font-medium px-2.5 py-1 rounded-full z-10">
            {category}
          </span>
          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all z-10 ${
              wishlisted
                ? "bg-red-500 text-white"
                : "bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500"
            }`}
          >
            <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-4 gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-base line-clamp-1 flex-grow" style={{ color: "var(--foreground)" }}>
              {name}
            </h3>
            <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded-full shrink-0">
              <Star size={11} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-300">{rating}</span>
            </div>
          </div>

          <p className="text-xs opacity-60 line-clamp-2 flex-grow" style={{ color: "var(--foreground)" }}>
            {shortDescription}
          </p>

          <div className="flex items-center gap-1 text-xs opacity-50 mt-auto" style={{ color: "var(--foreground)" }}>
            <MapPin size={11} />
            <span>{location}</span>
            <span className="mx-1">·</span>
            <span className={stock > 0 ? "text-green-500" : "text-red-500"}>
              {stock > 0 ? `${stock} in stock` : "Out of stock"}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-800 mt-1">
            <div className="flex flex-col">
              {discount > 0 && (
                <span className="text-xs line-through opacity-40" style={{ color: "var(--foreground)" }}>
                  ${price.toFixed(2)}
                </span>
              )}
              <span className="text-lg font-bold text-blue-500">${discountedPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={stock === 0}
              className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-medium px-3 py-1.5 rounded-xl transition-colors"
            >
              <ShoppingCart size={13} />
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
