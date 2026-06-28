"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Package, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@heroui/react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart, getTotal, getCount } = useCartStore();
  const total = getTotal();
  const count = getCount();
  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  const handleRemove = (id, name) => {
    removeItem(id);
    toast.success(`${name} removed from cart`);
  };

  return (
    <div className="min-h-screen py-10" style={{ background: "var(--background)" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>Your Cart</h1>
            <p className="text-sm opacity-60 mt-1" style={{ color: "var(--foreground)" }}>
              {count > 0 ? `${count} item${count > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={() => { clearCart(); toast.success("Cart cleared"); }}
              className="text-sm text-red-500 hover:underline flex items-center gap-1.5"
            >
              <Trash2 size={14} /> Clear cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6">
              <ShoppingCart size={40} className="text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--foreground)" }}>Your cart is empty</h2>
            <p className="opacity-60 mb-8 max-w-sm" style={{ color: "var(--foreground)" }}>
              Looks like you haven't added anything yet. Discover our AI-powered products!
            </p>
            <Button as={Link} href="/explore" color="primary" size="lg" endContent={<ArrowRight size={18} />}>
              Start Shopping
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => {
                  const itemPrice = item.discount > 0
                    ? item.price - (item.price * item.discount) / 100
                    : item.price;
                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800"
                      style={{ background: "var(--background)" }}
                    >
                      {/* Image */}
                      <Link href={`/products/${item._id}`}>
                        <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-900">
                          <img
                            src={item.image || item.images?.[0]}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link href={`/products/${item._id}`}>
                              <p className="font-semibold text-sm sm:text-base hover:text-blue-500 transition-colors line-clamp-1" style={{ color: "var(--foreground)" }}>
                                {item.name}
                              </p>
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <Chip size="sm" variant="flat" className="text-xs opacity-70">{item.category}</Chip>
                              {item.discount > 0 && (
                                <Chip size="sm" color="danger" variant="flat" className="text-xs">-{item.discount}%</Chip>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemove(item._id, item.name)}
                            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 hover:text-red-500 transition-colors shrink-0"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Qty */}
                          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQty(item._id, item.qty - 1)}
                              className="px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              style={{ color: "var(--foreground)" }}
                            >
                              <Minus size={13} />
                            </button>
                            <span className="px-3 py-1.5 text-sm font-semibold min-w-[2rem] text-center" style={{ color: "var(--foreground)" }}>
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item._id, item.qty + 1)}
                              className="px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              style={{ color: "var(--foreground)" }}
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            {item.discount > 0 && (
                              <p className="text-xs line-through opacity-40" style={{ color: "var(--foreground)" }}>
                                ${(item.price * item.qty).toFixed(2)}
                              </p>
                            )}
                            <p className="text-base font-bold text-blue-500">
                              ${(itemPrice * item.qty).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Continue Shopping */}
              <div className="pt-2">
                <Button as={Link} href="/explore" variant="flat" startContent={<ArrowRight size={16} className="rotate-180" />}>
                  Continue Shopping
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-gray-100 dark:border-gray-800 p-6 h-fit sticky top-20"
              style={{ background: "var(--background)" }}
            >
              <h2 className="text-lg font-bold mb-5" style={{ color: "var(--foreground)" }}>Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between" style={{ color: "var(--foreground)" }}>
                  <span className="opacity-70">Subtotal ({count} items)</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between" style={{ color: "var(--foreground)" }}>
                  <span className="opacity-70">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-500 font-medium">Free</span>
                  ) : (
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between" style={{ color: "var(--foreground)" }}>
                  <span className="opacity-70">Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                {shipping > 0 && (
                  <div className="px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-xs text-blue-600 dark:text-blue-300 flex items-center gap-2">
                    <Package size={13} />
                    Add ${(50 - total).toFixed(2)} more for free shipping
                  </div>
                )}

                {/* Promo Code */}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: "var(--background)", color: "var(--foreground)" }}
                  />
                  <Button size="sm" variant="flat" startContent={<Tag size={13} />}>Apply</Button>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-1">
                  <div className="flex justify-between font-bold text-base" style={{ color: "var(--foreground)" }}>
                    <span>Total</span>
                    <span className="text-blue-500 text-lg">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button color="primary" className="w-full mt-5 font-semibold" size="lg" endContent={<ArrowRight size={18} />}>
                Proceed to Checkout
              </Button>

              {/* Trust badges */}
              <div className="flex justify-center gap-4 mt-4 text-xs opacity-50" style={{ color: "var(--foreground)" }}>
                <span>🔒 Secure Checkout</span>
                <span>✅ SSL Encrypted</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
