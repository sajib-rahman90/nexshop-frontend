"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Star, TrendingUp, Package, Settings, LogOut, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@heroui/react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { firebaseSignOut } from "@/lib/firebase";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

const STATS = [
  { label: "Total Orders", value: "12", icon: <ShoppingBag size={22} />, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { label: "Wishlist Items", value: "8", icon: <Heart size={22} />, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
  { label: "Reviews Written", value: "5", icon: <Star size={22} />, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
  { label: "AI Recommendations", value: "24", icon: <Sparkles size={22} />, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
];

const RECENT_ORDERS = [
  { id: "#NS-1048", product: "NeuraWatch X Pro", date: "Jun 25, 2025", status: "Delivered", price: 359.10 },
  { id: "#NS-1031", product: "SonicAI Headphones", date: "Jun 18, 2025", status: "In Transit", price: 249.00 },
  { id: "#NS-1019", product: "HoloHome Hub 3", date: "Jun 10, 2025", status: "Delivered", price: 509.15 },
];

const STATUS_COLORS = {
  "Delivered": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "In Transit": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Pending": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  "Cancelled": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    } else {
      api.get("/dashboard/user")
        .then(res => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const handleLogout = async () => {
    try { await firebaseSignOut(); } catch { /* ignore */ }
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <div className="min-h-screen py-10" style={{ background: "var(--background)" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-sm opacity-60 mb-1" style={{ color: "var(--foreground)" }}>Good to see you back,</p>
            <h1 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>{user.name} 👋</h1>
            <p className="text-sm mt-1 text-blue-500">{user.email}</p>
          </motion.div>

          <div className="flex gap-2">
            <Button as={Link} href="/explore" color="primary" variant="flat" startContent={<Package size={16} />} size="sm">
              Shop Now
            </Button>
            <Button variant="flat" color="danger" startContent={<LogOut size={16} />} size="sm" onPress={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>

        {/* Stats */}
        {isLoading ? (
          <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>
        ) : data && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total Orders", value: data.stats.totalOrders, icon: <ShoppingBag size={22} />, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
              { label: "Wishlist Items", value: data.stats.wishlistItems, icon: <Heart size={22} />, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
              { label: "Reviews Written", value: data.stats.reviewsWritten, icon: <Star size={22} />, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
              { label: "AI Recommendations", value: data.stats.aiRecommendations, icon: <Sparkles size={22} />, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-gray-100 dark:border-gray-800 p-5"
                style={{ background: "var(--background)" }}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{stat.value}</p>
                <p className="text-sm opacity-60 mt-0.5" style={{ color: "var(--foreground)" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 rounded-2xl border border-gray-100 dark:border-gray-800 p-6"
            style={{ background: "var(--background)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Recent Orders</h2>
              <Button as={Link} href="/orders" variant="light" size="sm" className="text-blue-500">View all</Button>
            </div>
            <div className="space-y-3">
              {data?.recentOrders?.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{order.product}</p>
                    <p className="text-xs opacity-50 mt-0.5" style={{ color: "var(--foreground)" }}>{order.id} · {order.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status] || STATUS_COLORS["Pending"]}`}>{order.status}</span>
                    <span className="text-sm font-bold text-blue-500">${order.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Account Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {/* Profile Card */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 p-6" style={{ background: "var(--background)" }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: "var(--foreground)" }}>Your Profile</h2>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: "var(--foreground)" }}>{user.name}</p>
                  <p className="text-xs opacity-60" style={{ color: "var(--foreground)" }}>{user.email}</p>
                  <Chip size="sm" variant="flat" className="mt-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                    {user.role || "Customer"}
                  </Chip>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 p-5" style={{ background: "var(--background)" }}>
              <h2 className="text-sm font-bold mb-3 opacity-60 uppercase tracking-widest" style={{ color: "var(--foreground)" }}>Quick Links</h2>
              <div className="space-y-1">
                {[
                  { icon: <User size={16} />, label: "Edit Profile", href: "/profile" },
                  { icon: <ShoppingBag size={16} />, label: "My Orders", href: "/orders" },
                  { icon: <Heart size={16} />, label: "Wishlist", href: "/wishlist" },
                  { icon: <Sparkles size={16} />, label: "AI Recommendations", href: "/ai" },
                  { icon: <Settings size={16} />, label: "Settings", href: "/settings" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
                    style={{ color: "var(--foreground)" }}
                  >
                    <span className="opacity-60">{link.icon}</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
